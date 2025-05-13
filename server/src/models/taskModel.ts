import mongoose, { Document, Schema } from "mongoose";
import Board from "./boardModel";

export interface ITask extends Document {
  boardId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: "todo" | "inProgress" | "done";
}

const taskSchema = new Schema<ITask>({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: [true, "A task must belong to a board"],
  },
  title: { type: String, required: [true, "A task must have a title"] },
  description: { type: String },
  status: {
    type: String,
    enum: ["todo", "inProgress", "done"],
    default: "todo",
  },
});

taskSchema.post("save", async function (doc, next) {
  try {
    await Board.findByIdAndUpdate(doc.boardId, {
      $addToSet: { tasks: doc._id },
    });
    next();
  } catch (err: any) {
    next(err);
  }
});

taskSchema.pre("findOneAndDelete", async function (next) {
  const task = await this.model.findOne(this.getQuery());
  if (task) {
    await Board.findByIdAndUpdate(task.boardId, {
      $pull: { tasks: task._id },
    });
  }
  next();
});

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
