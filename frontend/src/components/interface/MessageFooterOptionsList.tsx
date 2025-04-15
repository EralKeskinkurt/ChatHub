import { Icon } from "@iconify/react/dist/iconify.js";

export default function MessageFooterOptionsList() {
  return (
    <div className="h-full relative group">
      <span className="dark:text-theme-light/80 dark:hover:bg-theme-light/20 rounded-sm cursor-pointer p-2 flex">
        <Icon icon="teenyicons:attach-outline" width={18} height={18} />
      </span>
      <div className="absolute bottom-5 left-0 hidden group-hover:block bg-transparent">
        <ul className="flex flex-col mb-7 items-start justify-center w-full dark:bg-theme-gray-dark/50 shadow-xs dark:shadow-theme-light/50 rounded-sm overflow-hidden cursor-pointer">
          <li className="flex items-center w-full gap-2 px-4.5 py-1.5 text-sm dark:text-theme-light/80 dark:hover:bg-theme-light/20 transition-all">
            <Icon icon="solar:camera-outline" width={18} height={18} />
            Camera
          </li>
          <li className="flex items-center w-full gap-2 px-4.5 py-1.5 text-sm dark:text-theme-light/80 dark:hover:bg-theme-light/20 text-nowrap transition-all">
            <Icon icon="subway:file-12" width={18} height={18} />
            Add File
          </li>
        </ul>
      </div>
    </div>
  );
}
