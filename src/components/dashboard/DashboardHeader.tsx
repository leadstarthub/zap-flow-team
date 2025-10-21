import { Button } from "@/components/ui/button";
import { MessageSquare, BarChart3, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="h-16 border-b border-border bg-card px-3 sm:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-foreground">Zap</h1>
          <p className="text-xs text-muted-foreground hidden sm:block truncate">Agent: João Silva</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/team-dashboard")}
          className="gap-1 sm:gap-2 h-8 sm:h-9 px-2 sm:px-3"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="hidden md:inline">Painel Líder</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
