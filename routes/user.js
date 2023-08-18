const express = require('express');
const router = express.Router();


router.post('/alldata', async(req, res) => {
    const alldata = data;
    await User.insertMany(alldata);
    console.log(alldata);
    res.status(200).json("Data has been added succesfully");
});




router.post('/user', async(req, res) => {
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

// if we wants to create our own header then we routerend X-Myname in front of our header
// we have an custom headers major use while authothetification


// router.get('/api/user', (req, res) => {
//     const g = req.headers;
//     console.log(g);
//     res.setHeader('Content-Type', 'routerlication/json');
//     return res.status(201).json(data);

// });

router.get('/user', (req, res) => {

    const alluser = User.find({});


    const html = alluser.map((user) => {
        `<ul>
            <li>${user}</li>

            </ul>`


    });
    return res.status(200).json(html);
});



router.get('/user/:id', async(req, res) => {
    const id = await User.findById(req.params.id);
    return res.status(200).json(id);
})






// router.patch('/api/user/:id', (req, res) => {
//     return res.json("Working ");

// });

// router.delete('/api/delete/user/:id', (req, res) => {

//     const id = Number(req.params.id);
//     const user = data.find((user) => user.id === id);
//     delete user;
//     res.json("User has been deleted succesfully ");

// });

router.route('/user/:id').post((req, res) => {
    const as = req.body;
    data.push({...as, id: as.length + 1 });
    fs.watchFile('./MOCK_DATA.json', JSON.stringify(as), (err, result) => {
        res.json("User has been added succesfully ");

    });
    return res.json(as);
}).delete(async(req, res) => {
    const id = await User.findByIdAndDelete(req.params.id);

    delete id;
    res.json("User has been deleted succesfully ")
}).patch((req, res) => {

    const id = User.findByIdAndUpdate(req.params.id);
    const dataa = req.body;
    const user = data.find((user) => user.id === id);
    user = {...user, ...dataa };
    res.json("User has been updated succesfully ");

});


router.get('/user/about', (req, res) => {


    return res.send('About Page');
});

router.get('/user/signup', (req, res) => {
    return res.send(`Signup Page ${req.query.name}`);


});

module.exports = router;