"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const mockUsers = [
    {
      id: 1,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joined: "2023-01-15",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Donor",
      status: "Active",
      joined: "2023-02-20",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "Customer",
      status: "Active",
      joined: "2023-03-12",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Donor",
      status: "Active",
      joined: "2023-03-25",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Customer",
      status: "Inactive",
      joined: "2023-04-05",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Customer",
      status: "Active",
      joined: "2023-04-15",
    },
    {
      id: 7,
      name: "Daniel Wilson",
      email: "daniel@example.com",
      role: "Donor",
      status: "Inactive",
      joined: "2023-04-22",
    },
    {
      id: 8,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      role: "Customer",
      status: "Active",
      joined: "2023-05-01",
    },
  ];

  // Filter and search logic
  const filteredUsers = mockUsers.filter((user) => {
    // Filter by role
    if (filterValue && user.role !== filterValue) {
      return false;
    }

    // Search by name or email
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Pagination logic
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDownload = () => {
    // In a real app, this would generate a CSV or Excel file
    console.log("Downloading users data...");
    alert("Users data download started");
  };

  const filterOptions = [
    { value: "all", label: "All Roles" },
    { value: "Admin", label: "Admin" },
    { value: "Donor", label: "Donor" },
    { value: "Customer", label: "Customer" },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage system users and their roles
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <TableToolbar
            filterOptions={filterOptions}
            onFilterChange={setFilterValue}
            onSearch={setSearchQuery}
            onDownload={handleDownload}
            placeholderText="Search users..."
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "Donor"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <TableActions
                        onView={() => alert(`View details for ${user.name}`)}
                        onEdit={() => alert(`Edit ${user.name}`)}
                        isActive={user.status === "Active"}
                        onActivate={() => alert(`Activate ${user.name}`)}
                        onDeactivate={() => alert(`Deactivate ${user.name}`)}
                        actionType="user"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            totalItems={filteredUsers.length}
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

export default UsersPage;
