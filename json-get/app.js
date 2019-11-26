var request = require("request")
var url = "http://jsonplaceholder.typicode.com/users/1"

request({
    url: url,
    json: true
}, function(error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
        console.log(body.address.city);

    }
})