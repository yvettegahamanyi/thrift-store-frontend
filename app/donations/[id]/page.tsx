"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, ShoppingBag, Eye } from "lucide-react";
import ProductModal from "@/components/modals/ProductModal";
import { useToast } from "@/hooks/use-toast";
import { TableActions } from "@/components/data-table/table-actions";
import { useParams } from "next/navigation";
import { useGetDonationById } from "@/service/donation";
import { DonationStatus } from "@/types/donations";

export default function DonationDetailsPage() {
  const { id } = useParams() as { id: string };
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { data, isLoading } = useGetDonationById(id);

  // // Mock fetch donation details
  //   useEffect(() => {
  //     // Simulate API call to fetch donation details
  //     setTimeout(() => {
  //       // This would be replaced with an actual API call
  //       const mockDonation = {
  //         id: id || "DON-1234",
  //         date: "2023-05-15",
  //         itemName: "Winter Coat",
  //         category: "Outerwear",
  //         status: "Approved",
  //         donor: "Jane Smith",
  //         description:
  //           "A high-quality winter coat in excellent condition. Suitable for cold weather.",
  //         condition: "Like New",
  //         notes:
  //           "This is a premium item that would work well for our winter collection.",
  //         imageUrl: "/placeholder.svg",
  //       };
  //       setDonation(mockDonation);

  //       // Mock products created from this donation
  //       const mockProducts = [
  //         {
  //           id: "PROD-5678",
  //           name: "Designer Winter Coat",
  //           category: "Outerwear",
  //           price: 49.99,
  //           status: "Active",
  //           createdAt: "2023-05-16",
  //           imageUrl: "/placeholder.svg",
  //         },
  //       ];
  //       setProducts(mockProducts);
  //       setIsLoading(false);
  //     }, 1000);
  //   }, [id]);

  const getStatusColor = (status: DonationStatus) => {
    switch (status) {
      case DonationStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case DonationStatus.APPROVED:
        return "bg-blue-100 text-blue-800";
      case DonationStatus.REJECTED:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreateProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleProductCreated = (product: any) => {
    setProducts((prev) => [...prev, product]);
    toast({
      title: "Product Created",
      description: `Product "${product.name}" has been created successfully.`,
    });
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

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Donation Not Found</h2>
          <p className="text-muted-foreground">
            The donation you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Donation Details</h1>
          <p className="text-muted-foreground">
            View details and manage products for donation
          </p>
        </div>
        <Button onClick={() => window.history.back()}>Back to Donations</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Donation Information</CardTitle>
              <Badge className={getStatusColor(data?.status)} variant="outline">
                {data?.status}
              </Badge>
            </div>
            <CardDescription>Details about the donated item</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Item Name
                  </h3>
                  <p className="text-lg font-semibold">{data?.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Date Received
                  </h3>
                  <p>{data?.pickupDate.split("T")[0]}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Description
                  </h3>
                  <p className="text-sm">{data?.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Donor Name
                  </h3>
                  <p>
                    {data.donor.firstName} {data.donor.lastName}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Donor phone number
                  </h3>
                  <p>{data.donor.phoneNumber ?? "-"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Donor phone number
                  </h3>
                  <p>{data.donor.email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donation Image Card */}
        <Card>
          <CardHeader>
            <CardTitle>Item Image</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {/* <img
              src={donation.imageUrl}
              alt={donation.itemName}
              className="max-w-full h-auto rounded-md object-cover"
              style={{ maxHeight: "300px" }}
            /> */}
          </CardContent>
        </Card>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Products Created from this Donation
            </h2>
          </div>
          <div>
            {data?.status === DonationStatus.APPROVED && (
              <Button onClick={handleCreateProduct} className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Create Product from Donation
              </Button>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {data?.products?.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.products?.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <Badge
                          variant={product.isActive ? "default" : "outline"}
                        >
                          {product.isActive ? "Active" : "De-active"}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.createdAt.split("T")[0]}</TableCell>
                      <TableCell>
                        <TableActions
                          onView={() => alert(`View details for ${product.id}`)}
                          onEdit={() => alert(`Edit product ${product.id}`)}
                          actionType="product"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-semibold">No Products Yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No products have been created from this donation yet.
                  {data?.status === DonationStatus.APPROVED &&
                    " Click the 'Create Product' button to add one."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Modal */}
      {/* <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onProductCreated={handleProductCreated}
        mode="create"
        initialData={{
          name: donation?.itemName,
          category: donation?.category,
          description: donation?.description,
          donationId: donation?.id,
        }}
      /> */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        mode={"create"}
      />
    </DashboardLayout>
  );
}
