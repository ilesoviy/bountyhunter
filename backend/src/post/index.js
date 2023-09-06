const PostModel = require("../models/post")
const UserModel = require("../models/user")
const { getAuthUser } = require("../user")
const { getFollowingPosts, getPopularPosts } = require('../follow')
const { getBookmarkedPosts } = require('../bookmark')

async function postNew(userId, url, thumbnail) {
    const oldPost = await PostModel.findOne({url: url})
    if (oldPost !== null) {
        await oldPost.populate('user')
        throw new Error(`${oldPost.user.fullName? oldPost.user.fullName: oldPost.user.mail} already posted the media`)
    }
    const newPost = new PostModel({
        user: userId,
        url: url,
        thumbnail: thumbnail
    })

    await newPost.save()
}

async function getRecentPosts() {
    const posts = await PostModel.find({}, {}, {sort: {createdAt: -1}, limit: 6, skip: 0}).populate('user')
    return posts
}

async function searchPosts(param) {
    param = (param || '').toLowerCase()
    const allPosts = await PostModel.find({}, {}, {sort: {createdAt: -1}, skip: 0}).populate('user')
    if (param === '') return allPosts
    else return allPosts.filter((p) => {
        return p.url.toLowerCase().includes(param)
                || p.user.mail.toLowerCase().includes(param)
                || (p.user.fullName || '').toLowerCase().includes(param)
                || (p.user.phoneNumber || '').toLowerCase().includes(param)
                || (p.user.category || '').toLowerCase().includes(param)
                || (p.user.description || '').toLowerCase().includes(param)
    })
}

async function getPosts(filter, param, user) {
    if (filter === 'my-posts') {
        return await PostModel.find({user: user._id}, {}, {sort: {createdAt: -1}, skip: 0}).populate('user')
    } else if (filter === 'all') {
        return await PostModel.find({}, {}, {sort: {createdAt: -1}, skip: 0}).populate('user')
    } else if (filter === 'following') {
        return await getFollowingPosts(user)
    } else if (filter === 'popular') {
        return await getPopularPosts()
    } else if (filter === 'bookmark') {
        return await getBookmarkedPosts(user)
    } else if (filter === 'search') {
        return await searchPosts(param)
    } else {
        throw new Error('Unknown filter')
    }
}

async function getSinglePost(id) {
    return await PostModel.findById(id).populate('user')
}

module.exports = { postNew, getRecentPosts, getPosts, getSinglePost }
