process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Tags = require("./src/Tags");
const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('fs')
var path = require("path");
var Promise = require('bluebird')

const saveImage = require('save-image');

 async function scrapGoogle(){
    const {data} = await axios.get("https://www.google.com/search?q=tijolo&sxsrf=ACYBGNSctRtdqRGkEcTx1EFAs7VoGm4ikw:1568418747070&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj9wZyS_87kAhXFCtQKHZEEBIMQ_AUIEygC&cshid=1568418773960053&biw=1920&bih=920#imgrc=_")
    const $ = cheerio.load(data)
    
    $('img')
        .map(img => $('img')[img].attribs.src)
        .toArray()
        .filter(url => url.includes("http"))
        .map(url => saveImage(url, `./tijolo${Date.now().toString()}.png`))    
}

async function scrapImageNet(){
    const {data} = await axios.get("http://image-net.org/api/text/imagenet.synset.geturls?wnid=n03344642")
    // const $ = cheerio.load(data)
    
data.split('\n')
        .filter(url => url.includes("http"))
        .map(url => saveImage(url, `./tijolo${Date.now().toString()}.png`))    
}

function downloadImage(){
    fs.readFile('./src/urlsNotebook.txt', (err,data) => {
        if(err) {
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        
        data = data
            .toString('utf8')
            .split('\n')
            .filter(url => url.includes("http"))
            .reverse()
            

        Promise.map(data, function (item) {
            try {
                return saveImage(item, `./src/notebook_3/notebook${Date.now().toString()}.png`)
            } catch (error) {}
            
          }, {concurrency: 20})
          .then(function(allResults){
          })     
    });
}
downloadImage()


