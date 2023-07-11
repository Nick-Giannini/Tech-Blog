// Main "launch point for routes.  Establishes /api and home route.
const router = require('express').Router();
const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes');
const dashboardRoutes= require('./dashboardRoutes')

router.use('/api', apiRoutes);
router.use('/', viewRoutes)
router.use('/dashboard', dashboardRoutes);


module.exports = router;