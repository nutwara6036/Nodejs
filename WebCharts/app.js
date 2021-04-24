'use strict';

var express = require('express');
var http = require('http');
var https = require('https');
var url = require('url');
var app = express();
var port = 3000;


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var request = require("request")

var url = "https://canvasjs.com/data/gallery/php/bitcoin-price.json";

request({
    url: url,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})


var https = require('https');
var url = 'http://jsonplaceholder.typicode.com/users/1';

var options = {
    host: url,
    //path: '/users/rsp',
    headers: { 'User-Agent': 'request' }
};

https.get(options, function(res) {
    var json = '';
    res.on('data', function(chunk) {
        json += chunk;
    });
    res.on('end', function() {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json);
                var test = JSON.stringify(json);
                // data is available here:
                //console.log(data.html_url);
                console.log(test);

            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }
    });
}).on('error', function(err) {
    console.log('Error:', err);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))