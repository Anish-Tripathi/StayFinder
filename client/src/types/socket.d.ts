import { Socket } from "socket.io-client";

declare module "socket.io-client" {
  interface Socket {
    user?: {
      userId: string;
     
    };
  }
}