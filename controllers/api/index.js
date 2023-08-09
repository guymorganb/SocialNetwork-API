const router = require('express').Router();
const friendRoutes = require('./friends');
const reactionRoutes = require('./reactions');
const thoughtRoutes = require('./thoughts');
const userRoutes = require('./users');


router.use('/friends', friendRoutes);
router.use('/reactions', reactionRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
    return res.send('💫💫!Missed the api route!💫💫');
  });
module.exports = router;