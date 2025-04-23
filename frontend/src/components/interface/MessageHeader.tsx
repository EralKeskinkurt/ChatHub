"use client";
import useAuthStore from "@/stores/authStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

export default function MessageHeader() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="w-full sticky p-4">
      <div className="w-full flex items-center justify-start gap-4">
        <div className="relative group w-10">
          <div
            tabIndex={0}
            className="overflow-hidden rounded-full w-full shadow-xs dark:shadow-theme-light cursor-pointer"
          >
            <Image
              src="/images/default-profile-image.png"
              alt="profile image"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div
            tabIndex={1}
            className="absolute z-10 top-14 left-0 hidden group-focus-within:block"
          >
            <div className="w-64 h-72 dark:bg-theme-gray-dark/50 rounded-sm shadow-xs dark:shadow-theme-light/50 ">
              Profile Card
            </div>
          </div>
        </div>
        <h1 className="font-semibold">{user?.name}</h1>
        <div className="flex items-center justify-center gap-2 ml-auto">
          <span className="dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2 flex">
            <Icon icon="streamline:webcam-video-solid" width={24} height={24} />
          </span>
          <span className="dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2 flex">
            <Icon icon="teenyicons:phone-outline" width={24} height={24} />
          </span>
        </div>
      </div>
    </div>
  );
}
