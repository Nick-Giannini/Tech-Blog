// It was decided to handle user routes in three separate files: "loginRoutes", "logoutRoutes" and "signupRoutes".
// This is the signup route.

const router = require('express').Router();
const { User } = require('../../models');

// Allowing users to create new userdata
router.post('/', async (req, res) => {
    console.log(req.body);
    console.log("signupRoutes.js");

    try {
        const userData = await User.create(req.body);
        // Targeting user db model to create user data

        req.session.save(() => {
            // Saving to db
            req.session.userName = userData.username;
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Exporting new user information
module.exports = router;
