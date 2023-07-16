const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth')


router.get('/', withAuth, async (req, res) => {
    // try {
    //     res.render('dashboard');
    // } catch (error) {
    //     res.status(500).json(error);
    // }


try {

    const value = req.session.user_id;
    const allPostsbyUser = await Post.findAll({
        include: { model: User, attributes: ['username'] },
        where: {user_id: value},
        raw: true

    });

    if (!allPostsbyUser[0]) {
        res.status(404)
        return;
    }
    // console.log(allPostsbyUser);
    res.render("dashboard", {allPostsbyUser})
    // res.status(200).json(allPostsbyUser);

    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;