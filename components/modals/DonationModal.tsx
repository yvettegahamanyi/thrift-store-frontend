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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DonationSchema, DonationType } from "@/types/donations";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "view";
  donation?: any;
}

const DonationModal = ({
  isOpen,
  onClose,
  mode,
  donation,
}: DonationModalProps) => {
  const { toast } = useToast();
  const isViewMode = mode === "view";
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DonationType>({
    resolver: zodResolver(DonationSchema),
    defaultValues: {
      title: donation?.title || "",
      description: donation?.description || "",
      pickupAddress: donation?.pickupAddress || "",
      pickupDate: donation?.pickupDate || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post("/donation", data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["donations"],
      });
      toast({
        title: "Donation Submitted",
        description: "Your donation has been submitted for review",
      });
      onClose();
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Create Donation failed",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      onClose();
    },
  });

  console.log(errors);
  const onSubmit = (data: DonationType) => {
    if (isViewMode) {
      onClose();
      return;
    }

    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isViewMode ? "Donation Details" : "Create Donation"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Item Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={watch("title")}
                {...register("title")}
                placeholder="Item title"
                readOnly={isViewMode}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={watch("description")}
                {...register("description")}
                placeholder="Item description"
                rows={4}
                readOnly={isViewMode}
              />
            </div>

            {!isViewMode && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Input
                    id="pickupAddress"
                    value={watch("pickupAddress")}
                    {...register("pickupAddress")}
                    placeholder="Address for item pickup"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
                  <Input
                    id="pickupDate"
                    type="date"
                    {...register("pickupDate")}
                    value={watch("pickupDate")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Item Photos</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Drag and drop images or click to browse
                    </p>
                  </div>
                </div>
              </>
            )}

            {isViewMode && donation?.status && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="font-medium">Status: {donation.status}</p>
                {donation.statusDate && (
                  <p className="text-sm text-muted-foreground">
                    Updated: {donation.statusDate}
                  </p>
                )}
                {donation.notes && (
                  <div className="mt-2">
                    <p className="font-medium">Admin Notes:</p>
                    <p className="text-sm">{donation.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              {isViewMode ? "Close" : "Cancel"}
            </Button>
            {!isViewMode && <Button type="submit">Submit Donation</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
