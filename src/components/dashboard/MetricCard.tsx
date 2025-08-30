import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  trend?: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  trend,
  className,
  size = 'md'
}: MetricCardProps) {
  return (
    <div className={cn(
      "glass-card rounded-xl smooth-transition hover:shadow-medium group",
      size === 'sm' && "p-4",
      size === 'md' && "p-6",
      size === 'lg' && "p-8",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {Icon && (
              <Icon className={cn(
                "text-muted-foreground",
                size === 'sm' && "h-4 w-4",
                size === 'md' && "h-5 w-5",
                size === 'lg' && "h-6 w-6"
              )} />
            )}
            <p className={cn(
              "text-muted-foreground font-medium",
              size === 'sm' && "text-sm",
              size === 'md' && "text-sm",
              size === 'lg' && "text-base"
            )}>
              {title}
            </p>
          </div>
          
          <p className={cn(
            "font-bold text-foreground",
            size === 'sm' && "text-xl",
            size === 'md' && "text-2xl",
            size === 'lg' && "text-3xl"
          )}>
            {value}
          </p>
          
          {change && (
            <p className={cn(
              "text-sm font-medium mt-2",
              changeType === 'positive' && "text-success",
              changeType === 'negative' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        
        {trend && (
          <div className="ml-4 opacity-80 group-hover:opacity-100 smooth-transition">
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}