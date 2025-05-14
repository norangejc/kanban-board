import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createTask as createTaskApi } from "../../services/apiTasks";
import type { Task } from "../../types/task";
import { useSearchParams } from "react-router-dom";

export function useCreateTask() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: createTaskApi,
    onSuccess: (task: Task) => {
      toast.success("Task was created successfully!");
      queryClient.setQueryData(["board", boardId], (oldData: any) => {
        if (!oldData) return oldData;
        return { ...oldData, tasks: [...oldData.tasks, task] };
      });
    },
    onError: () => {
      toast.error("Something went wrong! Try again later");
    },
  });
  return { createTask, isPending };
}
