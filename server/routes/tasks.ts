import express from 'express';
import { getTasks, createTask, deleteTask, updateTasks } from '../controller/taskControllers';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/bulk', updateTasks);

export default router;