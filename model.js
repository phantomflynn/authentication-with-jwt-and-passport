const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true 
  },
  password: {
    type: String,
    required: true
  }
})

// do something before every 'save' request
userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) { return next(err) }
    this.password = hash;
    return next();
  })
})

userSchema.methods.validatePassword = function(passwordGuess) { 
  return bcrypt.compare(passwordGuess, this.password); 
}

module.exports = mongoose.model('User', userSchema);