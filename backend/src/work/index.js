const BountyModel = require('../models/bounty')
const WorkModel = require('../models/work')

const STATUS_APPLIED = 1
const STATUS_SUBMITTED = 2
const STATUS_APPROVED = 3
const STATUS_REJECTED = 4


async function addWork(user, bountyId, workId) {
    const bounty = await BountyModel.findById(bountyId)
    if (bounty === null) {
        throw new Error('Invalid Bounty')
    }

    await bounty.populate('bountyId')
    if (bounty.bountyId.creator === user._id) {
        throw new Error(`Can't apply to self-created bounty`)
    }

    const fWork = await WorkModel.findOne({}, {participant: user._id, bountyId: bountyId})
    if (fWork !== null) {
        throw new Error(`Already created work`)
    }

    const newWork = new WorkModel({
        workId: workId,
        participant: user._id,
        bountyId: bountyId,
        applyDate: Date.now(),
        status: STATUS_APPLIED
    })

    await newWork.save()
    return true
}

async function getWorks(bountyId) {
    const works = await WorkModel.find({bountyId: bountyId}).populate('participant')
    return works
}

async function submitWork(workId, workRepo) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = STATUS_SUBMITTED;
    work.workRepo = workRepo;
    work.save()
}

async function countSubmissions(user, bountyId) {
    return await WorkModel.countDocuments({user: user._id, bountyId: bountyId, status: STATUS_SUBMITTED})
}

async function approveWork(workId) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = STATUS_APPROVED;
    work.save()
}

async function rejectWork(workId) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = STATUS_REJECTED;
    work.save()
}


module.exports = { addWork, getWorks, submitWork, countSubmissions, approveWork, rejectWork }
