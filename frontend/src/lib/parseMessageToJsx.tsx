import { Icon } from "@iconify/react";
import { emojiList } from "@/data/emojis";
export const parseMessageToJSX = (message: string) => {
  const parts = message.split(/(:[a-zA-Z0-9\-]+:)/g);

  return parts.map((part, index) => {
    const match = part.match(/^:([a-zA-Z0-9\-]+):$/);
    if (match) {
      const emojiKey = match[1];
      const iconName = emojiList[emojiKey as keyof typeof emojiList];
      if (iconName) {
        return (
          <Icon key={index} icon={String(iconName)} width={20} height={20} />
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};
