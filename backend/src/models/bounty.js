const { Schema, model } = require('mongoose');

const bountySchema = new Schema(
    {
        bountyId: { type: Number, required: true },
        creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        payAmount: { type: Number, required: true },
        description: { type: String },
        createDate: { type: Date, default: Date.now, requried: true },
        endDate: { type: Date },
        type: { type: String /* Number */ },
        topic: { type: String /* Number */ },
        level: { type: String /* Number */ },
        block: { type: Number },
        gitRepo: { type: String },
        status: { type: Number }
    }
);

module.exports = model('Bounty', bountySchema);
