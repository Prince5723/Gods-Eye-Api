const mongoose = require('mongoose');
require('dotenv/config');
const connectToMongo = ()=>{
    mongoose.connect(process.env.mongo_Uri);
    if(connectToMongo){
        console.log("Connected to db successfully");
    }
}

module.exports = connectToMongo;