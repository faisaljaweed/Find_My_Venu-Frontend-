import { FC } from "react";

type ButtonProps = {
  children: string;
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
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2 ${
          className || ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
