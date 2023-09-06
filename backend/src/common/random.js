const numbers = "0123456789"
const alphaBets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const specialLetters = "_!@#$%^&*()_+=-`~"

const randomBytes = (count, template) => {
    let ret = ""

    for (let i = 0; i < count; ++i) {
        const idx = Math.floor(template.length * Math.random());
        ret = ret + template.substring(idx, idx + 1)
    }
    return ret
};

const createRandomPassword = () => {
    return randomBytes(Math.floor(Math.random() * 20) + 12, numbers + alphaBets + specialLetters)
}

module.exports = {createRandomPassword}
