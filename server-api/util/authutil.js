const bcrypt = require("bcrypt");


var util = {
    createPassword: (password) => {
        var cp = new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject({
                        error: "password hashing failed! detailed error as follows - " + err
                    });
                } else {
                    resolve({
                        message: "password creation was successful",
                        hash:hash
                    });

                }
            })

        })
        return cp;
    }
}
module.exports = util;