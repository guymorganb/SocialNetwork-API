/**
 * Route for user GET/POST/PUT/DELETE
 * 
 */
const { User } = require('../../schema/schema');
const router = require('express').Router();
/**
 *  GET all users
 * endpoint /users
 */
router.get('/', async (req, res) =>{
  // import the model to work on
  try{
    const users = await User.find();
    // Mongodb always returns a json object, dynamodb with amazon also returns json obj.
    res.status(200).json(users)
  }catch(err){
    res.status(500).json({message: "error in user get route", Error: err})
  }
})
/**
 *  GET user by email
 * endpoint /users:email
 */
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
/**
 *  Update user by :id
 *  /users:id
 */
router.put('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if either username or email is provided
    if (!req.body.username && !req.body.email) {
      return res.status(400).json({ message: 'Error, no username or email passed' });
    }

    // Update username if provided
    if (req.body.username) {
      user.username = req.body.username;
    }

    // Update email if provided
    if (req.body.email) {
      user.email = req.body.email;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
/**
 *  Delete user by Email
 *  /users:email
 */
router.delete('/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // /**
  //  * POST a new user
  //  * endpoint /api/users
  //  */ 
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    console.error('Error:', err); // Log the entire error object
    res.status(500).json(err);
  }
});
  
  module.exports = router;