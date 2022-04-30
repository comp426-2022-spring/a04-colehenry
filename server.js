"use strict";
const db = require("./database.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require('morgan')
const fs = require('fs')

const http = require('http')
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
console.log(args)

//port
const port = args.port || process.env.PORT || 5000 

args['port', 'help', 'debug', 'log']

//help
const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)

if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

const debug = args.debug || false

if (debug == true) {
    const accessLog = fs.createWriteStream('access.log', {flags: 'a'})
    app.use(morgan('combined', { stream: accessLog }))

}


const {coinFlip, coinFlips, countFlips, flipACoin} = require("./modules/coin.js");


// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});



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