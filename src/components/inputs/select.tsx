import { twMerge } from "tailwind-merge";
import { useField } from "formik";
import React, { type PropsWithChildren } from "react";

export function SelectComponent({
  label,
  children,
  ...props
}: PropsWithChildren<
  Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    "defaultChecked" | "defaultValue"
  > & {
    label: string;
    name: string;
  }
>) {
  const [field, { touched, error }, {}] = useField(props);
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label ?? field.name}</span>
      </div>

      <select
        {...field}
        {...props}
        className={twMerge("select select-bordered w-full", props.className)}
      >
        {children}
      </select>

      {touched && error && (
        <div className="label">
          <span className="label-text-alt text-error">{error}</span>
        </div>
      )}
    </label>
  );
}
