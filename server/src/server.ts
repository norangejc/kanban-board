import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

process.on("uncaughtException", (err: Error) => {
  console.log("UNHANDLED EXEPTION!💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });

if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  throw new Error(
    "DATABASE and DATABASE_PASSWORD must be defined in config.env"
  );
}

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App ${process.env.NODE_ENV} running on port ${port}...`);
});

process.on("unhandledRejection", (err: unknown) => {
  console.log("UNHANDLED REJECTION!💥 Shutting down...");
  if (err instanceof Error) {
    console.log(err.name, err.message);
  } else {
    console.log(err);
  }

  server.close(() => {
    process.exit(1);
  });
});
