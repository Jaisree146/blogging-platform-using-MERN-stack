import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { requireAuth } from '../middleware/auth.js';
import { createPost, deletePost, getPost, listPosts, updatePost, toggleLike } from '../controllers/post.controller.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', listPosts);
router.get('/:slug', getPost);
router.post('/', requireAuth, upload.single('cover'), createPost);
router.put('/:slug', requireAuth, upload.single('cover'), updatePost);
router.delete('/:slug', requireAuth, deletePost);
router.post('/:slug/like', requireAuth, toggleLike);

export default router;
