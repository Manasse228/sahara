

const mongoConf     = require('./../config/mongoDB');
const Coin          = require('./../models/coins');

module.exports = {
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
    setDeleteCoin: async (coinGeckoList) => {
        await Coin.getAllCoins( async (err, result) => {
            for (let i= 0; i<result.length; i++) {
                let count = 0;
                for (let j= 0; j<coinGeckoList.length; j++) {
                    if (result[i]._id === coinGeckoList[j].id) {
                        count++;
                    }
                }
                if (count >0) {
                    await Coin.updateCoin(result[i]._id);
                }
            }
        } )
    }
};