import express from 'express';

import { getRegion, createRegion } from '../controllers/region.controller';

const router = express.Router();

router.get('/', getRegion);
router.post('/', createRegion);

export default (app) => {
  app.use('api/regions', router);
};
