const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DBURL, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = mongoose;