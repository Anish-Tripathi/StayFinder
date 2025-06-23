import { LucideIcon, TrendingUp, Calendar, Home, Star } from "lucide-react";

interface Tab {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs: Tab[] = [
    {
      id: "overview",
      name: "Overview",
      icon: TrendingUp,
    },
    { id: "listings", name: "Listings", icon: Home },
    {
      id: "bookings",
      name: "Bookings",
      icon: Calendar,
    },
    { id: "reviews", name: "Reviews", icon: Star },
  ];

  return (
    <div className="mb-8">
      <nav className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
