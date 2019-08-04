

const mongoConf     = require('./../config/mongoDB');
const Coin          = require('../models/Coins');
const TokenERC20    = require('../models/TokenERC20');
const CoinDetails   = require('../models/CoinDetails');
const axios         = require('axios');
const locks         = require('locks');
const mutex         = locks.createMutex();
const sleep         = require('sleep');

module.exports = {
    getAllTokens: async () => {

        return new Promise( async (resolve, reject) => {
            await TokenERC20.getAllTokenERC20( (err, result) => {
                resolve(result);
            });
        })

    },
    fetchTokenInfo: async (_tokenAddress, _id) => {
        await axios.get('http://api.ethplorer.io/getTokenInfo/'+_tokenAddress+'?apiKey=freekey')
            .then(async response => {
                if (!response.data.error) {
                    const _tokenERC20Instance = new TokenERC20();
                    _tokenERC20Instance._id = _id;
                    _tokenERC20Instance.tokenAddress = _tokenAddress;
                    _tokenERC20Instance.decimals = response.data.decimals;
                    _tokenERC20Instance.totalSupply = response.data.totalSupply / Math.pow(10, response.data.decimals);
                    _tokenERC20Instance.ownerAddress = response.data.ownerAddress;
                    _tokenERC20Instance.transfersCount = response.data.transfersCount;
                    _tokenERC20Instance.holdersCount = response.data.holdersCount;
                    _tokenERC20Instance.save( res => {
                        console.log('Token ERC20 ', _id,' saved');
                    } )
                }
            })
            .then(sleep.sleep(3))
            .catch(error => {

                setTimeout( () =>  {}, 3000);
            })
    },
    registerTokenERC20: async () => {
        await CoinDetails.getAllCoinDetails( (err, results) => {
            results.forEach( result => {
                TokenERC20.getTokenERC20ById(result._id, (err, _result) => {
                    if (!_result) {
                        const blockchainLink = result.blockchain_site;

                        if (blockchainLink && blockchainLink.length >0) {
                            blockchainLink.forEach(  link => {
                                if (link && link.startsWith("https://ethplorer.io/address/")) {
                                    let break_link = link.split("https://ethplorer.io/address/");
                                    let tokenAddress = break_link[1];

                                    mutex.lock( async () => {
                                        await module.exports.fetchTokenInfo(tokenAddress, result._id).then( res => {});
                                        mutex.unlock(setTimeout( () =>  {}, 10000));
                                    });

                                }
                            })
                        }

                    }
                });



            });

        });
    },

};