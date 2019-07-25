
const mongoConf     = require('./../config/mongoDB');
const Coin          = require('../models/Coins');
const CoinDetail    = require('../models/CoinDetails');
const CoinPairing   = require('../models/CoinPairing');
const axios         = require('axios');


module.exports = {

    register: async (id, data) => {

        if (data && !data.error && id) {

            const fetch_homepage = (data.links && data.links.homepage) ?
                data.links.homepage.filter( (el) => { return el !== ''; }) : "";
            const fetch_blockchain_site = (data.links && data.links.blockchain_site) ?
                data.links.blockchain_site.filter( (el) => { return el !== ''; }) : "";
            const fetch_github = (data.links && data.links.repos_url.github) ?
                data.links.repos_url.github.filter( (el) => { return el !== ''; }) : "";
            const fetch_bitbucket = (data.links && data.links.repos_url.bitbucket) ?
                data.links.repos_url.bitbucket.filter( (el) => { return el !== ''; }) : "";

            const coinDetailInstance = new CoinDetail();

            coinDetailInstance._id =  id;
            coinDetailInstance.homepage = fetch_homepage;
            coinDetailInstance.blockchain_site = fetch_blockchain_site;
            coinDetailInstance.github = fetch_github;
            coinDetailInstance.bitbucket = fetch_bitbucket;
            coinDetailInstance.description = data.description.en;
            coinDetailInstance.twitter_screen_name = data.links.twitter_screen_name;
            coinDetailInstance.facebook_username = data.links.facebook_username;
            coinDetailInstance.bitcointalk_thread_identifier = data.links.bitcointalk_thread_identifier;
            coinDetailInstance.subreddit_url = data.links.subreddit_url;
            coinDetailInstance.image = data.image.small;
            coinDetailInstance.country_origin = data.country_origin;
            coinDetailInstance.genesis_date = data.genesis_date;
            coinDetailInstance.ico_data = !!(data.ico_data);
            coinDetailInstance.coingecko_score = data.coingecko_score;
            coinDetailInstance.developer_score = data.developer_score;
            coinDetailInstance.community_score = data.community_score;
            coinDetailInstance.liquidity_score = data.liquidity_score;
            coinDetailInstance.public_interest_score = data.public_interest_score;
            coinDetailInstance.total_supply = data.market_data.total_supply;
            coinDetailInstance.circulating_supply = data.market_data.circulating_supply;

            coinDetailInstance.save().then( (result) => {
                console.log('saved of ', result._id );

                const coinPairingInstance = new CoinPairing();
                const tradePairs = data.tickers;
                const exchangesPairs = [];

                for (let i =0; i<tradePairs.length; i++) {
                    const pairTab = tradePairs[i];
                    let pair = pairTab.target;
                    let exchange = pairTab.market.name;
                    let tradeUrl = pairTab.trade_url;
                    let trust_score = pairTab.trust_score;
                    exchangesPairs.push(
                        {
                            exchange : exchange,
                            pair : pair,
                            tradeUrl : tradeUrl,
                            trust_score : trust_score,
                        }
                    );
                }

                coinPairingInstance._id = id;
                coinPairingInstance.exchange = exchangesPairs;
                coinPairingInstance.nbPairs = exchangesPairs.length;

                coinPairingInstance.save().then( result => {
                    console.log('saved of ', result._id, ' pair' );
                    Coin.setDeadCoin(id, false,(err, result) => {
                        //console.log('Coin ', id, ' is not dead!' );
                    })
                } )

            });

        } else {
            Coin.setDeadCoin(id, true,(err, result) => {
                console.log('Coin ', id, ' is dead!' );
            })
        }

    },
    setCoingecko_Add_Date: async () => {
        await CoinDetail.getAllCoinDetails( async (err, result) => {
            for (let i=0; i < result.length; i++) {
                if (result[i].image && result[i].image.startsWith("https://assets.coingecko.com/coins/images/") && !result[i].add_at) {

                    let break_img_link = result[i].image.split("https://assets.coingecko.com/coins/images/");
                    let img_number = break_img_link[1].split("/");
                    img_number = Number(img_number[0]);

                    await axios.get('https://www.coingecko.com/price_charts/'+img_number+'/usd/max.json')
                        .then(async response => {

                            if (!response.data.error) {
                                let _date = Number(response.data.stats[0][0]);
                                _date = new Date(_date * 1000);
                                await CoinDetail.updateCoinDetailAddDate(result[i]._id, _date, img_number, (err, _result) => {
                                    console.log("Coin ",result[i]._id, " ", _date);
                                })
                            }

                        })
                        .catch(error => {
                            //console.log(error);
                        });


                }
            }
        });
    }

};