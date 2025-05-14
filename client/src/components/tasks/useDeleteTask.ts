import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTask as deleteTaskApi } from "../../services/apiTasks";
import { useSearchParams } from "react-router-dom";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board", boardId],
      });
      toast.success(`Task was deleted successfully`);
    },

    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteTask, isPending };
}
