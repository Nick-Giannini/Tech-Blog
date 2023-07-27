const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;

        const allPostsbyUser = await Post.findAll({
            include: { model: User, attributes: ['username'] },
            where: { user_id: userId },
            raw: true,
        });

        res.render("dashboard", { allPostsbyUser });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;