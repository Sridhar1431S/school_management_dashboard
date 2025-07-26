import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { MenuItem } from './Dashboard';

interface SidebarProps {
  menuItems: MenuItem[];
  activeMenuItem: string;
  onMenuItemClick: (id: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
}

export function Sidebar({ 
  menuItems, 
  activeMenuItem, 
  onMenuItemClick, 
  collapsed, 
  mobileOpen 
}: SidebarProps) {
  return (
    <aside 
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out",
        "flex flex-col",
        // Desktop styles
        "hidden lg:flex",
        collapsed ? "w-16" : "w-64",
        // Mobile styles
        "lg:hidden fixed inset-y-0 left-0 z-50 w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">SchoollyDash</span>
              <span className="text-xs text-muted-foreground">School Management</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenuItem === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive && "bg-primary text-primary-foreground shadow-sm"
              )}
              onClick={() => onMenuItemClick(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed ? (
          <div className="text-xs text-muted-foreground text-center">
            <p>Version 1.0.0</p>
            <p>© 2024 SchoollyDash</p>
          </div>
        ) : (
          <div className="w-8 h-8 bg-muted rounded-lg mx-auto"></div>
        )}
      </div>
    </aside>
  );
}