import { type FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

export function TextareaInputComponent<V, F>({
  field,
  form: { touched, errors },
  ...props
}: FieldProps<V, F> &
  HTMLInputElement & {
    label: string;
  }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{props.label ?? field.name}</span>
      </div>
      <textarea
        {...field}
        {...props}
        className={twMerge("textarea textarea-bordered w-full", props.className)}
      />
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
