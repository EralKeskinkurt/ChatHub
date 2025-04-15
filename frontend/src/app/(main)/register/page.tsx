"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/validation/auth-validation";
import { formatPhoneNumber } from "@/lib/formatPhoneNumber";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [phone, setPhone] = useState("");
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: FormData) => {
    return formData;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Spinner />;

  return (
    <div className="h-screen flex items-center justify-center w-full bg-transparent">
      <div className="dark:bg-theme-light/5 bg-theme-dark/5 dark:text-theme-light text-theme-dark rounded-xl shadow-xs dark:shadow-theme-light/50 shadow-theme-dark/50 p-8 w-full max-w-xl space-y-6">
        <div className="flex justify-center">
          {theme === "dark" ? (
            <Image
              src="/images/light-logo.png"
              alt="chat hub logo"
              width={70}
              height={70}
              className="z-10"
              priority
            />
          ) : (
            <Image
              src="/images/dark-logo.png"
              alt="chat hub logo"
              width={70}
              height={70}
              className="z-10"
              priority
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex items-start justify-between"
        >
          <div className="space-y-3">
            <div className="relative">
              <Icon
                icon="mdi:account-outline"
                className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
              />
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
              />
              <p
                className={`text-red-400 text-xs transition-opacity mt-1 ${
                  errors.name?.message ? "opacity-100" : "opacity-0"
                }`}
              >
                * {errors?.name?.message ? errors.name.message : "----------"}
              </p>
            </div>
            <div className="relative">
              <Icon
                icon="mdi:email-outline"
                className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
              />
              <input
                {...register("email", { required: "E-mail is required" })}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
              />
              <p
                className={`text-red-400 text-xs transition-opacity mt-1 ${
                  errors.email?.message ? "opacity-100" : "opacity-0"
                }`}
              >
                * {errors?.email?.message ? errors.email.message : "----------"}
              </p>
            </div>
            <div className="relative">
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
            <p className="text-center dark:text-theme-light text-theme-dark/60 text-sm">
              Already have an account?{" "}
              <Link
                href="/"
                className="dark:text-theme-yellow text-theme-dark font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
          <div className="space-y-3">
            <div className="relative">
              <Icon
                icon="uiw:date"
                onClick={() => {
                  const dateInput = document.getElementById(
                    "date"
                  ) as HTMLInputElement | null;
                  if (dateInput && dateInput.showPicker) {
                    dateInput.showPicker();
                  }
                }}
                className="absolute left-3 top-3 text-theme-dark dark:text-theme-light cursor-pointer"
              />
              <input
                {...register("date", { required: "Date is required" })}
                type="date"
                id="date"
                placeholder="Date of birth"
                className="w-full bg-transparent border hide-date-icon dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2  dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
              />
              <p
                className={`text-red-400 text-xs transition-opacity mt-1 ${
                  errors.date?.message ? "opacity-100" : "opacity-0"
                }`}
              >
                * {errors?.date?.message ? errors.date.message : "----------"}
              </p>
            </div>
            <div className="relative">
              <Icon
                icon="mdi:lock-outline"
                className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
              />
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
              />
              <p
                className={`text-red-400 text-xs transition-opacity mt-1 ${
                  errors.password?.message ? "opacity-100" : "opacity-0"
                }`}
              >
                *{" "}
                {errors?.password?.message
                  ? errors.password.message
                  : "----------"}
              </p>
            </div>
            <div className="relative">
              <Icon
                icon="mdi:lock-check-outline"
                className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
              />
              <input
                {...register("confirmPassword", {
                  required: "Password confirm is required",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
              />
              <p
                className={`text-red-400 text-xs transition-opacity mt-1 ${
                  errors.confirmPassword?.message ? "opacity-100" : "opacity-0"
                }`}
              >
                *{" "}
                {errors?.confirmPassword?.message
                  ? errors.confirmPassword.message
                  : "----------"}
              </p>
            </div>
            <button className="w-full dark:bg-theme-yellow bg-theme-gray-dark/90 dark:text-theme-dark text-theme-light font-semibold py-2 rounded-md cursor-pointer">
              CREATE ACCOUNT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
