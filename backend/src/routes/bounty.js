const { Router } = require('express');
const { getAuthUser } = require('../user');
const { addBounty, getRecentBounties, getBounties, getSingleBounty } = require('../bounty');
const { addWork, getWorks, submitWork, countSubmissions, approveWork, rejectWork } = require('../work');

const router = Router();


router.post('/add_bounty', async (request, response) => {
    const query = request.body
    
    const creator = await getAuthUser(query.wallet) // wallet is the main identifier
    if (creator === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await addBounty(creator._id, 
            query.bountyId, query.title, query.payAmount, query.description, 
            Date.now(), Date.now() + query.duration, 
            query.type, query.topic, query.difficulty, 
            query.block, query.status)
        response.send({ status: 'success', details: `${creator.name ? creator.name: creator.wallet}: successfully created` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/get_recent_bounties', async (request, response) => {
    const user = await getAuthUser(request.body.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `Invalid wallet` })
        return
    }

    try {
        const bounties = await getRecentBounties()
        response.send({ status: 'success', details: `${bounties.length} recent bounties`, bounties: bounties })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/get_bounties', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `Invalid wallet` })
        return
    }

    try {
        const bounties = await getBounties(query.filter, query.param, user)
        response.send({ status: 'success', details: `${bounties.length} bounties`, bounties: bounties })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/get_single_bounty', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `Invalid wallet` })
        return
    }

    try {
        const bounty = await getSingleBounty(query._id)
        if (bounty === null) throw new Error('Not found')
        response.send({ status: 'success', details: `Found`, bounty: bounty })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})


router.post('/add_work', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const added = await addWork(user, query.bountyId, query.workId)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${added === true ? 'added': 'not added'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/get_works', async (request, response) => {
    try {
        const works = await getWorks(request.body.bountyId)
        response.send({ status: 'success', details: `${works.length} works`, works: works })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/submit_work', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const submitted = await submitWork(query.workId, query.workRepo)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${submitted === true? 'submitted': 'not submitted'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.get('/count_submissions', async (request, response) => {
    const query = request.query
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const count = await countSubmissions(user, query.id)
        response.send({ status: 'success', count: count })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/approve_work', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const submitted = await approveWork(query.workId)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${submitted === true? 'approved': 'not approved'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/reject_work', async (request, response) => {
    const query = request.body

    const user = await getAuthUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const submitted = await rejectWork(query.workId)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${submitted === true? 'rejected': 'not rejected'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

module.exports = router;
