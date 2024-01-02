// const http = require("http");
// const url = require('url');
import http from 'http'
import url from 'url'
import Web3 from 'web3';

const host = 'localhost';
const port = 8000;

let web3 = new Web3("https://goerli.infura.io/v3/68f97f051e674f5a8ff25a1169f0682e");
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    if(req.method === 'GET'){
        let _reqObj = url.parse(req.url,true);
        let queryParams = _reqObj.query;
        let pathname = _reqObj.pathname;
        switch (pathname) {
            case "/server/status":
                res.writeHead(200);
                res.end(JSON.stringify({code:0, error:"server available!"}));
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error:"Resource not found"}));
        }
    } else if(req.method === 'POST'){
        let _reqObj = url.parse(req.url,false);
        let pathname = _reqObj.pathname;
        switch (pathname) {
            case "/abi/decode/availableAdvancedOrders":
                handleAbiDecodeInput(req, result => {
                    // console.log(result);
                    res.end(result);
                });
                break;
            default:
                res.writeHead(404);
                res.end(JSON.stringify({code:1002, error:"Resource not found!"}));
        }
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({code:1002, error:"Unsupport method!"}));
    }
};
function handleAbiDecodeInput(request, callback) {
    const JSON_URLENCODED = 'application/json';
    let contentType = request.headers['content-type'];
    // if(request.headers['content-type'] === JSON_URLENCODED) {
    if(request.headers['content-type'].startsWith(JSON_URLENCODED)) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            let postBodyObj = JSON.parse(body);
            let decodeSeaportRet = '';
            try {
                decodeSeaportRet = decodeSeaport(postBodyObj.input);
            } catch (error) {
                console.log(new Date() + "parser error: " + JSON.stringify(body) + "\n -- " + error)
                console.log(error);
                decodeSeaportRet = JSON.stringify({code:1003, error:"seaport decode error!"});
            }
            callback(decodeSeaportRet);
        });
    } else {
        callback(JSON.stringify({code:1001, error:"content-type not support!"}));
    }
}

function decodeSeaport(inputData){

    let decodedSecret = web3.eth.abi.decodeParameters(ABI, inputData);

    let advancedOrders: object[] = [];
    let orderArray: any = decodedSecret['0'];
    for(let i = 0; i < orderArray.length; i++){
        let _order = orderArray[i];
        let _orderParam = _order[0];

        let orderAssets: object[] = [];
        let _offerArray: any = _orderParam['2'];
        for(let j = 0; j < _offerArray.length; j++){
            let _offer = _offerArray[j];
            let assetItem = {
                "contractAddress": _offer.token,
                "tokenId": _offer.identifierOrCriteria.toString()
            }
            orderAssets.push(assetItem);
        }

        let order = {
            // "signature": _order.signature,
            "extraData": _order.extraData,
            "orderAssets": orderAssets
        }
        advancedOrders.push(order);
    }

    let result = {
        code:0,
        data: {
            "availableAdvancedOrders": advancedOrders
        }
    };

    return JSON.stringify(result);
}

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


let ABI = [
    {
        "components": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "offerer",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "zone",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "enum ItemType",
                                "name": "itemType",
                                "type": "uint8"
                            },
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "identifierOrCriteria",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "endAmount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct OfferItem[]",
                        "name": "offer",
                        "type": "tuple[]"
                    },
                    {
                        "components": [
                            {
                                "internalType": "enum ItemType",
                                "name": "itemType",
                                "type": "uint8"
                            },
                            {
                                "internalType": "address",
                                "name": "token",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "identifierOrCriteria",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "startAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "endAmount",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address payable",
                                "name": "recipient",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ConsiderationItem[]",
                        "name": "consideration",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "enum OrderType",
                        "name": "orderType",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "zoneHash",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "salt",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes32",
                        "name": "conduitKey",
                        "type": "bytes32"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalOriginalConsiderationItems",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct OrderParameters",
                "name": "parameters",
                "type": "tuple"
            },
            {
                "internalType": "uint120",
                "name": "numerator",
                "type": "uint120"
            },
            {
                "internalType": "uint120",
                "name": "denominator",
                "type": "uint120"
            },
            {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "extraData",
                "type": "bytes"
            }
        ],
        "internalType": "struct AdvancedOrder[]",
        "name": "",
        "type": "tuple[]"
    },
    {
        "components": [
            {
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "enum Side",
                "name": "side",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "identifier",
                "type": "uint256"
            },
            {
                "internalType": "bytes32[]",
                "name": "criteriaProof",
                "type": "bytes32[]"
            }
        ],
        "internalType": "struct CriteriaResolver[]",
        "name": "",
        "type": "tuple[]"
    },
    {
        "components": [
            {
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "itemIndex",
                "type": "uint256"
            }
        ],
        "internalType": "struct FulfillmentComponent[][]",
        "name": "",
        "type": "tuple[][]"
    },
    {
        "components": [
            {
                "internalType": "uint256",
                "name": "orderIndex",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "itemIndex",
                "type": "uint256"
            }
        ],
        "internalType": "struct FulfillmentComponent[][]",
        "name": "",
        "type": "tuple[][]"
    },
    {
        "internalType": "bytes32",
        "name": "fulfillerConduitKey",
        "type": "bytes32"
    },
    {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "maximumFulfilled",
        "type": "uint256"
    }
];
