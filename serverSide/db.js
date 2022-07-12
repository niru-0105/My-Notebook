const mongoose = require('mongoose');


const connectToMongoose=()=>{
    mongoose.connect('mongodb://localhost:27017/inotebook').then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

}

module.exports = connectToMongoose

