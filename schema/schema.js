/**
 * Schema/models for Users/Reactions/Friends
 */

// Import necessary modules and dependencies
const mongoose = require('mongoose');
const { Schema } = mongoose;

// in mongoose we make the schema and models in the same file

// Define the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual to retrieve the length of the user's friends array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Define the Thought schema
// Define the Reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        return createdAt.toLocaleString('en-US', options);
      }
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        };
        return createdAt.toLocaleString('en-US', options);
      }
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Virtual to retrieve the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


// Create the User model
const User = mongoose.model('User', userSchema);

// Create the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Create the Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema)
// Export the models
module.exports = { User, Thought, Reaction };
