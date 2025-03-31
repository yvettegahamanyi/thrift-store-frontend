"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TablePagination } from "@/components/data-table/table-pagination";
import DonationApprovalModal from "@/components/modals/DonationApprovalModal";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Donation, DonationStatus } from "@/types/donations";
import { TableComponent } from "@/components/data-table/table";
import { Badge } from "@/components/ui/badge";
import { TableActions } from "@/components/data-table/table-actions";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";
import { useGetDonations } from "@/service/donation";
import DonationModal from "@/components/modals/DonationModal";

const DonationsPage = () => {
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === Role.ADMIN;
  const isDonor = user?.role === Role.DONOR;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [isApproveRejectOpen, setIsApproveRejectOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<Donation>();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const { data, isLoading } = useGetDonations();
  const columns = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("pickupAddress", {
      header: "Date",
    }),
    columnHelper.accessor("title", {
      header: "Item",
    }),
    columnHelper.accessor("donor", {
      header: "Donor",
    }),
    columnHelper.accessor("description", {
      header: "Category",
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
          onApprove={() => {
            setSelectedDonation(info.row.original);
            setActionType("approve");
            setIsApproveRejectOpen(true);
          }}
          onReject={() => {
            setSelectedDonation(info.row.original);
            setActionType("reject");
            setIsApproveRejectOpen(true);
          }}
          isPending={info.row.original.status === DonationStatus.PENDING}
          actionType="donation"
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
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-blue-100 text-blue-800";
      case "Listed":
        return "bg-indigo-100 text-indigo-800";
      case "Sold":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = () => {
    console.log("Downloading donations data...");
    alert("Donations data download started");
  };

  const filterOptions = [
    { value: "all", label: "All Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Listed", label: "Listed" },
    { value: "Sold", label: "Sold" },
    { value: "Rejected", label: "Rejected" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Donations</h1>
          <p className="text-muted-foreground">
            {isAdmin
              ? "Manage and process incoming donations"
              : isDonor
              ? "Track your donations and their status"
              : "See how donated items make a difference"}
          </p>
        </div>
        {isDonor && (
          <Button onClick={() => setIsDonationModalOpen(true)}>
            Donate Item
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <TableToolbar
            filterOptions={filterOptions}
            onFilterChange={setFilterValue}
            onSearch={setSearchQuery}
            onDownload={handleDownload}
            placeholderText="Search donations..."
          />

          <TableComponent table={table} />

          {/* <TablePagination
            totalItems={filteredDonations?.length as number}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          /> */}
        </CardContent>
      </Card>

      <DonationApprovalModal
        isOpen={isApproveRejectOpen}
        onClose={() => setIsApproveRejectOpen(false)}
        donation={selectedDonation}
        type={actionType}
      />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        mode="create"
      />
    </DashboardLayout>
  );
};

export default DonationsPage;
