let fs = require("fs");
let axios = require("axios");

let ipfsArray = [];
let promises = [];

const dir = {
    traitTypes : `./layers/trait_types`,
    outputs: `./outputs`,
    background: `./layers/background`,
  }

for (let i = 0; i < 10; i++) {
    let paddedHex = ("0000000000000000000000000000000000000000000000000000000000000000" + i.toString(16)).substr("-64");
    var json = fs.readFileSync(`${dir.outputs}/metadata/${paddedHex}.json`);
    var attributes = JSON.parse(json).attributes;
    ipfsArray.push({
        path: `metadata/${paddedHex}.json`,
        content: {
            image: `ipfs://QmX1xfbKoUEHtnoiVY9uEtH3X6YuJx2yzPg6ggp3zrFUzz/images/${paddedHex}.png`,
            name: `My Youtube test NFT #${i}`,
            description: "Awesome NFT for my youtube video",
            attributes: attributes
        }
    })
}
axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", 
    ipfsArray,
    {
        headers: {
            "X-API-KEY": 'ymjHNi36z9W2T3KrZIV0Wo5g7DDesCg95uCh4M1UzrMHFDUOMpdQvGPKFVEmcLnN',
            "Content-Type": "application/json",
            "accept": "application/json"
        }
    }
).then( (res) => {
    console.log(res.data);
})
.catch ( (error) => {
    console.log(error)
})

