// It was decided to handle user routes in three separate files: "loginRoutes", "logoutRoutes" and "signupRoutes".
// This is the signup route.
const router = require('express').Router();
const { User } = require('../../models');
//allowing users to create new userdata
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        //targeting user db model to create user data
        req.session.save(() => { //saving to db
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
//exporting new user information
module.exports = router;