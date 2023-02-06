const express = require('express');
const mongoose = require('mongoose');
const app = express();

const forumPostRoutes = require('./routes/forumPost');
const userRoutes = require('./routes/user');

// connect database
mongoose.connect('mongodb+srv://bobadmin:TD7aMBxo8g7eQrY2vUvC@cluster0.wry7x9p.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log('Connexion à MongoDB échouée !', "\n", error));

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
