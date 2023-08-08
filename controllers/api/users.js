const { User } = require('../models');
const router = require('express').Router();
/**
 *  GET all users
 * 
 */
router.get('/users', async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

/**
 * GET a single user by its _id and populated thought and friend data
 * 
 */ 
router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

/**
 * POST a new user
 * 
 */ 
router.post('/users', async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

/**
 * PUT to update a user by its _id
 * 
 */ 
router.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  /**
   * DELETE user by _id
   * 
   */
router.delete('/users/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.json(deletedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;