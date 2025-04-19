import Image from "next/image";
import { Icon } from "@iconify/react";

export default function ChatUsersFooterProfile() {
  return (
    <div className="flex items-center justify-between bg-theme-dark px-4 py-3 border-t border-theme-dark mt-auto">
      <div className="flex items-center gap-3">
        <Image
          src="/images/default-profile-image.png"
          className="rounded-full"
          alt="Profil"
          width={40}
          height={40}
        />
        <div className="dark:text-theme-light text-sm leading-tight">
          <div className="font-medium">Ahmet Yılmaz</div>
          <div className="dark:text-theme-light/70 text-xs">ahmet@mail.com</div>
        </div>
      </div>
      <div tabIndex={0} className="relative ml-auto group">
        <Icon
          icon="material-symbols:settings-rounded"
          className="dark:text-theme-light/60 dark:hover:text-theme-light cursor-pointer transition-all z-10"
          width={24}
          height={24}
        />
        <ul className="absolute right-7 bottom-0 bg-white text-sm dark:bg-theme-dark rounded-md shadow-xs text-nowrap z-20 dark:shadow-theme-light/50 hidden group-focus-within:block overflow-hidden">
          <li className="px-4 py-2 hover:bg-theme-gray-dark dark:hover:bg-theme-light/10 cursor-pointer">
            View Profile
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-theme-light/10 cursor-pointer">
            Block
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-theme-light/10 cursor-pointer">
            Report
          </li>
          <li className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-theme-light/10 cursor-pointer">
            Mute
          </li>
        </ul>
      </div>
    </div>
  );
}
