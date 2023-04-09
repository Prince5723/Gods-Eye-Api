const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Harshit:Welcome%40555@cluster0.otorj79.mongodb.net/test';

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    if(connectToMongo){
        console.log("Connected to db successfully");
    }
}

module.exports = connectToMongo;