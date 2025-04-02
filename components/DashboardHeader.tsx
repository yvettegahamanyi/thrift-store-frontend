import { Bell, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";

const DashboardHeader = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-end border-b bg-background px-6">
      <div className="flex items-center gap-4">
        {user?.role === Role.CUSTOMER && (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
        )}

        <Button variant="ghost" size="icon" asChild>
          <Link href="/notifications">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push("/account")}
        >
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.firstName
                ? getInitials(`${user.firstName} ${user.lastName}`)
                : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
