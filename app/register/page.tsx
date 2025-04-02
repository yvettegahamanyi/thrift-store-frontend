"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Role, SignUpPayload, SignUpPayloadSchema } from "@/types/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignUpPayload>({
    resolver: zodResolver(SignUpPayloadSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post("/signup", data);
    },
    onSuccess(response) {
      toast({
        description:
          "Welcome to ThriftStore! Your account has been created successfully.",
        variant: "success",
      });
      router.push("/");
    },
    onError(error: any) {
      console.log(error);
      toast({
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<SignUpPayload> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-lg border border-muted">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-primary">
            Join ThriftStore
          </CardTitle>
          <p className="text-muted-foreground text-sm">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={watch("firstName")}
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  className="rounded-md"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={watch("lastName")}
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  className="rounded-md"
                />
              </div>
              <div className="space-y-3 col-span-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={watch("email")}
                  {...register("email")}
                  error={errors.email?.message}
                  className="rounded-md"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={watch("password")}
                  {...register("password")}
                  error={errors.password?.message}
                  className="rounded-md"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={watch("confirmPassword")}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  className="rounded-md"
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
              {errors.role?.message && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full rounded-md py-3 font-semibold"
              disabled={isPending}
            >
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={"/"} className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
