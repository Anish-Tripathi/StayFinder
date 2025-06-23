import { useState } from "react";
import { Phone, Video, MoreVertical, User } from "lucide-react";
import { Conversation } from "../../types/messages";

const ChatHeader = ({ activeConv }: { activeConv: Conversation }) => {
  const [activeCall, setActiveCall] = useState<null | "video" | "audio">(null);
  const [callStatus, setCallStatus] = useState<
    "connecting" | "connected" | "ended"
  >("connecting");

  const handleStartCall = (type: "video" | "audio") => {
    setActiveCall(type);
    setCallStatus("connecting");
    setTimeout(() => {
      setCallStatus("connected");
    }, 1500);
  };

  const handleEndCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      setActiveCall(null);
    }, 1000);
  };

  return (
    <>
      {activeCall && (
        <div className="fixed inset-0 bg-blue-900 bg-opacity-90 z-50 flex flex-col items-center justify-center text-white p-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {activeCall === "video" ? "Video Call" : "Voice Call"}
            </h2>
            <p className="text-lg">
              {callStatus === "connecting" &&
                "Calling " + activeConv.participant.name + "..."}
              {callStatus === "connected" && "Call in progress"}
              {callStatus === "ended" && "Call ended"}
            </p>
          </div>

          <div className="relative w-full max-w-2xl mb-8">
            {activeCall === "video" ? (
              <>
                <div className="aspect-video bg-blue-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-blue-700 mx-auto mb-4 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-white">{activeConv.participant.name}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 w-1/4 h-1/4 bg-blue-700 rounded-md border-2 border-white">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-sm">You</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-64 h-64 rounded-full bg-blue-800 mx-auto flex items-center justify-center">
                <Phone className="h-20 w-20 text-blue-300" />
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 flex items-center justify-center"
            >
              <Phone className="h-6 w-6 transform rotate-135" />
            </button>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={
                  activeConv.participant.avatar
                    ? `http://localhost:5000/${activeConv.participant.avatar}`
                    : "/default-avatar.png"
                }
                alt={activeConv.participant.name}
                className="h-10 w-10 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/default-avatar.png";
                }}
              />
              {activeConv.participant.isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-success-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activeConv.participant.name}
              </h2>
              {activeConv.property && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeConv.property.title}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleStartCall("audio")}
              className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors  hover:border-blue-700"
            >
              <Phone className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleStartCall("video")}
              className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-colors hover:border-blue-700"
            >
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
