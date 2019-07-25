

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinICOSchema = new mongoose.Schema({
    _id:{
        type: Schema.Types.ObjectId, ref: 'Coin'
    },
    ico_start_date: {
        type: Date,
        required: false
    },
    ico_end_date: {
        type: Date,
        required: false
    },
    short_desc: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    links: [{

    }],

});

const CoinICO = mongoose.model('CoinICO', CoinICOSchema);
module.exports = CoinICO;