interface InputProps {
  id: string;
  label: string;
  maxLength?: number;
  required?: boolean;
  type: 'text' | 'email' | 'tel';
  value?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  maxLength,
  required,
  type,
  value,
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
      ></input>
    </div>
  );
};
