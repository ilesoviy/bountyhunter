const { Router } = require('express');
const { getUserWalletAddress } = require('../wallet');

const router = Router();

router.get('/wallet', async (request, response) => {
    const query = request.query
    let ret = {
        status: 'failed',
        error: 'unknown'
    }

    try {
        if (query.type === 'info') {
           address = await getUserWalletAddress(query.mail)
           ret.status = 'success'
           ret.value = address
        }
    } catch (err) {
        ret.error = err.message
    }
    
    response.send(ret)
});

module.exports = router;
