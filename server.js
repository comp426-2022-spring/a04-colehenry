//import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs";

const http = require('http')
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))

args['port']
const port = args.port || process.env.PORT || 5000 

const {coinFlip, coinFlips, countFlips, flipACoin} = require("./modules/coin.js");


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});



//args["port"]

//const port = args.port || 5000

/*
if (args.port != null) {
    port = args.port;
}


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});
*/



// Default response for any other request

/*
app.get('/', (req,res) => {
    res.send('working test')
})

*/

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });


// Endpoint returning JSON of flip function result
app.get('/app/flip', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.json({flip:coinFlip()})
});

// Endpoint returning JSON of flip array & summary
app.get('/app/flips/:number', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';

    var flips = coinFlips(req.params.number)
    var summary = countFlips(flips)

    res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/heads', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('heads')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

app.get('/app/flip/call/tails', (req, res) => {
    res.statusCode = 200;
    let answer = flipACoin('tails')
    res.send(answer)
    res.writeHead(res.statusCode, {'Content-Type': 'text/plain'});
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});