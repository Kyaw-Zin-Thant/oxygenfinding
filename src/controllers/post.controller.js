import {
  getPostService,
  createPostService,
  likePostService,
  dislikePostService,
  commentPostService,
  updatePostService,
  deletePostService
} from '../services/post.service'

async function getPost (req, res, next) {
  try {
    let { regionId, townshipId, tomorrowUpdate, sorting, filter } = req.query
    filter == 'undefined' ? (filter = '') : ''
    const { userId } = req.userData
    const post = await getPostService({
      regionId,
      townshipId,
      tomorrowUpdate,
      userId,
      sorting,
      filter
    })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function createPost (req, res, next) {
  try {
    const {
      regionId,
      townshipId,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate,
      getDate,
      type
    } = req.body
    const post = await createPostService({
      regionId,
      townshipId,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate,
      getDate,
      type
    })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function likePost (req, res, next) {
  try {
    const { id } = req.params
    const { userId } = req.userData
    const post = await likePostService({ id, userId })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function dislikePost (req, res, next) {
  try {
    const { id } = req.params
    const { userId } = req.userData
    const post = await dislikePostService({ id, userId })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function commentPost (req, res, next) {
  try {
    const { id } = req.params
    const { userId } = req.userData
    const { text } = req.body
    const post = await commentPostService({ id, userId, text })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function updatePost (req, res, next) {
  try {
    const { id } = req.params
    const updateData = req.body
    const post = await updatePostService({ id, updateData })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function deletePost (req, res, next) {
  try {
    const { id } = req.params
    const post = await deletePostService({ id })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

export {
  getPost,
  createPost,
  likePost,
  dislikePost,
  commentPost,
  updatePost,
  deletePost
}
