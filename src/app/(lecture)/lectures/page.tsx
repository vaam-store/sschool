import { redirect } from "next/navigation";

export default async function LectureAllPage() {
  return redirect("/courses");
}
