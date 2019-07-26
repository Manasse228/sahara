

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinDetailSchema = new mongoose.Schema({
    _id:{
        type: String, ref: 'Coin'
    },
    homepage: [{

    }],
    blockchain_site: [{

    }],
    github: [{

    }],
    bitbucket: [{

    }],
    description: {
        type: String,
        required: false
    },
    twitter_screen_name: {
        type: String,
        required: false
    },
    facebook_username: {
        type: String,
        required: false
    },
    bitcointalk_thread_identifier: {
        type: String,
        required: false
    },
    subreddit_url: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    country_origin: {
        type: String,
        required: false
    },
    genesis_date: {
        type: Date,
        required: false
    },
    ico_data: {
        type: Boolean,
        required: false
    },
    coingecko_score: {
        type: String,
        required: false
    },
    developer_score: {
        type: String,
        required: false
    },
    community_score: {
        type: String,
        required: false
    },
    liquidity_score: {
        type: String,
        required: false
    },
    public_interest_score: {
        type: String,
        required: false
    },
    total_supply: {
        type: String,
        required: false
    },
    circulating_supply: {
        type: String,
        required: false
    },
    paringNumber: {
        type: String,
        required: false
    },
    add_at: {
        type: Date,
        required: false
    },
    add_at_timestamp: {
        type: String,
        required: false
    },

});

const CoinDetail = mongoose.model('CoinDetail', CoinDetailSchema);
module.exports = CoinDetail;

// Get all coindetails
module.exports.getAllCoinDetails = (callback) => {
    CoinDetail.find({}, callback);
};

// Get CoinDetail by id
module.exports.getCoinDetailById = function(id, callback){
    CoinDetail.findById(id, callback);
};

// Set CoinDetail
module.exports.updateCoinDetailByPairing = (id, paringNumber, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {paringNumber: paringNumber} };
    CoinDetail.updateOne(query, newvalues, callback);
};

// Set CoinDetail add date
module.exports.updateCoinDetailAddDate = (id, add_at, add_at_timestamp, callback) => {
    const query = {_id: id};
    const newvalues = { $set: {add_at: add_at, add_at_timestamp: add_at_timestamp} };
    CoinDetail.updateOne(query, newvalues, callback);
};