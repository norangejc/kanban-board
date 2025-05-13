import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { validateParams } from "../utils/validateParams";
import Task from "../models/taskModel";

// GET /api/v1/tasks/:id
export const getTaskById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await validateParams(req.params.id, Task);
    res.status(200).json({
      status: "success",
      data: { task },
    });
  }
);

// POST /api/v1/tasks
export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, status, boardId } = req.body;

    if (!title || !boardId) {
      return next(new AppError("Title and boardId are required", 400));
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      boardId,
    });

    res.status(201).json({
      status: "success",
      data: { task: newTask },
    });
  }
);

// PATCH /api/v1/tasks/:id
export const updateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await validateParams(req.params.id, Task);

    const { title, description, status } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    await task.save();

    res.status(200).json({
      status: "success",
      data: { task },
    });
  }
);

// DELETE /api/v1/tasks/:id
export const deleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await validateParams(req.params.id, Task);

    const deletedTask = await Task.findByIdAndDelete(task._id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
