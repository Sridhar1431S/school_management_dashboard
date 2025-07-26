import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Download, FileText, Calendar, Users, PieChart, Activity } from 'lucide-react';

interface ReportCard {
  id: string;
  title: string;
  description: string;
  type: 'attendance' | 'performance' | 'financial' | 'enrollment';
  lastUpdated: string;
  icon: any;
  status: 'ready' | 'generating' | 'scheduled';
}

const mockReports: ReportCard[] = [
  {
    id: '1',
    title: 'Student Attendance Report',
    description: 'Monthly attendance statistics for all students',
    type: 'attendance',
    lastUpdated: '2 hours ago',
    icon: Users,
    status: 'ready'
  },
  {
    id: '2',
    title: 'Academic Performance Analysis',
    description: 'Grade distribution and performance trends',
    type: 'performance',
    lastUpdated: '1 day ago',
    icon: TrendingUp,
    status: 'ready'
  },
  {
    id: '3',
    title: 'Financial Summary',
    description: 'Revenue, expenses, and budget analysis',
    type: 'financial',
    lastUpdated: 'Generating...',
    icon: BarChart3,
    status: 'generating'
  },
  {
    id: '4',
    title: 'Enrollment Statistics',
    description: 'Student enrollment trends and projections',
    type: 'enrollment',
    lastUpdated: 'Scheduled for tomorrow',
    icon: PieChart,
    status: 'scheduled'
  },
  {
    id: '5',
    title: 'Teacher Performance Report',
    description: 'Faculty evaluation and class feedback analysis',
    type: 'performance',
    lastUpdated: '3 hours ago',
    icon: Activity,
    status: 'ready'
  },
  {
    id: '6',
    title: 'Class Utilization Report',
    description: 'Classroom and resource utilization statistics',
    type: 'attendance',
    lastUpdated: '5 hours ago',
    icon: Calendar,
    status: 'ready'
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'attendance': return 'bg-blue-500';
    case 'performance': return 'bg-green-500';
    case 'financial': return 'bg-yellow-500';
    case 'enrollment': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'ready': return <Badge className="bg-green-500">Ready</Badge>;
    case 'generating': return <Badge className="bg-yellow-500">Generating</Badge>;
    case 'scheduled': return <Badge variant="secondary">Scheduled</Badge>;
    default: return <Badge variant="secondary">Unknown</Badge>;
  }
};

export function ReportsView() {
  const quickStats = [
    { label: 'Total Reports', value: '24', change: '+3 this month' },
    { label: 'Automated Reports', value: '18', change: '75% automated' },
    { label: 'Avg Generation Time', value: '2.3 min', change: '-30% faster' },
    { label: 'Data Accuracy', value: '99.8%', change: 'Excellent quality' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Generate and view comprehensive school reports</p>
        </div>
        <Button className="bg-report text-white hover:bg-report/90">
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Performance analytics visualization</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Student grades, attendance, and engagement metrics
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Resource Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-500/10 to-green-500/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">Resource allocation overview</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Budget, facilities, and staff distribution
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockReports.map((report) => {
              const Icon = report.icon;
              return (
                <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${getTypeColor(report.type)}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {getStatusBadge(report.status)}
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last updated:</span>
                      <span>{report.lastUpdated}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                        {report.type}
                      </span>
                      {report.status === 'ready' && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      {report.status === 'generating' && (
                        <Button variant="outline" size="sm" disabled>
                          Generating...
                        </Button>
                      )}
                      {report.status === 'scheduled' && (
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Report Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Student Attendance Report downloaded', time: '2 hours ago', user: 'Admin User' },
              { action: 'Financial Summary report generated', time: '4 hours ago', user: 'Finance Dept' },
              { action: 'Performance Analysis scheduled', time: '1 day ago', user: 'Academic Head' },
              { action: 'Enrollment Report shared with board', time: '2 days ago', user: 'Principal' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">by {activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}