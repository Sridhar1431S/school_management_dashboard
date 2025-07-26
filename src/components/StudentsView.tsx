import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, Plus, MoreHorizontal, Mail, Phone, Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddStudentModal } from '@/components/modals/AddStudentModal';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  section: string;
  status: 'active' | 'inactive';
  attendance: number;
  avatar: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@school.edu',
    phone: '+1 (555) 123-4567',
    grade: '10th',
    section: 'A',
    status: 'active',
    attendance: 95,
    avatar: 'AJ'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@school.edu',
    phone: '+1 (555) 234-5678',
    grade: '11th',
    section: 'B',
    status: 'active',
    attendance: 88,
    avatar: 'BS'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@school.edu',
    phone: '+1 (555) 345-6789',
    grade: '9th',
    section: 'A',
    status: 'active',
    attendance: 92,
    avatar: 'CD'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@school.edu',
    phone: '+1 (555) 456-7890',
    grade: '12th',
    section: 'C',
    status: 'inactive',
    attendance: 78,
    avatar: 'DW'
  },
  {
    id: '5',
    name: 'Eva Brown',
    email: 'eva.brown@school.edu',
    phone: '+1 (555) 567-8901',
    grade: '10th',
    section: 'B',
    status: 'active',
    attendance: 96,
    avatar: 'EB'
  },
];

export function StudentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const { toast } = useToast();

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const grades = ['all', '9th', '10th', '11th', '12th'];

  const handleEmailStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Email Sent!",
      description: `Email has been sent to ${studentName}.`,
    });
  };

  const handleCallStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Call Initiated",
      description: `Calling ${studentName}...`,
    });
  };

  const handleEditStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Edit Student",
      description: `Opening edit form for ${studentName}.`,
    });
  };

  const handleViewStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Student Profile",
      description: `Viewing profile for ${studentName}.`,
    });
  };

  const handleDeleteStudent = (studentId: string, studentName: string) => {
    toast({
      title: "Student Removed",
      description: `${studentName} has been removed from the system.`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Students</h2>
          <p className="text-muted-foreground">Manage student information and records</p>
        </div>
        <AddStudentModal />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">2,547</p>
              </div>
              <Users className="h-8 w-8 text-student" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">2,398</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Month</p>
                <p className="text-2xl font-bold">67</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name or email..."
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
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Students List */}
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    {student.avatar}
                  </div>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        Grade {student.grade}
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        Section {student.section}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.attendance}%</p>
                    <p className="text-xs text-muted-foreground">Attendance</p>
                  </div>
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEmailStudent(student.id, student.name)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleCallStudent(student.id, student.name)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewStudent(student.id, student.name)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStudent(student.id, student.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id, student.name)}
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