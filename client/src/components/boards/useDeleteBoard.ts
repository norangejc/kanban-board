import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteBoard as deleteBoardApi } from "../../services/apiBoards";
import toast from "react-hot-toast";

export function useDeleteBoard() {
  const navigate = useNavigate();
  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: deleteBoardApi,
    onSuccess: () => {
      toast.success(`Board was deleted successfully`);
      navigate("/board/create");
    },

    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteBoard, isPending };
}
