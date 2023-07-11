const router = require('express').Router();
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
