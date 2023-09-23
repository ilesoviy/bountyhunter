const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        wallet: { type: String, unique: true },
        name: { type: String },
        github: { type: String },
        discord: { type: String },
        img: {
            data: Buffer,
            contentType: String
        }
    },
);

module.exports = model('User', userSchema);
