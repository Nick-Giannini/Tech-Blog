const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: { model: User, attributes: ['username'] },
            raw: true
        });
        res.render('home', { allPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const value = req.params.id;

        const postInfo = await Post.findByPk(value, {
            include: [
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['username'] }]
                },
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ]
        });

        const post = postInfo.get({ plain: true });

        if (!post) {
            res.redirect('/');
        }
        res.render('singlePost', post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/createPost', withAuth, async (req, res) => {
    try {
        res.render('createPost');
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;