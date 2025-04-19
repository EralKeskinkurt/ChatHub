import MessageFooter from "./MessageFooter";
import MessageHeader from "./MessageHeader";
import MessagesBox from "./MessagesBox";

export default function ChatBox() {
  return (
    <main className="flex flex-col items-center justify-start h-full w-4/5 overflow-hidden">
      <MessageHeader />
      <MessagesBox />
      <MessageFooter />
    </main>
  );
}
