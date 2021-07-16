import {
  getTownshipService,
  createTownshipService
} from '../services/township.service'

async function getTownship (req, res, next) {
  try {
    const { regionId } = req.query
    const township = await getTownshipService({ regionId })
    res.status(200).send(township)
  } catch (error) {
    next(error)
  }
}

async function createTownship (req, res, next) {
  try {
    const { townshipList } = req.body
    const township = await createTownshipService({ townshipList })
    res.status(200).send(township)
  } catch (error) {
    next(error)
  }
}

export { getTownship, createTownship }
