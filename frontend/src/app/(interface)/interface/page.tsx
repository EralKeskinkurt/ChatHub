import ChatBox from "@/components/interface/ChatBox";

export default function page() {
  return (
    <div className="flex items-start justify-center h-screen w-screen">
      <div className="w-1/5 dark:bg-theme-gray-dark/50 h-full border-r dark:border-r-theme-light/30"></div>
      <ChatBox />
    </div>
  );
}
