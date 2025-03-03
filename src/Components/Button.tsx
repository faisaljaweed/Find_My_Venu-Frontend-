import { FC } from "react";

type ButtonProps = {
  children: any;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "reset" | "button";
};
const Button: FC<ButtonProps> = ({ children, onClick, className, type }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className={`px-4 py-2 bg-[#555555] text-white rounded hover:bg-blue-600 mt-2 ${
          className || ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
