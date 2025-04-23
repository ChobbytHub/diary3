import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, disabled, className = "", ...props }: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded border text-white transition duration-200 font-semibold";

  const enabledClasses = "bg-blue-600 hover:bg-blue-700 border-blue-600";
  const disabledClasses = "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`}
    >
      {children}
    </button>
  );
}
