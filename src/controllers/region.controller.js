import {
  getRegionService,
  createRegionService
} from '../services/region.service'

async function getRegion (req, res, next) {
  try {
    const region = await getRegionService()
    res.status(200).send(region)
  } catch (error) {
    next(error)
  }
}

async function createRegion (req, res, next) {
  try {
    const { regionList } = req.body
    const region = await createRegionService({ regionList })
    res.status(200).send(region)
  } catch (error) {
    next(error)
  }
}

export { getRegion, createRegion }
