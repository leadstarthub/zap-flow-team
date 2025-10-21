import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
              <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground">Zap</span>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary-hover text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4"
          >
            <span className="hidden sm:inline">Acessar Plataforma</span>
            <span className="sm:hidden">Acessar</span>
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-10 sm:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Plataforma de Vendas WhatsApp</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Transforme Conversas em
            <span className="text-primary"> Vendas</span>
          </h1>
          <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Gerencie múltiplos agentes, acesse catálogo de produtos e complete vendas
            diretamente pelo WhatsApp. Tudo em uma única plataforma.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary-hover shadow-lg"
          >
            Começar Agora
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
              Chat em Tempo Real
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Interface moderna para gerenciar todas as conversas com clientes em um só lugar
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-success/10 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-7 sm:h-7 text-success" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
              Gestão de Equipes
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Organize agentes em times com líderes e acompanhe métricas de desempenho
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-xl flex items-center justify-center mb-3 sm:mb-4">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-accent-foreground" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
              Catálogo Integrado
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Acesso rápido ao catálogo de produtos com envio direto para o chat
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
