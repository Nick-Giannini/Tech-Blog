const router = require('express').Router();
const { User,Post,Comment } = require('../../models');



router.get('/:id', async (req, res) => {

    try {
        const value = req.params.id;

        const commentPost = await Comment.findAll({
            where: {
                post_id: value,
            },
        });
        if (!commentPost[0]) {
            res.status(404).json({ message: 'No Comments with this post_id!' });
            return;
        }
        res.status(200).json(commentPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    const comment = await Comment.create(req.body);

    return res.json(comment);
});





module.exports = router;