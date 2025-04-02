"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TablePagination } from "@/components/data-table/table-pagination";
import { TableActions } from "@/components/data-table/table-actions";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";
import UpdateOrderStatusModal from "@/components/modals/UpdateOrderStatusModal";
import { TableComponent } from "@/components/data-table/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Order } from "@/types/orders";
import { useAuthStore } from "@/store/authStore";
import { useGetOrders } from "@/service/order";
import { Role } from "@/types/auth";

const OrdersPage = () => {
  const { user } = useAuthStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const { data, isLoading } = useGetOrders();
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor("createdAt", {
      header: "Date",
      cell: (info) => info.row.original.createdAt.split("T")[0],
    }),
    columnHelper.accessor("user.firstName", {
      header: "User",
      cell: (info) => (
        <span>
          {info.row.original.user?.firstName} {info.row.original.user?.lastName}
        </span>
      ),
    }),
    columnHelper.accessor("products", {
      header: "Items",
      cell: (info) => {
        return <span>{info.row.original.products.length}</span>;
      },
    }),
    columnHelper.accessor("totalAmount", {
      header: "Total",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Badge
          className={getStatusColor(info.row.original.status)}
          variant="outline"
        >
          {info.row.original.status}
        </Badge>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => "Actions",
      cell: (info) => (
        <TableActions
          onView={() => handleViewOrder(info.row.original)}
          onEdit={
            user?.role == Role.ADMIN
              ? () => handleUpdateStatus(info.row.original)
              : undefined
          }
          actionType="order"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: data || [],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = data?.filter((order) => {
    if (filterValue && filterValue !== "all" && order.status !== filterValue) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.user.firstName.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleDownload = () => {
    console.log("Downloading orders data...");
    alert("Orders data download started");
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setIsUpdateStatusModalOpen(true);
  };

  const filterOptions = [
    { value: "all", label: "All Statuses" },
    { value: "Processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "Delivered", label: "Delivered" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">
          {user?.role == Role.ADMIN
            ? "Manage customer orders and track shipments"
            : "Track your orders and view order history"}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <TableToolbar
            filterOptions={filterOptions}
            onFilterChange={setFilterValue}
            onSearch={setSearchQuery}
            onDownload={handleDownload}
            placeholderText="Search orders..."
          />

          <TableComponent table={table} />

          {/* <TablePagination
            totalItems={filteredOrders.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          /> */}
        </CardContent>
      </Card>

      {/* Order Modals */}
      <OrderDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />

      <UpdateOrderStatusModal
        isOpen={isUpdateStatusModalOpen}
        onClose={() => setIsUpdateStatusModalOpen(false)}
        order={selectedOrder}
      />
    </DashboardLayout>
  );
};

export default OrdersPage;
