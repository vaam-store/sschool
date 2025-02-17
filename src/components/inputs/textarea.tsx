import { twMerge } from "tailwind-merge";
import { useField } from "formik";
import React from "react";

export function TextareaInputComponent({
  label,
  ...props
}: Omit<
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  "defaultValue" | "defaultChecked"
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
      <textarea
        {...field}
        {...props}
        className={twMerge(
          "textarea textarea-bordered w-full",
          props.className,
        )}
      />
      {touched && error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </label>
  );
}
