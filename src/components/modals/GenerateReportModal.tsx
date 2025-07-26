import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, BarChart3, Download, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GenerateReportModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Report Generated Successfully!",
      description: "Your report is ready for download.",
      action: (
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      ),
    });
    
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-report text-white hover:bg-report/90">
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Generate New Report
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reportTitle">Report Title</Label>
            <Input id="reportTitle" placeholder="Monthly Performance Report" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reportType">Report Type</Label>
            <select id="reportType" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
              <option value="">Select Report Type</option>
              <option value="attendance">Attendance Report</option>
              <option value="performance">Performance Analysis</option>
              <option value="financial">Financial Summary</option>
              <option value="enrollment">Enrollment Statistics</option>
              <option value="teacher">Teacher Performance</option>
              <option value="class">Class Utilization</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grade">Grade Filter</Label>
            <select id="grade" className="w-full px-3 py-2 border border-border rounded-md bg-background">
              <option value="">All Grades</option>
              <option value="9th">9th Grade</option>
              <option value="10th">10th Grade</option>
              <option value="11th">11th Grade</option>
              <option value="12th">12th Grade</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <select id="format" className="w-full px-3 py-2 border border-border rounded-md bg-background" required>
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any specific requirements or notes for this report" rows={3} />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}