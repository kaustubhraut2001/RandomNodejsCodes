const fs = require('fs');


function logreqres() {

    (req, res, next) => {
        fs.appendFile("log.txt", Date.now() + ' ' + req.method + ' ' + "New request reacived", (err, result) => {
            if (err)
                console.log(err);
            else
                console.log("File Write Successfully ");

        });
        console.log("Middleware");
        next();
    }
}


module.exports = logreqres;