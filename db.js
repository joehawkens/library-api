// mongodb+srv://<username>:<password>@cluster0.pfose.mongodb.net/<dbname>?retryWrites=true&w=majority
// CONSTANTS / LIBRARIES ==============================================
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL);
const db =  mongoose.connection



// CONNECT TO DB ============================================

function connectDB(callback) {

    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database.'))
    callback();
}

function getDB() {

    return db;

}


function closeDB(){

    db.close();

}


module.exports = {
    connectDB,
    getDB,
    closeDB
};