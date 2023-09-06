const { Router } = require('express');
const { sendEmail } = require('../mail');
const { createRandomPassword } = require('../common/random');
const { createNewUserPending, confirmNewUser, getAuthUser, updateUser, getAllUsers } = require('../user');
const axios = require('axios');
const { getUserWalletAddress } = require('../wallet');
const { getUserETHBalance, transferTo } = require('../web3');
const router = Router();

router.post('/new-otp', async (request, response) => {
    try {
        const query = request.body

        const newPassword = createRandomPassword()
        await sendEmail(query.mail, 'New OTP', newPassword)

        await createNewUserPending(query.mail, 'otp', newPassword)
        response.send({
            status: 'success',
            details: `New OTP has been sent to ${query.mail}`
        })
    } catch (err) {
        response.send({
            status: 'failed',
            error: err.message,
        })
    }
});

router.post('/confirm-otp', async (request, response) => {
    try {
        const query = request.body

        const user = await confirmNewUser(query.password)
        response.send({
            status: 'success',
            details: `${user.mail} has been granted`
        })
    } catch (err) {
        response.send({
            status: 'failed',
            error: err.message,
        })
    }
});

router.get('/get-user', async (request, response) => {
    try {
        const user = await getAuthUser(request.query.token)
        if (null === user) {
            response.send({ status: 'failed', error: `Invalid token` })
        } else {
            const wallet = await getUserWalletAddress(user.mail)
            const balance = await getUserETHBalance(user)
            response.send({ status: 'success', details: `This token is authorized by ${user.mail}`, user: {...user._doc, wallet, balance} })
        }
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/login-google', async (request, response) => {
    try {
        const query = request.body

        const token = query.token;
        const authRes = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (authRes.status === 200) {
            const payload = authRes.data;
            await createNewUserPending(payload.email, "google", token)
            await confirmNewUser(token)
            await updateUser(payload.email, {
                fullName: payload.name
            })
            response.send({ status: 'success', details: `This token is authorized by ${payload.email}`, personal_info: payload })
        } else {
            response.send({ status: 'failed', error: `Invalid token` })
        }
    } catch (err) {
        response.send({
            status: 'failed',
            error: err.message,
        })
    }
});

router.put('/update', async (request, response) => {
    try {
        const query = request.body

        const mail = query.mail;
        await updateUser(mail, query)
        response.send({
            status: 'success',
            details: `Successfully updated profile of ${mail}`,
        })
    } catch (err) {
        response.send({
            status: 'failed',
            error: err.message,
        })
    }
});

router.get('/allusers', async (request, response) => {
    try {
        const user = await getAuthUser(request.query.token)
        if (null === user) {
            response.send({ status: 'failed', error: `Invalid token` })
        } else {
            const users = await getAllUsers()
            response.send({ status: 'success', users: users})
        }
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
})

router.post('/withdraw', async (request, response) => {
    const query = request.body
    const user = await getAuthUser(query.token)
    if (user === null) {
        response.send({ status: 'failed', error: `You did not login or invalid user` })
        return
    }

    try {
        await transferTo(user, query.to, query.amount)
        response.send({ status: 'success', details: `${user.fullName? user.fullName: user.mail} withdrew <${query.amount}> to ${query.to}` })
    } catch (err) {
        response.send({ status: 'failed', error: err.message })
    }
});

module.exports = router;
