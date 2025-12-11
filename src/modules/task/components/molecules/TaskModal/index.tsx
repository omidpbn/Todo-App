import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import Input from "@/src/shared/components/atoms/input";
import Button from "@/src/shared/components/atoms/button";
import ModalCustom from "@/src/shared/components/atoms/modal";
import { useTaskStore } from "../../../store/useTaskStore";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal: string;
  taskToEdit?: Task | null;
}

const TaskModal = ({ isOpen, onClose, titleModal, taskToEdit }: TaskModalProps) => {
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.addTask);
  const updateTask = useTaskStore((s) => s.updateTask);

  const validationModal = Yup.object({
    title: Yup.string().required("Title is required").min(4).max(150),
    description: Yup.string().max(300),
    estimate: Yup.string()
      .required("Estimate is required")
      .matches(/^(?:\d{1,3}|(?:(?:\d+h)?(?:\d+m)?(?:\d+s)?))$/, "Estimate must be a number (max 3 digits) or use h/m/s format like 2h, 30m, 10s"),
  });

  const formik = useFormik({
    initialValues: {
      title: taskToEdit?.title || "",
      description: taskToEdit?.description || "",
      estimate: taskToEdit?.estimate || "",
    },
    validationSchema: validationModal,
    onSubmit: (values) => {
      const exists = tasks.some((t) => t.title.trim().toLowerCase() === values.title.trim().toLowerCase() && t.id !== taskToEdit?.id);

      if (exists) {
        toast.error("Task with this title already exists!", {
          toastId: "task-exists",
          position: "top-center",
        });
        return;
      }

      if (taskToEdit) {
        updateTask({
          ...taskToEdit,
          title: values.title,
          description: values.description,
          estimate: values.estimate,
        });

        toast.success("Task updated successfully", {
          position: "top-center",
          toastId: "update-task",
        });
      } else {
        addTask({
          id: uuid(),
          title: values.title,
          description: values.description,
          estimate: values.estimate,
          status: "backlog",
          timeLog: 0,
        });

        toast.success("Task added successfully", {
          position: "top-center",
          toastId: "add-task",
        });
      }

      onClose();
    },
  });

  return (
    <ModalCustom isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-lg font-bold mb-4 dark:text-white">{titleModal}</h2>

        <div className="mb-3">
          <Input
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {formik.touched.title && formik.errors.title && <span className="text-xs font-normal text-red-500 px-1">{formik.errors.title}</span>}
        </div>

        <div className="mb-3">
          <Input
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {formik.touched.description && formik.errors.description && (
            <span className="text-xs font-normal text-red-500 px-1">{formik.errors.description}</span>
          )}
        </div>

        <div className="mb-3">
          <Input
            label="Estimate"
            name="estimate"
            value={formik.values.estimate}
            onChange={formik.handleChange}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          {formik.touched.estimate && formik.errors.estimate && (
            <span className="text-xs font-normal text-red-500 px-1">{formik.errors.estimate}</span>
          )}
        </div>

        <div className="w-full flex flex-row items-center gap-2">
          <Button type="submit" color="green" className="w-full dark:bg-green-600 dark:text-white dark:hover:bg-green-500">
            {taskToEdit ? "Update" : "Create"}
          </Button>
          <Button color="red" outline onClick={onClose} className="w-full dark:text-red-400 dark:border-red-400">
            Cancel
          </Button>
        </div>
      </form>
    </ModalCustom>
  );
};

export default TaskModal;
