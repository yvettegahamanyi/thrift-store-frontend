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

const CustomerDashboard = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      category: "Jacket",
      price: 29.99,
    },
    {
      id: 2,
      name: "Cotton Sweater",
      category: "Sweater",
      price: 24.99,
    },
    {
      id: 3,
      name: "Summer Dress",
      category: "Dress",
      price: 19.99,
    },
    {
      id: 4,
      name: "Formal Shirt",
      category: "Shirt",
      price: 15.99,
    },
    {
      id: 5,
      name: "Leather Belt",
      category: "Accessories",
      price: 12.99,
    },
  ];

  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-lg">
        <div className="bg-secondary/30 p-8">
          <div className="grid gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Up to 15% Off for Women
            </h1>
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
              <Button className="mt-4">Shop now</Button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Trending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Jacket</p>
                <p className="text-sm text-muted-foreground">
                  Very fashionable ladies jacket
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$22.00</p>
                <p className="text-xs text-muted-foreground">$12.53</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Sweater</p>
                <p className="text-sm text-muted-foreground">
                  Provide warmth and typically
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$24.21</p>
                <p className="text-xs text-muted-foreground">$12.53</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">White</p>
                <p className="text-sm text-muted-foreground">
                  Stylish warmth and comfortable
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">$21.42</p>
                <p className="text-xs text-muted-foreground">$12.53</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div> */}

      <h2 className="mt-10 text-2xl font-semibold">New Arrival</h2>
      <div className="mt-6 flex flex-col">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {mockProducts.map((product) => (
            <Card key={product.id}>
              <div className="aspect-[4/3] w-full bg-muted"></div>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {product.category}
                  </span>
                  <span className="font-medium">{product.price} RWF</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

const DonorDashboard = () => (
  <>
    <div className="mb-8">
      <h1 className="text-3xl font-bold">Donation Dashboard</h1>
      <p className="text-muted-foreground">
        Track your impact and manage your donations
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Donations</CardTitle>
          <CardDescription>
            Your contribution makes a difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">Items donated to date</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Approved Items</CardTitle>
          <CardDescription>Items processed and listed</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">9</p>
          <p className="text-sm text-muted-foreground">83% approval rate</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Carbon footprint reduced</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">45kg</p>
          <p className="text-sm text-muted-foreground">CO₂ saved by reusing</p>
        </CardContent>
      </Card>
    </div>

    <div className="mt-8">
      <Link href="/donations/create">
        <Button>Donate New Item</Button>
      </Link>
    </div>
  </>
);

const AdminDashboard = () => (
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
          <p className="text-4xl font-bold">128</p>
          {/* <p className="text-sm text-muted-foreground">+4 this week</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Pending Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">15</p>
          <p className="text-sm text-muted-foreground">6 Needs review</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">6 pending shipment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">$3,240</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </CardContent>
      </Card>
    </div>

    <div className="mt-8 grid gap-6 md:grid-cols-2">
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
    </div>
  </>
);

const Dashboard = () => {
  // const { user } = useContext(AuthContext);
  const user = { role: "admin" };
  return (
    <DashboardLayout>
      {user.role === "admin" ? (
        <AdminDashboard />
      ) : user.role === "donor" ? (
        <DonorDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
