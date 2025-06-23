


export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface LastMessage {
  content: string;
  timestamp: string;
  unread: boolean;
}

export interface Property {
  title: string;
  image: string;
}

export interface Conversation {
  id: string;
  participant: Participant;
  lastMessage: LastMessage;
  property: Property;
}

export interface Message {
  id?: string;
  bookingId?: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  isNew?: boolean;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  
  // Call-related fields
  isCall?: boolean;
  callType?: 'audio' | 'video';
  callStatus?: 'missed' | 'completed' | 'rejected';
  callDuration?: number; // in seconds
  
  // Message metadata
  edited?: boolean;
  deleted?: boolean;
  replyTo?: string; 
  

  deliveryStatus?: 'pending' | 'sent' | 'delivered' | 'failed';
  
  // Reactions
  reactions?: {
    [emoji: string]: string[]; 
  };
  

  encrypted?: boolean;
  encryptionKeyId?: string;
}

export interface ServerToClientEvents {
  receive_message: (message: Message) => void;
  messages_read: (data: { bookingId: string }) => void;
  error: (data: { message: string }) => void;
}

export interface ClientToServerEvents {
  join_booking: (data: { bookingId: string }) => void;
  send_message: (data: {
    bookingId: string;
    content: string;
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
  }) => void;
  mark_read: (data: { bookingId: string }) => void;
}

export type MessagesSocket = Socket<ServerToClientEvents, ClientToServerEvents>;