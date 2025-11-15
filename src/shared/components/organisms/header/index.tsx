"use client";

import { useState } from "react";
import Button from "../../atoms/button";
import ThemeSwitcher from "../../atoms/themeSwitcher";
import TaskModal from "@/src/modules/task/components/molecules/TaskModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between bg-blue-700 text-white p-4">
        <div className="flex items-center md:gap-4 gap-1">
          <h1 className="md:text-xl text-lg font-bold">Todo List</h1>
          <Button color="" outline className="!px-2" onClick={() => setIsOpen(true)}>
            Create
          </Button>
        </div>

        <ThemeSwitcher />
      </header>

      {isOpen && <TaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Header;
