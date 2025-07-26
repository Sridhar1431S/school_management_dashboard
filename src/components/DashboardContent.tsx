import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, BookOpen, TrendingUp, Calendar, Award, DollarSign, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

function StatCard({ title, value, change, icon: Icon, color }: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const finalValue = parseInt(value.replace(/,/g, ''));

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = finalValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setAnimatedValue(finalValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [finalValue]);

  return (
    <Card className="stats-card hover:scale-105 transition-transform duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold count-up">
          {animatedValue.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="text-green-600">{change}</span> from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardContent() {
  const stats = [
    { title: "Total Students", value: "2,547", change: "+12%", icon: Users, color: "bg-blue-500" },
    { title: "Teachers", value: "156", change: "+5%", icon: GraduationCap, color: "bg-purple-500" },
    { title: "Classes", value: "89", change: "+8%", icon: BookOpen, color: "bg-orange-500" },
    { title: "Revenue", value: "$45,231", change: "+18%", icon: DollarSign, color: "bg-green-500" },
  ];

  const recentActivities = [
    { title: "New student enrollment", time: "2 hours ago", icon: Users },
    { title: "Teacher meeting scheduled", time: "4 hours ago", icon: Calendar },
    { title: "Exam results published", time: "6 hours ago", icon: Award },
    { title: "Class schedule updated", time: "8 hours ago", icon: Clock },
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "Mar 15, 2024", type: "Meeting" },
    { title: "Annual Sports Day", date: "Mar 20, 2024", type: "Event" },
    { title: "Final Exams", date: "Mar 25, 2024", type: "Exam" },
    { title: "Graduation Ceremony", date: "Apr 10, 2024", type: "Ceremony" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back, Admin!</h2>
        <p className="text-muted-foreground">Here's what's happening at your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive charts will be displayed here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Student performance, attendance rates, and other metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="p-2 bg-primary/10 rounded-full">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
                <h4 className="font-medium mb-1">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}