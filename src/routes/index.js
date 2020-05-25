const router      = require('express').Router();

/**
 * Load routes here
 */
const userRoutes = require('./user');

router.use('/user', userRoutes);

module.exports = router;
