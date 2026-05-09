import SockJS from "sockjs-client";

import { Client } from "@stomp/stompjs";

export const socketClient = new Client({

  webSocketFactory: () =>
    new SockJS("http://localhost:8080/ws"),

  reconnectDelay: 5000,
});