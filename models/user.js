const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 4,
    maxLength: 15
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      default: []
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v,
    delete returnedObject.exercises
  }
})

module.exports = mongoose.model('User', userSchema)