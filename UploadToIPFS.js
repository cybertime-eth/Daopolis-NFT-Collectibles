const fs = require("fs");
let axios = require("axios");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
// import fetch from 'node-fetch'
const fetch = require('node-fetch');

const { generateNFT, recreateOutputsDir } = require('./generateImages');
const { startCreating} = require('./ArtImage/artImage');

const imageFormat = {
    width: 500,
    height: 500
};

let ipfsArray = [];
let promises = [];

let ipfsImageUrls = [];
let ipfsJSONUrls = [];

const dir = {
    traitTypes: `./layers/trait_types`,
    outputs: `./outputs`,
    background: `./layers/background`,
    meta: `./outputs/DaosNFTMeta`,
}


const main = async () => {
    // await recreateOutputsDir()
    // await startCreating()

    for (let i = 1; i <= process.argv[2]; i++) {
        var jsonStr = fs.readFileSync(`${dir.outputs}/metadata/${i}`);
        var attributes = JSON.parse(jsonStr);
        attributes["token_id"] = `${i}`;
        attributes["image"] = `https://cybertime.mypinata.cloud/ipfs/QmR5sfj3mV58UXMP2BUGhkcP9kDBMiixbAx4SLwN9CZLMQ/${i}`;
        fs.writeFileSync(`${dir.outputs}/metadata/${i}`, JSON.stringify(attributes))
    }
}

// const main = async () => {
//     await recreateOutputsDir()
//     await startCreating()
//     for (let i = 0; i < process.argv[2]; i++) {
//         let paddedHex = ("" + i.toString(16)).substr("-64");
//         promises.push(new Promise((res, rej) => {
//             var bitmap = fs.readFileSync(`${dir.outputs}/export/${paddedHex}.png`);
//             ipfsArray.push({
//                 path: `images/${paddedHex}`,
//                 content: new Buffer(bitmap).toString("base64")
//             })
//             res();

//         }))
//     }
//     Promise.all(promises).then(() => {
//         axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
//             ipfsArray,
//             {
//                 headers: {
//                     "X-API-KEY": 'ymjHNi36z9W2T3KrZIV0Wo5g7DDesCg95uCh4M1UzrMHFDUOMpdQvGPKFVEmcLnN',
//                     "Content-Type": "application/json",
//                     "accept": "application/json"
//                 }
//             }
//         ).then((res) => {
//             ipfsImageUrls = res.data;
//             ipfsArray = [];
//             for (let i = 0; i < ipfsImageUrls.length; i++) {
//                 let paddedHex = ("" + i.toString(16)).substr("-64");
//                 var json = fs.readFileSync(`${dir.outputs}/metadata/${paddedHex}.json`);
//                 var attributes = JSON.parse(json).attributes;
//                 ipfsArray.push({
//                     path: `metadata/${paddedHex}`,
//                     content: {
//                         token_id: `${i}`,
//                         image: ipfsImageUrls[i].path,
//                         name: `DAOS #${i}`,
//                         description: "Dimensions of Celo are 10,000 tokens of appreciation on Celo Blockchain, trying to pave their way into generative art.",
//                         attributes: attributes
//                     }
//                 })
//             }

//             axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
//                 ipfsArray,
//                 {
//                     headers: {
//                         "X-API-KEY": 'ymjHNi36z9W2T3KrZIV0Wo5g7DDesCg95uCh4M1UzrMHFDUOMpdQvGPKFVEmcLnN',
//                         "Content-Type": "application/json",
//                         "accept": "application/json"
//                     }
//                 }
//             ).then(async (res) => {
//                 ipfsJSONUrls = res.data;
//                 console.log("ipfsJSONUrls",ipfsJSONUrls)

//                 if (fs.existsSync(dir.meta)) {
//                     fs.rmdirSync(dir.meta, { recursive: true });
//                 }
//                 fs.mkdirSync(dir.meta);
//                 for (let i = 0; i < ipfsJSONUrls.length; i++) {
//                     let response = await fetch(ipfsJSONUrls[i].path);
//                     if (response.ok) { // if HTTP-status is 200-299
//                     // get the response body (the method explained below)
                        
//                         let json = await response.json();
//                         console.log(json)
//                         fs.writeFileSync(`${dir.meta}/${i}`, JSON.stringify(json))
//                     } else {
//                         console.log("HTTP-Error: " + response.statu)
//                     }
//                 }

//             })
//                 .catch((error) => {
//                     console.log(error)
//                 })

//         })
//             .catch((error) => {
//                 console.log(error)
//             })
//     })
// }

main()