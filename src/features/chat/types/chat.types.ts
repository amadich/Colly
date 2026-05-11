export type MessageType = "TEXT" | "IMAGE" | "VIDEO" | "LINK" | "STICKER";

export interface ChatMessage {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  content: string;
  messageType: MessageType;
  mediaUrl?: string;
  createdAt: string;
}

export interface BubbleMessage extends ChatMessage {
  bubbleId: string;
}
