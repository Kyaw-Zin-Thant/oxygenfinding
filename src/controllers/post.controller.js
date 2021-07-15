import {
  getPostService,
  createPostService,
  likePostService
} from '../services/post.service'

async function getPost (req, res, next) {
  try {
    const { regionName, townshipName } = req.query
    const post = await getPostService({ regionName, townshipName })
    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

async function createPost (req, res, next) {
  try {
    const {
      regionName,
      townshipName,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate
    } = req.body
    const post = await createPostService({
      regionName,
      townshipName,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate
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

export { getPost, createPost, likePost }
