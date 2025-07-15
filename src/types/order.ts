import type { Dayjs } from "dayjs";

export type OrderStatus = "Відвантажено" | "Виконано" | "Очікує оплати";

export interface IOrder {
  id?: number;
  client: string;
  date: string | Date | Dayjs;
  status: OrderStatus;
  amount: number;
}
