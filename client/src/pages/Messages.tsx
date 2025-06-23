import { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import io from "socket.io-client";
import axios from "axios";
import ConversationsSidebar from "../components/messages/ConversationsSidebar";
import ChatHeader from "../components/messages/ChatHeader";
import ChatArea from "../components/messages/ChatArea";
import { Conversation, Message, MessagesSocket } from "../types/messages";

const Messages = () => {
  const { user } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const socket = useRef<MessagesSocket | null>(null);

  // Initialize Socket.IO
  useEffect(() => {
    if (!user) return;

    socket.current = io(
      import.meta.env.REACT_APP_API_URL || "http://localhost:5000",
      {
        auth: {
          token: localStorage.getItem("token"),
        },
      }
    );

    socket.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.current.on("receive_message", (message: Message) => {
      message.isNew = true;
      setMessages((prev) => [...prev, message]);
      setConversations((prev) => {
        const convIndex = prev.findIndex(
          (conv) => conv.id === activeConversation
        );
        if (convIndex === -1) return prev;
        const updatedConv = {
          ...prev[convIndex],
          lastMessage: {
            content: message.content || (message.fileName ? "File" : ""),
            timestamp: message.timestamp,
            unread: activeConversation !== prev[convIndex].id,
          },
        };
        return [
          updatedConv,
          ...prev.slice(0, convIndex),
          ...prev.slice(convIndex + 1),
        ];
      });
    });

    socket.current.on(
      "messages_read",
      ({ bookingId }: { bookingId: string }) => {
        if (bookingId === activeConversation) {
          setMessages((prev) => prev.map((msg) => ({ ...msg, read: true })));
        }
      }
    );

    socket.current.on("error", ({ message }: { message: string }) => {
      console.error("Socket error:", message, {
        activeConversation,
        userId: user?.id,
      });
      setError(`Socket error: ${message}`);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user, activeConversation]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;

      try {
        const role = user.role === "host" ? "host" : "guest";
        const response = await axios.get<{ bookings: any[] }>("/api/bookings", {
          params: { role },
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const bookings = response.data.bookings.map(
          (booking: any): Conversation => ({
            id: booking._id,
            participant: {
              id: role === "host" ? booking.guest._id : booking.host._id,
              name:
                role === "host"
                  ? `${booking.guest.firstName} ${booking.guest.lastName}`
                  : `${booking.host.firstName} ${booking.host.lastName}`,
              avatar:
                role === "host" ? booking.guest.avatar : booking.host.avatar,
              isOnline: false,
            },
            lastMessage: booking.messages.length
              ? {
                  content:
                    booking.messages[booking.messages.length - 1].content ||
                    (booking.messages[booking.messages.length - 1].fileName
                      ? "File"
                      : ""),
                  timestamp:
                    booking.messages[booking.messages.length - 1].timestamp,
                  unread: booking.messages.some(
                    (msg: any) => !msg.read && msg.sender.toString() !== user.id
                  ),
                }
              : {
                  content: "",
                  timestamp: booking.createdAt,
                  unread: false,
                },
            property: {
              title: booking.listing.title,
              image: booking.listing.images[0],
            },
          })
        );
        setConversations(bookings);
        if (bookings.length > 0 && !activeConversation) {
          setActiveConversation(bookings[0].id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setError("Failed to fetch conversations");
      }
    };

    fetchConversations();
  }, [user, activeConversation]);

  // Fetch messages and join booking room
  useEffect(() => {
    if (!activeConversation || !socket.current || !user) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get<{ messages: Message[] }>(
          `/api/bookings/${activeConversation}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessages(response.data.messages);
        socket.current.emit("join_booking", { bookingId: activeConversation });
        socket.current.emit("mark_read", { bookingId: activeConversation });
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [activeConversation, user]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !socket.current) return;

    socket.current.emit("send_message", {
      bookingId: activeConversation,
      content: newMessage,
    });
    setNewMessage("");
  };

  const handleSendFile = async (file: File) => {
    if (!activeConversation || !socket.current) {
      setError("No active conversation or socket connection");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post<{
        url: string;
        fileName: string;
        fileType: string;
      }>("/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      socket.current.emit("send_message", {
        bookingId: activeConversation,
        content: "",
        fileUrl: response.data.url,
        fileName: response.data.fileName,
        fileType: response.data.fileType,
        sender: user?.id,
        timestamp: new Date().toISOString(),
        read: false,
      });
    } catch (error: any) {
      console.error(
        "Error uploading file:",
        error.response?.data || error.message
      );
      setError(
        "Failed to upload file: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeConv = conversations.find(
    (conv) => conv.id === activeConversation
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view messages
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded">
          {error}
          <button onClick={() => setError(null)} className="ml-2">
            X
          </button>
        </div>
      )}
      <ConversationsSidebar
        conversations={conversations}
        setConversations={setConversations}
        activeConversation={activeConversation}
        setActiveConversation={setActiveConversation}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {activeConv ? (
        <div className="flex-1 flex flex-col">
          <ChatHeader activeConv={activeConv} />
          <ChatArea
            messages={messages}
            setMessages={setMessages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            handleSendFile={handleSendFile}
            handleKeyPress={handleKeyPress}
            user={user}
            activeConversation={activeConversation}
            socket={socket}
          />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose a conversation from the sidebar to start messaging.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
