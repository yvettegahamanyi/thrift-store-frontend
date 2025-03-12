"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TablePagination } from "@/components/data-table/table-pagination";
import { TableActions } from "@/components/data-table/table-actions";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Payment } from "@/types/payment";
import { TableComponent } from "@/components/data-table/table";

const PaymentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const mockPayments: Payment[] = [
    {
      id: "PAY-001",
      date: "2023-05-12",
      amount: 75.97,
      status: "Completed",
      method: "Credit Card",
      orderId: "ORD-7312",
    },
    {
      id: "PAY-002",
      date: "2023-05-10",
      amount: 29.99,
      status: "Completed",
      method: "PayPal",
      orderId: "ORD-7311",
    },
    {
      id: "PAY-003",
      date: "2023-05-08",
      amount: 45.98,
      status: "Completed",
      method: "Credit Card",
      orderId: "ORD-7310",
    },
    {
      id: "PAY-004",
      date: "2023-05-05",
      amount: 89.96,
      status: "Failed",
      method: "Credit Card",
      orderId: "ORD-7309",
    },
    {
      id: "PAY-005",
      date: "2023-05-03",
      amount: 19.99,
      status: "Failed",
      method: "Bank Transfer",
      orderId: "ORD-7308",
    },
    {
      id: "PAY-006",
      date: "2023-05-02",
      amount: 34.98,
      status: "Completed",
      method: "PayPal",
      orderId: "ORD-7307",
    },
    {
      id: "PAY-007",
      date: "2023-05-01",
      amount: 59.97,
      status: "Refunded",
      method: "Credit Card",
      orderId: "ORD-7306",
    },
  ];

  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<Payment>();

  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("date", {
      header: "Date",
    }),
    columnHelper.accessor("orderId", {
      header: "Order ID",
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
    }),
    columnHelper.accessor("method", {
      header: "Method",
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
          onView={() => handleViewPayment(info.row.original)}
          actionType="order"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: mockPayments,
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
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPayments = mockPayments.filter((payment) => {
    if (
      filterValue &&
      filterValue !== "all" &&
      payment.status !== filterValue
    ) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.orderId.toLowerCase().includes(query) ||
        payment.method.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDownload = () => {
    console.log("Downloading payments data...");
    alert("Payments data download started");
  };

  const handleViewPayment = (payment: any) => {
    console.log("View payment details:", payment);
    alert(`Viewing details for ${payment.id}`);
  };

  const filterOptions = [
    { value: "all", label: "All Statuses" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Failed", label: "Failed" },
    { value: "Refunded", label: "Refunded" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          Track and manage your payment history
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <TableToolbar
            filterOptions={filterOptions}
            onFilterChange={setFilterValue}
            onSearch={setSearchQuery}
            onDownload={handleDownload}
            placeholderText="Search payments..."
          />

          <TableComponent table={table} />

          <TablePagination
            totalItems={filteredPayments.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default PaymentsPage;
