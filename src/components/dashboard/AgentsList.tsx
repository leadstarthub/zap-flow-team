import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  status: "online" | "offline" | "busy";
  conversations: number;
  sales: number;
}

const mockAgents: Agent[] = [
  { id: "1", name: "João Silva", status: "online", conversations: 12, sales: 8 },
  { id: "2", name: "Maria Santos", status: "online", conversations: 15, sales: 11 },
  { id: "3", name: "Carlos Oliveira", status: "busy", conversations: 8, sales: 5 },
  { id: "4", name: "Ana Costa", status: "online", conversations: 10, sales: 7 },
  { id: "5", name: "Pedro Alves", status: "offline", conversations: 0, sales: 0 },
];

const AgentsList = () => {
  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "online":
        return "bg-success";
      case "busy":
        return "bg-primary";
      case "offline":
        return "bg-muted-foreground";
    }
  };

  const getStatusLabel = (status: Agent["status"]) => {
    switch (status) {
      case "online":
        return "Online";
      case "busy":
        return "Ocupado";
      case "offline":
        return "Offline";
    }
  };

  return (
    <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
      <h3 className="text-lg font-bold text-foreground mb-6">
        Agentes da Equipe
      </h3>
      <div className="space-y-3">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className="p-4 bg-accent/20 rounded-xl border border-border hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                    agent.status
                  )}`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{agent.name}</h4>
                  <Badge
                    variant="outline"
                    className="text-xs"
                  >
                    {getStatusLabel(agent.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{agent.conversations} conversas</span>
                  <span className="text-success font-medium">
                    {agent.sales} vendas
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AgentsList;
