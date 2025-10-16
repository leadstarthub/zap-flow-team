import { useState } from "react";
import ConversationSidebar from "@/components/dashboard/ConversationSidebar";
import ChatView from "@/components/dashboard/ChatView";
import ProductCatalog from "@/components/dashboard/ProductCatalog";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [showCatalog, setShowCatalog] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <div className="flex-1 flex overflow-hidden">
        <ConversationSidebar
          selectedChat={selectedChat}
          onSelectChat={setSelectedChat}
        />
        
        <div className="flex-1 flex">
          <ChatView
            chatId={selectedChat}
            onToggleCatalog={() => setShowCatalog(!showCatalog)}
            showCatalog={showCatalog}
          />
          
          {showCatalog && (
            <ProductCatalog onClose={() => setShowCatalog(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
