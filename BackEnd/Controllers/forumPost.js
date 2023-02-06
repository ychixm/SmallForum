const ForumPost = require("../models/ForumPost");
const mongoose = require('mongoose');

exports.createForumPost = (req, res, next) => {
    console.log("try to post");
    const forumPost = new ForumPost({
        ...req.body,
        _id: new mongoose.Types.ObjectId()
    });
    forumPost.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteForumPost = (req, res, next) => {
    var post = ForumPost.findOne({ _id: req.params.id }, (err, result) => {
        if (result.userId == req.auth["userId"]) {
            ForumPost.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        }
        else {
            res.status(403).json({ message: "vous devez posséder un post pour le supprimer" });
        }
    });
};

exports.getForumPostById = (req, res, next) => {
    ForumPost.findOne({ _id: req.params.id })
        .then(forumPost => res.status(200).json(forumPost))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllForumPost = (req, res, next) => {
    ForumPost.find()
        .then(forumPost => res.status(200).json(forumPost))
        .catch(error => res.status(400).json({ error }));
};