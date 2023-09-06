const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = model('Comment', commentSchema);
