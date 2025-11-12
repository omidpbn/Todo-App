"use client";

import Button from "../../atoms/button";
import ThemeSwitcher from "../../atoms/themeSwitcher";

const Header = () => (
  <header className="flex items-center justify-between bg-blue-700 text-white p-4">
    <div className="flex items-center md:gap-4 gap-1">
      <h1 className="md:text-xl text-lg font-bold">Todo List</h1>
      <Button color="" outline className="!px-2">
        Create
      </Button>
    </div>

    <ThemeSwitcher />
  </header>
);

export default Header;
