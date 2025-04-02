"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetActiveUserCart } from "@/service/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import CheckoutModal from "@/components/modals/CheckoutModal";

const CartPage = () => {
  const router = useRouter();
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetActiveUserCart();

  const { mutate: removeItem } = useMutation({
    mutationFn: (productId: string) => {
      return api.put(`/cart/removeProduct/${data?.id}`, { productId });
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
      toast({
        title: "Product removed",
        description: `${
          response.data?.data?.name || "Item"
        } has been removed from the cart`,
      });
    },
    onError(error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const subtotal = data?.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 1000;
  const total = subtotal! + shipping;

  const handleCheckout = () => {
    setIsPhoneModalOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  console.log(data);
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground">Review your items and checkout</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cart Items ({data?.products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {!data ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Your cart is empty
                  </p>
                  <Button onClick={() => router.push("/products")}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {data?.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-muted rounded"></div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.price}Rwf
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {data?.products?.length! > 0 && (
              <CardFooter className="justify-end">
                <Button
                  variant="outline"
                  onClick={() => router.push("/products")}
                >
                  Continue Shopping
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {data?.products?.length! > 0 && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal?.toFixed(2)}Rwf</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping.toFixed(2)}Rwf</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)}Rwf</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
      <CheckoutModal
        cart={data!}
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default CartPage;
