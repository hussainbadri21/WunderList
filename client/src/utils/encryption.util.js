const CryptoJS = require('crypto-js');
const passMatch = 'HMCHUSSAIN';
const keySize = 256;
const iterations = 100;

const encrypt = (msg) => {
    let salt = CryptoJS.lib.WordArray.random(128/8);
    let key = CryptoJS.PBKDF2(passMatch, salt, {
        keySize: keySize/32,
        iterations: iterations
    });
    let iv = CryptoJS.lib.WordArray.random(128/8);
    let encrypted = CryptoJS.AES.encrypt(msg, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC 
    });
    let encryptContent = salt.toString()+ iv.toString() + encrypted.toString();
    return encryptContent;
}

const decrypt = (encryptContent) => {
    let salt = CryptoJS.enc.Hex.parse(encryptContent.substr(0, 32));
    let iv = CryptoJS.enc.Hex.parse(encryptContent.substr(32, 32))
    let encrypted = encryptContent.substring(64);
    
    let key = CryptoJS.PBKDF2(passMatch, salt, {
        keySize: keySize/32,
        iterations: iterations
        });

    let decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
        iv: iv, 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };