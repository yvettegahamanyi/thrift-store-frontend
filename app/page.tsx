"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePaymentStore } from "@/store/item";

export type Payment = {
  id?: string;
  contribution: number;
  loan: number;
  outStandingLoan: number;
  unpaidFees: number;
};

export default function Home() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedPayment, setSelectedPayment] =
    React.useState<Payment | null>();
  const [action, setAction] = React.useState<string | null>();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const { createPayment, payments, updatePayment, deletePayment } =
    usePaymentStore((state) => ({
      createPayment: state.createPayment,
      payments: state.payments,
      updatePayment: state.updatePayment,
      deletePayment: state.deletePayment,
    }));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Payment>({
    defaultValues: {
      contribution: 0,
      loan: 0,
      outStandingLoan: 0,
      unpaidFees: 0,
    },
  });

  const onSubmit: SubmitHandler<Payment> = (data) => {
    if (action == "edit") {
      updatePayment(selectedPayment?.id!, {
        contribution: data.contribution,
        loan: data.loan,
        outStandingLoan: data.outStandingLoan,
        unpaidFees: data.unpaidFees,
      });
    } else
      createPayment({
        contribution: data.contribution,
        loan: data.loan,
        outStandingLoan: data.outStandingLoan,
        unpaidFees: data.unpaidFees,
      });
    setIsDialogOpen(false);
    reset();
  };
  const handleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "contribution",
      header: "Contribution",
      cell: ({ row }) => row.getValue("contribution"),
    },
    {
      accessorKey: "loan",
      header: "Loan",
      cell: ({ row }) => row.getValue("loan"),
    },
    {
      accessorKey: "outStandingLoan",
      header: "Standing Loan",
      cell: ({ row }) => row.getValue("outStandingLoan"),
    },
    {
      accessorKey: "unpaidFees",
      header: "Unpaid",
      cell: ({ row }) => row.getValue("unpaidFees"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <span className="i-heroicons-ellipsis-horizontal-16-solid"></span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup>
                <DropdownMenuItem onClick={() => deletePayment(payment?.id!)}>
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsDialogOpen(true);
                    setAction("edit");
                    setSelectedPayment(payment);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const table = useReactTable({
    data: payments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <React.Fragment>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full">
          <Button
            className="my-4 "
            onClick={() => {
              setIsDialogOpen(true);
              setAction("create");
            }}
          >
            Add New
          </Button>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={handleDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {action == "edit" ? "Edit Payment" : "Create New"}
              </DialogTitle>
            </DialogHeader>
            <Input
              label="Contribution"
              type="number"
              placeholder="Enter Contribution"
              {...register("contribution")}
            />
            <Input
              label="Loan"
              type="number"
              placeholder="Enter Loan"
              {...register("loan")}
            />
            <Input
              label="Standing Loan"
              type="number"
              placeholder="Enter Standing Loan"
              {...register("outStandingLoan")}
            />
            <Input
              label="Unpaid Fees"
              type="number"
              placeholder="Enter Unpaid Fees"
              {...register("unpaidFees")}
            />
            <Button type="submit">
              {action == "edit" ? "Save" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
