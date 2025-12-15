import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

export const CategorySummary = ({ transactions }) => {
  const categoryData = useMemo(() => {
    const income = {};
    const expenses = {};
    
    transactions.forEach(t => {
      const target = t.type === 'income' ? income : expenses;
      if (!target[t.category]) {
        target[t.category] = 0;
      }
      target[t.category] += t.amount;
    });
    
    const formatData = (obj) => 
      Object.entries(obj)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    
    return {
      income: formatData(income),
      expenses: formatData(expenses)
    };
  }, [transactions]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            ₹{payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">
            {payload[0].payload.percent}%
          </p>
        </div>
      );
    }
    return null;
  };

  const renderPieChart = (data) => {
    if (data.length === 0) {
      return (
        <div className="h-72 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-semibold mb-2">No data available</p>
            <p className="text-sm">Add transactions to see breakdown</p>
          </div>
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const dataWithPercent = data.map(item => ({
      ...item,
      percent: ((item.value / total) * 100).toFixed(1)
    }));

    return (
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={dataWithPercent}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${percent}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataWithPercent.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className="border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Category Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">Spending by category</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            {renderPieChart(categoryData.expenses)}
          </TabsContent>
          <TabsContent value="income">
            {renderPieChart(categoryData.income)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
