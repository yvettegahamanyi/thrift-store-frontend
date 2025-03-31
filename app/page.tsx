"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { LoginPayload } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginPayload>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => {
      return api.post("/signin", data);
    },
    onSuccess(response) {
      console.log(response);
      setToken(response.data.access_token);

      toast({
        title: "Login successful",
        description: "Welcome back to ThriftStore!",
      });
      router.push("/dashboard");
    },
    onError(error: any) {
      console.log(error);
      toast({
        title: "Login failed",
        description:
          error?.response?.data?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            ThriftStore
          </CardTitle>
          <p className="text-muted-foreground">Second life for your goods</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={watch("email")}
                {...register("email")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={watch("password")}
                {...register("password")}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Do not have an account?
            <Link href={"/signup"} className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
