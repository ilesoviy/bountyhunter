const { Router } = require('express');
const { getUser, setUser } = require('../user');
const { addBounty, getRecentBounties, getBounties, getSingleBounty, cancelBounty, closeBounty } = require('../bounty');
const { addWork, getWorks, getWork, submitWork, countSubmissions, approveWork, rejectWork } = require('../work');

const router = Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.wallet + '.bin')
    }
});

var upload = multer({ storage: storage });

router.post('/get_user', async (request, response) => {
    const query = request.body;
    
    const creator = await getUser(query.wallet); // wallet is the main identifier
    if (creator === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` });
        return;
    }

    response.send({ status: 'success', 
        details: `${creator.name ? creator.name: creator.wallet}: successfully got info`, 
        user: creator });
});

router.post('/set_user', async (request, response) => {
    const query = request.body;

    try {
        const res = await setUser(query.wallet, 
            query.name, 
            query.github, 
            query.discord, 
            query.image);
        response.send({ status: 'success', details: `${query.name ? query.name: query.wallet} : successfully set info` });
    } catch (err) {
        response.send({ status: 'failed', error: err.message });
    }
});


router.post('/add_bounty', async (request, response) => {
    const query = request.body;
    
    const creator = await getUser(query.wallet);
    if (creator === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` });
        return;
    }

    try {
        await addBounty(creator._id, 
            query.bountyId, query.title, query.payAmount, 
            Date.now(), Date.now() + query.duration * 1000, 
            query.type, query.difficulty, query.topic, 
            query.description, query.gitHub, 
            query.block, query.status);
        response.send({ status: 'success', details: `${creator.name ? creator.name: creator.wallet}: successfully created bounty` });
    } catch (err) {
        response.send({ status: 'failed', error: err.message });
    }
});

router.post('/get_recent_bounties', async (request, response) => {
    try {
        const bounties = await getRecentBounties()
        response.send({ status: 'success', details: `${bounties?.length} recent bounties`, bounties: bounties })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/get_bounties', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `Invalid wallet` })
        return
    }

    try {
        const bounties = await getBounties(query.filter, query.param, user)
        response.send({ status: 'success', details: `${bounties?.length} recent bounties`, bounties: bounties })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/get_single_bounty', async (request, response) => {
    try {
        const bounty = await getSingleBounty(request.body.bountyId)
        if (bounty === null) throw new Error('Not found')
        response.send({ status: 'success', details: `Found`, bounty: bounty })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/cancel_bounty', async (request, response) => {
    const creator = await getUser(query.wallet);
    if (creator === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` });
        return;
    }

    try {
        const cancelled = await cancelBounty(request.body.bountyId)
        response.send({ status: 'success', details: `${creator.name ? creator.name : creator.wallet} successfully cancelled ${query.bountyId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/close_bounty', async (request, response) => {
    const creator = await getUser(query.wallet);
    if (creator === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` });
        return;
    }

    try {
        const closed = await closeBounty(request.body.bountyId)
        response.send({ status: 'success', details: `${creator.name ? creator.name : creator.wallet} successfully closed ${query.bountyId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});


router.post('/add_work', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    const bounty = await getSingleBounty(query.bountyId);
    if (bounty === null) {
        response.send({ status: 'failed', error: `Invalid bounty id` })
        return
    }

    try {
        const added = await addWork(user, bounty, query.workId, query.applyDate, query.status)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${added === true ? 'added': 'not added'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/get_works', async (request, response) => {
    const bounty = await getSingleBounty(request.body.bountyId);
    if (bounty === null) {
        response.send({ status: 'failed', error: `Invalid bounty id` })
        return
    }

    try {
        const works = await getWorks(bounty._id)
        response.send({ status: 'success', details: `${works?.length} works`, works: works })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/get_work', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    const bounty = await getSingleBounty(query.bountyId);
    if (bounty === null) {
        response.send({ status: 'failed', error: `Invalid bounty id` })
        return
    }

    try {
        const work = await getWork(user, bounty)
        if (work === null) throw new Error('Not found')
        response.send({ status: 'success', details: `Found`, work: work })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/submit_work', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const submitted = await submitWork(query.workId, query.title, query.description, query.workRepo, query.submitDate, query.status)
        response.send({ status: 'success', details: `${user.name ? user.name: user.wallet} ${submitted === true? 'submitted': 'not submitted'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/count_submissions', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    const bounty = await getSingleBounty(query.bountyId)
    if (bounty === null) {
        response.send({ status: 'failed', error: `Failed to get bounty` })
        return
    }

    try {
        const count = await countSubmissions(bounty._id, query.status)
        response.send({ status: 'success', count: count })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

router.post('/approve_work', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        const submitted = await approveWork(query.workId)
        response.send({ status: 'success', details: `${user.name ? user.name : user.wallet} ${submitted === true? 'approved': 'not approved'} ${query.workId}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/reject_work', async (request, response) => {
    const query = request.body

    const user = await getUser(query.wallet)
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
