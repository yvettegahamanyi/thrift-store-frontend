import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Gift,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Role } from "@/types/auth";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-border bg-background shadow-sm">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-semibold text-primary">ThriftStore</h1>
      </div>
      <div className="px-6 pb-6">
        <p className="text-sm font-medium">
          {user?.firstName + " " + user?.lastName}
        </p>
        <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
      </div>
      <Separator />

      <nav className="space-y-1 p-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
            pathname == "/dashboard"
              ? "bg-[#F2FCE2] text-green-600 font-medium before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-green-600"
              : "text-muted-foreground hover:bg-accent"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        {(user?.role === Role.ADMIN || user?.role === Role.CUSTOMER) && (
          <Link
            href="/products"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
              pathname == "/products"
                ? "bg-[#F2FCE2] text-green-600 font-medium before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-green-600"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <ShoppingBag size={18} />
            <span>Products</span>
          </Link>
        )}
        {(user?.role === Role.ADMIN || user?.role === Role.CUSTOMER) && (
          <Link
            href="/orders"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
              pathname == "/orders"
                ? "bg-[#F2FCE2] text-green-600 font-medium before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-green-600"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <ClipboardList size={18} />
            <span>Orders</span>
          </Link>
        )}
        {user?.role === Role.ADMIN && (
          <Link
            href="/payments"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
              pathname == "/payments"
                ? "bg-[#F2FCE2] text-green-600 font-medium before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-green-600"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <span className="i-heroicons-banknotes w-5 h-5"></span>
            <span>Payment</span>
          </Link>
        )}
        {(user?.role === Role.ADMIN || user?.role === Role.DONOR) && (
          <Link
            href="/donations"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
              pathname == "/donations"
                ? "bg-[#F2FCE2] text-green-600 font-medium before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-green-600"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <Gift size={18} />
            <span>Donations</span>
          </Link>
        )}

        {user?.role === Role.ADMIN && (
          <Link
            href="/users"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors relative ${
              pathname == "/users"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        )}
      </nav>
      <div className="absolute bottom-8 w-full">
        <Separator className="mb-4" />
        <div className="flex items-center justify-center">
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut size={18} />
            logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
