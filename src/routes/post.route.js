import express from 'express';

import {
  getPost,
  createPost,
  likePost,
  dislikePost,
  commentPost,
} from '../controllers/post.controller';

import { checkAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', checkAuth, getPost);
router.post('/', createPost);
router.put('/:id/like', checkAuth, likePost);
router.put('/:id/dislike', checkAuth, dislikePost);
router.put('/:id/comment', checkAuth, commentPost);

export default (app) => {
  app.use('/posts', router);
};
