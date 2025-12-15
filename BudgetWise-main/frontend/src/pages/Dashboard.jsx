import { useState, useEffect } from 'react';
import { Plus, Moon, Sun, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import StatsOverview from '@/components/StatsOverview';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import CategorySummary from '@/components/CategorySummary';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getTransactions, addTransaction, deleteTransaction, updateTransaction } from '@/utils/localStorage';

export default function Dashboard({ darkMode, toggleDarkMode }) {
  const [transactions, setTransactions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const data = getTransactions();
    setTransactions(data);
  };

  const handleAddTransaction = (transaction) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transaction);
      setEditingTransaction(null);
    } else {
      addTransaction(transaction);
    }
    loadTransactions();
    setIsDialogOpen(false);
  };

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id);
    loadTransactions();
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Budget Planner
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your expenses and manage your budget with ease
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
                  onClick={() => setEditingTransaction(null)}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
                  </DialogTitle>
                </DialogHeader>
                <TransactionForm 
                  onSubmit={handleAddTransaction}
                  initialData={editingTransaction}
                  onCancel={handleDialogClose}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview transactions={transactions} />

        {/* Charts and Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MonthlyChart transactions={transactions} />
          <CategorySummary transactions={transactions} />
        </div>

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />
      </main>
    </div>
  );
}
