import { type FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

export function ToggleInputComponent<V, F>({
  field,
  form: { touched, errors },
  ...props
}: FieldProps<V, F> &
  HTMLInputElement & {
    label: string;
  }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{props.label ?? field.name}</span>
        <input
          defaultChecked={field.value}
          type="checkbox"
          {...field}
          {...props}
          className={twMerge("toggle", props.className)}
        />
      </label>

      {touched[field.name] && errors[field.name] && (
        <div className="label">
          <span className="label-text-alt text-error">
            {errors[field.name]}
          </span>
        </div>
      )}
    </div>
  );
}
