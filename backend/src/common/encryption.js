const { AES, enc } = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();
if (process.env.NODE_ENV == ('development' || 'development ')) {
    dotenv.config({ path: path.join(__dirname, '..', '.env.development') });
} else if (process.env.NODE_ENV == ('production' || 'production ')) {
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
} else if (process.env.NODE_ENV == ('staging' || 'staging ')) {
    dotenv.config({ path: path.join(__dirname, '..', '.env.staging') });
}

function encrypt(text) {
    const key = process.env.ENCRYPT_KEY;
    const encrypted = AES.encrypt(text, key).toString();
    return encrypted;
}

// Decryption function
function decrypt(encryptedText) {
    const key = process.env.ENCRYPT_KEY;
    const decrypted = AES.decrypt(encryptedText, key).toString(enc.Utf8);
    return decrypted;
}

module.exports = {encrypt, decrypt}