import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Search, Plus, MoreHorizontal, Mail, Phone, Calendar, Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddTeacherModal } from '@/components/modals/AddTeacherModal';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  status: 'active' | 'on-leave';
  classes: number;
  avatar: string;
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    subject: 'Mathematics',
    experience: '12 years',
    status: 'active',
    classes: 5,
    avatar: 'SJ'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@school.edu',
    phone: '+1 (555) 234-5678',
    subject: 'Physics',
    experience: '8 years',
    status: 'active',
    classes: 4,
    avatar: 'MC'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    email: 'emily.davis@school.edu',
    phone: '+1 (555) 345-6789',
    subject: 'English Literature',
    experience: '15 years',
    status: 'active',
    classes: 6,
    avatar: 'ED'
  },
  {
    id: '4',
    name: 'Mr. Robert Brown',
    email: 'robert.brown@school.edu',
    phone: '+1 (555) 456-7890',
    subject: 'Chemistry',
    experience: '10 years',
    status: 'on-leave',
    classes: 3,
    avatar: 'RB'
  },
  {
    id: '5',
    name: 'Dr. Lisa Wilson',
    email: 'lisa.wilson@school.edu',
    phone: '+1 (555) 567-8901',
    subject: 'Biology',
    experience: '7 years',
    status: 'active',
    classes: 4,
    avatar: 'LW'
  },
];

export function TeachersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const { toast } = useToast();

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature'];

  const handleActions = (action: string, teacherId: string, teacherName: string) => {
    const messages = {
      email: `Email sent to ${teacherName}`,
      call: `Calling ${teacherName}...`,
      schedule: `Opening schedule for ${teacherName}`,
      edit: `Editing ${teacherName}'s profile`,
      view: `Viewing ${teacherName}'s profile`,
      delete: `${teacherName} has been removed from faculty`
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
          <h2 className="text-3xl font-bold text-foreground">Teachers</h2>
          <p className="text-muted-foreground">Manage faculty and staff information</p>
        </div>
        <AddTeacherModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <GraduationCap className="h-8 w-8 text-teacher" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Teachers</p>
                <p className="text-2xl font-bold">142</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Experience</p>
                <p className="text-2xl font-bold">9.2 yrs</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold">14</p>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Faculty Directory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search teachers by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Teachers List */}
          <div className="space-y-3">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teacher rounded-full flex items-center justify-center text-white font-medium">
                    {teacher.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium">{teacher.name}</h4>
                    <p className="text-sm text-muted-foreground">{teacher.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {teacher.subject}
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {teacher.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{teacher.classes} classes</p>
                    <p className="text-xs text-muted-foreground">Teaching load</p>
                  </div>
                  <Badge 
                    variant={teacher.status === 'active' ? 'default' : 'secondary'}
                    className={teacher.status === 'active' ? 'bg-green-500' : ''}
                  >
                    {teacher.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('email', teacher.id, teacher.name)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('call', teacher.id, teacher.name)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('schedule', teacher.id, teacher.name)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('edit', teacher.id, teacher.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('view', teacher.id, teacher.name)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleActions('delete', teacher.id, teacher.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}