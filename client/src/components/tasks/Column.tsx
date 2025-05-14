import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Task } from "../../types/task";
import styled from "styled-components";
import { HiPlus } from "react-icons/hi2";
import AddTask from "./AddTask";

const ColumnContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--violet);
  border-radius: var(--border-radius-l);
  padding: 1rem 1rem 2rem 1rem;
  color: var(--white);
  box-shadow: 0px 0px 25px var(--green-shadow);

  & h3 {
    text-align: center;
  }
`;
const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type Props = {
  id: string;
  title: string;
  tasks: Task[];
};
export default function Column({ id, title, tasks }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <ColumnContainer ref={setNodeRef}>
      <h3>{title}</h3>
      <Tasks>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
        {id === "todo" && <AddTask />}
      </Tasks>
    </ColumnContainer>
  );
}
