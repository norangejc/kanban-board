import { HiPlus } from "react-icons/hi2";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useSearchParams } from "react-router-dom";
import { useCreateTask } from "./useCreateTask";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../ui/Modal";

const AddTaskContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--cream);
  height: 4rem;
  border-radius: var(--border-radius-m);
  color: var(--violet);

  & svg {
    width: 40px;
    height: 40px;
  }
  &:hover {
    background-color: var(--night);
    color: var(--ash-gray);
    transition: ease-in-out 300ms;
  }
`;
const ModalContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 4rem 2rem 4rem;
  background-color: var(--tea-green);
  border-radius: var(--border-radius-l);
  box-shadow: 0px 0px 25px var(--green-shadow);
  text-align: center;
`;

function AddTask() {
  const { createTask, isPending } = useCreateTask();
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = () => {
    if (!boardId) return;
    if (!title) return toast.error("Task must have a title!");

    createTask({ boardId, title, description });
  };
  return (
    <Modal>
      <Modal.Open opens="add">
        <AddTaskContainer>
          <HiPlus />
        </AddTaskContainer>
      </Modal.Open>
      <Modal.Window name="add">
        <ModalContainer>
          <strong>CREATE NEW TASK</strong>
          <Input
            placeholder="Task name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variation="primary"
            onClick={handleCreateTask}
            disabled={isPending}
          >
            {isPending ? <Spinner size={3} /> : "ADD TASK"}
          </Button>
        </ModalContainer>
      </Modal.Window>
    </Modal>
  );
}

export default AddTask;
