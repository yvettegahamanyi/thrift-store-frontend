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
      <Separator />
      <nav className="space-y-1 p-4">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname == "/dashboard"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/products"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname == "/products"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          <ShoppingBag size={18} />
          <span>Products</span>
        </Link>
        <Link
          href="/orders"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname == "/orders"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          <ClipboardList size={18} />
          <span>Orders</span>
        </Link>
        <Link
          href="/payments"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname == "/payments"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          <span className="i-heroicons-banknotes w-5 h-5"></span>
          <span>Payment</span>
        </Link>
        <Link
          href="/donations"
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
            pathname == "/donations"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Gift size={18} />
          <span>Donations</span>
        </Link>

        {user?.role === Role.ADMIN && (
          <Link
            href="/users"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
              pathname == "/users"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        )}
      </nav>
      <div className="absolute bottom-8 left-0 w-full px-4">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between px-4">
          <div>
            <p className="text-sm font-medium">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
