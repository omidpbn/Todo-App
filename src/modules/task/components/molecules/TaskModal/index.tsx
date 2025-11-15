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
}

const TaskModal = ({ isOpen, onClose }: TaskModalProps) => {
  const { addTask } = useTaskStore();

  const validationModal = Yup.object({
    title: Yup.string().required().min(4).max(150),
    description: Yup.string().max(300),
    estimate: Yup.string().required().max(3),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      estimate: "",
    },

    validationSchema: validationModal,

    onSubmit: (values) => {
      addTask({
        id: uuid(),
        title: values.title,
        description: values.description,
        estimate: Number(values.estimate),
        status: "backlog",
        timeLog: 0,
      });
      onClose();
      toast.success("Task added successfully", {
        toastId: "add-task",
        position: "top-right",
      });
    },
  });

  return (
    <ModalCustom isOpen={isOpen} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Create New Task</h2>

        <div className="mb-3">
          <Input label="Title" name="title" value={formik.values.title} onChange={formik.handleChange} />
          {formik.touched.title && formik.errors.title && <span className="text-xs font-normal text-red-500 px-1">{formik.errors.title}</span>}
        </div>

        <div className="mb-3">
          <Input label="Description" name="description" value={formik.values.description} onChange={formik.handleChange} />
          {formik.touched.description && formik.errors.description && (
            <span className="text-xs font-normal text-red-500 px-1">{formik.errors.description}</span>
          )}
        </div>

        <div className="mb-3">
          <Input label="Estimate" name="estimate" value={formik.values.estimate} onChange={formik.handleChange} />
          {formik.touched.estimate && formik.errors.estimate && (
            <span className="text-xs font-normal text-red-500 px-1">{formik.errors.estimate}</span>
          )}
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button type="submit" color="green">
            Create
          </Button>
          <Button color="red" outline onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </ModalCustom>
  );
};

export default TaskModal;
