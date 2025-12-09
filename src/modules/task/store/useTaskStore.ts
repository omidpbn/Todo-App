import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: Task["status"]) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),

      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      deleteTask: (id) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === id);

        if (!task) {
          throw new Error("Task not found.");
        }

        if (task.status !== "backlog" && task.status !== "todo") {
          throw new Error(`Task cannot be deleted while in '${task.status}'.`);
        }

        set(() => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        }));
      },
    }),
    { name: "tasks-storage" }
  )
);
