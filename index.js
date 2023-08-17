const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");
const url = require('url');
dotenv.config();
const express = require("express");

const app = express();

app.get('/', (req, res) => {


    return res.send('Home Page');
});


app.get('/about', (req, res) => {


    return res.send('About Page');
});

app.get('/signup', (req, res) => {
    return res.send(`Signup Page ${req.query.name}`);


});



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