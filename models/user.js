const mongoose = require('mongoose'),
  Schema = mongoose.Schema;


const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname not provided "],
  },
  email: {
    type: String,
    unique: [true, "email already exists "],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: '{VALUE} is not a valid email!'
    }

  },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"]
  },
  password: {
    type: String,
    minlength: [8, "password must have minimum 8 character"],
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);