const { Router } = require('express');
const { postNew, getRecentPosts, getPosts, getSinglePost } = require('../post');
const { getAuthUser, getUserByMail } = require('../user');
const { followPost, getFollowPost, getFollowCount } = require('../follow');
const { addComment, getComments, getCommentCount } = require('../comment')
const { toggleBookmark, getBookmarks, isBookmarked } = require('../bookmark')
const { sendEmail } = require('../mail');
const { payETHToUser } = require('../web3');
const router = Router();

router.post('/new', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await postNew(user._id, query.url, query.thumbnail)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail}: successfully posted` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/get-recent-posts', async (request, response) => {
    try {
        const user = await getAuthUser(request.query.token)
        if (null === user) {
            response.send({ status: 'failed', error: `Invalid token` })
        } else {
            const posts = await getRecentPosts()
            response.send({ status: 'success', details: `${posts.length} recent posts`, posts: posts })
        }
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.get('/get-posts', async (request, response) => {
    try {
        const user = await getAuthUser(request.query.token)
        if (null === user) {
            response.send({ status: 'failed', error: `Invalid token` })
        } else {
            const posts = await getPosts(request.query.filter, request.query.param, user)
            response.send({ status: 'success', details: `${posts.length} posts`, posts: posts })
        }
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.get('/get-single-post', async (request, response) => {
    try {
        const user = await getAuthUser(request.query.token)
        if (null === user) {
            response.send({ status: 'failed', error: `Invalid token` })
        } else {
            const post = await getSinglePost(request.query.id)
            if (post === null) throw new Error('Not found')
            response.send({ status: 'success', details: `Found`, post: post })
        }
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.put('/follow', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const followed = await followPost(user, query.id)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} ${followed === true? 'followed': 'not followed'} ${query.id}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/follow', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const followed = await getFollowPost(user, query.id)
        response.send({ status: 'success', value: followed })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.put('/comment', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await addComment(user, query.id, query.content)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} added comment to post:${query.id}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/comment', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const comments = await getComments(query.id)
        response.send({ status: 'success', comments: comments })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/share', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await sendEmail(query.mail, "Share Post", `https://blockhub.media/post/${query.id}`)
        const toUser = await getUserByMail(query.mail)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} successfully shared ${query.id} to ${toUser.fullName? toUser.fullName: toUser.mail}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/tip', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const post = await getSinglePost(query.id)
        await payETHToUser(user, post.user, query.amount)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} tipped <${query.amount}> to ${post.user.fullName? post.user.fullName: post.user.mail}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.put('/bookmark', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await toggleBookmark(user, query.id)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} toggled bookmark for post:${query.id}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/bookmark', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const bookmarks = await getBookmarks(user)
        response.send({ status: 'success', bookmarks: bookmarks })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/bookmarked', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const value = await isBookmarked(user, query.id)
        response.send({ status: 'success', value: value })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/follow-count', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const count = await getFollowCount(user, query.id)
        response.send({ status: 'success', count: count })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.get('/comment-count', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const count = await getCommentCount(user, query.id)
        response.send({ status: 'success', count: count })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

module.exports = router;
