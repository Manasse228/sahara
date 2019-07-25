
const mongoConf     = require('./../config/mongoDB');
const Exchange      = require('../models/Exchanges');


module.exports = {

    register: async (data) => {

        const exchangeInstance = new Exchange();

        exchangeInstance._id =  data.id;
        exchangeInstance.name =  data.name;
        exchangeInstance.year_established =  Number(data.year_established);
        exchangeInstance.country =  data.country;
        exchangeInstance.description =  data.description;
        exchangeInstance.url =  data.url;
        exchangeInstance.image =  data.image;
        exchangeInstance.has_trading_incentive =  (!data.has_trading_incentive) ? false : data.has_trading_incentive;


        exchangeInstance.save().then( (result) => {
            console.log('Market save ', result.name);
        });

    }

};