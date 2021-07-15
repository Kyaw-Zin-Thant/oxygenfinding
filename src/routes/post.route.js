import express from 'express'

import { getPost, createPost } from '../controllers/post.controller'

const router = express.Router()

router.get('/', getPost)
router.post('/', createPost)

export default app => {
  app.use('/posts', router)
}
