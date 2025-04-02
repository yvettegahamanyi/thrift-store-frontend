import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useForm } from "react-hook-form";
import { userSchema, UserType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role, User } from "@/types/auth";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
  mode: "create" | "edit";
}

const CreateUserModal = ({ isOpen, onClose, user, mode }: UserModalProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      role: user?.role || "customer",
      status: user?.status || "ACTIVE",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post(`/user/create`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast({
        description: `${response.data.firstName || "User"} has been Created.`,
        variant: "success",
      });
      onClose();
    },
    onError(error: any) {
      toast({
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const { mutate: update, isPending: isUpdatePending } = useMutation({
    mutationFn: (data: any) => {
      return api.put(`/user/${user?.id}`, data);
    },
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: [user?.id],
      });
      toast({
        description: `${response.data.firstName || "User"} has been edited.`,
        variant: "success",
      });
      onClose();
    },
    onError(error: any) {
      toast({
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setValue("status", checked ? "ACTIVE" : "INACTIVE");
  };

  const onSubmit = (data: UserType) => {
    // Validate form
    if (mode === "create") mutate(data);
    else update(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Create User" : "Edit User"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={watch("firstName")}
                {...register("firstName")}
                placeholder="First name"
                error={errors.firstName?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={watch("lastName")}
                {...register("lastName")}
                placeholder="Last name"
                error={errors.lastName?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={watch("email")}
                {...register("email")}
                placeholder="email@example.com"
                error={errors.email?.message}
              />
            </div>

            {mode === "create" && (
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={watch("password")}
                  {...register("password")}
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={watch("phoneNumber")}
                {...register("phoneNumber")}
                placeholder="(123) 456-7890"
                error={errors.phoneNumber?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={watch("address")}
                {...register("address")}
                placeholder="123 Main St, City, Country"
                error={errors.address?.message}
              />
            </div>

            <div className="space-y-3 col-span-full">
              <Label htmlFor="role">Role</Label>
              <Select
                value={watch("role")}
                onValueChange={(value: string) =>
                  setValue("role", value as Role)
                }
              >
                <SelectTrigger className="rounded-md">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                  <SelectItem value="DONOR">Donor</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active" className="cursor-pointer">
                Status
              </Label>
              <Switch
                id="active"
                checked={watch("status") === "ACTIVE"}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button>{mode === "create" ? "Create User" : "Update User"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
