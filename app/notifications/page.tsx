"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle,
  Calendar,
  Tag,
  Package,
  AlertTriangle,
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-7312 has been shipped and is on its way.",
      date: "1 hour ago",
      read: false,
      icon: Package,
    },
    {
      id: 2,
      type: "promo",
      title: "Weekend Sale",
      message: "Enjoy up to 40% off on selected items this weekend!",
      date: "1 day ago",
      read: false,
      icon: Tag,
    },
    {
      id: 3,
      type: "system",
      title: "Account Updated",
      message: "Your account information has been successfully updated.",
      date: "2 days ago",
      read: true,
      icon: CheckCircle,
    },
    {
      id: 4,
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-7309 has been delivered successfully.",
      date: "3 days ago",
      read: true,
      icon: Package,
    },
    {
      id: 5,
      type: "system",
      title: "System Maintenance",
      message:
        "The system will be down for maintenance on June 15, 2023, from 2 AM to 4 AM.",
      date: "4 days ago",
      read: true,
      icon: AlertTriangle,
    },
    {
      id: 6,
      type: "event",
      title: "Upcoming Event",
      message: "Don't miss our sustainable fashion event next week!",
      date: "5 days ago",
      read: true,
      icon: Calendar,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "promo":
        return "bg-green-100 text-green-800";
      case "system":
        return "bg-yellow-100 text-yellow-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          {/* <p className="text-muted-foreground">
            Stay updated with your orders and announcements
          </p> */}
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark All as Read
        </Button>
      </div>

      {/* <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    notification.read ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${getTypeColor(
                      notification.type
                    )} bg-opacity-20`}
                  >
                    <notification.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge
                          variant="outline"
                          className={`mt-1 ${getTypeColor(notification.type)}`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.date}
                      </p>
                    </div>

                    <p className="mt-2 text-sm">{notification.message}</p>

                    <div className="mt-3 flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  You&apos;re all caught up!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card> */}
    </DashboardLayout>
  );
};

export default Notifications;
