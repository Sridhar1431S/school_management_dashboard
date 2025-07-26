import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, BookOpen, Clock, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AddClassModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Class Created Successfully!",
      description: "The new class has been added to the schedule.",
    });
    
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-class text-white hover:bg-class/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Create New Class
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="className">Class Name</Label>
            <Input id="className" placeholder="Advanced Mathematics" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classSubject">Subject</Label>
            <select id="classSubject" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
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
          
          <div className="space-y-2">
            <Label htmlFor="teacher">Assigned Teacher</Label>
            <select id="teacher" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
              <option value="">Select Teacher</option>
              <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
              <option value="Prof. Michael Chen">Prof. Michael Chen</option>
              <option value="Ms. Emily Davis">Ms. Emily Davis</option>
              <option value="Mr. Robert Brown">Mr. Robert Brown</option>
              <option value="Dr. Lisa Wilson">Dr. Lisa Wilson</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classGrade">Grade</Label>
              <select id="classGrade" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
                <option value="">Select Grade</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="room">Classroom</Label>
              <Input id="room" placeholder="Room 101" required />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacity">Max Students</Label>
              <Input id="capacity" type="number" placeholder="30" min="1" max="50" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input id="duration" type="number" placeholder="60" min="30" max="120" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input id="schedule" placeholder="Mon, Wed, Fri 9:00 AM" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="classDescription">Description</Label>
            <Textarea id="classDescription" placeholder="Class description and objectives" rows={3} />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}