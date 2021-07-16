import Region from '../models/region'
import Township from '../models/township'
import Post from '../models/post'

async function getPostService ({ regionId, townshipId, tomorrowUpdate }) {
  try {
    if (!regionId) {
      if (!townshipId) {
        if (tomorrowUpdate === 'true') {
          const post = await Post.find({ tomorrowUpdate: true })
          return post
        }
        const post = await Post.find({ tomorrowUpdate: false })
        return post
      }
      if (tomorrowUpdate === 'true') {
        const post = await Post.find({
          townshipId: townshipId,
          tomorrowUpdate: true
        })
        return post
      }
      const post = await Post.find({
        townshipId: townshipId,
        tomorrowUpdate: false
      })
      return post
    }
    if (!townshipId) {
      if (tomorrowUpdate === 'true') {
        const post = await Post.find({
          regionId: regionId,
          tomorrowUpdate: true
        })
        return post
      }
    }
    const region = await Region.findOne({ _id: regionId })
    if (!region) {
      const err = new Error()
      err.message = 'Region not found.'
      err.status = 400
      throw err
    }
    const township = await Township.findOne({ _id: townshipId })
    if (!township) {
      const err = new Error()
      err.message = 'Township not found.'
      err.status = 400
      throw err
    }
    if (tomorrowUpdate === 'true') {
      const post = await Post.find({
        regionId: region._id,
        townshipId: township._id,
        tomorrowUpdate: true
      })
      return post
    }
    const post = await Post.find({
      regionId: region._id,
      townshipId: township._id,
      tomorrowUpdate: false
    })
    return post
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

async function createPostService ({
  regionId,
  townshipId,
  status,
  plantName,
  address,
  phoneNumber,
  information,
  remark,
  size,
  tomorrowUpdate
}) {
  try {
    const region = await Region.findOne({ _id: regionId })
    if (!region) {
      const err = new Error()
      err.message = 'Region not found.'
      err.status = 400
      throw err
    }
    const township = await Township.findOne({ _id: townshipId })
    if (!township) {
      const err = new Error()
      err.message = 'Township not found.'
      err.status = 400
      throw err
    }
    const post = new Post({
      regionId: region._id,
      townshipId: township._id,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate
    })
    await post.save()
    return { message: 'Success.' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

async function likePostService ({ id, userId }) {
  try {
    const post = await Post.findOne({ _id: id })
    if (!post) {
      const err = new Error()
      err.message = 'Post not found.'
      err.status = 400
      throw err
    }
    let likes = post.metadata.likes
    const dislikes = post.metadata.dislikes
    const comments = post.metadata.comments
    const likeUsers = post.metadata.likeUsers
    const dislikeUsers = post.metadata.dislikeUsers
    const checkUser = likeUsers.includes(userId)
    if (checkUser) {
      likes = likes - 1
      const index = likeUsers.indexOf(userId)
      if (index > -1) {
        likeUsers.splice(index, 1)
      }
      await Post.findByIdAndUpdate(id, {
        metadata: {
          likes: likes,
          dislikes: dislikes,
          comments: comments,
          likeUsers: likeUsers,
          dislikeUsers: dislikeUsers
        }
      })
      return { message: 'Success' }
    }
    likes = likes + 1
    likeUsers.push(userId)
    await Post.findByIdAndUpdate(id, {
      metadata: {
        likes: likes,
        dislikes: dislikes,
        comments: comments,
        likeUsers: likeUsers,
        dislikeUsers: dislikeUsers
      }
    })
    return { message: 'Success.' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

async function dislikePostService ({ id, userId }) {
  try {
    const post = await Post.findOne({ _id: id })
    if (!post) {
      const err = new Error()
      err.message = 'Post not found.'
      err.status = 400
      throw err
    }
    const likes = post.metadata.likes
    let dislikes = post.metadata.dislikes
    const comments = post.metadata.comments
    const likeUsers = post.metadata.likeUsers
    const dislikeUsers = post.metadata.dislikeUsers
    const checkUser = dislikeUsers.includes(userId)
    if (checkUser) {
      dislikes = dislikes - 1
      const index = dislikeUsers.indexOf(userId)
      if (index > -1) {
        dislikeUsers.splice(index, 1)
      }
      await Post.findByIdAndUpdate(id, {
        metadata: {
          likes: likes,
          dislikes: dislikes,
          comments: comments,
          likeUsers: likeUsers,
          dislikeUsers: dislikeUsers
        }
      })
      return { message: 'Success' }
    }
    dislikes = dislikes + 1
    dislikeUsers.push(userId)
    await Post.findByIdAndUpdate(id, {
      metadata: {
        likes: likes,
        dislikes: dislikes,
        comments: comments,
        likeUsers: likeUsers,
        dislikeUsers: dislikeUsers
      }
    })
    return { message: 'Success.' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export {
  getPostService,
  createPostService,
  likePostService,
  dislikePostService
}
