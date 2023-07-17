const router = require('express').Router();
const { User,Post,Comment } = require('../../models');
const withAuth = require('../../utils/auth');



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

router.post('/', withAuth,   async (req, res) => {
    try{
        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id })
            res.json(comment);

}
catch(err){
    res.status(500).json(err)
}
});





module.exports = router;