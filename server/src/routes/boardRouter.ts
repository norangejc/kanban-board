import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoardById,
  updateBoard,
} from "../controllers/boardController";

const router = express.Router();

router.route("/").post(createBoard);
router.route("/:id").get(getBoardById).patch(updateBoard).delete(deleteBoard);

export default router;
