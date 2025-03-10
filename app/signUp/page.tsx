"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

export type LoginPayload = {
  names: string;
  province: string;
  district: string;
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Image src="/img/form.svg" alt="form" width={700} height={700} />
      <div className="absolute bg-green-50 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
        <div className="flex flex-col w-full items-center p-7">
          <h1 className="text-3xl font-bold mb-4">Log In to ThriftStore</h1>
          <form
            className="flex flex-col w-full items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input type="text" placeholder="Names" {...register("names")} />
            <Input
              type="text"
              placeholder="Province"
              {...register("province")}
            />
            <Input
              type="text"
              placeholder="District"
              {...register("district")}
            />
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <Button>Login</Button>
          </form>
          <div className="mt-4 text-center text-sm w-full">
            Don&apos;t have an account?{" "}
            <Link href={"/login"} className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
