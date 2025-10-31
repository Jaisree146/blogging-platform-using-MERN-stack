import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { addComment, listComments } from '../controllers/comment.controller.js';

const router = Router();

router.get('/:slug', listComments);
router.post('/:slug', requireAuth, addComment);

export default router;
