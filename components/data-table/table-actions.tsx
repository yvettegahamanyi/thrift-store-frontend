import {
  MoreVertical,
  Download,
  Edit,
  Eye,
  Trash,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DonationStatus } from "@/types/donations";

interface TableActionsProps {
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isActive?: boolean;
  isPending?: boolean;
  status?: DonationStatus;
  actionType?: "user" | "order" | "donation" | "product";
}

export function TableActions({
  onEdit,
  onView,
  onDelete,
  onActivate,
  onDeactivate,
  onApprove,
  onReject,
  isActive,
  isPending,
  status,
  actionType = "user",
}: TableActionsProps) {
  console.log(status);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
        )}

        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}

        {(onActivate || onDeactivate) && isActive !== undefined && (
          <>
            {/* <DropdownMenuSeparator /> */}
            {isActive ? (
              <DropdownMenuItem onClick={onDeactivate} className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Deactivate
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onActivate} className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Activate
              </DropdownMenuItem>
            )}
          </>
        )}

        {(onApprove || onReject) && (
          <>
            {/* <DropdownMenuSeparator /> */}
            {(status === DonationStatus.PENDING ||
              status === DonationStatus.REJECTED) && (
              <DropdownMenuItem onClick={onApprove} className="text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
            )}
            {(status === DonationStatus.PENDING ||
              status === DonationStatus.APPROVED) && (
              <DropdownMenuItem onClick={onReject} className="text-red-600">
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            )}
          </>
        )}

        {onDelete && (
          <>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
