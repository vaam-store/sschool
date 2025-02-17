import { twMerge } from "tailwind-merge";
import React from "react";
import { useField } from "formik";

export function TextInputComponent({
  label,
  ...props
}: Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "defaultChecked" | "defaultValue"
> & {
  label: string;
  name: string;
}) {
  const [field, { touched, error }, {}] = useField(props);
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label ?? field.name}</span>
      </div>
      <input
        type="text"
        {...field}
        {...props}
        className={twMerge("input input-bordered w-full", props.className)}
      />
      {touched && error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </label>
  );
}
