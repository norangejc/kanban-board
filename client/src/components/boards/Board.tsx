import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import SpinnerContainer from "../../ui/SpinnerContainer";
import { useBoard } from "./useBoard";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import type { Task } from "../../types/task";
import Column from "../tasks/Column";
import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { useDeleteBoard } from "./useDeleteBoard";
import { useEditTask } from "../tasks/useEditTask";

const BoardContainer = styled.div`
  width: 100%;
  min-height: 35rem;
  display: grid;
  align-items: start;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 3rem;
  grid-gap: 2rem;
`;
const DeleteButton = styled(Button)`
  margin-top: 1.5rem;
  width: 20%;
  margin-left: 80%;
`;
const ModalContainer = styled.div`
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
function Board() {
  const { board, isPending } = useBoard();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { editTask } = useEditTask();
  const { deleteBoard, isPending: isDeleting } = useDeleteBoard();
  useEffect(() => {
    if (board?.tasks) setTasks(board.tasks);
  }, [board]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || !active.data.current) return;

    const taskId = active.id;
    const newStatus = over.id as Task["status"];

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const droppedTask = tasks.find((task) => task._id === taskId);
    if (droppedTask && droppedTask.status !== newStatus) {
      editTask({
        id: droppedTask._id,
        status: newStatus,
        title: droppedTask.title,
        description: droppedTask.description,
      });
    }
  }
  const groupedTasks = {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    done: tasks.filter((task) => task.status === "done"),
  };
  const handleDeleteBoard = () => {
    deleteBoard({ id: board._id });
  };
  if (isPending)
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  if (!board) return;
  return (
    <div>
      <h3>Title: {board.title}</h3>
      <h4>Id: {board._id}</h4>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <BoardContainer>
          <Column id="todo" title="To Do" tasks={groupedTasks.todo} />
          <Column
            id="inProgress"
            title="In Progress"
            tasks={groupedTasks.inProgress}
          />
          <Column id="done" title="Done" tasks={groupedTasks.done} />
        </BoardContainer>
      </DndContext>
      <Modal>
        <Modal.Open opens="delete">
          <DeleteButton variation="delete">DELETE BOARD</DeleteButton>
        </Modal.Open>
        <Modal.Window name="delete">
          <ModalContainer>
            <HiOutlineExclamationTriangle />
            <p>
              Are you sure you want to delete <br />
              <span>{board.title}</span>?
            </p>
            <Button
              variation="delete"
              disabled={isDeleting}
              onClick={handleDeleteBoard}
            >
              {" "}
              {isDeleting ? <Spinner size={3} /> : "DELETE"}
            </Button>
          </ModalContainer>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Board;
