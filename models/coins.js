
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    create_at: {
        type: Date, default: Date.now,
        required: true
    },
    delete: {
        type: Boolean, default: false,
        required: false
    },
    delete_at: {
        type: Date,
        required: false
    },
});

const Coin = mongoose.model('Coin', CoinSchema);
module.exports = Coin;

// Get all coins
module.exports.getAllCoins = (callback) => {
    Coin.find({}, callback);
};

// Get Coin by id
module.exports.getCoinById = function(id, callback){
    Coin.findById(id, callback);
};

// Get Coin by symbol
module.exports.getCoinBySymbol = function(symbol, callback){
    const query = {symbol: symbol};
    Coin.findOne(query, callback);
};

// Set deleted Coin
module.exports.updateCoin = (id, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {delete: true, delete_at: Date.now} };
    Coin.updateOne(query, newvalues, callback);
};