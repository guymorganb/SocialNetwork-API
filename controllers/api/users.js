// const { User } = require('../models');
const router = require('express').Router();
/**
 *  GET all users
 * 
 */
router.get('/', (req, res) => {
    // User.find()
    //   .populate('thoughts')
    //   .populate('friends')
    //   .exec((err, users) => {
    //     if (err) {
    //       res.status(500).json(err);
    //     } else {
    //       res.status(200).json(users);
    //     }
    //   });
  });

// /**
//  * GET a single user by its _id and populated thought and friend data
//  * 
//  */ 
// router.get('/users/:id', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
//       res.json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// /**
//  * POST a new user
//  * 
//  */ 
// router.post('/users', async (req, res) => {
//     try {
//       const newUser = await User.create(req.body);
//       res.json(newUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// /**
//  * PUT to update a user by its _id
//  * 
//  */ 
// router.put('/users/:id', async (req, res) => {
//     try {
//       const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       res.json(updatedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   /**
//    * DELETE user by _id
//    * 
//    */
// router.delete('/users/:id', async (req, res) => {
//     try {
//       const deletedUser = await User.findByIdAndDelete(req.params.id);
//       res.json(deletedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  module.exports = router;