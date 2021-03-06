var crypto = require('crypto');

function checksum (str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'sha256')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
}
{

    const a = checksum('hello','sha256');         // e53815e8c095e270c6560be1bb76a65d
    console.log(a)
    const b = checksum(a, 'sha256'); // cd5855be428295a3cc1793d6e80ce47562d23def
    console.log(b)
}

const a = checksum('hello','sha256');         // e53815e8c095e270c6560be1bb76a65d
console.log(a)
const b = checksum(a, 'rmd160'); // cd5855be428295a3cc1793d6e80ce47562d23def
console.log(b)

