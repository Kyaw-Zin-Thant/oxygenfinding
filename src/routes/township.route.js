import express from 'express';

import {
  getTownship,
  createTownship,
} from '../controllers/township.controller';

const router = express.Router();

router.get('/', getTownship);
router.post('/', createTownship);

export default (app) => {
  app.use('/api/townships', router);
};
