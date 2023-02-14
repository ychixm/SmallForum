const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const forumPostRoutes = require('./routes/forumPost');
const userRoutes = require('./routes/user');
const dotenv = require('dotenv').config({path: '.env'});

const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect('mongodb+srv://'+ dbUser +':'+ dbPassword +'@cluster0.wry7x9p.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', "\n", error));
// connect database


// "give acces"
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/ForumPost', forumPostRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
