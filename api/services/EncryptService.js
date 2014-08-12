var crypto = require('crypto')

exports.encrypt = function( str, encode ){
    var encode = encode || 'binary',
        hasher = crypto.createHash("md5")
        
        hasher.update(str);
    return hasher.digest(encode);
}