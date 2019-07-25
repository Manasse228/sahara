
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
    dead_at: {
        type: Date,
        required: false
    },
    coinDead : {
        type: Boolean, default: false,
        required: false
    }
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

// Update dead Coin
module.exports.setDeadCoin = (id, val, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {coinDead: val, dead_at: Date.now} };
    Coin.updateOne(query, newvalues, callback);
};