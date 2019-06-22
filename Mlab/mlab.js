const http = require("http")
const MongoClient = require("mongodb").MongoClient
const url = "mongodb://Esc:hacker2539@ds139435.mlab.com:39435/data"

MongoClient.connect(url, function (err, db) {

    if (err) throw err;

    var dbo = db.db("data");
    dbo.collection("datajs").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);

        result.forEach((index, i) => {
            console.log(index.name);
            console.log(index.type);
            
            index.skills.forEach((skill, i) => {
               console.log(skill);
            })
            
        })

        http.createServer((req, res) => {

            res.writeHead(200, {
                "Content-Type": "text/html"
            })
            res.write("GG");
            res.end();

        }).listen(8000, () => {
            console.log("START SERVER...")
        })

        db.close();
    });
});