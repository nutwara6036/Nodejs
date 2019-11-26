var express = require('express');
var app = express();
var fs = require("fs");

app.post('/test/api',function(req, res){
    res.send("test API web");
});

app.post('/test/api/login/:ID/:Pass', function(req, res) {

    fs.readFile(__dirname+"/"+"user.json",'utf8',function(err,data){
    var data = JSON.parse(data);
    var user = data[req.params.ID];
    if(data.Chanok.pass == req.params.Pass){
      var fail = 
      {
        "login successful" :{
            "msg": "login successful",
            "Authorization" : data.Chanok.authorization,
            "Name": data.Chanok.name
        }
      }
        res.send(fail)
        res.send(user);
    }
    else if(data.admin.pass == req.params.Pass){
      var fail = 
      {
        "login successful" :{
          "msg": "login successful",
          "Authorization" : data.admin.authorization,
          "Name": data.admin.name
        }
      }
        res.send(fail)
        res.send(user);
    }
    else 
    {
      var fail = 
      {
        "Loginfailed" :{
          "msg": "login failed"
        }
      }
      res.send(fail)
    }
  });
});

var server = app.listen(8000,function(){
  var host = server.address().address
  var port = server.address().port
});

//fffff