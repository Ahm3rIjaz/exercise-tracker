const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    return response.json(users)
  } catch (error) {
    console.log(error)
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const user = new User(body)
    const newUser = await user.save()
    return response.json(newUser)
  } catch (error) {
    console.log(error)
  }
})

usersRouter.get('/:id/logs', async (request, response) => {
  try {
    const id = request.params.id
    const userExercises = await User.findById(id).populate('exercises', { description: 1, duration: 1, date: 1 })
    const queries = request.query
    console.log('exercises', userExercises)
    console.log('query', queries)
    console.log('date', new Date(queries.from))
    let log = userExercises.exercises
    if (queries.from) {
      if (queries.to) {
        log = userExercises.exercises.filter(
          exercise => exercise.date >= new Date(queries.from) && exercise.date <= new Date(queries.to)
        )
      } else {
        log = userExercises.exercises.filter(exercise => exercise.date >= new Date(queries.from))
      }
    }
    if (queries.limit) {
      log = log.slice(0, queries.limit)
    }
    return response.json({
      _id: userExercises._id,
      username: userExercises.username,
      count: log.length,
      log
    })
    // return response.json({
    //   _id: userExercises._id,
    //   username: userExercises.username,
    //   count: userExercises.exercises.length,
    //   log: userExercises.exercises
    // })
  } catch (error) {
    console.log(error)
  }
})

module.exports = usersRouter