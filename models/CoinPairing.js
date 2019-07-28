

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinPairingSchema = new mongoose.Schema({
    _id:{
        type: String, ref: 'Coin'
    },
    exchange: [{
    }],
    nbPairs: {
        type: Number,
        required: true
    },
});

const CoinPairing = mongoose.model('CoinPairing', CoinPairingSchema);
module.exports = CoinPairing;

// Get all Coin Pair
module.exports.getAllCoinPairs = (callback) => {
    CoinPairing.find({}, callback);
};

// Get CoinPairing by id
module.exports.getCoinPairingById = function(id, callback){
    CoinPairing.findById(id, callback);
};

// Set CoinPairing
module.exports.updateCoinPairing = (id, exchange, nbPairs, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {nbPairs: nbPairs, exchange: exchange} };
    CoinPairing.updateOne(query, newvalues, callback);
};