export type Payment = {
  id: string;
  date: string;
  amount: number;
  status: "Refunded" | "Completed" | "Failed";
  method: string;
  orderId: string;
};
