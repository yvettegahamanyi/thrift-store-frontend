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
import { Product } from "@/types/product";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableComponent } from "@/components/data-table/table";

export default function DonationDetailsPage() {
  const { id } = useParams() as { id: string };
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { data, isLoading } = useGetDonationById(id);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [mode, setMode] = useState<"create" | "edit">("create");
  const columnHelper = createColumnHelper<Product>();
  const [rowSelection, setRowSelection] = useState({});

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
    setMode("create");
  };

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("price", {
      header: "Price(RWF)",
    }),
    columnHelper.accessor("isActive", {
      header: "Status",
      cell: (info) => (
        <Badge variant={info.row.original.isActive ? "default" : "outline"}>
          {info.row.original.isActive ? "Active" : "De-active"}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      cell: (info) => (
        <TableActions
          onEdit={() => {
            setIsProductModalOpen(true);
            setSelectedProduct(info.row.original);
            setMode("edit");
          }}
          actionType="product"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: data?.products || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: (newRowSelection) => {
      if (JSON.stringify(newRowSelection) !== JSON.stringify(rowSelection)) {
        setRowSelection(newRowSelection);
      }
    },
    state: {
      rowSelection,
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

  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Donation Not Found</h2>
          <p className="text-muted-foreground">
            {
              "The donation you're looking for doesn't exist or has been removed."
            }
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
              <TableComponent table={table} />
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
        product={selectedProduct}
        mode={mode}
      />
    </DashboardLayout>
  );
}
