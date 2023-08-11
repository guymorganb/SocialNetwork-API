/**
 * Route for user GET/POST/PUT/DELETE
 * 
 */
const { Thought } = require('../../schema/schema');
const { User } = require('../../schema/schema');
const router = require('express').Router();
/**
*  Post new thought
* endpoint api/thoughts:_id
*/
router.post('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: 'no user found' });
    }
    if (!req.body.thoughtText) {
      return res.status(400).json({ message: 'no thought text was passed' });
    }
    
    // Create a new Thought object
    const thought = new Thought({
      thoughtText: req.body.thoughtText,
      username: user.username // associate the username with the thought
    });

    // Save the new Thought
    await thought.save();

    // Add the new Thought's _id to the user's thoughts array
    user.thoughts.unshift(thought._id);

    // Save the updated User
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'error in thoughts post route', Error: err });
  }
});
/**
 * Delete Thought by id
 * endpoint /api/thoughts:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(400).json({ message: "no thought found" });
    }

    // Find the user who has this thought
    const user = await User.findOne({ thoughts: req.params.id });
    if (user) {
      // Remove the thought ID from the user's thoughts array
      const index = user.thoughts.indexOf(req.params.id);
      if (index > -1) {
        user.thoughts.splice(index, 1);
        await user.save();
      }
    }

    // Delete the thought itself
    await Thought.findByIdAndDelete(req.params.id);

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: "error in thoughts delete route", Error: err });
  }
});
/**
*  GET all thoughts
* endpoint /api/thoughts
*/
router.get('/', async (req, res) =>{
  // import the model to work on
  try{
    const thoughts = await Thought.find();
    // Mongodb always returns a json object, dynamodb with amazon also returns json obj.
    if (!thoughts || thoughts.length === 0) {
      return res.status(400).json({ message: "no thoughts found" });
    }
    res.status(200).json(thoughts)
  }catch(err){
    res.status(500).json({message: "error in thoughts get route", Error: err})
  }
})
/**
*  GET thoughts by:id
* endpoint /api/thoughts:id
*/
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error in retrieving thought', Error: err });
  }
});
/**
 * PUT request update by :id
 * endpoint api/thoughs/:id  
 */
router.put('/:id', async (req, res) => {
  try {
    // Find the thought by ID
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: "No thought found with that id" });
    }

    // Update the fields you want to change
    if (req.body.thoughtText) {
      thought.thoughtText = req.body.thoughtText;
    }

    // Save the updated thought
    await thought.save();

    // Respond with the updated thought
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Error in updating thought', Error: err });
  }
});

module.exports = router;