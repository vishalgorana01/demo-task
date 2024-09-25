import express from 'express';
import { getAllTasks, getTaskById, createTask, deleteTask, updateTask } from '../controller/taskControllers';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTask);

export default router;