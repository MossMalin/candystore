interface InputProps {
  id: string;
  label: string;
  maxLength?: number;
  required?: boolean;
  type: 'text' | 'email' | 'tel';
  value?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  maxLength,
  required,
  type,
  value,
  onChange,
}) => {
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        maxLength={maxLength}
        required={required}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
    </div>
  );
};
