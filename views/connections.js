const mongoose = require('mongoose');
async function connect() {

    return await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports = connect;