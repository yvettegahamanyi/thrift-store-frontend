import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  type: "activate" | "deactivate";
}

const UserModal = ({ isOpen, onClose, user, type }: UserModalProps) => {
  const { toast } = useToast();

  console.log(user);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.put(`/user/${user?.id}`, data);
    },
    onSuccess(response) {
      toast({
        title: type === "activate" ? "User Activated" : "User Deactivated",
        description: `${user.firstName} has been ${
          type === "activate" ? "activated" : "deactivated"
        }.`,
      });
      onClose();
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: type == "activate" ? "Activate failed" : "Deactivate failed",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    mutate({ active: type === "activate" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "activate" ? (
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Activate User
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <XCircle className="mr-2 h-5 w-5" />
                Deactivate User
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>User Info</Label>
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant={type === "activate" ? "default" : "destructive"}
            // disabled={type === "deactivate" && !notes.trim()}
          >
            {type === "activate" ? "Approve" : "Reject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
