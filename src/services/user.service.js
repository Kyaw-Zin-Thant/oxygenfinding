import User from '../models/user'
import jwt from 'jsonwebtoken'

async function createUserService ({ name, phone }) {
  try {
    const user = await User.findOne({ phone })
    if (user) {
      const userId = user._id
      const token = await jwt.sign({ userId }, 'secret', {
        expiresIn: '24h'
      })
      return { token: token }
    }
    const createUser = new User({
      name,
      phone
    })
    await createUser.save()
    const userId = createUser._id
    const token = await jwt.sign({ userId }, 'secret', {
      expiresIn: '24h'
    })
    return { token: token }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export { createUserService }
