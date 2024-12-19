import { FC } from "react";

type ButtonProps = {
  children: string;
  oncClick?: () => void;
  className?: string;
};
const Button: FC<ButtonProps> = ({ children, oncClick, className }) => {
  return (
    <div>
      <button
        onClick={oncClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
          className || ""
        }`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
