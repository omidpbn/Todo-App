"use client";

import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Button from "../button";

const ThemeSwitcher = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDark(true);
    }
  }, []);

  return (
    <Button color="" outline className="!p-0" onClick={() => setDark(!dark)}>
      {dark ? (
        <>
          <FaSun className="w-5 h-5" />
        </>
      ) : (
        <>
          <FaMoon className="w-5 h-5" />
        </>
      )}
    </Button>
  );
};

export default ThemeSwitcher;
