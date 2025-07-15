import { number, object, string } from "yup";
import type { OrderStatus } from "../types/order";

export const OrderSchema = object().shape({
  client: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  date: string().required(),
  status: string()
    .oneOf(["Виконано", "Очікує оплати", "Відвантажено"] as OrderStatus[])
    .required("Required"),
  amount: number().min(1).required("Required"),
});
