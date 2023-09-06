const UserModel = require("../models/user");

async function createNewUserPending(mail, loginType, token) {
    if (0 < await UserModel.countDocuments({mail: mail})) {
        // throw new Error(`${mail} already in use, Please use another mail address`)
        await UserModel.updateMany({mail: mail}, { state: 'pending', token: token})
    } else {
        const newUser = new UserModel({
            mail: mail,
            type: loginType,
            state: 'pending',
            token: token
        })
    
        await newUser.save()
    }
}

async function confirmNewUser(token) {
    const user = await UserModel.findOne({token: token, state: 'pending'})
    if (user === null) {
        throw new Error('Incorrect token')
    }

    user.state = 'inuse'
    await user.save()

    await createNewWallet(user._id)

    return user;
}

async function getAuthUser(token) {
    return await UserModel.findOne({token: token, state: 'inuse'})
}

async function updateUser(mail, updateInfo) {
    const user = await UserModel.findOne({mail: mail, state: 'inuse'})
    if (user === null) {
        throw new Error('Invalid token')
    }

    for (const c in updateInfo) {
        user[c] = updateInfo[c]
    }

    await user.save()
}

async function getAllUsers() {
    return await UserModel.find()
}

async function getUserByMail(mail) {
    return await UserModel.findOne({mail: mail, state: 'inuse'})
}

module.exports = { createNewUserPending, confirmNewUser, getAuthUser, updateUser, getAllUsers, getUserByMail }
