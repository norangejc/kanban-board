const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/v1/tasks";

export async function createTask({
  boardId,
  title,
  description = "",
}: {
  boardId: string;
  title: string;
  description: string;
}) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      boardId,
      title,
      description,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.data.task;
}

export async function deleteTask({ id }: { id: string }) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function editTask({
  id,
  status,
  title,
  description,
}: {
  id: string;
  status: string;
  title: string;
  description: string;
}) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      title,
      description,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.data.task;
}
