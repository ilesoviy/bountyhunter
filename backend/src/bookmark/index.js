const BookmarkModel = require('../models/bookmark')

async function toggleBookmark(user, postId) {
    if (0 === await BookmarkModel.countDocuments({
        user: user._id,
        post: postId,
    })) {
        const newBookmark = new BookmarkModel({
            user: user._id,
            post: postId,
        })

        await newBookmark.save()
    } else {
        await BookmarkModel.deleteMany({
            user: user._id,
            post: postId,
        })
    }
}

async function getBookmarks(user) {
    return await BookmarkModel.find({user: user._id}).populate('user').populate('post')
}

async function isBookmarked(user, id) {
    return 0 < await BookmarkModel.countDocuments({user: user._id, post: id})
}

async function getBookmarkedPosts(user) {
    const bookmarked = await BookmarkModel.find({user: user._id}).populate('post')
    const posts = await Promise.all(bookmarked.map(f => f.post.populate('user')))
    return posts
}

module.exports = { toggleBookmark, getBookmarks, isBookmarked, getBookmarkedPosts }