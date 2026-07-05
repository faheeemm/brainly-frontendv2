import { forwardRef } from "react";

interface InputProps {
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder }: InputProps, ref) => {
    return (
      <div>
        <input
          type={"text"}
          className="px-4 py-2 border rounded m-2 text-sm"
          ref={ref}
          placeholder={placeholder}
        ></input>
      </div>
    );
  },
);
