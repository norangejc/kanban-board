import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.route("/").post(createTask);
router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

export default router;
