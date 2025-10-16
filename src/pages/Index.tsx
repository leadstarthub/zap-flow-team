import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Zap</span>
          </div>
          <Button
            onClick={() => navigate("/login")}
            className="bg-primary hover:bg-primary-hover"
          >
            Acessar Plataforma
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Plataforma de Vendas WhatsApp</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transforme Conversas em
            <span className="text-primary"> Vendas</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie múltiplos agentes, acesse catálogo de produtos e complete vendas
            diretamente pelo WhatsApp. Tudo em uma única plataforma.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="h-14 px-8 text-lg bg-primary hover:bg-primary-hover shadow-lg"
          >
            Começar Agora
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <MessageSquare className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Chat em Tempo Real
            </h3>
            <p className="text-muted-foreground">
              Interface moderna para gerenciar todas as conversas com clientes em um só lugar
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all">
            <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Gestão de Equipes
            </h3>
            <p className="text-muted-foreground">
              Organize agentes em times com líderes e acompanhe métricas de desempenho
            </p>
          </div>

          <div className="p-8 bg-card rounded-2xl border border-border shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-floating)] transition-all">
            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Catálogo Integrado
            </h3>
            <p className="text-muted-foreground">
              Acesso rápido ao catálogo de produtos com envio direto para o chat
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
