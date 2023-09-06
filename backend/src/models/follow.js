const { Schema, model } = require('mongoose');

const followSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        follow: { type: Boolean, required: true }
    },
    { timestamps: true }
);

module.exports = model('Follow', followSchema);
