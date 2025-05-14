import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../types/task";
import styled from "styled-components";
import {
  HiOutlineExclamationTriangle,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useDeleteTask } from "./useDeleteTask";
import Spinner from "../../ui/Spinner";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import { useState } from "react";
import { useEditTask } from "./useEditTask";
import toast from "react-hot-toast";

const TaskCardContainer = styled.div`
  background-color: var(--cream);
  padding: 1rem;
  border-radius: var(--border-radius-m);
  & p,
  strong {
    color: var(--night);
  }
`;

const Buttons = styled.div`
  padding-top: 1.3rem;
  display: flex;
  justify-content: end;
  & svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  & svg:hover {
    color: var(--asparagus);
    transition: ease-in-out 300ms;
  }
`;

const ModalDeleteContainer = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 4rem 2rem 4rem;
  background-color: var(--night);
  color: var(--white);
  border-radius: var(--border-radius-l);
  box-shadow: 0px 0px 25px var(--green-shadow);
  text-align: center;
  & svg {
    color: var(--violet);
    align-self: center;
    width: 3rem;
    height: 3rem;
  }
  & span {
    font-weight: bold;
  }
`;
const ModalCreateContainer = styled.div`
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
const Drag = styled.div`
  cursor: grab;
`;
type Props = {
  task: Task;
};
export default function TaskCard({ task }: Props) {
  const { deleteTask, isPending: isDeleting } = useDeleteTask();
  const { editTask, isPending: isUpdating } = useEditTask();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      task,
    },
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const handleDeleteTask = () => {
    deleteTask({ id: task._id });
  };
  const handleEditTask = () => {
    if (!title || !description) {
      toast.error("Please, fill in title and description");
      return;
    }
    editTask({ id: task._id, status: task.status, title, description });
  };
  return (
    <TaskCardContainer ref={setNodeRef} style={style} {...attributes}>
      <Drag {...listeners}>
        <strong>{task.title}</strong>
        <p>{task.description}</p>
      </Drag>

      <Buttons>
        <Modal>
          <Modal.Open opens="edit">
            <Button variation="icon">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Open opens="delete">
            <Button variation="icon">
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <ModalCreateContainer>
              <strong>EDIT TASK</strong>
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
                onClick={handleEditTask}
                disabled={isUpdating}
              >
                {isUpdating ? <Spinner size={3} /> : "UPDATE"}
              </Button>
            </ModalCreateContainer>
          </Modal.Window>
          <Modal.Window name="delete">
            <ModalDeleteContainer>
              <HiOutlineExclamationTriangle />
              <p>
                Are you sure you want to delete <br />
                <span>{task.title}</span>?
              </p>
              <Button
                variation="delete"
                disabled={isDeleting}
                onClick={handleDeleteTask}
              >
                {" "}
                {isDeleting ? <Spinner size={3} /> : "DELETE"}
              </Button>
            </ModalDeleteContainer>
          </Modal.Window>
        </Modal>
      </Buttons>
    </TaskCardContainer>
  );
}
