// const http = require("http");
// const url = require('url');
import http from 'http'
import url from 'url'
import Web3 from 'web3';

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    if(req.method === 'GET'){
        let _reqObj = url.parse(req.url,true);
        let queryParams = _reqObj.query;
        let pathname = _reqObj.pathname;
        switch (pathname) {
            case "/books":
                res.writeHead(200);
                res.end(handleBooks(queryParams));
                break;
            case "/authors":
                res.writeHead(200);
                res.end(handleAuthors(queryParams));
                break
            default:
                res.writeHead(404);
                res.end(JSON.stringify({error:"Resource not found"}));
        }
    }else if(req.method === 'POST'){
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Parsed data belonging to ${result.fname}`);
        });
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({error:"Unsupport method!"}));
    }
};

function handleBooks(queryParams){
    return '{"message": "This is a Book JSON response "}';
}

function handleAuthors(queryParams){
    return `{"message": "This is a Authors JSON response"}`
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    const JSON_URLENCODED = 'application/json';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(body);
        });
    }else if(request.headers['content-type'] === JSON_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(body);
        });
    } else {
        callback(null);
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
