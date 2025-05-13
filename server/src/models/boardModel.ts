import mongoose, { Document, Schema } from "mongoose";
import Task from "./taskModel";

export interface IBoard extends Document {
  title?: string | null;
  tasks: mongoose.Types.ObjectId[];
}

const boardSchema = new Schema<IBoard>({
  title: { type: String, required: [true, "A board must have a title"] },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

boardSchema.pre("findOneAndDelete", async function (next) {
  const board = await this.model.findOne(this.getQuery());
  if (board) {
    await Task.deleteMany({ boardId: board._id });
  }
  next();
});

const Board = mongoose.model<IBoard>("Board", boardSchema);
export default Board;
