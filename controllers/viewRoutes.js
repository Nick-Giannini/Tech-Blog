const router = require('express').Router();
const { User,Post} = require('../models');
const auth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            include: {model: User, attributes: ['username']},
            raw: true});
        console.log(allPosts);
        res.render('home',{allPosts});

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/post/:id', async (req, res) => {
    try {
        const value = req.params.id;

        const post = await Post.findByPk(value,{
            raw:true
        });
        if (!post) {
            res.redirect('/');

        }
        console.log(post);
        res.render("singlePost",post)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});



router.get('/login', async (req, res) => {
    try {

        res.render('login');
    } catch (error) {
        res.status(500).json(error)
    };
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/createPost', async (req, res) => {
    try {
        res.render('createPost');
    } catch (error) {
        res.status(500).json(error);
    }
})

// router.get('/dashboard', async (req, res) => {
//     try {
//         res.render('dashboard');
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

module.exports = router;