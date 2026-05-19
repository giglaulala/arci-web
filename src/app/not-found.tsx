import { NotFoundView } from "@/components/not-found-view";

export default function NotFound() {
  return (
    <NotFoundView
      copy={{
        title: "გვერდი ვერ მოიძებნა",
        description:
          "ბოდიშს გიხდით, გვერდი რომელსაც ეძებთ ვერ მოიძებნა. გთხოვთ გადაამოწმოთ მისამართი ან დაბრუნდეთ მთავარ გვერდზე.",
        action: "მთავარზე დაბრუნება",
      }}
      homeHref="/ka"
    />
  );
}
