import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  type: "approve" | "reject";
}

const ProductApprovalModal = ({
  isOpen,
  onClose,
  product,
  type,
}: ProductApprovalModalProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");

  if (!product) return null;

  const handleSubmit = () => {
    // In a real app, this would approve/reject the product in the database
    console.log(
      `${type === "approve" ? "Approving" : "Rejecting"} product:`,
      product.id
    );
    console.log("Notes:", notes);

    toast({
      title: type === "approve" ? "Product Approved" : "Product Rejected",
      description: `${product.name} has been ${
        type === "approve" ? "approved" : "rejected"
      }.`,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "approve" ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Approve Product
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircle className="mr-2 h-5 w-5" />
                Deactivate product
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Product Info</Label>
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {product.category} - ${product.price}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              {type === "approve"
                ? "Approval Notes (Optional)"
                : "Deactivation Reason"}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                type === "approve"
                  ? "Add any notes..."
                  : "Reason for deactivation..."
              }
              rows={4}
              required={type === "reject"}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant={type === "approve" ? "default" : "destructive"}
            disabled={type === "reject" && !notes.trim()}
          >
            {type === "approve" ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductApprovalModal;
