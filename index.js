process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fs = require('fs')
var Promise = require('bluebird')
const saveImage = require('save-image');


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


