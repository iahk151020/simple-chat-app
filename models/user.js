const mongoose = require('../bin/dbconnection');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model('User', userSchema);

const addUser = (user) => {
   return new Promise((resolve, reject) => {
       User.create(user, (err, user) => {
           if (err){
               reject(err);
               return;
           }
           console.log("user:" + user);
           resolve(user);
       });
   });
}

const checkUser = (user) => {
    
    return new Promise((resolve, reject) => {
        User.findOne(user, (err, user) => {
            if (err) {
                reject(err);
                return;
            }
            if (user === null){
                reject(`user does not exist`);
                return;
            }
            resolve(user);
        });
    });
}

module.exports = {
    checkUser,
    addUser
}