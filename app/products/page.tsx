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

const ProductsPage = () => {
  //   const { user } = useContext(AuthContext);
  const user = { role: "admin" };
  const isAdmin = user?.role === "admin";

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const mockProducts = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      category: "Jacket",
      price: 29.99,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Cotton Sweater",
      category: "Sweater",
      price: 24.99,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Summer Dress",
      category: "Dress",
      price: 19.99,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Formal Shirt",
      category: "Shirt",
      price: 15.99,
      status: "In Stock",
    },
    {
      id: 5,
      name: "Leather Belt",
      category: "Accessories",
      price: 12.99,
      status: "In Stock",
    },
    {
      id: 6,
      name: "Winter Coat",
      category: "Coat",
      price: 45.99,
      status: "Out of Stock",
    },
  ];

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

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Browse our catalog of thrift items
          </p>
        </div>
        {isAdmin && <Button onClick={handleAddProduct}>Add Product</Button>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <span className="font-medium">${product.price}</span>
              </div>
              <div className="mt-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs ${
                    product.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              {isAdmin ? (
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-50 hover:bg-red-100 text-red-600"
                    onClick={() => handleRejectProduct(product)}
                  >
                    Deactivate
                  </Button>
                  {/* </div> */}
                </>
              ) : (
                <Button className="w-full">Add to Cart</Button>
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
