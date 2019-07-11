

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


// Get CoinPairing by id
module.exports.getCoinPairingById = function(id, callback){
    CoinPairing.findById(id, callback);
};