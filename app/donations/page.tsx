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
import { Button } from "@/components/ui/button";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TablePagination } from "@/components/data-table/table-pagination";
import { TableActions } from "@/components/data-table/table-actions";
import DonationApprovalModal from "@/components/modals/DonationApprovalModal";

const DonationsPage = () => {
  //   const { user } = useContext(AuthContext);
  const user = { role: "admin" };
  const isAdmin = user?.role === "admin";
  const isDonor = user?.role === "donor";

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [isApproveRejectOpen, setIsApproveRejectOpen] = useState(false);

  const mockDonations = [
    {
      id: "DON-1234",
      date: "2023-05-15",
      itemName: "Winter Coat",
      category: "Outerwear",
      status: "Pending",
      donor: "Jane Smith",
    },
    {
      id: "DON-1233",
      date: "2023-05-14",
      itemName: "Denim Jeans",
      category: "Pants",
      status: "Approved",
      donor: "John Doe",
    },
    {
      id: "DON-1232",
      date: "2023-05-12",
      itemName: "Formal Shirts (3)",
      category: "Shirts",
      status: "Listed",
      donor: "Robert Johnson",
    },
    {
      id: "DON-1231",
      date: "2023-05-10",
      itemName: "Summer Dresses",
      category: "Dresses",
      status: "Sold",
      donor: "Sarah Williams",
    },
    {
      id: "DON-1230",
      date: "2023-05-08",
      itemName: "Knit Sweaters (2)",
      category: "Knitwear",
      status: "Rejected",
      donor: "Michael Brown",
    },
    {
      id: "DON-1229",
      date: "2023-05-07",
      itemName: "Canvas Shoes",
      category: "Footwear",
      status: "Pending",
      donor: "Emily Davis",
    },
    {
      id: "DON-1228",
      date: "2023-05-05",
      itemName: "Leather Belts",
      category: "Accessories",
      status: "Approved",
      donor: "Daniel Wilson",
    },
  ];

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

  const filteredDonations = mockDonations.filter((donation) => {
    if (filterValue && donation.status !== filterValue) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        donation.id.toLowerCase().includes(query) ||
        donation.itemName.toLowerCase().includes(query) ||
        donation.category.toLowerCase().includes(query) ||
        donation.donor.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const paginatedDonations = filteredDonations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
        {isDonor && <Button>Donate Item</Button>}
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                {isAdmin && <TableHead>Donor</TableHead>}
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDonations.length > 0 ? (
                paginatedDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    {isAdmin && <TableCell>{donation.donor}</TableCell>}
                    <TableCell>{donation.itemName}</TableCell>
                    <TableCell>{donation.category}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(donation.status)}
                        variant="outline"
                      >
                        {donation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <TableActions
                        onView={() => alert(`View details for ${donation.id}`)}
                        onApprove={() => {
                          setIsApproveRejectOpen(true);
                          setSelectedDonation(donation);
                        }}
                        onReject={() => {
                          setIsApproveRejectOpen(true);
                          setSelectedDonation(donation);
                          setActionType("reject");
                        }}
                        isPending={donation.status === "Pending"}
                        actionType="donation"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 7 : 6}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            totalItems={filteredDonations.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </CardContent>
      </Card>

      <DonationApprovalModal
        isOpen={isApproveRejectOpen}
        onClose={() => setIsApproveRejectOpen(false)}
        donation={selectedDonation}
        type={actionType}
      />
    </DashboardLayout>
  );
};

export default DonationsPage;
