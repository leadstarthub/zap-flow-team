import { useState, useRef } from "react";
import { Send, Paperclip, Smile, ShoppingBag, MoreVertical, Upload, File, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Message } from "@/pages/Dashboard";

interface Props {
  chatId: string | null;
  onToggleCatalog: () => void;
  onToggleSidebar: () => void;
  showCatalog: boolean;
  messages: Message[];
  onSendMessage: (message: Omit<Message, "id" | "time">) => void;
}

const ChatView = ({ chatId, onToggleCatalog, onToggleSidebar, showCatalog, messages, onSendMessage }: Props) => {
  const [messageText, setMessageText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "✨", "💯", "👏", "🙏", "😍", "🤔", "😎", "🚀", "💪", "🌟", "😢", "😅", "🤗", "👌"];

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

  const handleEmojiSelect = (emoji: string) => {
    setMessageText((prev) => prev + emoji);
    setEmojiOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleFileUpload = () => {
    if (selectedFiles.length > 0) {
      // Handle file upload logic here
      console.log("Uploading files:", selectedFiles);
      setFileDialogOpen(false);
      setSelectedFiles([]);
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
      <div className="h-16 border-b border-border bg-card px-3 sm:px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden h-8 w-8 shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">
              MS
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">Maria Santos</h3>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCatalog}
            className="h-8 w-8 sm:h-9 sm:w-9"
          >
            <ShoppingBag className={`w-4 h-4 sm:w-5 sm:h-5 ${showCatalog ? "text-primary" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm ${
                message.sender === "user"
                  ? "bg-chat-sent text-primary-foreground rounded-br-sm"
                  : "bg-chat-received text-foreground rounded-bl-sm border border-border"
              }`}
            >
              {message.type === "cart" && message.cartData ? (
                <div className="space-y-3">
                  <div className="border-b border-border/30 pb-2">
                    <p className="text-sm font-bold text-foreground">Produtos:</p>
                  </div>
                  {message.cartData.items.map((item, idx) => (
                    <div key={idx} className="text-sm space-y-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs opacity-80 flex justify-between">
                        <span>-- {item.quantity} x R$ {item.price.toFixed(2)} (UND) =&gt;</span>
                        <span className="font-semibold">R$ {(item.quantity * item.price).toFixed(2)}</span>
                      </p>
                    </div>
                  ))}
                  <div className="border-t border-border/30 pt-2 space-y-1">
                    <p className="text-sm flex justify-between">
                      <span className="font-semibold">Subtotal:</span>
                      <span className="font-bold">R$ {message.cartData.totalPrice.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className="border-t border-border/30 pt-2">
                    <p className="text-sm flex justify-between">
                      <span className="font-bold">TOTAL:</span>
                      <span className="font-bold text-base">R$ {message.cartData.totalPrice.toFixed(2)}</span>
                    </p>
                  </div>
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
      <div className="border-t border-border bg-card p-2 sm:p-4">
        <div className="flex items-center gap-1 sm:gap-3">
          <Dialog open={fileDialogOpen} onOpenChange={setFileDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 sm:h-9 sm:w-9">
                <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Anexar Arquivos</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 hover:border-primary transition-colors">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground mb-1">
                      Clique para selecionar arquivos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Todos os tipos de arquivos são suportados
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Selecionar Arquivos
                  </Button>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Arquivos Selecionados:</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 rounded-md bg-accent"
                        >
                          <File className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm flex-1 truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={handleFileUpload}
                      className="w-full"
                    >
                      Enviar {selectedFiles.length} arquivo{selectedFiles.length > 1 ? 's' : ''}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex">
                <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="h-10 w-10 text-2xl hover:bg-accent p-0"
                    onClick={() => handleEmojiSelect(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Input
            placeholder="Digite uma mensagem..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 bg-input border-border"
          />

          <Button
            onClick={handleSendMessage}
            className="shrink-0 bg-primary hover:bg-primary-hover h-8 w-8 sm:h-9 sm:w-9"
            size="icon"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
