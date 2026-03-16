import { Router } from 'express';
import { getPosts, getPostById, createPost, likePost } from '../controllers/post.controller';
import { addComment } from '../controllers/comment.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', authenticate, createPost);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/comments', authenticate, addComment);

export default router;
