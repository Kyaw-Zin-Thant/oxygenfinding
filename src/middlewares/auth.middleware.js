import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'secret')
    req.userData = decoded
    next()
  } catch (error) {
    const err = new Error()
    err.message = 'Token Expired.'
    err.status = 400
    throw err
  }
}
