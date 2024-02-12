import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  placeholder?: string;
  errors: FieldErrors;
  message?: string;
}

const Input = ({
  id,
  register,
  required,
  placeholder,
  errors,
  message,
}: InputProps) => {
  const hasError = errors[id] !== undefined;
  return (
    <div className="relative w-full">
      {hasError && (
        <p className="absolute text-sm font-semibold text-rose-500 -bottom-5">
          {message}
        </p>
      )}
      <input
        id={id}
        {...register(id)}
        placeholder={placeholder}
        required={required}
        className="w-full px-6 py-4 bg-[#F2F2F2] rounded-lg border-2 outline-none transition placeholder-[#B3B3B3] text-[#333333]"
      />
    </div>
  );
};

export default Input;
