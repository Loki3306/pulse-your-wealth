import { MetricCard } from "@/components/dashboard/MetricCard";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Target, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardHero from "@/assets/dashboard-hero.jpg";

const mockAccounts = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'depository' as const,
    balance: 4250.50,
    change: 125.30,
    changeType: 'positive' as const
  },
  {
    id: '2', 
    name: 'Savings',
    type: 'depository' as const,
    balance: 12800.75,
    change: 200.00,
    changeType: 'positive' as const
  },
  {
    id: '3',
    name: 'Chase Sapphire',
    type: 'credit' as const,
    balance: 1245.20,
    change: -85.50,
    changeType: 'negative' as const
  }
];

const recentTransactions = [
  { id: 1, description: 'Grocery Store', amount: -127.45, category: 'Groceries', date: '2024-01-15' },
  { id: 2, description: 'Salary Deposit', amount: 4200.00, category: 'Income', date: '2024-01-15' },
  { id: 3, description: 'Coffee Shop', amount: -8.75, category: 'Dining', date: '2024-01-14' },
  { id: 4, description: 'Gas Station', amount: -45.20, category: 'Transportation', date: '2024-01-14' },
];

export default function Dashboard() {
  const totalNetWorth = mockAccounts.reduce((sum, account) => {
    return account.type === 'depository' 
      ? sum + account.balance 
      : sum - account.balance;
  }, 0);

  const totalIncome = 4200.00;
  const totalExpenses = 1387.62;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden glass-card p-8 md:p-12">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${dashboardHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Welcome back to
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                FlowFinance
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Track your spending, reach your goals, and build wealth with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-primary hover:shadow-glow smooth-transition">
                Add Transaction
              </Button>
              <Button variant="outline" className="glass-card border-glass-border">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Net Worth"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalNetWorth)}
          change="+$325.30 this month"
          changeType="positive"
          icon={TrendingUp}
          size="md"
        />
        <MetricCard
          title="Monthly Income"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalIncome)}
          change="On track"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Monthly Expenses"
          value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalExpenses)}
          change="-12% vs last month"
          changeType="positive"
          icon={Receipt}
        />
        <MetricCard
          title="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          change="+2.3% vs last month"
          changeType="positive"
          icon={PiggyBank}
        />
      </div>

      {/* Accounts Overview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Accounts</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg smooth-transition">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.amount > 0 
                      ? 'bg-success-soft text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {transaction.amount > 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-success' : 'text-foreground'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Progress */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Savings Goals</h2>
            <Button variant="ghost" size="sm">Manage Goals</Button>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-success" />
                  <span className="font-medium text-foreground">Emergency Fund</span>
                </div>
                <span className="text-sm text-muted-foreground">$8,000 / $10,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-success h-2.5 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-warning" />
                  <span className="font-medium text-foreground">MacBook Pro</span>
                </div>
                <span className="text-sm text-muted-foreground">$1,200 / $2,500</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-warning h-2.5 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Vacation Fund</span>
                </div>
                <span className="text-sm text-muted-foreground">$750 / $3,000</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}