"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import Result from "./result";
import { useRouter } from "next/navigation";

const CartForm = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const origin = window.location.origin;
  // console.log(data)
  const formSchema = z.object({
    valueNumber: z
      .number({ invalid_type_error: "Number is required" })
      .min(0, { message: "The number must be from 0 to 10." })
      .max(10),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valueNumber: undefined,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    const d = await axios.post(`${origin}/api`, data);
    console.log(d);
    if (d.data == "success") {
      toast.success("لقد ربحت لعبة");
      router.refresh();
      router.push("/");
      setLoading(false);
    } else if (d.data == "error") {
      toast.error("لقد خسرت حاول مجدداً");
      setLoading(false);
    }
  };
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center h-[90vh]">
        <div className="card w-96 bg-base-100 shadow-xl py-10">
          <div className="card-body p-2">
            <h1 className="card-title flex justify-center items-center text-2xl py-10">
              لعبة احزر الرقم
            </h1>
            <Result />
            <p className="flex flex-col justify-end items-end py-10">
              دخل الرقم
              <label htmlFor="valueNumber"></label>
              <input
                {...register("valueNumber", { valueAsNumber: true })}
                type="number"
                name="valueNumber"
                id="valueNumber"
                className="w-full outline-none border-2 rounded-md text-end"
              />
              {errors.valueNumber && (
                <p className="text-red-700">{errors.valueNumber.message}</p>
              )}
            </p>
            <div className="card-actions flex justify-center py-10">
              <button
                type="submit"
                className="bg-blue-600 flex justify-center items-center rounded-full w-20 h-10 text-white"
                value="submit"
              >
                {isLoading ? (
                  <span className=" bg-white text-white loading loading-spinner loading-md"></span>
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartForm;
