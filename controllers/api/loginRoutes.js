const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            return res.status(400).json({ message: 'Incorrect Username, please try again' });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Incorrect Password, please try again' });
        }

        req.session.save(() => {
            req.session.userName = userData.username;
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            return res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;