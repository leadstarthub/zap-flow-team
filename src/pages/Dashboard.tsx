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
            messages={messages}
            onSendMessage={handleSendMessage}
          />
          
          {showCatalog && (
            <ProductCatalog 
              onClose={() => setShowCatalog(false)}
              onSendToChat={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
