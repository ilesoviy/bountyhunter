const { Schema, model } = require('mongoose');

const bookmarkSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        post: { type: Schema.Types.ObjectId, ref: 'Post' },
    },
    { timestamps: true }
);

module.exports = model('Bookmark', bookmarkSchema);
