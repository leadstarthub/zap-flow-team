import { useState } from "react";
import { Send, Paperclip, Smile, ShoppingBag, Phone, Video, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/pages/Dashboard";

interface Props {
  chatId: string | null;
  onToggleCatalog: () => void;
  showCatalog: boolean;
  messages: Message[];
  onSendMessage: (message: Omit<Message, "id" | "time">) => void;
}

const ChatView = ({ chatId, onToggleCatalog, showCatalog, messages, onSendMessage }: Props) => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage({
        text: messageText,
        sender: "user",
        type: "text",
      });
      setMessageText("");
    }
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chat-bg">
        <div className="text-center">
          <p className="text-muted-foreground">
            Selecione uma conversa para começar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-bg">
      {/* Chat Header */}
      <div className="h-16 border-b border-border bg-card px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              MS
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">Maria Santos</h3>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
                message.sender === "user"
                  ? "bg-chat-sent text-primary-foreground rounded-br-sm"
                  : "bg-chat-received text-foreground rounded-bl-sm border border-border"
              }`}
            >
              {message.type === "cart" && message.cartData ? (
                <div className="space-y-2">
                  <p className="text-sm font-semibold mb-3">🛒 Carrinho de Produtos:</p>
                  {message.cartData.items.map((item, idx) => (
                    <div key={idx} className="text-sm pb-2 border-b border-border/50 last:border-0">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs opacity-90">
                        Quantidade: {item.quantity} × R$ {item.price.toFixed(2)} = R$ {(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <p className="text-sm font-bold pt-2">
                    Total: R$ {message.cartData.totalPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-sm">{message.text}</p>
              )}
              <p
                className={`text-xs mt-1 ${
                  message.sender === "user"
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onToggleCatalog}
          >
            <ShoppingBag className={`w-5 h-5 ${showCatalog ? "text-primary" : ""}`} />
          </Button>

          <Input
            placeholder="Digite uma mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-input border-border"
          />

          <Button
            onClick={handleSendMessage}
            className="shrink-0 bg-primary hover:bg-primary-hover"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
