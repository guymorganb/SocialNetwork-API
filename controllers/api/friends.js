const express = require('express');
const router = express.Router();
const { User } = require('../../schema/schema');
const mongoose = require('mongoose')
/**
 * Get route for User friends
 * endpoint /api/friends/:id
 */
router.get('/:id', async (req, res) => {
  try{
    const user = await User.findById({ _id:req.params.id });
    if(!user){
      return res.status(404).json({message: "User not found for this id"})
    }
    const userFriends = {
      user: user.username,
      email: user.email,
      friends: user.friends,
      thoughts: user.thoughts
    }

    return res.status(200).json(userFriends)
  }catch(err){
    console.error(err); // Log the error to the console
    res.status(500).json({message: "Error in get friends by id route"})
  }
});
/**
 * Post route to add a users friend
 * endpoint /api/:newFriend/:id
 */
router.post("/:newFriendId/:id", async (req, res) => {
  try {
    const newFriendId = req.params.newFriendId;

    // Check if newFriendId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(newFriendId)) {
      return res.status(400).json({ message: "Invalid friend ID" });
    }

    // Check if the new friend exists in the database
    const newFriend = await User.findById(newFriendId);
    if (!newFriend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(newFriendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    user.friends.push(newFriendId);
    await user.save(); // Save the changes

    res.status(200).json(user);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: "An error occurred adding the friend", error: err.toString() });
  }
  
});
/**
 * delete route for User friends
 * endpoint /api/friends/:id/:username
 */
router.delete("/:id/:username", async (req, res) => {
  try {
    const friendToDelete = req.params.username;
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the friend's ObjectId by username
    const friend = await User.findOne({ username: friendToDelete });

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Check if the friend's ObjectId is in the user's friends array
    if (!user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "Friend not in user's friends list" });
    }

    // Pull the friend's ObjectId from the friends array
    // The pull method is used to remove all instances of a value from an array
    // In this case, it removes the friend's ObjectId from the user's friends array
    user.friends.pull(friend._id);

    // Save the user document with the updated friends array
    // This persists the changes in the database
    await user.save();

    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: "An error occurred" });
  }
});


// Define other routes for friends

module.exports = router;