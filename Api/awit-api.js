class apidata {
    async loaddata() {
        let options = {
            message: "GGEZ"
        };

        let promise = new Promise((resolve, reject) => {
            requst(options, function(error, response) {
                if (error)
                    throw new Error(error);
                else
                    resolve(response.body);
            });
        });

        let result = await promise;

        console.log(result);
    }
}


function requst(options, callback) {
    let response = {
        body: "MESSAGE :" + options.message
    };
    setTimeout(function() {
        callback(null, response)
    }, 1000)
}

let apiinstance = new apidata();

apiinstance.loaddata();