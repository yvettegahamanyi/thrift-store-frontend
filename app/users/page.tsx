"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TableToolbar } from "@/components/data-table/table-toolbar";
import { TableActions } from "@/components/data-table/table-actions";
import { useGetUsers } from "@/service/user";
import { TableComponent } from "@/components/data-table/table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Role, User, UserStatus } from "@/types/auth";
import UserModal from "@/components/modals/UserApproveModal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import CreateUserModal from "@/components/modals/CreateUserModal";

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { data, isLoading } = useGetUsers();
  const [rowSelection, setRowSelection] = useState({});
  const columnHelper = createColumnHelper<User>();
  const [actionType, setActionType] = useState<"activate" | "deactivate">(
    "activate"
  );
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useAuthStore();

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

  const columns = [
    columnHelper.accessor("firstName", {
      header: "Name",
      cell: (info) => (
        <span>
          {info.row.original.firstName} {info.row.original.lastName}
        </span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("role", {
      header: "Role",
      cell: (info) => (
        <Badge
          className={getStatusColor(info.row.original.role)}
          variant="outline"
        >
          {info.row.original.role}
        </Badge>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Category",
      cell: (info) => new Date(info.row.original.createdAt).toDateString(),
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
          isActive={info.row.original.status === UserStatus.ACTIVE}
          onActivate={() => {
            setIsUserModalOpen(true);
            setActionType("activate");
            setSelectedUser(info.row.original);
          }}
          onDeactivate={() => {
            setIsUserModalOpen(true);
            setActionType("deactivate");
            setSelectedUser(info.row.original);
          }}
          actionType="user"
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
      case UserStatus.INACTIVE:
        return "bg-yellow-100 text-yellow-800";
      case UserStatus.ACTIVE:
        return "bg-green-100 text-green-800";
      case Role.DONOR:
        return "bg-blue-100 text-blue-800";
      case Role.ADMIN:
        return "bg-orange-100 text-orange-800";
      case Role.CUSTOMER:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage system users and their roles
          </p>
        </div>
        {user?.role == Role.ADMIN && (
          <Button onClick={() => setIsCreateModalOpen(true)}>New User</Button>
        )}
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
          <TableComponent table={table} />

          {/* <TablePagination
            totalItems={filteredUsers.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          /> */}
        </CardContent>
      </Card>
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        type={actionType}
        user={selectedUser as User}
      />
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        mode={mode}
      />
    </DashboardLayout>
  );
};

export default UsersPage;
