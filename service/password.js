const crypto = require('crypto');

exports.hashPassword =(password) => {

    return new Promise((resolve, reject) => {
        
        const salt = crypto.randomBytes(16).toString("hex")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {

            if (err) reject(err);

            resolve(salt + ":" + derivedKey.toString('hex'))

        });
    })
}

exports.verifyPassword =(password, hash) => {

    return new Promise((resolve, reject) => {

        const [salt, key] = hash.split(":")

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {

            if (err) reject(err);

            resolve(key == derivedKey.toString('hex'))
            
        });
    })
}


function stretchString(s, salt, outputLength){
  return crypto.pbkdf2Sync(s, salt, 100000, outputLength, 'sha512');
}

function keyFromPassword(secret){
  
  const keyPlusHashingSalt = stretchString(secret, 'salt', 24 + 48);
  return {
    cipherKey: keyPlusHashingSalt.slice(0,24), 
    hashingSalt: keyPlusHashingSalt.slice(24)
  };
}

exports.encrypt=(key, sourceData)=>{
  const iv = Buffer.alloc(16, 0); // Initialization vector
  const cipher = crypto.createCipheriv('aes-192-cbc', key.cipherKey, iv);
  let encrypted = cipher.update(sourceData, 'binary', 'binary');
  encrypted += cipher.final('binary');
  return encrypted;
}

exports.decrypt=(key, encryptedData)=>{
  const iv = Buffer.alloc(16, 0); // Initialization vector
  const decipher = crypto.createDecipheriv('aes-192-cbc', key.cipherKey, iv);
  let decrypted = decipher.update(encryptedData, 'binary', 'binary');
  decrypted += decipher.final('binary');
  return decrypted;
}

const key = keyFromPassword('screts of crm');
// const encryptedTest = encrypt(key, '1');
// // prints 'This is a test', after encrypting it and decrypting it again
// console.log( encryptedTest, decrypt(key,  encryptedTest) ); 
