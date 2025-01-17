import { FC } from "react";

// Reusable Input Component
type InputProps = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 mt-2 border-2 border-gray-300 rounded  hover:border-blue-500  ${
          className || ""
        }`}
        {...props}
      />
    </div>
  );
};

export default Input;
