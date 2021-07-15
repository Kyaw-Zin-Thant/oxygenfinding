import Region from '../models/region'

async function getRegionService () {
  try {
    const region = await Region.find({})
    return region
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

async function createRegionService ({ regionList }) {
  try {
    await Region.remove()
    await Region.insertMany(regionList)
    return { message: 'Success.' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export { getRegionService, createRegionService }
