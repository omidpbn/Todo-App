import { type ReactNode } from "react";
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";

interface ButtonProps extends FlowbiteButtonProps {
  children: ReactNode;
  color: FlowbiteButtonProps["color"];
}

const customTheme: CustomFlowbiteTheme["button"] = {
  base: "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-0 cursor-pointer",
  disabled: "pointer-events-none opacity-50",
  fullSized: "w-full",
  color: {
    default:
      "bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",
    green: "bg-green-700 text-white hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
    blue: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    red: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800",
    gray: "bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800",
  },
  outlineColor: {
    default:
      "border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800",
    green:
      "border border-green-700 text-green-700 hover:border-green-800 hover:bg-green-800 hover:text-white focus:ring-green-300 dark:border-green-600 dark:text-green-500 dark:hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-800",
    blue: "border border-blue-700 text-blue-700 hover:border-blue-800 hover:bg-blue-800 hover:text-white focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:border-blue-700 dark:hover:bg-blue-700 dark:hover:text-white dark:focus:ring-blue-800",
    red: "border border-red-700 text-red-700 hover:border-red-800 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:border-red-700 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-red-800",
    gray: "border border-gray-700 text-gray-700 hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800",
  },
  pill: "rounded-full",
  size: {
    xs: "h-8 px-3 text-xs",
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-5 text-base",
    xl: "h-[52px] px-6 text-base",
  },
};

const Button = ({ children, color, outline, pill, ...props }: ButtonProps) => {
  return (
    <FlowbiteButton theme={customTheme} color={color} outline={outline} pill={pill} {...props}>
      {children}
    </FlowbiteButton>
  );
};

export default Button;
