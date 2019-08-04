

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenERC20Schema = new mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
        required: false
    },
    decimals: {
        type: Number,
        required: false
    },
    totalSupply: {
        type: Number,
        required: false
    },
    ownerAddress: {
        type: String,
        required: false
    },
    transfersCount: {
        type: Number,
        required: false
    },
    holdersCount: {
        type: Number,
        required: false
    },
});

const TokenERC20 = mongoose.model('TokenERC20', TokenERC20Schema);
module.exports = TokenERC20;

module.exports.getAllTokenERC20 = (callback) => {
    TokenERC20.find({}, callback);
};

module.exports.getTokenERC20ById = function(id, callback){
    TokenERC20.findById(id, callback);
};

module.exports.setTokenERC20 = (id, transfersCount, holdersCount, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {transfersCount: transfersCount, holdersCount: holdersCount} };
    TokenERC20.updateOne(query, newvalues, callback);
};