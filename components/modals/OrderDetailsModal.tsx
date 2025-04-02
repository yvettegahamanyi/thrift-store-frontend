import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/orders";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) => {
  if (!order) return null;

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

  const mockOrderItems = [
    { id: 1, name: "Vintage Denim Jacket", price: 29.99, quantity: 1 },
    { id: 2, name: "Cotton Sweater", price: 24.99, quantity: 1 },
    { id: 3, name: "Leather Belt", price: 19.99, quantity: 1 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details: {order.refNumber}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Order Date
              </h3>
              <p>{order.createdAt.split("T")[0]}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Status
              </h3>
              <Badge className={getStatusColor(order.status)} variant="outline">
                {order.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Customer
              </h3>
              <p>
                {order.user.firstName} {order.user.lastName}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Total
              </h3>
              <p>${order.totalAmount}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Items
            </h3>
            <div className="border rounded-md">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-2">Item</th>
                    <th className="text-right p-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">{item.name}</td>
                      <td className="text-right p-2">${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
