const { Schema, model } = require('mongoose');

const workSchema = new Schema(
    {
        workId: { type: Number, required: true },
        participant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bounty: { type: Schema.Types.ObjectId, ref: 'Bounty', required: true },
        applyDate: { type: Date, default: Date.now, requried: true },
        submitDate: { type: Date },
        workRepo: { type: String },
        status: { type: Number }
    }
);

module.exports = model('Work', workSchema);
