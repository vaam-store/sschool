import { type FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

export function SelectComponent<V, F>({
  field,
  form: { touched, errors },
  children,
  ...props
}: FieldProps<V, F> &
  HTMLSelectElement & {
    label: string;
    children: React.ReactNode;
  }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{props.label ?? field.name}</span>
      </div>

      <select
        {...field}
        {...props}
        className={twMerge("select select-bordered w-full", props.className)}
      >
        {children}
      </select>

      {touched[field.name] && errors[field.name] && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors[field.name]}
          </span>
        </div>
      )}
    </label>
  );
}
