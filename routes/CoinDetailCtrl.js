
const mongoConf     = require('./../config/mongoDB');
const Coin          = require('../models/Coins');
const CoinDetail    = require('../models/CoinDetails');


module.exports = {

    register: async (id, data) => {

        if (data && id) {

            const fetch_homepage = data.links.homepage.filter( (el) => { return el !== ''; });
            const fetch_blockchain_site = data.links.blockchain_site.filter( (el) => { return el !== ''; });
            const fetch_github = data.links.repos_url.github.filter( (el) => { return el !== ''; });
            const fetch_bitbucket = data.links.repos_url.bitbucket.filter( (el) => { return el !== ''; });

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
                console.log('saved of ', result._id )
            });

        }

    }

};