interface InputProps {
  id: string;
  label: string;
  maxLength?: number;
  required?: boolean;
  type: 'text' | 'email' | 'tel' | 'hidden';
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
    <>
      {type != 'hidden' && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        name={id}
        type={type}
        maxLength={maxLength}
        required={required}
        value={value}
      ></input>
    </>
  );
};
