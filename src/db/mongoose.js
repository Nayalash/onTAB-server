const mongoose = require('mongoose')
const dotenv = require('dotenv').config({path: 'config/dev.env'})

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
    console.log('Connected To MongoDB Database...')
);