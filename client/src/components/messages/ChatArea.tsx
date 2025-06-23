import { useRef, useState, useEffect } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import { motion } from "framer-motion";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
import "emoji-picker-element";

import { Message, MessagesSocket } from "../../types/messages";

const ChatArea = ({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleSendFile,
  handleKeyPress,
  user,
}: {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleSendFile: (file: File) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  user: any;
  activeConversation: string | null;
  socket: React.MutableRefObject<MessagesSocket | null>;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendFile(file);
      e.target.value = "";
    }
  };

  const handleEmojiClick = () => {
    setShowEmojiPicker((prev) => !prev);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    const picker = emojiPickerRef.current;
    if (picker) {
      const handleEmojiSelect = (event: CustomEvent) => {
        setNewMessage((prev) => prev + event.detail.unicode);
        setShowEmojiPicker(false);
      };

      picker.addEventListener(
        "emoji-click",
        handleEmojiSelect as EventListener
      );
      return () => {
        picker.removeEventListener(
          "emoji-click",
          handleEmojiSelect as EventListener
        );
      };
    }
  }, []);

  let lastDate: string | null = null;
  let showNewMessageDivider = false;

  return (
    <div className="flex flex-col h-full">
      {/* Messages container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
        style={{
          maxHeight: "calc(100vh - 200px)",
          minHeight: "300px",
        }}
      >
        {messages.map((message, index) => {
          const messageDate = new Date(message.timestamp).toLocaleDateString();
          const showDateDivider = messageDate !== lastDate;
          lastDate = messageDate;

          const isReceivedNewMessage =
            message.isNew &&
            message.sender !== user.id &&
            !showNewMessageDivider;
          if (isReceivedNewMessage) {
            showNewMessageDivider = true;
          }

          const isImage = message.fileType?.startsWith("image/");
          const isSender = message.sender === user.id;

          return (
            <div key={`${message.timestamp}-${index}`}>
              {showDateDivider && (
                <div className="text-center my-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                    {messageDate}
                  </span>
                </div>
              )}
              {showNewMessageDivider && isReceivedNewMessage && (
                <div className="text-center my-2">
                  <span className="text-xs text-white bg-success-500 px-2 py-1 rounded">
                    New Messages
                  </span>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    isSender
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {/* Show image preview for image files */}
                  {isImage && message.fileUrl && (
                    <div className="overflow-hidden rounded-md max-w-[150px] max-h-[150px]">
                      <img
                        src={message.fileUrl}
                        alt="Shared content"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}

                  {/* Show download link for non-image files */}
                  {!isImage && message.fileUrl && (
                    <div className="mb-2">
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-500 hover:underline"
                      >
                        <Paperclip className="h-4 w-4 mr-1" />
                        {message.fileName || "Download file"}
                      </a>
                    </div>
                  )}

                  {/* Show message text if exists */}
                  {message.content && (
                    <p className="text-sm">{message.content}</p>
                  )}

                  {/* Message timestamp and read status */}
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${
                      isSender
                        ? "text-primary-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {isSender && message.read && (
                      <BiCheckDouble className="w-4 h-4 text-blue-400" />
                    )}
                    {isSender && !message.read && (
                      <BiCheck className="w-4 h-4 text-gray-400" />
                    )}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area  */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-end space-x-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            className="hidden"
          />
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
            <button
              onClick={handleEmojiClick}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
            <emoji-picker
              ref={emojiPickerRef}
              class={showEmojiPicker ? "block" : "hidden"}
              style={{
                position: "absolute",
                bottom: "60px",
                right: "0",
                zIndex: 10,
                maxWidth: "300px",
                maxHeight: "400px",
                overflow: "auto",
                background: "var(--bg-white, #fff)",
                border: "1px solid var(--border-gray-200, #e5e7eb)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            ></emoji-picker>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
