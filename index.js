const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");
const url = require('url');

dotenv.config();

const server = http.createServer((req, res) => {
    const log = Date.now() + ' ' + req.method + ' ' + "New request reacived" + '\n';
    const urll = url.parse(req.url, true);
    console.log(urll.query)


    fs.appendFile('log.txt', log, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("File Write Successfully ");

    });

    switch (req.url) {
        case '/':
            res.end('Home Page');
            break;
        case '/about':
            res.end('About Page');
            break;
        default:
            res.end('Something went wrong');


    }
    res.end('Server Started successfully');
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
});