import useSizeController from "@/src/shared/hooks/useSizeController";
import { Modal } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";
import { motion, AnimatePresence } from "framer-motion";

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
  const { isSmall } = useSizeController();

  return (
    <>
      {isSmall ? (
        <AnimatePresence>
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 rounded-t-2xl p-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
              {children}
            </motion.div>
          </>
        </AnimatePresence>
      ) : (
        <Modal theme={customTheme} className="" show={isOpen} onClose={onClose} size={size}>
          {children}
        </Modal>
      )}
    </>
  );
};

export default ModalCustom;
