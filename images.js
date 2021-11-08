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
    let paddedHex = ("" + i.toString(16)).substr("-64");
    
    promises.push(new Promise( (res, rej) => {
        var bitmap = fs.readFileSync(`${dir.outputs}/export/${paddedHex}.png`);
        ipfsArray.push({
            path: `images/${paddedHex}.png`,
            content: new Buffer(bitmap).toString("base64")
        })
        res();

        // fs.readFile(`${__dirname}/export/${paddedHex}.png`, (err, data) => {
        //     if(err) rej();
        //     ipfsArray.push({
        //         path: `images/${paddedHex}.png`,
        //         content: new Buffer(data).toString("base64")
        //     })
        //     res();
        // })
    }))
}
Promise.all(promises).then( () => {
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
})