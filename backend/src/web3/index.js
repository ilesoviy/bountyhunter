const { getUserWalletPvKey, getUserWalletAddress } = require("../wallet")
const { getBN, newWeb3, executeContract } = require('./web3')

async function getUserETHBalance(user) {
    const pvkey = await getUserWalletPvKey(user.mail)
    const address = await getUserWalletAddress(user.mail)

    const web3Context = await newWeb3('ethereum', pvkey)
    const BN = getBN()
    const bal = await web3Context.web3.eth.getBalance(address)
    return BN(bal.toString()).div(BN(`1e18`)).toString()
}

async function transferTo(user, toAddress, amount) {
    const pvkey = await getUserWalletPvKey(user.mail)
    const BN = getBN()

    const web3Context = await newWeb3('ethereum', pvkey)

    if (!web3Context.web3.utils.isAddress(toAddress)) {
        throw new Error('Invalid destination address')
    }

    if (BN(amount).toString() === 'NaN') {
        throw new Error("Invalid amount");
    }

    if (web3Context.address.toLowerCase() === toAddress.toLowerCase()) {
        throw new Error('Paying self');
    }

    const bal = BN(amount).times(BN(`1e18`)).integerValue().toString()
    const tx = await executeContract(web3Context, toAddress, undefined, bal)
    console.log('transaction hash', tx.transactionHash)
    return tx.transactionHash
}

async function payETHToUser(user, to, amount) {
    const toAddress = await getUserWalletAddress(to.mail)

    return await transferTo(user, toAddress, amount);
}

module.exports = { getUserETHBalance, payETHToUser, transferTo }