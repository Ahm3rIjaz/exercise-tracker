const exercisesRouter = require('express').Router()
const exercise = require('../models/exercise')
const Exercise = require('../models/exercise')
const User = require('../models/user')

exercisesRouter.post('/:id/exercises', async (request, response) => {
  try {
    const body = request.body
    const id = request.params.id
    console.log(body)
    const user = await User.findById(id)
    body.date = body.date === '' ? new Date() : body.date
    const exercise = new Exercise({...body, user: id})
    const newExercise = await exercise.save()
    user.exercises = user.exercises.concat(newExercise._id)
    const updatedUser = await user.save()
    return response.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      ...newExercise.toJSON()
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = exercisesRouter