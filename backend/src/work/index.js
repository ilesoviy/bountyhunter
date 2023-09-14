const WorkModel = require('../models/work')

async function addWork(user, bounty, workId, applyDate, status) {
    await bounty.populate('creator')
    if (bounty.creator._id === user._id) {
        throw new Error(`Can't apply to self-created bounty`)
    }

    const fWork = await WorkModel.findOne({participant: user._id, bounty: bounty._id})
    if (fWork !== null) {
        throw new Error(`Already created work`)
    }

    const newWork = new WorkModel({
        workId: workId,
        participant: user._id,
        bounty: bounty._id,
        applyDate: applyDate,
        status: status
    })

    await newWork.save()
    return true
}

async function getWorks(bountyId) {
    const works = await WorkModel.find({bounty: bountyId}).populate('participant')
    return works
}

async function submitWork(workId, workRepo, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = newStatus;
    work.workRepo = workRepo;
    work.save()
}

async function countSubmissions(user, bountyId, findStatus) {
    return await WorkModel.countDocuments({user: user._id, bountyId: bountyId, status: findStatus})
}

async function approveWork(workId, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = newStatus;
    work.save()
}

async function rejectWork(workId, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = newStatus;
    work.save()
}


module.exports = { addWork, getWorks, submitWork, countSubmissions, approveWork, rejectWork }
