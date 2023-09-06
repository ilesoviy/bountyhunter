const CommentModel = require('../models/comment')

async function addComment(user, postId, content) {
    const newComment = new CommentModel({
        user: user._id,
        post: postId,
        content: content
    })

    await newComment.save()
}

async function getComments(postId) {
    return await CommentModel.find({post: postId}).populate('user').populate('post')
}

async function getCommentCount(user, postId) {
    return await CommentModel.countDocuments({user: user._id, post: postId})
}

module.exports = { addComment, getComments, getCommentCount }