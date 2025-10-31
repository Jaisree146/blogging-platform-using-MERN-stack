import { Router } from 'express';
import { achievements } from '../controllers/stats.controller.js';

const router = Router();

router.get('/achievements', achievements);

export default router;
