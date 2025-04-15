import { Icon } from "@iconify/react/dist/iconify.js";
import { emojiList } from "@/data/emojis";
export default function EmojiList() {
  return (
    <div className="h-full relative group ">
      <span className="dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2 flex">
        <Icon icon="iconoir:emoji" width={18} height={18} />
      </span>
      <div className="w-56 absolute bottom-5 left-0 hidden group-hover:block bg-transparent">
        <ul className="w-full grid-cols-5 grid-rows-1 gap-2 mb-7 items-center bg-theme-gray-dark/50 dark:bg-theme-gray-dark/50 grid shadow-xs dark:shadow-theme-light/50 p-5 rounded-sm">
          {emojiList.map((emoji) => (
            <li
              key={emoji.name}
              className="group dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2 group w-full transition-all"
            >
              <Icon icon={emoji.icon} className="w-full h-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
