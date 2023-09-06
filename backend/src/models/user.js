const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: { type: String },
        wallet: { type: String, required: true },
        picture: { type: String },
        profileLink: { type: String }
    },
);

module.exports = model('User', userSchema);
