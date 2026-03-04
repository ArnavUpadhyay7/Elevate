const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_connect
    ).then(()=>{
        console.log("Connected to db");
    })
    .catch(err => console.log(err));
}

module.exports = connectToDb;