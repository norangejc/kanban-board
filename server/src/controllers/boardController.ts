import { Request, Response, NextFunction } from "express";
import Board from "../models/boardModel";
import catchAsync from "../utils/catchAsync";
import { validateParams } from "../utils/validateParams";

// GET /api/v1/boards/:id
export const getBoardById = catchAsync(async (req: Request, res: Response) => {
  const board = await validateParams(req.params.id, Board);
  await board.populate("tasks"); // Populate after validation
  res.status(200).json({
    status: "success",
    data: { board },
  });
});

// POST /api/v1/boards
export const createBoard = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await Board.create({ title });
  res.status(201).json({
    status: "success",
    data: { board },
  });
});

// PATCH /api/v1/boards/:id
export const updateBoard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const board = await validateParams(req.params.id, Board);

    board.title = req.body.title || board.title;
    await board.save();

    res.status(200).json({
      status: "success",
      data: { board },
    });
  }
);

// DELETE /api/v1/boards/:id
export const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  const board = await validateParams(req.params.id, Board);
  const deletedBoard = await Board.findByIdAndDelete(board._id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
