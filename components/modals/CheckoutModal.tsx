import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Cart } from "@/types/product";
import { OrderSchema, OrderType } from "@/types/orders";

interface CheckoutPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
}

const CheckoutModal = ({ isOpen, onClose, cart }: CheckoutPhoneModalProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OrderType) => {
      return api.post(`/order/`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["donation-id"],
      });
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation prompt shortly.",
      });
      router.push("/orders");
      onClose();
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Product Created",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      onClose();
    },
  });

  const onSubmit = (data: OrderType) => {
    mutate({
      ...data,
      cartId: cart.id,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="shippingAddress">Shipping Address</Label>
              <Input
                id="shippingAddress"
                placeholder="Karyiru, Kanserege, ku gasako"
                value={watch("shippingAddress")}
                {...register("shippingAddress")}
                error={errors.shippingAddress?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="07XXXXXXXX"
                value={watch("paymentNumber")}
                {...register("paymentNumber")}
                error={errors.paymentNumber?.message}
              />
              <p className="text-xs text-muted-foreground">
                This number will be used for the payment of your order
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>Continue to Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
