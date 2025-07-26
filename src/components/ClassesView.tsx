import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Plus, MoreHorizontal, Users, Clock, Calendar, Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddClassModal } from '@/components/modals/AddClassModal';
import { useToast } from '@/hooks/use-toast';

interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  grade: string;
  students: number;
  schedule: string;
  room: string;
  status: 'active' | 'completed' | 'cancelled';
}

const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    subject: 'Mathematics',
    teacher: 'Dr. Sarah Johnson',
    grade: '12th',
    students: 28,
    schedule: 'Mon, Wed, Fri 9:00 AM',
    room: 'Room 101',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics Lab',
    subject: 'Physics',
    teacher: 'Prof. Michael Chen',
    grade: '11th',
    students: 24,
    schedule: 'Tue, Thu 2:00 PM',
    room: 'Lab 201',
    status: 'active'
  },
  {
    id: '3',
    name: 'English Literature',
    subject: 'English',
    teacher: 'Ms. Emily Davis',
    grade: '10th',
    students: 32,
    schedule: 'Mon, Wed, Fri 11:00 AM',
    room: 'Room 105',
    status: 'active'
  },
  {
    id: '4',
    name: 'Chemistry Basics',
    subject: 'Chemistry',
    teacher: 'Mr. Robert Brown',
    grade: '9th',
    students: 26,
    schedule: 'Tue, Thu 10:00 AM',
    room: 'Lab 301',
    status: 'cancelled'
  },
  {
    id: '5',
    name: 'Biology Research',
    subject: 'Biology',
    teacher: 'Dr. Lisa Wilson',
    grade: '12th',
    students: 22,
    schedule: 'Mon, Wed 3:00 PM',
    room: 'Lab 401',
    status: 'active'
  },
];

export function ClassesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { toast } = useToast();

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cls.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || cls.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || cls.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const grades = ['all', '9th', '10th', '11th', '12th'];
  const statuses = ['all', 'active', 'completed', 'cancelled'];

  const handleClassAction = (action: string, classId: string, className: string) => {
    const messages = {
      edit: `Editing ${className}`,
      view: `Viewing details for ${className}`,
      delete: `${className} has been removed`,
      enroll: `Opening enrollment for ${className}`,
      schedule: `Managing schedule for ${className}`
    };
    
    toast({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      description: messages[action as keyof typeof messages],
      variant: action === 'delete' ? 'destructive' : 'default'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Classes</h2>
          <p className="text-muted-foreground">Manage class schedules and assignments</p>
        </div>
        <AddClassModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <BookOpen className="h-8 w-8 text-class" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Classes</p>
                <p className="text-2xl font-bold">76</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Class Size</p>
                <p className="text-2xl font-bold">26</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Hours</p>
                <p className="text-2xl font-bold">238</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search classes by name, subject, or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade === 'all' ? 'All Grades' : `Grade ${grade}`}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <Badge 
                      variant={cls.status === 'active' ? 'default' : cls.status === 'completed' ? 'secondary' : 'destructive'}
                      className={
                        cls.status === 'active' ? 'bg-green-500' : 
                        cls.status === 'cancelled' ? 'bg-red-500' : ''
                      }
                    >
                      {cls.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{cls.subject}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cls.students} students</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cls.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{cls.room}</span>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-sm font-medium text-muted-foreground">Teacher</p>
                    <p className="text-sm">{cls.teacher}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      Grade {cls.grade}
                    </span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleClassAction('view', cls.id, cls.name)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleClassAction('edit', cls.id, cls.name)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleClassAction('delete', cls.id, cls.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}