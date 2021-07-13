const mongoose = require('mongoose')

const exerciseSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

exerciseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.date = returnedObject.date.toDateString(),
    delete returnedObject._id,
    delete returnedObject.__v,
    delete returnedObject.user
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)