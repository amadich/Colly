import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export const createChatSocket = () => {
  return new Client({
    webSocketFactory: () =>
      new SockJS(`${process.env.NEXT_PUBLIC_SERVER_URL}/ws`),

    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });
};