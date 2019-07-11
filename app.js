
const express               = require('express');
const path                  = require('path');
const cookieParser          = require('cookie-parser');
const mongoConf             = require('./config/mongoDB');
const CoinGecko             = require('coingecko-api');
const CoinCtrl              = require('./routes/CoinCtrl');
const CoinDetailCtrl        = require('./routes/CoinDetailCtrl');
const CoinDetail            = require('./models/CoinDetails');
const locks                 = require('locks');


const mutex         = locks.createMutex();
const CoinGeckoClient = new CoinGecko();
const app = express();

const initiateCoinDB = async() => {
    const data = await CoinGeckoClient.ping();
    if (data.data) {
        let coinList = await CoinGeckoClient.coins.list();
        coinList = coinList.data;
        for (let i=0; i< coinList.length; i++) {
            await CoinCtrl.registerCoin(coinList[i].id, coinList[i].symbol, coinList[i].name);
        }
    }
};


initiateCoinDB().then( async () => {
    let coinList = await CoinGeckoClient.coins.list();
    coinList = coinList.data;
    CoinCtrl.setDeleteCoin(coinList);
} );

const fetchCoinDetail =  () => {
    CoinCtrl.getAllCoins().then( async (result) => {
        for (let i=0; i< result.length; i++) {
            await CoinDetail.getCoinDetailById(result[i]._id, async (err, _result) => {
                if (!_result) {
                    try {

                        mutex.lock( async () => {
                            await getCoinDetailsSlowly(result[i]._id).then();
                            mutex.unlock();
                        });

                    } catch (e) {
                       console.log('error ', e)
                    }

                }
            })

        }
    })
} ;

const getCoinDetailsSlowly = async (id) => {
    let data = await CoinGeckoClient.coins.fetch(id);
    await CoinDetailCtrl.register(id, data.data);
};

fetchCoinDetail();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
