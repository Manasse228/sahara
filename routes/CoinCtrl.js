
const mongoConf     = require('./../config/mongoDB');
const Coin          = require('../models/Coins');

module.exports = {
    getAllCoins: async () => {

        return new Promise( async (resolve, reject) => {
            await Coin.getAllCoins( (err, result) => {
                resolve(result);
            });
        })

    },
    registerCoin: async (id, symbol, name) => {
        await Coin.getCoinById(id, async (err, result) => {
            if (!result) {
                const coinInstance = new Coin();
                coinInstance._id = id;
                coinInstance.name = name;
                coinInstance.symbol = symbol;

                await coinInstance.save().then( () => {
                    console.log('Coin ', id, ' is saved');
                } )
            }
        });
    },

};