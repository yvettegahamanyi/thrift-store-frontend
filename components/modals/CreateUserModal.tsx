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
import { Role } from "@/types/auth";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
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
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post(`/user/${user.id}`, data);
    },
    onSuccess(response) {
      // toast({
      //   title: type === "activate" ? "User Activated" : "User Deactivated",
      //   description: `${user.firstName} has been ${
      //     type === "activate" ? "activated" : "deactivated"
      //   }.`,
      // });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      onClose();
    },
    onError(error: any) {
      console.log(error);
      // toast({
      //   title: type == "activate" ? "Activate failed" : "Deactivate failed",
      //   description:
      //     error?.response?.data?.message || "An unexpected error occurred",
      //   variant: "destructive",
      // });
    },
  });

  const handleSwitchChange = (checked: boolean) => {
    setValue("status", checked ? "ACTIVE" : "INACTIVE");
  };

  const onSubmit = (data: UserType) => {
    // Validate form
    mutate(data);
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
                error={errors.firstName?.message}
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
                error={errors.firstName?.message}
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
                  error={errors.firstName?.message}
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
                error={errors.firstName?.message}
              />
            </div>

            <div className="space-y-3 col-span-full">
              <Label htmlFor="role">I am a</Label>
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
                Active Status
              </Label>
              <Switch
                id="active"
                checked={user?.status === "ACTIVE"}
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
