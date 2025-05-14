import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editTask as editTaskApi } from "../../services/apiTasks";
import { useSearchParams } from "react-router-dom";
import type { Task } from "../../types/task";

export function useEditTask() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");

  const { mutate: editTask, isPending } = useMutation({
    mutationFn: editTaskApi,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(["board", boardId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          tasks: oldData.tasks.map((task: Task) =>
            task._id === updatedTask._id ? updatedTask : task
          ),
        };
      });
      toast.success(`Task was successfully updated`);
    },

    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { editTask, isPending };
}
