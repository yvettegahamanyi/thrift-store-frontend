"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserType } from "@/types/user";

const Account = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<UserType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      address: user?.address,
    },
  });

  // console.log(getValues("firstName"));

  const onSubmit = (data: UserType) => {
    // In a real app, this would update the user profile

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
                  {/* <img
                    src="/lovable-uploads/1c2924c1-d7b4-4376-9452-fe6835693d1e.png"
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
              <h2 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-muted-foreground capitalize">{user?.role}</p>

              <div className="mt-6 space-y-2 w-full">
                <Button variant="outline" className="w-full">
                  Upload Picture
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-destructive hover:text-destructive"
                >
                  Remove Picture
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Basic Profile</h2>
                <p className="text-sm text-muted-foreground">
                  The information can be edited from your profile page
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">First Name</Label>
                    <Input
                      id="firstName"
                      value={watch("firstName")}
                      {...register("firstName")}
                      placeholder="Your last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={watch("lastName")}
                      {...register("lastName")}
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={watch("email")}
                    {...register("email")}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={watch("phoneNumber")}
                      {...register("phoneNumber")}
                      placeholder="07XXXXXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={watch("address")}
                      {...register("address")}
                      placeholder="Your address"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Account;
