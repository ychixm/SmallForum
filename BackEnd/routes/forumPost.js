const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const ForumPostController = require('../Controllers/forumPost');

// recieve / save
router.post('/', auth, ForumPostController.createForumPost);

// Delete
router.delete('/:id', auth, ForumPostController.deleteForumPost);

// precise item by id
router.get('/:id', auth, ForumPostController.getForumPostById);

// get items
router.get('/', ForumPostController.getAllForumPost);

module.exports = router;