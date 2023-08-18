// const http = require('http');
const dotenv = require('dotenv');
const fs = require("fs");
const url = require('url');

const mongoose = require('mongoose');
const User = require('./Schemas/user');
const data = require('./MOCK_DATA.json');

const express = require("express");
const user = require('./Schemas/user');

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





app.post('/api/user', async(req, res) => {
    const user = await User.create({

        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        gender: body.gender

    });
    console.log(user);
    return res.status(201).json(user);



});













// we can send header
// we can set and get the headers that we are requesting from the server

// if we wants to create our own header then we append X-Myname in front of our header
// we have an custom headers major use while authothetification


// app.get('/api/user', (req, res) => {
//     const g = req.headers;
//     console.log(g);
//     res.setHeader('Content-Type', 'application/json');
//     return res.status(201).json(data);

// });

app.get('/user', (req, res) => {

    const alluser = User.find({});


    const html = alluser.map((user) => {
        `<ul>
            <li>${user}</li>

            </ul>`


    });
    return res.status(200).json(html);
});



app.get('/users/:id', async(req, res) => {
    const id = await User.findById(req.params.id);
    return res.status(200).json(id);
})






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
    data.push({...as, id: as.length + 1 });
    fs.watchFile('./MOCK_DATA.json', JSON.stringify(as), (err, result) => {
        res.json("User has been added succesfully ");

    });
    return res.json(as);
}).delete(async(req, res) => {
    const id = await User.findByIdAndDelete(req.params.id);

    delete user;
    res.json("User has been deleted succesfully ")
}).patch((req, res) => {

    const id = User.findByIdAndUpdate(req.params.id);
    const dataa = req.body;
    const user = data.find((user) => user.id === id);
    user = {...user, ...dataa };
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