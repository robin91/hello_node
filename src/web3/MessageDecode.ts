
import Web3 from 'web3';

console.log("success!");

let web3 = new Web3("https://optimism-mainnet.infura.io/v3/68f97f051e674f5a8ff25a1169f0682e");

// testDecodeInput();
// testDecodeInput2();
// decodeInput();

decodeOpenSeaInput();


let res = web3.eth.abi.decodeParameters(
    [
        {
            type: "uint64",
            name: "myNumber",
        }
    ],
    "0x0000000000000000000000000000000000000000000000000000000000000080"
);

console.log(res);

function testDecodeInput(){
    let res = web3.eth.abi.decodeParameters(
        [
            {
                type: "string",
                name: "myString",
            },
            {
                type: "uint256",
                name: "myNumber",
            },
        ],
        "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000"
    );
    console.log(res);
}

function testDecodeInput2(){
    const res = web3.eth.abi.decodeParameters(
        [
            "uint8[]",
            {
                ParentStruct: {
                    propertyOne: "uint256",
                    propertyTwo: "uint256",
                    childStruct: {
                        propertyOne: "uint256",
                        propertyTwo: "uint256",
                    },
                },
            },
        ],
        "0x00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000002d000000000000000000000000000000000000000000000000000000000000004e0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002a0000000000000000000000000000000000000000000000000000000000000018"
    );
    console.log(res);
}

function decodeInput(){
    let ABI = [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "initCode",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "callData",
                    "type": "bytes"
                },
                {
                    "internalType": "uint256",
                    "name": "callGasLimit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "verificationGasLimit",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "preVerificationGas",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maxFeePerGas",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "maxPriorityFeePerGas",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "paymasterAndData",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                }
            ],
            "internalType": "struct UserOperation[]",
            "name": "ops",
            "type": "tuple[]"
        },
        {
            "internalType": "address payable",
            "name": "beneficiary",
            "type": "address"
        }
    ];

    // let ABI = JSON.parse(ABIStr);

    let inputData = "0x00000000000000000000000000000000000000000000000000000000000000400000000000000000000000004a25d28d10b02bcf13a16068f56d167d8f96d09300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000235ae657be4a085ee49168fef92c970e12cf72020000000000000000daec975873824e1cb91f67c1eca7329d000000000000000e0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000250000000000000000000000000000000000000000000000000000000000000012dc9000000000000000000000000000000000000000000000000000000000386d12a0000000000000000000000000000000000000000000000000000000000e0f435000000000000000000000000000000000000000000000000000000000027668900000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000048000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000224519454470000000000000000000000002317d8b224328644759319dffa2a5da77c72e0e900000000000000000000000000000000000000000000000000038d7ea4c68000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000164a4d73041030000000000091b656fda77e357a4d284ee49f3313846dd419e5a785eb6ae0d235ae657be4a085e659767adeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee49168fef92c970e12cf72027538262ae993ca117a0e481f908209137a46268e46e12ff1b26f5e3a0e2d51f2851a923f9b1c104383399c1dc671e43ac00b7e181412fa59ffa87adfb756c450bb80954e62e9f93751e04015ca74af75eccff5da00000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000080000000000000000000000000e55793f55df1f1b5037eba41881663583d4f9b24010101000000000000320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000038d7ea4c68000cf02ca9c0f9cb8b4de40110a6b81594790c3dcce9c5de57e2ed2c01b0cec60df000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000754fd9098af9ddcb41da48a1d78f91f1398965addc0000000000000000656fdc390000000000000000000000000000000000000000a5a259fcc1ae60063e3e7b120b5d3e41cb2157c32cec213f4f227075b2af94f1518a9cd98cc0c6e3f1ecc8ffbb16bab62886016a596c37121ab5b2d69abc75f51b000000000000000000000000000000000000000000000000000000000000000000000000000000000000450000000091db56ea6a5ee45d209aef1b7bfab8531322d1513db4923637d30526a5b433812aaddd5abe8fb8651187a161c003b30111c5124e17c6a3c493c2968cf037f8541c000000000000000000000000000000000000000000000000000000";

    let decodedSecret = web3.eth.abi.decodeParameters(ABI, inputData);

    console.log(decodedSecret);
}


function decodeOpenSeaInput(){
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
            "internalType": "struct AdvancedOrder",
            "name": "",
            "type": "tuple"
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
            "internalType": "bytes32",
            "name": "fulfillerConduitKey",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }
    ];

    // let ABI = JSON.parse(ABIStr);

    let inputData = "0x000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000005600000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000019000000000000000000000000000000000000000000000000000000000000046000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000006c588d1ace0ab8fa709bdcf44073dc724c3fa161000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000002200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000006564c6b200000000000000000000000000000000000000000000000000000000658c53a90000000000000000000000000000000000000000000000000000000000000000360c6ebe0000000000000000000000000000000000000000c108ba02dac9b2710000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000006df55525e32a4f1784698f8937adcba6453216930000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001900000000000000000000000000000000000000000000000000000000000000190000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000078431b2fc694800000000000000000000000000000000000000000000000000078431b2fc6948000000000000000000000000006c588d1ace0ab8fa709bdcf44073dc724c3fa1610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000031569b905178000000000000000000000000000000000000000000000000000031569b905178000000000000000000000000000000a26b00c1f0df003000390027140000faa7190000000000000000000000000000000000000000000000000000000000000040633c316186969eaeb1edbb0b4445011a2c73465a678737df3a58bccb0e9137cd1cd02f59dbaa4af44fdfe73d92a4f5829611a4544cfe420797452a6caece99330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000360c6ebe";

    let decodedSecret = web3.eth.abi.decodeParameters(ABI, inputData);

    console.log(decodedSecret);
}
