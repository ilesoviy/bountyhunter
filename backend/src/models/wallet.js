const { Schema, model } = require('mongoose');

const walletSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        address: { type: String, required: true },
        privateKey: { type: String, required: true },
        selected: { type: Boolean },
    },
    { timestamps: true }
);

module.exports = model('Wallet', walletSchema);
