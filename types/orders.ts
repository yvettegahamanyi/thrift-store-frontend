export type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  customer: string;
};
