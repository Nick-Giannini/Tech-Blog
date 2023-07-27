const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll();
        res.json(allPosts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all posts by id
router.get('/:id', async (req, res) => {
    try {
        const value = req.params.id;
        const allPostsbyUser = await Post.findAll({
            where: {
                user_id: value,
            },
        });
        if (!allPostsbyUser[0]) {
            res.status(404).json({ message: 'No User with this id!' });
            return;
        }
        res.status(200).json(allPostsbyUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    const post = await Post.create({ ...req.body, user_id: req.session.user_id });
    return res.json(post);
});

// Update a post by id
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedPost[0]) {
            res.status(404).json({ message: 'No Post with this id!' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
