import { Router } from 'express';
import { getBoards } from '../controllers/board.controller';

const router = Router();

router.get('/', getBoards);

export default router;
