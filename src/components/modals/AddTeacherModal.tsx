import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, GraduationCap, Mail, Phone, Award, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AddTeacherModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Teacher Added Successfully!",
      description: "The new teacher has been added to the faculty.",
    });
    
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teacher text-white hover:bg-teacher/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Add New Teacher
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="teacherFirstName">First Name</Label>
              <Input id="teacherFirstName" placeholder="Dr. Sarah" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherLastName">Last Name</Label>
              <Input id="teacherLastName" placeholder="Johnson" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacherEmail">Email Address</Label>
            <Input id="teacherEmail" type="email" placeholder="sarah.johnson@school.edu" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacherPhone">Phone Number</Label>
            <Input id="teacherPhone" placeholder="+1 (555) 123-4567" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject Specialization</Label>
            <select id="subject" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
              <option value="">Select Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English Literature">English Literature</option>
              <option value="History">History</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years)</Label>
              <Input id="experience" type="number" placeholder="5" min="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <select id="qualification" className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option value="">Select Qualification</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="teacherAddress">Address</Label>
            <Textarea id="teacherAddress" placeholder="Teacher's address" rows={2} />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Adding..." : "Add Teacher"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}