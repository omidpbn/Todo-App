import { Modal } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";

interface IModal {
  isOpen: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";
  children: React.ReactNode;
}

const customTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    show: {
      on: "flex bg-gray-100/50 dark:bg-gray-900/60",
    },
  },
  content: {
    inner: "relative rounded-2xl bg-white dark:bg-gray-900 shadow-dark-sm  rounded-2xl p-6 flex flex-col ",
  },
  header: {
    base: "hidden",
  },
  body: {
    base: "hidden",
    popup: "hidden",
  },
};

const ModalCustom = ({ isOpen, onClose, size = "md", children }: IModal) => {
  return (
    <Modal theme={customTheme} className="" show={isOpen} onClose={onClose} size={size}>
      {children}
    </Modal>
  );
};

export default ModalCustom;
