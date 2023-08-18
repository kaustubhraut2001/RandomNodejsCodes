// const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");
const url = require('url');

const mongoose = require('mongoose');
const User = require('./Schemas/user');
const data = require('./MOCK_DATA.json');
const user = require('./routes/user');
const express = require("express");
const userrouter = require('./Schemas/user');

const app = express();

dotenv.config();
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("Connected to MongoDB") })
    .catch((err) => { console.log(err) });





// Express Middleware -- we can trate it as plugin
app.use(express.urlencoded({ extended: false }));
// this code will set the header of the response it checks to contnet type first if it is form type then it changes it to json

app.use((req, res, next) => {
    fs.appendFile("log.txt", Date.now() + ' ' + req.method + ' ' + "New request reacived", (err, result) => {
        if (err)
            console.log(err);
        else
            console.log("File Write Successfully ");

    });
    console.log("Middleware");
    next();
});

app.use('/', userrouter);



// const server = http.createServer((req, res) => {
//     const log = Date.now() + ' ' + req.method + ' ' + "New request reacived" + '\n';
//     const urll = url.parse(req.url, true);
//     console.log(urll.query)


//     fs.appendFile('log.txt', log, (err, result) => {

//         switch (urll.pathname) {
//             case '/':
//                 res.end('Home Page');
//                 break;
//             case '/about':
//                 const a = urll.query.a;

//                 res.end(`About Page + ${a}`);
//                 break;
//             case '/signup':
//                 if (req.method === 'GET') {
//                     res.end('Signup Page');
//                 } else if (req.method === 'POST') {
//                     res.end('Signup Page');



//                 }
//             default:
//                 res.end('Something went wrong');


//         }
//         // if (err)
//         //     console.log(err);
//         // else
//         //     console.log("File Write Successfully ");

//     });


//     // res.end('Server Started successfully');
// });

app.listen(process.env.PORT, () => {
    console.log(`Server is running ${process.env.PORT}`);
});