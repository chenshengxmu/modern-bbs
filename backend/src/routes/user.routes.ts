import { Router } from 'express';
import { getLeaderboard, getUserProfile } from '../controllers/user.controller';

const router = Router();

router.get('/leaderboard', getLeaderboard);
router.get('/profile/:username', getUserProfile);

export default router;
