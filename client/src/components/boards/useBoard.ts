import { useQuery } from "@tanstack/react-query";
import { getBoardById } from "../../services/apiBoards";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function useBoard() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("boardId");

  const isValidMongoId = id && /^[a-f\d]{24}$/i.test(id);

  const {
    data: board,
    isPending,
    error,
  } = useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById({ id: id! }),
    enabled: !!isValidMongoId,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (error) {
      toast.error(
        `Error loading board: ${
          (error as Error).message || "Something went wrong"
        }`
      );
    }
  }, [error]);

  return {
    board: isValidMongoId ? board : null,
    isPending: isValidMongoId ? isPending : false,
  };
}
