// Main "launch point for routes.  Establishes /api and home route.
const router = require('express').Router();
const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');

router.use('/api', apiRoutes);
router.use('/', viewRoutes)

module.exports = router;