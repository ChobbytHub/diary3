// src/components/ui/Button.tsx
import { ButtonProps } from "../../types/ui";

export default function Button({
  onClick,
  children,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
