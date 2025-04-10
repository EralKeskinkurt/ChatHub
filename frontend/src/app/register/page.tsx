"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function Register() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <div className="space-y-4">
          <div className="relative">
            <Icon
              icon="mdi:account-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
            />
          </div>
          <div className="relative">
            <Icon
              icon="mdi:email-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
            />
          </div>
          <div className="relative">
            <Icon
              icon="mdi:phone-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="phone"
              placeholder="Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
            />
          </div>
          <div className="relative">
            <Icon
              icon="mdi:lock-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
            />
          </div>
          <div className="relative">
            <Icon
              icon="mdi:lock-check-outline"
              className="absolute left-3 top-3 dark:text-theme-light text-theme-dark"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border dark:border-theme-light border-theme-gray-dark/50 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 dark:focus:ring-theme-yellow focus:ring-theme-gray-dark"
            />
          </div>
        </div>
        <button className="w-full dark:bg-theme-yellow bg-theme-gray-dark/90 dark:text-theme-dark text-theme-light font-semibold py-2 rounded-md">
          CREATE ACCOUNT
        </button>
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
    </div>
  );
}
