const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.get('/', (req,res) =>{
  res.send('💫💫Hello World💫💫')
})
router.use((req, res) => {
  return res.send('💫💫!Missed the home route!💫💫');
});

module.exports = router;