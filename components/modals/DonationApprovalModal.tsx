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

interface DonationApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: any;
  type: "approve" | "reject";
}

const DonationApprovalModal = ({
  isOpen,
  onClose,
  donation,
  type,
}: DonationApprovalModalProps) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState("");
  const [estimatedValue, setEstimatedValue] = useState(
    donation?.estimatedValue ? donation.estimatedValue.toString() : ""
  );

  if (!donation) return null;

  const handleSubmit = () => {
    // In a real app, this would approve/reject the donation in the database
    console.log(
      `${type === "approve" ? "Approving" : "Rejecting"} donation:`,
      donation.id
    );
    console.log("Notes:", notes);

    if (type === "approve") {
      console.log("Estimated Value:", estimatedValue);
    }

    toast({
      title: type === "approve" ? "Donation Approved" : "Donation Rejected",
      description: `${donation.title} has been ${
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
                Approve Donation
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircle className="mr-2 h-5 w-5" />
                Reject Donation
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Donation Info</Label>
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">{donation.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {donation.category} - {donation.condition} condition
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">
              {type === "approve"
                ? "Approval Notes (Optional)"
                : "Rejection Reason"}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                type === "approve"
                  ? "Add any notes..."
                  : "Reason for rejection..."
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

export default DonationApprovalModal;
