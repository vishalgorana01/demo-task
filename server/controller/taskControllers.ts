import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to GET all Tasks' });
  }
};

export const getTaskById = async(req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      // user: req.user!.id,
    });
    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to create Task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Database Error: Failed to delete Task' });
  }
};


// To be corrected
export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const updates = req.body;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Find the task and update it
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error });
  }

};