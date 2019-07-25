

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExchangeSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    year_established: {
        type: Number,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    has_trading_incentive: {
        type: Boolean,
        required: false
    },

});

const Exchange = mongoose.model('Exchange', ExchangeSchema);
module.exports = Exchange;

// Get all exchanges
module.exports.getAllExchanges = (callback) => {
    Exchange.find({}, callback);
};

// Get Coin by id
module.exports.getExchangeById = function(id, callback){
    Exchange.findById(id, callback);
};

