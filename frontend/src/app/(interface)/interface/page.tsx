import ChatBox from "@/components/interface/ChatBox";
import ChatUsers from "@/components/interface/ChatUsers";

export default function page() {
  return (
    <div className="flex items-start justify-center h-screen w-screen">
      <ChatUsers />
      <ChatBox />
    </div>
  );
}
