const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('💫💫!Missed the home route!💫💫');
});

module.exports = router;