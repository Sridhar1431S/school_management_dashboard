import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield, Palette, Database, Mail, Globe } from 'lucide-react';
import { useState } from 'react';

export function SettingsView() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
  });

  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactView: false,
    showAnimations: true,
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (key: string, value: boolean) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your application preferences and configurations</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@schoollydash.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="System Administrator" disabled />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(value) => handleNotificationChange('email', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(value) => handleNotificationChange('push', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Emergency notifications via SMS</p>
              </div>
              <Switch 
                checked={notifications.sms}
                onCheckedChange={(value) => handleNotificationChange('sms', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Automated weekly summary</p>
              </div>
              <Switch 
                checked={notifications.weekly}
                onCheckedChange={(value) => handleNotificationChange('weekly', value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline" className="w-full">Change Password</Button>
            <Separator />
            <div className="space-y-2">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              <Button variant="outline" className="w-full">Enable 2FA</Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance & Display
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch 
                checked={appearance.darkMode}
                onCheckedChange={(value) => handleAppearanceChange('darkMode', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more data in less space</p>
              </div>
              <Switch 
                checked={appearance.compactView}
                onCheckedChange={(value) => handleAppearanceChange('compactView', value)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-sm text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch 
                checked={appearance.showAnimations}
                onCheckedChange={(value) => handleAppearanceChange('showAnimations', value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              School Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="school-name">School Name</Label>
              <Input id="school-name" defaultValue="Springfield High School" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-address">Address</Label>
              <Input id="school-address" defaultValue="123 Education Street, Springfield" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-phone">Phone</Label>
              <Input id="school-phone" defaultValue="+1 (555) 987-6543" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-email">Official Email</Label>
              <Input id="school-email" defaultValue="info@springfieldhigh.edu" />
            </div>
            <Button className="w-full">Update School Info</Button>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Academic Year</Label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>2024-2025</option>
                  <option>2025-2026</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                  <option>UTC-5 (EST)</option>
                  <option>UTC-8 (PST)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Data Backup</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule Backup
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Application Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Import Data
            </Button>
            <Button variant="outline">
              Clear Cache
            </Button>
            <Button variant="destructive" className="ml-auto">
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}