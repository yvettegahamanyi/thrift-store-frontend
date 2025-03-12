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

const mockOrders: Order[] = [
  {
    id: "ORD-7312",
    date: "2023-05-12",
    items: 3,
    total: 75.97,
    status: "Processing",
    customer: "Jane Smith",
  },
  {
    id: "ORD-7311",
    date: "2023-05-10",
    items: 1,
    total: 29.99,
    status: "Shipped",
    customer: "John Doe",
  },
  {
    id: "ORD-7310",
    date: "2023-05-08",
    items: 2,
    total: 45.98,
    status: "Delivered",
    customer: "Robert Johnson",
  },
  {
    id: "ORD-7309",
    date: "2023-05-05",
    items: 4,
    total: 89.96,
    status: "Delivered",
    customer: "Sarah Williams",
  },
  {
    id: "ORD-7308",
    date: "2023-05-03",
    items: 1,
    total: 19.99,
    status: "Delivered",
    customer: "Michael Brown",
  },
  {
    id: "ORD-7307",
    date: "2023-05-02",
    items: 2,
    total: 34.98,
    status: "Processing",
    customer: "Emily Davis",
  },
  {
    id: "ORD-7306",
    date: "2023-05-01",
    items: 3,
    total: 59.97,
    status: "Shipped",
    customer: "Daniel Wilson",
  },
];

const OrdersPage = () => {
  //   const { user } = useContext(AuthContext);
  const user = { role: "admin" };
  const isAdmin = user?.role === "admin";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<Order>();

  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("date", {
      header: "Date",
    }),
    columnHelper.accessor("customer", {
      header: "Customer",
    }),
    columnHelper.accessor("items", {
      header: "Items",
    }),
    columnHelper.accessor("total", {
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
            isAdmin ? () => handleUpdateStatus(info.row.original) : undefined
          }
          actionType="order"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: mockOrders,
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

  const filteredOrders = mockOrders.filter((order) => {
    if (filterValue && filterValue !== "all" && order.status !== filterValue) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
          {isAdmin
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

          <TablePagination
            totalItems={filteredOrders.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
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
