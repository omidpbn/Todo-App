"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useTaskStore } from "../../../store/useTaskStore";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import TaskModal from "../../molecules/TaskModal";
import Button from "@/src/shared/components/atoms/button";

export const TaskBoard = () => {
  const tasks = useTaskStore((s) => s.tasks);
  const moveTask = useTaskStore((s) => s.moveTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const [isOpen, setIsOpen] = useState(false);
  const [selectTask, setSelectTask] = useState<Task | null>(null);

  // State for mobile collapsed columns
  const [activeColumn, setActiveColumn] = useState<null | string>(null);
  const [isMobile, setIsMobile] = useState(false);

  const columns = ["backlog", "todo", "inprogress", "done"] as const;

  // Detect screen size and adjust mobile collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setActiveColumn(""); // default collapsed on mobile
      } else {
        setIsMobile(false);
        setActiveColumn(null); // all columns open on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle drag and drop
  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    moveTask(draggableId, destination.droppableId as any);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={`grid ${!isMobile ? "lg:grid-cols-4 md:grid-cols-2 grid-cols-1" : "grid-cols-1"} gap-4 mt-6`}
          style={!isMobile ? { minHeight: "calc(100vh - 7.5rem)" } : {}}
        >
          {columns.map((col) => {
            const isCollapsed = isMobile && activeColumn !== col;
            const colTasks = tasks.filter((t) => t.status === col);

            return (
              <Droppable droppableId={col} key={col}>
                {(provided) => (
                  // Column container: flex-col, height auto
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gray-100 dark:bg-gray-800 p-3 rounded flex flex-col ${isCollapsed ? "h-12 cursor-pointer" : ""}`}
                  >
                    {/* Column header */}
                    <h3
                      className="font-bold mb-2 dark:text-gray-200 flex justify-between items-center flex-shrink-0"
                      onClick={() => isMobile && setActiveColumn(col)}
                    >
                      {col.toUpperCase()}
                    </h3>

                    {/* Only render tasks when column is expanded */}
                    {!isCollapsed && (
                      <div className="flex-1 overflow-y-auto flex flex-col gap-3" style={{ maxHeight: "calc(100vh - 6rem)" }}>
                        {colTasks.length > 0 ? (
                          colTasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white dark:bg-slate-700 rounded shadow space-y-2 px-4 py-4"
                                >
                                  <p className="font-semibold dark:text-white">{task.title}</p>
                                  <p className="dark:text-gray-300">{task.description}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Est: {task.estimate}</p>
                                  <p className="text-sm text-gray-400 dark:text-gray-500">Time Log: {task.timeLog}</p>

                                  <div className="w-full flex items-center gap-4">
                                    <Button
                                      color="blue"
                                      size="xs"
                                      outline
                                      className="border-none dark:text-blue-400 dark:border-blue-400"
                                      onClick={() => {
                                        setSelectTask(task);
                                        setIsOpen(true);
                                      }}
                                    >
                                      Edit
                                    </Button>

                                    <Button
                                      color="red"
                                      size="xs"
                                      outline
                                      className="border-none dark:text-red-400 dark:border-red-400"
                                      onClick={() => {
                                        try {
                                          deleteTask(task.id);
                                        } catch (err: any) {
                                          toast.error(err.message, {
                                            position: "top-center",
                                            toastId: "delete-task-error",
                                          });
                                        }
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          // Placeholder for empty column
                          <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 italic">No tasks yet</div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* Task modal for create/edit */}
      {isOpen && <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} titleModal="Edit Task" taskToEdit={selectTask} />}
    </>
  );
};
