import { useField } from "formik";
import { twMerge } from "tailwind-merge";
import { useUploadFile } from "@app/hooks/upload-file";

export function FileInputComponent({
  ...props
}: Partial<HTMLInputElement> & {
  label: string;
}) {
  const [field, meta, { setValue }] = useField(props);
  const { mutate } = useUploadFile();
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;
    if (!files?.length) {
      return;
    }

    const file = files.item(0)!;
    const { publicUrl } = await mutate(file);
    await setValue({ url: publicUrl, alt: file.name });
  };
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{props.label ?? field.name}</span>
      </div>
      <input
        type="file"
        onChange={onChange}
        {...props}
        className={twMerge(
          "file-input file-input-bordered w-full",
          props.className,
        )}
      />

      {meta.touched && meta.error && (
        <div className="label">
          <span className="label-text-alt text-error">{meta.error}</span>
        </div>
      )}
    </label>
  );
}
