"use client";

import { useEffect } from "react";
import Button from "../button";
import { useThemeStore } from "@/src/shared/store/useThemeStore";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";

const ThemeSwitcher = () => {
  const { dark, setDark, toggle } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      setDark(true);
    } else if (savedTheme === "light") {
      setDark(false);
    } else {
      setDark(true);
    }
  }, []);

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

  return (
    <Button color="" outline className="!p-0" onClick={() => toggle()}>
     {dark ? <HiOutlineMoon className="w-5 h-5" /> : <MdOutlineWbSunny className="w-5 h-5" />}
    </Button>
  );
};

export default ThemeSwitcher;
