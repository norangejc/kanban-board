import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import StyledLink from "../../ui/StyledLink";
import { useBoard } from "./useBoard";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-gap: 1rem;
`;
function SearchBoard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("boardId") || "");
  const { isPending } = useBoard();
  const handleSearchChange = () => {
    const trimmed = search.trim();

    const isValidMongoId = /^[a-f\d]{24}$/i.test(trimmed);

    if (!isValidMongoId) {
      toast.error("Please enter a valid board ID!");
      return;
    }

    setSearchParams({ boardId: trimmed });
  };
  return (
    <Container>
      <Input
        placeholder="Enter a board ID here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        variation="primary"
        onClick={handleSearchChange}
        disabled={isPending}
      >
        LOAD
      </Button>
      <StyledLink to="/board/create">Create new board +</StyledLink>
    </Container>
  );
}

export default SearchBoard;
