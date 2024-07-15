const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://trigonx1212:12345@cluster0.lrwyy8v.mongodb.net/myUser');
// const db = mongoose.connection;
// db.on('connected',(err)=>{
//     if(!err){
//         console.log('database connected..');
//     }
// })
require('dotenv').config()
const secretKey = process.env.SECRET_KEY;

const db = async()=>{
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('database connected!!');
}


module.exports = { db };