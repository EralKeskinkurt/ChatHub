"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import EmojisList from "./EmojisList";
import MessageFooterOptionsList from "./MessageFooterOptionsList";

export default function MessageFooter() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 150);
      textarea.style.height = `${newHeight}px`;
      textarea.style.overflowY =
        textarea.scrollHeight > 150 ? "auto" : "hidden";
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [value]);
  return (
    <div className="flex items-start gap-5 justify-between w-full p-2">
      <div className="h-full flex items-start justify-center gap-1">
        <EmojisList />
        <MessageFooterOptionsList />
      </div>
      <div className="flex-1 flex items-start justify-between gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          cols={1}
          rows={1}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your message..."
          className="hide-scrollbar text-sm w-11/12 p-2 resize-none rounded-md outline-none transition-all duration-100 ease-in"
          style={{
            maxHeight: "150px",
          }}
        />
        {!!value.length ? (
          <span className="dark:text-theme-yellow/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2">
            <Icon icon="bx:send" width={20} height={20} />
          </span>
        ) : (
          <span className="dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2">
            <Icon icon="bi:mic" width={20} height={20} />
          </span>
        )}
      </div>
    </div>
  );
}
