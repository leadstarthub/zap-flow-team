import { useState } from "react";
import ConversationSidebar from "@/components/dashboard/ConversationSidebar";
import ChatView from "@/components/dashboard/ChatView";
import ProductCatalog from "@/components/dashboard/ProductCatalog";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export interface Message {
  id: string;
  text?: string;
  sender: "user" | "customer";
  time: string;
  type: "text" | "audio" | "video" | "emoji" | "cart";
  cartData?: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    totalPrice: number;
  };
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Olá! Gostaria de conhecer os produtos disponíveis",
    sender: "customer",
    time: "10:25",
    type: "text",
  },
  {
    id: "2",
    text: "Olá Maria! Claro, vou abrir nosso catálogo para você",
    sender: "user",
    time: "10:26",
    type: "text",
  },
  {
    id: "3",
    text: "Estou procurando algo específico para presente",
    sender: "customer",
    time: "10:28",
    type: "text",
  },
];

const Dashboard = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [showCatalog, setShowCatalog] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (message: Omit<Message, "id" | "time">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          fixed lg:relative z-50 lg:z-0 h-full
        `}>
          <ConversationSidebar
            selectedChat={selectedChat}
            onSelectChat={(id) => {
              setSelectedChat(id);
              setShowSidebar(false);
            }}
            onToggleSidebar={() => setShowSidebar(false)}
          />
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <ChatView
            chatId={selectedChat}
            onToggleCatalog={() => setShowCatalog(!showCatalog)}
            onToggleSidebar={() => setShowSidebar(!showSidebar)}
            showCatalog={showCatalog}
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          
          {/* Desktop Catalog or Mobile Modal */}
          {showCatalog && (
            <div className={`
              fixed lg:relative inset-0 lg:inset-auto z-30
              ${showCatalog ? 'block' : 'hidden'}
            `}>
              <ProductCatalog 
                onClose={() => setShowCatalog(false)}
                onSendToChat={handleSendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
