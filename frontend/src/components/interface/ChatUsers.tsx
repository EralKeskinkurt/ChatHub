"use client";
import Image from "next/image";
import ChatUsersHeaderActions from "./ChatUsersHeaderActions";
import ChatUsersFooterProfile from "./ChatUsersFooterProfile";
import { Icon } from "@iconify/react/dist/iconify.js";
import useFriendsStore from "@/stores/friendshipStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ChatUsers() {
  const friendships = useFriendsStore((state) => state.friendships);
  const router = useRouter();

  const handleFriendSelect = (userId: number) => {
    router.push(`/interface/${userId}`);
  };

  useEffect(() => {}, [friendships]);

  return (
    <aside className="w-1/5 dark:bg-theme-gray-dark/50 h-full border-r dark:border-r-theme-light/30 flex flex-col justify-start relative bg-theme-gray-light/50">
      <ChatUsersHeaderActions />
      <ul className="flex flex-col items-start w-full overflow-y-auto h-full">
        {!Array.isArray(friendships) ? (
          <li>Loading...</li>
        ) : friendships.length === 0 ? (
          <li>You dont have any friends yet.</li>
        ) : (
          friendships?.map(
            (f, index) =>
              f.status == "ACCEPTED" && (
                <li key={index} className="w-full">
                  <button
                    onClick={() => handleFriendSelect(f?.friend.id)}
                    className="flex items-center space-x-3 w-full p-3 hover:bg-gray-200 dark:hover:bg-theme-light/10 focus:outline-none cursor-pointer"
                  >
                    <Image
                      src="/images/default-profile-image.png"
                      alt="profile image"
                      width={40}
                      height={40}
                      className="object-cover rounded-sm"
                    />

                    <span className="dark:text-theme-light">
                      {f?.friend?.name}
                    </span>
                    <div tabIndex={0} className="relative ml-auto group">
                      <Icon
                        icon="mi:options-vertical"
                        className="dark:text-theme-light/60  hover:text-theme-light cursor-pointer transition-all z-10"
                        width={18}
                        height={18}
                      />
                      <ul className="absolute right-5 top-0 bg-white text-sm dark:bg-theme-dark rounded-md shadow-xs text-nowrap z-20 dark:shadow-theme-light/50 hidden group-focus-within:block overflow-hidden">
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
                  </button>
                </li>
              )
          )
        )}
      </ul>
      <ChatUsersFooterProfile />
    </aside>
  );
}
