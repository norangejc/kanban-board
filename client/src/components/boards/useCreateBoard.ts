import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createBoard as createBoardApi } from "../../services/apiBoards";

export function useCreateBoard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createBoard, isPending } = useMutation({
    mutationFn: createBoardApi,
    onSuccess: (board) => {
      toast.success("Board was created successfully!");
      queryClient.setQueryData(["board", board._id], board);
      navigate(`/board?boardId=${board._id}`, { replace: true });
    },
    onError: () => {
      toast.error("Something went wrong! Try again later");
    },
  });
  return { createBoard, isPending };
}
