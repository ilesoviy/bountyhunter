const UserModel = require("../models/user");

async function setUser(wallet, name, github, discord, img) {
    if (0 < await UserModel.countDocuments({wallet: wallet})) {
        // throw new Error(`${wallet} already in use, Please use another wallet address`);
        await UserModel.updateOne({wallet: wallet}, { name: name, github: github, discord: discord, img: img });
    } else {
        const newUser = new UserModel({
            wallet: wallet,
            name: name,
            github: github,
            discord: discord,
            img: img
        });
    
        await newUser.save();
    }

    return true;
}

async function getUser(wallet) {
    return await UserModel.findOne({wallet: wallet})/* .map(b => {b.name, b.github, b.discord}) */;
}

module.exports = { setUser, getUser }
