"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/auth-validation";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}
export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
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
      <div className="dark:bg-theme-light/5 bg-theme-dark/5 dark:text-theme-light text-theme-dark rounded-xl shadow-xs dark:shadow-theme-light/50 shadow-theme-dark/50 p-8 w-full max-w-sm space-y-6">
        <div className="flex justify-center">
          {theme === "dark" ? (
            <Image
              src={"/images/light-logo.png"}
              alt="chat hub logo"
              width={70}
              height={70}
              className="z-10"
              priority={true}
            />
          ) : (
            <Image
              src={"/images/dark-logo.png"}
              alt="chat hub logo"
              width={70}
              height={70}
              className="z-10"
              priority={true}
            />
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="relative">
            <Icon
              icon="mdi:email-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "E-mail is required" })}
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
              icon="mdi:lock-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
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
          <div className="flex flex-col items-start gap-5">
            <Link
              href="/register"
              className="text-sm dark:text-theme-yellow text-theme-dark"
            >
              Forgot password ?
            </Link>
            <button className="w-full dark:bg-theme-yellow bg-theme-gray-dark dark:text-theme-dark text-theme-light font-semibold py-2 rounded-md ">
              LOG IN
            </button>
          </div>
        </form>
        <p className="text-center dark:text-theme-light text-theme-dark/60 text-sm">
          No account?{" "}
          <Link
            href="/register"
            className="dark:text-theme-yellow text-theme-dark font-medium hover:underline"
          >
            Create
          </Link>
        </p>
      </div>
    </div>
  );
}
