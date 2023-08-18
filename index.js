const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");
const url = require('url');

const data = require('./MOCK_DATA.json');
dotenv.config();
const express = require("express");

const app = express();


// Express Middleware -- we can trate it as plugin
app.use(express.urlencoded({ extended: false }));

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






















app.get('/api/user', (req, res) => {

    return res.json(data);

});

app.get('/user', (req, res) => {

            const html =
                `<ul>

             ${data.map((user) =>
                ` <li>   ${user.first_name} </li>`
             )}

              </ul>`;
    return res.send(html);

});



app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = data.find((user) => user.id === id);
    return res.json(user);
})



app.post('/api/user', (req, res) => {

    return res.json("Working ");


});


// app.patch('/api/user/:id', (req, res) => {
//     return res.json("Working ");

// });

// app.delete('/api/delete/user/:id', (req, res) => {

//     const id = Number(req.params.id);
//     const user = data.find((user) => user.id === id);
//     delete user;
//     res.json("User has been deleted succesfully ");

// });

app.route('/api/user/:id').post((req, res) => {
       const as = req.body;
       data.push({...as , id : as.length + 1});
        fs.watchFile('./MOCK_DATA.json', JSON.stringify(as), (err, result) => {
           res.json("User has been added succesfully ");

        });
       return res.json(as);
}).delete((req, res) => {  const id = Number(req.params.id);
    const user = data.find((user) => user.id === id);
    delete user;
    res.json("User has been deleted succesfully ")}).patch((req, res) => {

        const id = Number(req.params.id);
        const d = req.body;
        data.map((user)=>{
            if(user.id ===id){
                user = req.body;
            }else{
                res.json("User not Found");
            }

        })
        res.json("User has been updated succesfully ");

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