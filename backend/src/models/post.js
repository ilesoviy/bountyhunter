const { Schema, model } = require('mongoose');

const postSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        url: { type: String, required: true },
        thumbnail: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = model('Post', postSchema);
