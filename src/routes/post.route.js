import express from 'express'

import {
  getPost,
  createPost,
  likePost,
  dislikePost,
  commentPost,
  updatePost,
  deletePost
} from '../controllers/post.controller'

import { checkAuth } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/', checkAuth, getPost)
router.post('/', createPost)
router.put('/:id/like', checkAuth, likePost)
router.put('/:id/dislike', checkAuth, dislikePost)
router.put('/:id/comment', checkAuth, commentPost)
router.patch('/:id', checkAuth, updatePost)
router.delete('/:id', checkAuth, deletePost)

export default app => {
  app.use('/api/posts', router)
}
