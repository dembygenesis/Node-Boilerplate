const bcrypt = require('bcrypt-nodejs');
const jwt    = require('jwt-simple');

const utils = {
    getHashed: async function(string) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return reject (err);
                }

                bcrypt.hash(string, salt, null, (err, hash) => {
                    if (err) {
                        return reject (err);
                    }
                    resolve(hash);
                });
            });
        });
    },
    compareHashed: async function(string, hashedString) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(string, hashedString, (error, isMatch) => {
                if (error)
                    return reject("Something went wrong when trying to match the hashed string");
                if (!isMatch)
                    return resolve(false);
                if (isMatch)
                    return resolve(true);
            });
        });
    },
    getJWT: function(string, secret) {
        const timestamp = new Date().getTime();

        // keys "sub" and "iat" are jwt key conventions required.
        return jwt.encode({sub: string, iat: timestamp}, secret);
    },
};

module.exports = utils;
