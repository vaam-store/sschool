import { useField } from "formik";
import { twMerge } from "tailwind-merge";
import React from "react";

export function ToggleInputComponent({
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
    <div className="form-control w-full">
      <label className="label w-full cursor-pointer">
        <span className="label-text mr-auto">{label ?? field.name}</span>
        <input
          defaultChecked={field.value}
          type="checkbox"
          {...field}
          {...props}
          className={twMerge("toggle toggle-primary", props.className)}
        />
      </label>

      {touched && error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </div>
  );
}
