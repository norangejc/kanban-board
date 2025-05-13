import validator from "validator";
import AppError from "./appError";
import { Model, Document } from "mongoose";

export const validateParams = async <T extends Document>(
  id: string,
  schema: Model<T>
): Promise<T> => {
  if (!validator.isMongoId(id)) {
    throw new AppError("The value is not a Mongo ID", 400);
  }

  const data = await schema.findById(id);
  if (!data) {
    throw new AppError("No data found with that ID", 404);
  }

  return data;
};
