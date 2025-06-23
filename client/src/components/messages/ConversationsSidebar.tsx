import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Conversation } from "../../types/messages";

const ConversationsSidebar = ({
  conversations,
  setConversations,
  activeConversation,
  setActiveConversation,
  searchQuery,
  setSearchQuery,
}: {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversation: string | null;
  setActiveConversation: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.property?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Messages
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <motion.div
            key={conversation.id}
            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
            onClick={() => {
              setActiveConversation(conversation.id);
              setConversations((prev) =>
                prev.map((conv) =>
                  conv.id === conversation.id
                    ? {
                        ...conv,
                        lastMessage: { ...conv.lastMessage, unread: false },
                      }
                    : conv
                )
              );
            }}
            className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 ${
              activeConversation === conversation.id
                ? "bg-primary-50 dark:bg-primary-900/20 border-r-2 border-r-primary-500"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={
                    conversation.participant.avatar
                      ? `http://localhost:5000/${conversation.participant.avatar}`
                      : "/default-avatar.png"
                  }
                  alt={conversation.participant.name}
                  className="h-12 w-12 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/default-avatar.png";
                  }}
                />
                {(conversation.participant.isOnline ||
                  conversation.lastMessage.unread) && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-success-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {conversation.participant.name}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(
                      conversation.lastMessage.timestamp
                    ).toLocaleDateString()}
                  </span>
                </div>
                {conversation.property && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">
                    {conversation.property.title}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm truncate ${
                      conversation.lastMessage.unread
                        ? "text-gray-900 dark:text-white font-medium"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {conversation.lastMessage.content}
                  </p>
                  {conversation.lastMessage.unread && (
                    <div className="h-2 w-2 bg-primary-500 rounded-full ml-2"></div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsSidebar;
