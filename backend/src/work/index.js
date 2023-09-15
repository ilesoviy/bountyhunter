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

async function getWorks(bountyId, status) {
    const works = await WorkModel.find({bounty: bountyId, status: status}).populate('participant')
    return works
}

async function getWork(user, bounty) {
    const works = await WorkModel.findOne({participant: user._id, bounty: bounty._id})
    return works
}

async function submitWork(workId, title, description, workRepo, submitDate, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }
    
    work.title = title;
    work.description = description;
    work.workRepo = workRepo;
    work.submitDate = submitDate;
    work.status = newStatus;
    work.save()
    return true
}

async function countSubmissions(bounty, countStatus) {
    return await WorkModel.countDocuments({bounty: bounty, status: countStatus})
}

async function approveWork(workId, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = newStatus;
    work.save()
    return true
}

async function rejectWork(workId, newStatus) {
    const work = await WorkModel.findOne({workId: workId})
    if (work === null) {
        throw new Error('Invalid Work')
    }

    work.status = newStatus;
    work.save()
    return true
}


module.exports = { addWork, getWorks, getWork, submitWork, countSubmissions, approveWork, rejectWork }
