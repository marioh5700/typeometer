var bcrypt = require('bcryptjs');

module.exports.getHashedPass = function getHashedPass(password) {
    if (password) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        
        return hash;
    }
};

module.exports.compareHash = function compareHash(passwordAttempt, hash){
    let response = bcrypt.compareSync(passwordAttempt, hash);
    
    return response;
};