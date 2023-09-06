const UserModel = require("../models/user");

async function getAuthUser(wallet) {
    return await UserModel.findOne({wallet: wallet})
}

async function updateUser(wallet, updateInfo) {
    const user = await UserModel.findOne({wallet: wallet})
    if (user === null) {
        throw new Error('Invalid wallet')
    }

    for (const c in updateInfo) {
        user[c] = updateInfo[c]
    }

    await user.save()
}

module.exports = { getAuthUser, updateUser }
