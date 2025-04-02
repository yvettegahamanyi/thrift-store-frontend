"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ProductModal from "@/components/modals/ProductModal";
import ProductApprovalModal from "@/components/modals/ProductApprovalModal";
import { useGetProducts } from "@/service/product";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

const ProductsPage = () => {
  const { user } = useAuthStore();
  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("edit");
  const { data, isLoading } = useGetProducts();
  const queryClient = useQueryClient();
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalMode("create");
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setIsProductModalOpen(true);
  };

  const handleApproveProduct = (product: any) => {
    setSelectedProduct(product);
    setIsApprovalModalOpen(true);
  };

  const handleRejectProduct = (product: any) => {
    setSelectedProduct(product);
    setIsRejectModalOpen(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (productId: string) => {
      return api.post(`/cart/`, { productId });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast({
        title: "Product cart Created",
        description: `${response.data.data.name} has been added to cart`,
      });
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Product cart created",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Browse our catalog of thrift items
          </p>
        </div>
        {user?.role == Role.ADMIN && (
          <Button onClick={handleAddProduct}>Add Product</Button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((product) => (
          <Card key={product.id}>
            <div className="aspect-[4/3] w-full bg-muted"></div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.description}
                </span>
                <span className="font-medium">${product.price}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              {user?.role == Role.ADMIN ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  {/* <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 hover:bg-green-100 text-green-600"
                      onClick={() => handleApproveProduct(product)}
                    >
                      Approve
                    </Button> */}
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                    onClick={() => handleRejectProduct(product)}
                  >
                    Deactivate
                  </Button> */}
                  {/* </div> */}
                </>
              ) : (
                <Button className="w-full" onClick={() => mutate(product.id)}>
                  Add to Cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Product Modals */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        mode={modalMode}
      />

      <ProductApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        product={selectedProduct}
        type="approve"
      />

      <ProductApprovalModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        product={selectedProduct}
        type="reject"
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
