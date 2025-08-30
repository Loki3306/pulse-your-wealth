import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CreditCard, 
  Receipt, 
  PiggyBank, 
  Target,
  Settings,
  TrendingUp,
  Wallet
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: CreditCard,
  },
  {
    name: "Transactions",
    href: "/transactions", 
    icon: Receipt,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: PiggyBank,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
  },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-background/80 backdrop-blur-sm" />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] glass-card border-r-0 smooth-transition",
        isOpen ? "w-64" : "w-16",
        "hidden lg:block"
      )}>
        <nav className="h-full p-4 custom-scrollbar overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg smooth-transition group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  {isOpen && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="absolute bottom-4 left-4 right-4">
            <NavLink
              to="/settings"
              className={cn(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg smooth-transition group",
                location.pathname === "/settings"
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {isOpen && (
                <span className="ml-3">Settings</span>
              )}
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 glass-card smooth-transition lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="h-full p-4 custom-scrollbar overflow-y-auto">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg smooth-transition",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}