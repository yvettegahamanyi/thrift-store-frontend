import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

interface UpdateOrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
}

const UpdateOrderStatusModal = ({
  isOpen,
  onClose,
  order,
}: UpdateOrderStatusModalProps) => {
  const { toast } = useToast();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<string>(order?.status || "");
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.put(`/order/${order?.id}`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Order Updated",
        description: `Order ${order.refNumber} status changed to ${status}`,
      });
      onClose();
    },
    onError(error: any) {
      console.log(error);
      toast({
        // title: type == "activate" ? "Activate failed" : "Deactivate failed",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });
  if (!order) return null;

  const handleSubmit = () => {
    mutate({ status });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="order-id">Order ID</Label>
            <div id="order-id" className="p-2 bg-muted rounded-md">
              {order.refNumber}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                {user?.role === Role.ADMIN && (
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                )}
                {user?.role === Role.ADMIN && (
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                )}
                {user?.role === Role.ADMIN && (
                  <SelectItem value="CANCELED">Cancelled</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateOrderStatusModal;
