import User from '../models/user'
import jwt from 'jsonwebtoken'

async function createUserService ({ name, phone }) {
  try {
    const user = await User.findOne({ phone })
    if (user) {
      const token = await jwt.sign({ name, phone }, 'secret', {
        expiresIn: '24h'
      })
      return { ...user, ...{ token: token } }
    }
    const createUser = new User({
      name,
      phone
    })
    await createUser.save()
    const token = await jwt.sign({ name, phone }, 'secret', {
      expiresIn: '24h'
    })
    return { ...createUser, ...{ token: token } }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export { createUserService }
