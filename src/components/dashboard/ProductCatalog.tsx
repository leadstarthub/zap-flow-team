import { useState } from "react";
import { Search, X, Plus, Minus, Send, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    price: 2499.99,
    description: "128GB, Câmera 48MP, 5G",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    stock: 15,
  },
  {
    id: "2",
    name: "Notebook Ultra",
    price: 4299.99,
    description: "Intel i7, 16GB RAM, 512GB SSD",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    stock: 8,
  },
  {
    id: "3",
    name: "Fone Bluetooth Premium",
    price: 299.99,
    description: "Cancelamento de ruído ativo",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 25,
  },
  {
    id: "4",
    name: "Smartwatch Fitness",
    price: 899.99,
    description: "Monitor cardíaco, GPS integrado",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 12,
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

interface Props {
  onClose: () => void;
  onSendToChat: (message: any) => void;
}

const ProductCatalog = ({ onClose, onSendToChat }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSendToChat = () => {
    if (cart.length === 0) {
      toast.error("Adicione produtos ao carrinho");
      return;
    }
    
    onSendToChat({
      sender: "user",
      type: "cart",
      cartData: {
        items: cart.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: totalPrice,
      },
    });
    
    toast.success("Produtos enviados para o chat!");
    setCart([]);
  };

  return (
    <div className="w-96 border-l border-border bg-card flex flex-col shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
        <h2 className="text-lg font-bold text-foreground">Produtos</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.product.id === product.id);
            const quantity = cartItem?.quantity || 0;

            return (
              <div
                key={product.id}
                className="p-3 border border-border rounded-xl hover:shadow-md transition-all bg-card"
              >
                <div className="flex gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Estoque: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>

                {quantity > 0 ? (
                  <div className="flex items-center justify-between mt-3 p-2 bg-accent/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(product.id, 1)}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      R$ {(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <Button
                    className="w-full mt-3 h-8 text-sm bg-primary hover:bg-primary-hover"
                    onClick={() => addToCart(product)}
                  >
                    Adicionar
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-border bg-card shadow-lg">
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-semibold">SUBTOTAL:</span>
                <span className="font-bold text-foreground">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-foreground font-semibold">DESCONTO:</span>
                <span className="font-semibold text-success">
                  R$ 0,00
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Dialog open={showSummary} onOpenChange={setShowSummary}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Ver Resumo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Resumo do Carrinho</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[400px] pr-4">
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex gap-3 p-3 border border-border rounded-lg"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{item.product.name}</h4>
                            <p className="text-xs text-muted-foreground mb-1">
                              {item.product.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Qtd: {item.quantity}</span>
                              <span className="font-bold text-sm">
                                R$ {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">SUBTOTAL:</span>
                        <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">DESCONTO:</span>
                        <span className="font-semibold text-success">R$ 0,00</span>
                      </div>
                      <div className="flex justify-between text-lg pt-2 border-t border-border">
                        <span className="font-bold">TOTAL:</span>
                        <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              <Button
                className="flex-1 bg-success hover:bg-success/90 text-success-foreground gap-2"
                onClick={handleSendToChat}
              >
                <Send className="w-4 h-4" />
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
