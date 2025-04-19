// src/components/ui/Button.jsx
export default function Button({
  onClick,
  children,
  disabled,
  type = "button",
}) {
  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
