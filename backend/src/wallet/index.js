const Web3 = require("web3")
const UserModel = require("../models/user")
const WalletModel = require("../models/wallet")
const { encrypt, decrypt } = require("../common/encryption")

const createNewWallet = async (userId) => {
    const web3 = new Web3('http://localhost')

    if (0 === await WalletModel.countDocuments({user: userId})) {
        const walletObj = web3.eth.accounts.create('blockhub-' + (new Date()).getTime().toString(16))

        const newWallet = new WalletModel({
            user: userId,
            address: walletObj.address,
            privateKey: encrypt(walletObj.privateKey),
            selected: true
        })

        await newWallet.save()
    } else {
        await WalletModel.findOneAndUpdate({user: userId}, {selected: true})
    }
}

const getUserWalletAddress = async (mail) => {
    const user = await UserModel.findOne({mail: mail})
    if (user === null) {
        throw new Error("This user has not logged in")
    }

    const wallet = await WalletModel.findOne({user: user._id, selected: true})
    if (wallet === null) {
        throw new Error("This user does not have a wallet")
    }

    return wallet.address
}

const getUserWalletPvKey = async (mail) => {
    const user = await UserModel.findOne({mail: mail})
    if (user === null) {
        throw new Error("This user has not logged in")
    }

    const wallet = await WalletModel.findOne({user: user._id, selected: true})
    if (wallet === null) {
        throw new Error("This user does not have a wallet")
    }

    return decrypt(wallet.privateKey)
}

const updateUserWallet = async (mail) => {
    const user = await UserModel.findOne({mail: mail})
    if (user === null) {
        throw new Error("This user has not logged in")
    }

    await WalletModel.updateMany({user: user._id}, {selected: false})
    await createNewWallet(user._id)

    return await getUserWalletAddress(mail)
}

module.exports = { createNewWallet, getUserWalletAddress, updateUserWallet, getUserWalletPvKey }
