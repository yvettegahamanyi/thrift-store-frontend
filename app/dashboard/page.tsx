"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import Link from "next/link";
import { useGetCurrentUser } from "@/service/auth";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";
import DonationModal from "@/components/modals/DonationModal";
import { useGetProducts } from "@/service/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useGetDonorStats, useGetUsersStats } from "@/service/user";

const CustomerDashboard = () => {
  const { data, isLoading } = useGetProducts();
  const queryClient = useQueryClient();
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
      toast({
        title: "Product cart created",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });
  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-lg">
        <div className="bg-secondary/30 p-8">
          <div className="grid gap-4">
            {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Up to 15% Off for Women
            </h1> */}
            <div className="max-w-[600px]">
              <h2 className="text-3xl font-semibold tracking-tight">
                Shop Affordable Fashion for Daily Life!
              </h2>
              <p className="text-muted-foreground mt-2">
                Upgrade your wardrobe with stylish thrift finds at unbeatable
                prices. Don&apos;t miss out—grab your favorites now!
              </p>
            </div>
            <div>
              <Link href="/products">
                <Button className="mt-4">Shop now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">New Arrival</h2>
      <div className="mt-6 flex flex-col">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
                  <span className="font-medium">{product.price} RWF</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button className="w-full" onClick={() => mutate(product.id)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

const DonorDashboard = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { data, isLoading } = useGetDonorStats();
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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Donation Dashboard</h1>
        <p className="text-muted-foreground">
          Track your impact and manage your donations
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Pending Donations</CardTitle>
            {/* <CardDescription>
              Your contribution makes a difference
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.pendingDonation}</p>
            <p className="text-sm text-muted-foreground">
              Items donated to date
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved Donations</CardTitle>
            {/* <CardDescription>Items processed and listed</CardDescription> */}
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.approvedDonation}</p>
            {/* <p className="text-sm text-muted-foreground">83% approval rate</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
            <CardDescription>Products created from donations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.totalProducts}</p>
            {/* <p className="text-sm text-muted-foreground">83% approval rate</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
            <CardDescription>Carbon footprint reduced</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.carbonFootprintKg}kg</p>
            {/* <p className="text-sm text-muted-foreground">
              CO₂ saved by reusing
            </p> */}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button onClick={() => setIsDonationModalOpen(true)}>
          Donate New Item
        </Button>
      </div>
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        mode="create"
      />
    </>
  );
};

const AdminDashboard = () => {
  const { data, isLoading } = useGetUsersStats();
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    );
  }

  console.log(data?.productInStock);
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage store operations and monitor metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.productInStock}</p>
            {/* <p className="text-sm text-muted-foreground">+4 this week</p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.pendingDonation}</p>
            <p className="text-sm text-muted-foreground">
              Needs to be reviewed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.PendingShipment}</p>
            <p className="text-sm text-muted-foreground">
              they are pending for shipment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data?.totalRevenue}Rwf</p>
            {/* <p className="text-sm text-muted-foreground">This month</p> */}
          </CardContent>
        </Card>
      </div>

      {/* <div className="mt-8 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Last 5 donations received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Winter Coat",
              "Denim Jeans",
              "Formal Shirts (3)",
              "Summer Dresses",
              "Knit Sweaters (2)",
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{item}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Last 5 orders placed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "#ORD-7312",
              "#ORD-7311",
              "#ORD-7310",
              "#ORD-7309",
              "#ORD-7308",
            ].map((order, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{order}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`rounded-full px-2 py-1 text-xs ${
                    i === 0
                      ? "bg-yellow-100 text-yellow-800"
                      : i === 1
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {i === 0 ? "Processing" : i === 1 ? "Shipped" : "Delivered"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div> */}
    </>
  );
};

const Dashboard = () => {
  const { data, isLoading } = useGetCurrentUser();
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    setUser(data);
  }, [data]);

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
      {user?.role == Role.ADMIN ? (
        <AdminDashboard />
      ) : user?.role == Role.DONOR ? (
        <DonorDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
