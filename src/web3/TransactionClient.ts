
import Web3 from 'web3';


let web3 = new Web3("https://optimism-mainnet.infura.io/v3/68f97f051e674f5a8ff25a1169f0682e");

testGetTransaction();

console.log("success!");
function testGetTransaction(){


    let txHash = "0x286ccc1304ba0a4d142eb17ef11a9e170e8a1315558d4207842ae9b193adbb7a";

    web3.eth.getTransaction(txHash).then(console.log);

}


