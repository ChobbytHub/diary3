export default function Input({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  ...rest
}) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        {...rest}
      />
    </div>
  );
}
