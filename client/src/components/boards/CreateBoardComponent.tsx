import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import StyledLink from "../../ui/StyledLink";
import { useState } from "react";
import { useCreateBoard } from "./useCreateBoard";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: center;
`;

function CreateBoardComponent() {
  const [title, setTitle] = useState("");
  const { createBoard, isPending } = useCreateBoard();

  const handleCreate = () => {
    if (!title) {
      toast.error("A board must have a title!");
      return;
    }
    createBoard({ title });
  };
  return (
    <Container>
      <Input
        placeholder="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variation="primary" disabled={isPending} onClick={handleCreate}>
        {isPending ? <Spinner size={3} /> : "CREATE"}
      </Button>
      <StyledLink to="/board">*Already have a board? Click here</StyledLink>
    </Container>
  );
}

export default CreateBoardComponent;
