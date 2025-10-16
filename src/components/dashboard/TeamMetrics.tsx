import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const TeamMetrics = () => {
  const metrics = [
    {
      label: "Conversas Concluídas",
      value: "156",
      change: "+12%",
      positive: true,
    },
    {
      label: "Vendas Realizadas",
      value: "89",
      change: "+8%",
      positive: true,
    },
    {
      label: "Ticket Médio",
      value: "R$ 847",
      change: "-3%",
      positive: false,
    },
    {
      label: "Satisfação",
      value: "94%",
      change: "+2%",
      positive: true,
    },
  ];

  return (
    <Card className="p-6 border border-border shadow-[var(--shadow-elevated)]">
      <h3 className="text-lg font-bold text-foreground mb-6">
        Métricas da Equipe
      </h3>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 bg-accent/30 rounded-xl border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {metric.label}
              </span>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.positive ? "text-success" : "text-destructive"
                }`}
              >
                {metric.positive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {metric.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamMetrics;
