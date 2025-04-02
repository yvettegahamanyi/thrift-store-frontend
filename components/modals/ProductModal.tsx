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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Product, productSchema, ProductType } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  mode: "create" | "edit";
}

const ProductModal = ({
  isOpen,
  onClose,
  product,
  mode,
}: ProductModalProps) => {
  const { toast } = useToast();
  const { id } = useParams() as { id: string };
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductType) => {
      return api.post(`/product/`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["donation-id"],
      });
      toast({
        title: "Product Created",
        description: `${response.data.data.name} has been created successfully`,
      });

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

  const { mutate: updateMutate, isPending: isUpdatePending } = useMutation({
    mutationFn: (data: ProductType) => {
      return api.put(`/product/${product?.id}`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast({
        title: "Product Updated",
        description: `${response.data.data.name} has been updated successfully`,
      });
      onClose();
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Product Updated",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
      onClose();
    },
  });

  console.log(errors);
  const onSubmit = (data: ProductType) => {
    if (mode === "create") {
      mutate({
        ...data,
        donationId: id,
      });
    } else {
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "" && value !== 0)
      );
      updateMutate(filteredData as ProductType);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Product" : "Edit Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={watch("name")}
                {...register("name")}
                placeholder="Product name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">
                Price (Rwf) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                step="0.01"
                min="0"
                {...register("price", {
                  valueAsNumber: true,
                })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={watch("description")}
                {...register("description")}
                placeholder="Product description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image or click to browse
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>
              {mode === "create" ? "Create Product" : "Update Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
