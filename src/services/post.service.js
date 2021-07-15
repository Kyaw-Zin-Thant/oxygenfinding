import Region from '../models/region'
import Township from '../models/township'
import Post from '../models/post'

async function getPostService ({ regionName, townshipName }) {
  try {
    const region = await Region.findOne({ name: regionName })
    if (!region) {
      const err = new Error()
      err.message = 'Region not found.'
      err.status = 400
      throw err
    }
    const township = await Township.findOne({ name: townshipName })
    if (!township) {
      const err = new Error()
      err.message = 'Township not found.'
      err.status = 400
      throw err
    }
    const post = await Post.find({
      regionId: region._id,
      townshipId: township._id
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
}) {
  try {
    const region = await Region.findOne({ name: regionName })
    if (!region) {
      const err = new Error()
      err.message = 'Region not found.'
      err.status = 400
      throw err
    }
    const township = await Township.findOne({ name: townshipName })
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

export { getPostService, createPostService }
