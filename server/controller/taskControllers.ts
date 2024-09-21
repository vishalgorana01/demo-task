import { Request, Response } from 'express';
import Task from '../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user!.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to GET all Tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user!.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to create Task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user!.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to delete Task' });
  }
};


// To be corrected
export const updateTasks = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body;
    const updateOperations = tasks.map((task: any) => ({
      updateOne: {
        filter: { _id: task._id, user: req.user!.id },
        update: { $set: task },
      },
    }));

    await Task.bulkWrite(updateOperations);
    res.json({ message: 'Tasks updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to update Tasks ' });
  }
};