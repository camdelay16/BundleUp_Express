const {Schema} = require('mongoose');

// Define the schema for the Deal model
const Deal = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User', 
  },

  // Description of the deal
  description: {
    type: String, 
    required: true, 
  },

  // Bundle number
  bundle_number: {
    type: Number, 
    required: true, 
  },

  // Timestamp when the deal was created
  timestamp: {
    type: Date, 
    default: Date.now, 
  },

  // Category of the deal
  category: {
    type: String, 
    required: false, 
  },

  // Array of joined users (user IDs)
  joined_users: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
    },
  ],

  // Array of comments (comment IDs)
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment', 
    },
  ],
});

// Add timestamps to automatically track createdAt and updatedAt fields
dealSchema.set('timestamps', true);



module.exports = Deal;