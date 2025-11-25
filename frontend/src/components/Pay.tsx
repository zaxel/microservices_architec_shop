"use client";

import useTimer from "@/hooks/useTimer";
import { CardProductTypes, TimerType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LaptopMinimalCheck, Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import MicroservicesToggle from "./MicroservicesToggle";
import { toast } from "react-toastify";
import useToastsOnEvents from "@/hooks/useToastsOnEvents";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const paths = [
  "/order-monolith",
  "/order-distributed",
  "/events",
];

const Pay = ({ cart }: { cart: CardProductTypes }) => {
  const [checked, toggleChecked] = useState(false);
  const payUrl = checked ? API_URL+paths[1] : API_URL+paths[0];
  const toastUrl = API_URL+paths[2];
  const { close } = useToastsOnEvents(toastUrl);

  const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);

  const { startTimer, resetStartTimer, startTime, getDuration } = useTimer();
  const lastDuration = useRef<number | null>(null);

  const { isPending, isError, mutate, data } = useMutation({
    mutationFn: async (cart: CardProductTypes) => {
      resetStartTimer();
      startTimer();
      const { data } = await axios.post(payUrl, {
        cart,
      });
      return { data };
    },
    onSettled: () => {
      lastDuration.current = getDuration();
    },
  });

  return (
    <div className="bg-red-50 flex flex-col items-center justify-center gap-4 py-8 rounded-xl">
      <div className="flex flex-col gap-12">
        <div className="">
          <div className="flex items-center gap-8">
            <h1 className="font-thin tracking-wider">CART TOTAL</h1>
            <h2 className="text-xl font-bold tracking-widest">${total}</h2>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Shipping & taxes calculated at checkout
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4"
            defaultChecked={true}
          />
          <label htmlFor="terms">
            I agree to the{" "}
            <span className="text-red-300">Terms and Conditions</span>
          </label>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <span className="font-semibold text-sm">Saved Card:</span>
          <Image className="w-auto h-auto" src="/visa.png" alt="card" width={30} height={20} />
          <span className="font-semibold text-xs">**** 3567</span>
          <span className="text-xs text-red-300">(change)</span>
        </div>
        <div>
          <button
            disabled={isPending}
            className="bg-black px-5 py-3 mb-2 text-white rounded-full flex items-center gap-4 w-max cursor-pointer hover:bg-gray-700 transition-all duration-300 disabled:cursor-not-allowed"
            onClick={() => mutate(cart)}
          >
            <span className="tracking-wider text-sm">CHECKOUT</span>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
          <MicroservicesToggle checked={checked} toggleChecked={toggleChecked} />
        </div>
        {data && (
          <div className="text-green-500 text-md flex items-center gap-2">
            <LaptopMinimalCheck className="w-5 h-5" />
            <span>
              Successful in{" "}
              <span
                className={`font-bold ${((lastDuration.current ?? 0) > 5) ? "text-red-500" : "text-green-500"
                  }`}
              >
                {lastDuration.current}
              </span>{" "}
              seconds
            </span>
          </div>
        )}
        {
          isError && (<div className="text-green-500 text-sm flex flex-col items-center">
            <p className="text-red-500">Something went wrong!</p>
            <p>
              Duration:{" "}
              <span
                className={`font-bold ${((lastDuration.current ?? 0) > 5) ? "text-red-500" : "text-green-500"
                  }`}
              >
                {lastDuration.current}
              </span>{" "}
              seconds
            </p>
          </div>)

        }
      </div>
    </div>
  );
};

export default Pay;