
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const mongoConf     = require('./config/mongoDB');
const CoinGecko     = require('coingecko-api');
const CoinCtrl      = require('./routes/CoinCtrl');


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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
