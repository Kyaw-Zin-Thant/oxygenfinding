import express from 'express'

import { getPost, createPost, likePost } from '../controllers/post.controller'

import { checkAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', getPost)
router.post('/', createPost)
router.put('/:id/like', checkAuth, likePost)

export default app => {
  app.use('/posts', router)
}
