"use client";

import { useState } from "react";
import Button from "../../atoms/button";
import ThemeSwitcher from "../../atoms/themeSwitcher";
import TaskModal from "@/src/modules/task/components/molecules/TaskModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-blue-700 dark:bg-blue-900 text-white p-4">
        <div className="flex items-center md:gap-4 gap-1">
          <h1 className="md:text-xl text-lg font-bold dark:text-white">Todo List</h1>
          <Button color="default" size="md" outline className="border-none dark:text-gray-200 dark:border-gray-400" onClick={() => setIsOpen(true)}>
            Create
          </Button>
        </div>

        <ThemeSwitcher />
      </header>

      {isOpen && <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} titleModal="Create New Task" />}
    </>
  );
};

export default Header;
