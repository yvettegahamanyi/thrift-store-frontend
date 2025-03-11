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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface CheckoutPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutPhoneModal = ({ isOpen, onClose }: CheckoutPhoneModalProps) => {
  const { toast } = useToast();
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // Validate phone number
    if (!phone.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to continue",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would proceed with the checkout
    console.log(`Proceeding with checkout. Phone: ${phone}`);

    toast({
      title: "Order placed successfully!",
      description: "You will receive a confirmation prompt shortly.",
    });
    router.push("/orders");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Information</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <Button onClick={handleSubmit}>Continue to Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutPhoneModal;
