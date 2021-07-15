import { createUserService } from '../services/user.service'

async function createUser (req, res, next) {
  try {
    const { name, phone } = req.body
    const user = await createUserService({ name, phone })
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

export { createUser }
