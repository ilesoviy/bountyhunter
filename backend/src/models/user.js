const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        mail: { type: String, unique: true },
        type: { type: String },
        state: { type: String }, // 'notusing', 'pending', 'inuse'
        token: { type: String },
        fullName: { type: String },
        phoneNumber: { type: String },
        category: { type: String },
        description: { type: String },
        avatar: { type: String }
    },
    { timestamps: true }
);

module.exports = model('User', userSchema);
