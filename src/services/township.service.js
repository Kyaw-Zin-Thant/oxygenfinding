import Region from '../models/region'
import Township from '../models/township'

async function getTownshipService ({ regionId }) {
  try {
    const region = await Region.findOne({ _id: regionId })
    if (!region) {
      const err = new Error()
      err.message = 'Region not found.'
      err.status = 400
      throw err
    }
    const township = await Township.find({ regionId: region._id })
    return township
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

async function createTownshipService ({ townshipList }) {
  try {
    await Promise.all(
      townshipList.map(async element => {
        const region = await Region.findOne({ name: element.region })
        if (!region) {
          const err = new Error()
          err.message = 'Region not found.'
          err.status = 400
          throw err
        }
      })
    )
    await Promise.all(
      townshipList.map(async element => {
        const region = await Region.findOne({ name: element.region })
        const township = new Township({
          name: element.name,
          regionId: region._id
        })
        await township.save()
      })
    )
    return { message: 'Success.' }
  } catch (error) {
    const err = new Error()
    err.message = error.message
    err.status = error.status
    throw err
  }
}

export { getTownshipService, createTownshipService }
