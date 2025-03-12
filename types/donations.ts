export type Donation = {
  id: string;
  date: string;
  itemName: string;
  category: string;
  status: "Pending" | "Approved" | "Rejected";
  donor: string;
};
