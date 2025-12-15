import { Moon, Sun, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">BudgetWise</h2>
              <p className="text-xs text-muted-foreground">Smart Money Management</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full hover:bg-muted"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
