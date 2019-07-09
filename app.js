
const express               = require('express');
const path                  = require('path');
const cookieParser          = require('cookie-parser');
const mongoConf             = require('./config/mongoDB');
const CoinGecko             = require('coingecko-api');
const CoinCtrl              = require('./routes/CoinCtrl');
const CoinDetailCtrl        = require('./routes/CoinDetailCtrl');
const CoinDetail            = require('./models/CoinDetails');


const CoinGeckoClient = new CoinGecko();
const app = express();

const initiateCOinDB = async() => {
    const data = await CoinGeckoClient.ping();
    if (data.data) {
        let coinList = await CoinGeckoClient.coins.list();
        coinList = coinList.data;
        for (let i=0; i< coinList.length; i++) {
            await CoinCtrl.registerCoin(coinList[i].id, coinList[i].symbol, coinList[i].name);
        }
    }
};


initiateCOinDB().then( async () => {
    let coinList = await CoinGeckoClient.coins.list();
    coinList = coinList.data;
    CoinCtrl.setDeleteCoin(coinList);
} );

const fetchCoinDetail = async () => {
    CoinCtrl.getAllCoins().then( (result) => {
        for (let i=0; i< result.length; i++) {
            CoinDetail.getCoinDetailById(result[i]._id, async (err, _result) => {
                if (!_result) {
                    let data = await CoinGeckoClient.coins.fetch(result[i]._id);
                    console.log('i ', i);
                    await CoinDetailCtrl.register(result[i]._id, data.data);
                }
            })
        }
    })
} ;

fetchCoinDetail().then();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
