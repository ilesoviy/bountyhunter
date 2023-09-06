const FollowModel = require('../models/follow')
const PostModel = require('../models/post')

async function followPost(user, postId) {
    const post = await PostModel.findById(postId)
    if (post === null) {
        throw new Error('Invalid Post')
    }

    await post.populate('user')
    if (post.user.mail === user.mail) {
        throw new Error('Can not follow self-posted one')
    }

    const fItem = await FollowModel.findOne({user: user._id, post: postId})
    if (fItem === null) {
        const newItem = new FollowModel({
            user: user._id,
            post: postId,
            follow: true
        })

        await newItem.save()
        return true
    } else {
        fItem.follow = fItem.follow === true? false: true
        await fItem.save()
        return fItem.follow
    }
}

async function getFollowPost(user, postId) {
    const fItem = await FollowModel.findOne({user: user._id, post: postId})
    return fItem === null? false: fItem.follow
}

async function getFollowCount(user, postId) {
    return await FollowModel.countDocuments({user: user._id, post: postId, follow: true})
}

async function getFollowingPosts(user) {
    const follows = await FollowModel.find({user: user._id, follow: true}).populate('user').populate('post')
    const posts = follows.map(f => f.post)
    return posts
}

async function getPopularPosts() {
    const posts = await PostModel.find({}, {}, {sort: {createdAt: -1}, skip: 0}).populate('user')
    let ret = []

    for (const p of posts) {
        ret = [...ret, {
            ...p._doc,
            follow: await FollowModel.countDocuments({post: p._id, follow: true})
        }]
    }

    return ret.sort((a, b) => b.follow - a.follow)
}

module.exports = { followPost, getFollowPost, getFollowingPosts, getPopularPosts, getFollowCount }