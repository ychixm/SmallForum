const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                password: hash,
                _id: new mongoose.Types.ObjectId()
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ name: req.body.name })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: "Paire identifiant / mot de passe incorrect" });
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: "Paire identifiant / mot de passe incorrect" });
                        }
                        else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'Random_token_secret', // changer pour en cas de mise ne prod
                                    { expiresIn: '24h' }
                                ),
                                name: user.name
                            })
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => { res.status(500).json({ error }) })
};

exports.check = (req, res, next) => {
    res.status(200).json({ message: "logged" });
}