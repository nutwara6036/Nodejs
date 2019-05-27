const https = require('https');
var request = require("request");

setInterval(() => {
    https.get('', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        })

        resp.on('end', () => {
            console.log(JSON.parse(data));
            k = JSON.parse(data);

            var options = {
                method: 'POST',
                url:'',
                headers: {
                    'Postman-Token': 'dd',
                    'cache-control': 'no-cache',
                    'Content-type': 'application/json'
                },
                body: {
                    time: '23432423423',
                    value: k.temperature
                },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                console.log(body);
            });
        });
    }).on("error", (err) => {
        console.log("Error:" + err.message);
    })
}, 3000);