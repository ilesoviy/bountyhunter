const { Schema, model } = requrie('mongoose');

const logSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, default: Date.now },
        action: { type: String }
        // ilesoviy - may add extra fields
    }
);

module.exports = model('Log', logSchema);
