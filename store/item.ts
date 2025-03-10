import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Payment } from "@/app/dashboard/page";

type PaymentStore = {
  payments: Payment[];
  createPayment: (payment: Omit<Payment, "id">) => void;
  readPayment: (id: string) => Payment | undefined;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  deletePayment: (id: string) => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [],
  createPayment: (payment) => {
    set((state) => ({
      payments: [...state.payments, { ...payment, id: uuidv4() }],
    }));
  },

  readPayment: (id): Payment | undefined => {
    return usePaymentStore
      .getState()
      .payments.find((payment) => payment.id === id);
  },

  updatePayment: (id, payment) => {
    set((state) => ({
      payments: state.payments.map((p) =>
        p.id === id ? { ...p, ...payment } : p
      ),
    }));
  },
  deletePayment: (id) => {
    set((state) => ({
      payments: state.payments.filter((p) => p.id !== id),
    }));
  },
}));
