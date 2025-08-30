import { cn } from "@/lib/utils";
import { CreditCard, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Account {
  id: string;
  name: string;
  type: 'depository' | 'credit';
  balance: number;
  change?: number;
  changeType?: 'positive' | 'negative';
}

interface AccountCardProps {
  account: Account;
  className?: string;
}

export function AccountCard({ account, className }: AccountCardProps) {
  const isPositive = account.type === 'depository' ? account.balance >= 0 : account.balance <= 0;
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(amount));

  return (
    <div className={cn(
      "glass-card rounded-xl p-6 smooth-transition hover:shadow-medium group relative overflow-hidden",
      className
    )}>
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-5 group-hover:opacity-10 smooth-transition",
        account.type === 'depository' ? "bg-gradient-success" : "bg-gradient-to-br from-warning to-warning/80"
      )} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg",
              account.type === 'depository' 
                ? "bg-success-soft text-success" 
                : "bg-warning-soft text-warning"
            )}>
              {account.type === 'depository' ? (
                <Wallet className="h-5 w-5" />
              ) : (
                <CreditCard className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{account.name}</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {account.type === 'depository' ? 'Bank Account' : 'Credit Card'}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 smooth-transition">
            View Details
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-foreground">
              {account.type === 'credit' && account.balance > 0 && '-'}
              {formatCurrency(account.balance)}
            </span>
            
            {account.change !== undefined && (
              <div className={cn(
                "flex items-center text-sm font-medium",
                account.changeType === 'positive' ? "text-success" : "text-destructive"
              )}>
                {account.changeType === 'positive' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {formatCurrency(Math.abs(account.change))}
              </div>
            )}
          </div>

          <div className={cn(
            "text-xs font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {account.type === 'depository' ? (
              isPositive ? "Available Balance" : "Overdraft"
            ) : (
              isPositive ? "Credit Available" : "Amount Owed"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}