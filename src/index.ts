
import {f} from "./sdk"
import CryptoJS  from 'crypto-js';
// import log4js from "log4js";
import { _log4js } from "./log4jsConfig"

// const _log4js = require("./log4jsConfig")._log4js

const hello : string = "Hello World!"
console.log(hello)
f();


// sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + '/api/v5/account/balance?ccy=BTC', SecretKey))

let hmacSHA256 = CryptoJS.HmacSHA256("2023-12-01T10:39:16.875ZGET/api/v5/mktplace/nft/markets/listings?chain=bsc&status=active&market=okx&sort=create_time_desc&limit=50&createBefore=&cursor=","C23F22371C15D28F25198458C0E89FDC");

let sig = CryptoJS.enc.Base64.stringify(hmacSHA256);

console.log(sig);

let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256('2023-12-01T10:32:47.790Z' + 'GET' + '/api/v5/mktplace/nft/markets/listings?chain=bsc&status=active&market=okx&sort=create_time_desc&limit=50&createBefore=&cursor=', 'C23F22371C15D28F25198458C0E89FDC'))
console.log(sign);

var logger = _log4js.getLogger();
logger.info("Time:", new Date());

console.log("aa" + "bb")

