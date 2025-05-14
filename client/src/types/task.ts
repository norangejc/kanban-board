export type Task = {
  _id: string;
  boardId: string;
  title: string;
  description: string;
  status: "todo" | "inProgress" | "done";
  __v: number;
};
