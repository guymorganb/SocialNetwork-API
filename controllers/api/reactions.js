const express = require('express');
const router = express.Router();
const {User} = require('../../schema/schema')
const { Thought } = require('../../schema/schema');
const {Reaction} = require('../../schema/schema')
const mongoose = require('mongoose')
/**
 * Post route to add a reaction
 * endpoint api/reactions/:userId/:thoughtId
 */
router.post("/:userId/:thoughtId", async (req, res) => {
  try {
    // Extract the reaction from the request body
    const reaction = req.body.reaction;

    // Find the user by the given user ID
    const user = await User.findById(req.params.userId);
    
    // Check if user was found
    if (!user) {
      return res.status(404).json({ Message: 'User not found' });
    }
    
    // Check if reaction was passed in the request
    if (!reaction) {
      return res.status(400).json({ Message: 'No reaction was passed' });
    }

    // Find the thought with the matching ID
    const thought = await Thought.findById(req.params.thoughtId);
    
    // Check if thought was found
    if (!thought) {
      return res.status(404).json({ Message: 'Thought not found' });
    }

    // Create a new Reaction instance with the provided reaction and username
    const newReaction = new Reaction({
      reactionBody: reaction,
      username: user.username
    });

    // Push the new reaction to the thought's reactions array
    thought.reactions.push(newReaction);

    // Save the updated thought to the database
    await thought.save();

    // Respond with the new reaction
    res.status(200).json({ newReaction });
  } catch (err) {
    // Log any errors to the console
    console.error(err);
    // Respond with a 500 status code and a message indicating an error occurred
    res.status(500).json({ message: "Error creating a new reaction by id" });
  }
});
/**
 * DELETE route, to delete a reaction
 * 
 * endpoint /api/reactions/:reactionId
 */
router.delete('/:reactionId', async (req, res) => {
  try {
    // Get the reactionId from the request parameters
    const reactionId = req.params.reactionId;

    // Find the thought that contains the reaction with the given ID
    const thought = await Thought.findOne({ "reactions.reactionId": reactionId });

    // If no thought is found, return a 404 error
    if (!thought) {
      return res.status(404).json({ message: 'Reaction not found' });
    }

    // Find the index of the reaction with the given ID
    const reactionIndex = thought.reactions.findIndex(reaction => reaction.reactionId.toString() === reactionId);

    // If the reaction is found, remove it from the thought's reactions array
    if (reactionIndex > -1) {
      thought.reactions.splice(reactionIndex, 1);
      await thought.save(); // Save the updated thought
      return res.status(200).json({ message: 'Reaction deleted successfully' });
    }

    // If the reaction is not found within the thought, return a 404 error
    return res.status(404).json({ message: 'Reaction not found' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting reaction by id" });
  }
});

module.exports = router;