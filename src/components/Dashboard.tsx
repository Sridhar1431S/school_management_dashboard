import { useState, useEffect } from 'react';
import { Users, GraduationCap, BookOpen, BarChart3, Settings, Bell, Menu, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar } from './Sidebar';
import { DashboardContent } from './DashboardContent';
import { StudentsView } from './StudentsView';
import { TeachersView } from './TeachersView';
import { ClassesView } from './ClassesView';
import { ReportsView } from './ReportsView';
import { SettingsView } from './SettingsView';
import { useToast } from '@/hooks/use-toast';

export type MenuItem = {
  id: string;
  label: string;
  icon: any;
  component: React.ComponentType;
};

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, component: DashboardContent },
  { id: 'students', label: 'Students', icon: Users, component: StudentsView },
  { id: 'teachers', label: 'Teachers', icon: GraduationCap, component: TeachersView },
  { id: 'classes', label: 'Classes', icon: BookOpen, component: ClassesView },
  { id: 'reports', label: 'Reports', icon: BarChart3, component: ReportsView },
  { id: 'settings', label: 'Settings', icon: Settings, component: SettingsView },
];

export function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  // Initialize PWA features
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleSendNotification = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "This browser does not support notifications.",
        variant: "destructive"
      });
      return;
    }

    if (notificationPermission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      
      if (permission !== 'granted') {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications to receive updates.",
          variant: "destructive"
        });
        return;
      }
    }

    if (notificationPermission === 'granted') {
      new Notification('SchoollyDash Notification', {
        body: 'This is a demo notification from your School Management System!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
      });

      toast({
        title: "Notification Sent!",
        description: "Demo notification has been triggered successfully.",
      });
    } else {
      toast({
        title: "Permission Required",
        description: "Please enable notifications in your browser settings.",
        variant: "destructive"
      });
    }
  };

  const ActiveComponent = menuItems.find(item => item.id === activeMenuItem)?.component || DashboardContent;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          menuItems={menuItems}
          activeMenuItem={activeMenuItem}
          onMenuItemClick={(id) => {
            setActiveMenuItem(id);
            setMobileMenuOpen(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-card border-b border-border shadow-sm">
            <div className="flex items-center justify-between px-4 h-16">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <h1 className="text-xl font-semibold text-foreground">
                  {menuItems.find(item => item.id === activeMenuItem)?.label || 'Dashboard'}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                {/* Demo Notification Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSendNotification}
                  className="hidden sm:flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Demo Notification
                </Button>

                {/* Notification Bell */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="notification-dot"></span>
                </Button>

                {/* Admin Profile */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    A
                  </div>
                  <span className="hidden sm:block text-sm font-medium">Admin User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="fade-in">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}