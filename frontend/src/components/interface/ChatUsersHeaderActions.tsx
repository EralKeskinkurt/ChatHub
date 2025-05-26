"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Modal from "../Modal";
import { useState } from "react";
import AddFriendForm from "./AddFriendForm";
import UserNotifications from "./UserNotification";

export default function ChatUsersHeaderActions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-theme-dark p-4 sticky top-0 z-10 border-b border-theme-dark/30">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-white text-lg font-semibold">Chats</h2>
        <div className="flex gap-2 text-theme-light">
          <UserNotifications />
          <button
            onClick={() => setIsOpen(true)}
            className="hover:text-theme-yellow/50 transition-all cursor-pointer"
          >
            <Icon icon="mingcute:user-add-2-fill" width={20} height={20} />
          </button>
          <button className="hover:text-theme-yellow/50 transition-all cursor-pointer">
            <Icon icon="uiw:usergroup-add" width={20} height={20} />
          </button>
          <button className="hover:text-theme-yellow/50 transition-all cursor-pointer">
            <Icon
              icon="material-symbols:filter-list-rounded"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
      <div className="relative">
        <Icon
          icon="material-symbols:search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-light"
          width={18}
          height={18}
        />
        <input
          type="text"
          placeholder="Aratın veya yeni sohbet başlatın"
          className="w-full pl-10 pr-3 py-2 rounded-md bg-theme-gray-dark text-sm text-theme-light placeholder-theme-light focus:outline-none border border-theme-light/30 focus:border-theme-yellow/30 focus:ring-1 focus:ring-theme-yellow/30"
        />
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddFriendForm />
      </Modal>
    </div>
  );
}
