import { type ReactNode } from "react";
import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from "flowbite-react";
import { CustomFlowbiteTheme } from "flowbite-react/types";

interface ButtonProps extends FlowbiteButtonProps {
  children: ReactNode;
  color: FlowbiteButtonProps["color"];
}

const customTheme: CustomFlowbiteTheme["button"] = {
  base: "relative flex items-center justify-center rounded-md text-center font-medium cursor-pointer focus:outline-none focus:ring-0 hover:bg-none hover:text-inherit",
  disabled: "pointer-events-none opacity-50",
  fullSized: "w-full",
  color: {
    default:
      "bg-primary-700 text-white dark:bg-primary-600 dark:text-white hover:bg-primary-800 dark:hover:bg-primary-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-500",
    blue: "bg-blue-700 !text-white dark:bg-blue-600 dark:!text-white hover:bg-blue-800 dark:hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500",
    red: "bg-red-700 !text-white dark:bg-red-600 dark:!text-white hover:bg-red-800 dark:hover:bg-red-500 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-500",
  },
  outlineColor: {
    default:
      "border border-primary-700 !text-primary-700 dark:border-primary-600 dark:!text-primary-300 hover:bg-transparent dark:hover:!bg-transparent",
    blue: "border border-blue-700 !text-blue-700 dark:border-blue-600 dark:!text-blue-300 hover:bg-transparent dark:hover:!bg-transparent",
    red: "border border-red-700 !text-red-700 dark:border-red-600 dark:!text-red-300 hover:bg-transparent dark:hover:!bg-transparent",
  },
  pill: "rounded-full",
  size: {
    xs: "h-8 px-1 text-xs",
    sm: "h-9 px-2 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
    xl: "h-[52px] px-5 text-base",
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
