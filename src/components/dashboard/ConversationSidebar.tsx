import { useState } from "react";
import { Search, Phone, Video, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar?: string;
  status: "online" | "offline";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Maria Santos",
    lastMessage: "Gostaria de ver os produtos disponíveis",
    time: "10:30",
    unread: 3,
    status: "online",
  },
  {
    id: "2",
    name: "Carlos Oliveira",
    lastMessage: "Qual o prazo de entrega?",
    time: "09:45",
    unread: 0,
    status: "online",
  },
  {
    id: "3",
    name: "Ana Costa",
    lastMessage: "Obrigada!",
    time: "Ontem",
    unread: 0,
    status: "offline",
  },
];

interface Props {
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
  onToggleSidebar?: () => void;
}

const ConversationSidebar = ({ selectedChat, onSelectChat, onToggleSidebar }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-border bg-sidebar-bg flex flex-col h-full">
      <div className="p-4 border-b border-border bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar conversas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectChat(conv.id)}
            className={`w-full p-4 flex items-start gap-3 hover:bg-sidebar-hover transition-colors border-b border-border ${
              selectedChat === conv.id ? "bg-sidebar-active" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={conv.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {conv.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {conv.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-foreground truncate">
                  {conv.name}
                </span>
                <span className="text-xs text-muted-foreground">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                {conv.unread > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationSidebar;
