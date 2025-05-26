"use client";
import chatHubApi from "@/lib/axios";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";
import { phoneValidation } from "@/validation/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../Loading";
export default function AddFriendForm() {
  const [phone, setPhone] = useState("");
  const addFriendSchema = z.object({ phone: phoneValidation });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addFriendSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof addFriendSchema>) => {
      const response = await chatHubApi.post(
        "/notification/send-friend-request",
        values
      );
      return response;
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = async (formData: { phone: string }) => {
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center text-lg text-theme-light/80">
        Add a friend by phone number
      </h3>
      <div className="relative mt-2">
        <Icon
          icon="mdi:phone-outline"
          className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
        />
        <input
          {...register("phone", { required: "Phone is required" })}
          type="phone"
          value={phone}
          onChange={handleChange}
          placeholder="(5XX)-XXX-XXXX"
          className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
        />
        <p
          className={`text-red-400 text-xs transition-opacity mt-1 ${
            errors.phone?.message ? "opacity-100" : "opacity-0"
          }`}
        >
          * {errors?.phone?.message ? errors.phone.message : "----------"}
        </p>
      </div>
      {isPending ? (
        <button
          type="button"
          className="w-full dark:bg-theme-yellow bg-theme-gray-dark dark:text-theme-dark text-theme-light font-semibold py-2 rounded-md flex items-center justify-center gap-2"
        >
          <Loading className="!w-6 !h-6" />
        </button>
      ) : (
        <button className="w-full dark:bg-theme-yellow bg-theme-gray-dark/90 dark:text-theme-dark text-theme-light font-semibold py-2 rounded-md cursor-pointer">
          ADD FRIEND
        </button>
      )}
    </form>
  );
}
