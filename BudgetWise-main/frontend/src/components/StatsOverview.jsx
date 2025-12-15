import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo } from 'react';

export const StatsOverview = ({ transactions }) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
    
    return { income, expenses, balance, savingsRate };
  }, [transactions]);

  const statCards = [
    {
      title: 'Total Income',
      amount: stats.income,
      icon: TrendingUp,
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary-foreground',
      trend: '+12.5%'
    },
    {
      title: 'Total Expenses',
      amount: stats.expenses,
      icon: TrendingDown,
      bgColor: 'bg-destructive/10',
      iconColor: 'text-destructive-foreground',
      trend: '+8.2%'
    },
    {
      title: 'Balance',
      amount: stats.balance,
      icon: Wallet,
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary-foreground',
      trend: stats.balance >= 0 ? 'Positive' : 'Negative'
    },
    {
      title: 'Savings Rate',
      amount: `${stats.savingsRate}%`,
      icon: PiggyBank,
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent-foreground',
      isPercentage: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="border-0 shadow-soft hover:shadow-elegant transition-smooth bg-card"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.isPercentage ? stat.amount : `₹${stat.amount.toLocaleString()}`}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsOverview;
