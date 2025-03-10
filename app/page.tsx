"use client";
import Head from "next/head";
import Image from "next/image";
import styles from "./welcome.module.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className={""}>
      <Head>
        <title>Groovin | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="min-h-screen">
        <div className="flex flex-col">
          <div
            className={"bg-after-barchart w-full " + styles.mainDiv}
            id={"welcome"}
          >
            <div className={"px-5 py-3 " + styles.container}>
              <div className="flex justify-between inline-block  items-stretch">
                <div className="text-left">
                  <Image
                    src="/logo.png"
                    alt="inline-block"
                    width={100}
                    height={60}
                  />
                </div>
                <div className="flex-initial px-5 mt-4">
                  <Button onClick={() => router.push("/login")}>Login</Button>
                </div>
              </div>
            </div>
            <div className="py-12 px-12">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="text-black my-auto pr-16 pl-4 ">
                  <h1 className="text-4xl font-bold sm:text-center md:text-left">
                    An Online Thrift Store Platform For Customers
                  </h1>
                  <p className="my-7 text-md sm:text-center md:text-left">
                    Thrift Store is a Platform where people donate unused
                    clothes and allow customers to buy used clothes online.
                    Preloved Finds, Timeless Style!
                  </p>
                  <div className="flex-initial px-5 mt-4">
                    <Button>Sign Up</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "h-24 w-full bg-gradient-to-b from-[#ec634870] via-[#F9D1C8]  to-[#f6fcff04]"
            }
          ></div>
        </div>
        <div className={"w-full flex flex-col md:flex-row justify-evenly my-7"}>
          <div className="md:w-4/12 flex flex-col w-full md:m-0 m-8">
            <h1 className="font-extrabold text-3xl pb-10">
              Discover new Designs from Thrift store
            </h1>
            <div className="w-full md:m-8 m-8">
              <Image
                src="/img/discover_designs.svg"
                alt="Become visible"
                width={685}
                height={870}
              />
            </div>
          </div>

          <div className="w-96 p-10">
            <h3 className="text-sm font-bold text-right">
              Browse and purchase thounsands of clothes in the thriftStore at an
              affordable price.
            </h3>
            <div className="flex flex-col py-8">
              <div className="flex flex-row gap-4">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2 w-full text-right">
                    <h6 className="font-extrabold">Browse & Shop Products</h6>
                    <p className="w-full text-gray-500 text-sm">
                      Easily explore and purchase a variety of thrift items with
                      organized categories and detailed product listings
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 my-8">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2 text-right">
                    <h6 className="font-extrabold">Manage Your Cart</h6>
                    <p className="w-full text-gray-400 text-sm">
                      Add, view, and save your favorite items for a seamless
                      shopping experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 my-4">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2 text-right">
                    <h6 className="font-extrabold">Place & Track Orders</h6>
                    <p className="w-full text-gray-500 text-sm">
                      Securely complete purchases, make payments, and track your
                      order history from placement to delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "w-full flex flex-col md:flex-row md:justify-evenly sm:flex-col- my-7"
          }
        >
          <div className="w-96 p-10">
            <h1 className="text-3xl font-extrabold">Thrift Store Services</h1>
            <div className="flex flex-col py-8">
              <div className="flex flex-row gap-4">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2">
                    <h6 className="font-extrabold">Submit Donations</h6>
                    <p className="w-full">
                      Easily donate items by listing them through the platform
                      for review and approval.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 my-8">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2">
                    <h6 className="font-extrabold">Track Donation Status</h6>
                    <p className="w-full">
                      Monitor the approval process and see updates on how your
                      donated items are being organized.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-4 my-4">
                <div className="flex gap-5 flex-col">
                  <div className="flex flex-col gap-2">
                    <h6 className="font-extrabold">Make drop offs</h6>
                    <p className="w-full">
                      Schedule drop-off times and locations to submit your
                      donations in person.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-4/12 w-full md:m-0 m-8">
            <Image
              src="/img/bring_business_online.svg"
              alt="Become visible"
              width={695}
              height={870}
            />
          </div>
        </div>
      </div>
      <div className={"flex flex-col w-full bg-black px-10 py-3 z-30"}>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="text-white">
            <a className="text-white text-2xl ml-auto mr-auto">ThriftStore</a>
          </div>
          <hr className="bg-white w-full mt-4 pl-4" />
        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-evenly mt-8">
          <p className="text-gray-100 text-sm">
            Copyright Gahamanyi 2025 All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
