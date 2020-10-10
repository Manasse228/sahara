

const mongoose = require('mongoose');

//Set up default mongoose connection
//const mongoDB = 'mongodb+srv://Fabrice:lqfuokPOycyg9zSQ@abloni-mc3d6.mongodb.net/Shara?//retryWrites=true&w=majority';

const mongoDB = "mongodb+srv://manasse:Serge1992@cluster0-lg7dq.mongodb.net/sahara?retryWrites=true&w=majority";

mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

module.exports = db;


