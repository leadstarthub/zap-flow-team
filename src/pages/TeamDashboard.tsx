import { ArrowLeft, Users, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TeamMetrics from "@/components/dashboard/TeamMetrics";
import AgentsList from "@/components/dashboard/AgentsList";

const TeamDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Painel do Líder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Equipe Alpha - 25 Agentes
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Agentes Ativos
                </p>
                <p className="text-3xl font-bold text-foreground">18/25</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Conversas Hoje
                </p>
                <p className="text-3xl font-bold text-foreground">342</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-success" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Clientes Ativos
                </p>
                <p className="text-3xl font-bold text-foreground">287</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Tempo Médio Resp.
                </p>
                <p className="text-3xl font-bold text-foreground">2.3m</p>
              </div>
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AgentsList />
          </div>
          <div>
            <TeamMetrics />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamDashboard;
