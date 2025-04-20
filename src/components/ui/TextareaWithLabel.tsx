// src/components/ui/TextareaWithLabel.tsx
import { TextareaWithLabelProps } from "../../types/ui";

const TextareaWithLabel = ({
  label,
  value,
  onChange,
  placeholder,
  ...rest
}: TextareaWithLabelProps) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default TextareaWithLabel;
