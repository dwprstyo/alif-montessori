
import React, { useState } from 'react';
import SchoolSidebar from '@/components/SchoolSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StudentTransitionData {
  id: number;
  studentId: string;
  name: string;
  class: string;
  academicYear: string;
  status: string;
  selected?: boolean;
}

const AcademicTransition = () => {
  const [students, setStudents] = useState<StudentTransitionData[]>([
    { id: 1, studentId: 'STD-001', name: 'Ahmad Dzaky', class: 'Class A', academicYear: '2023/2024', status: 'Active' },
    { id: 2, studentId: 'STD-002', name: 'Budi Santoso', class: 'Class A', academicYear: '2023/2024', status: 'Active' },
    { id: 3, studentId: 'STD-003', name: 'Citra Dewi', class: 'Class B', academicYear: '2023/2024', status: 'Inactive' },
    { id: 4, studentId: 'STD-004', name: 'Dina Fitri', class: 'Class B', academicYear: '2023/2024', status: 'Active' },
    { id: 5, studentId: 'STD-005', name: 'Eko Prasetyo', class: 'Class C', academicYear: '2023/2024', status: 'Inactive' },
  ]);
  
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2023 / 2024');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [selectAll, setSelectAll] = useState(false);
  
  const filteredData = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.academicYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    setStudents(prevStudents => 
      prevStudents.map(student => ({
        ...student,
        selected: newSelectAll
      }))
    );
  };

  const handleSelectRow = (id: number) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === id 
          ? { ...student, selected: !student.selected } 
          : student
      )
    );
    
    // Check if all visible rows are selected to update selectAll state
    const updatedStudents = students.map(student => 
      student.id === id 
        ? { ...student, selected: !student.selected } 
        : student
    );
    
    const allSelected = filteredData.every(student => {
      const updated = updatedStudents.find(s => s.id === student.id);
      return updated?.selected;
    });
    
    setSelectAll(allSelected);
  };

  const handlePromoteSelected = () => {
    const selectedCount = students.filter(student => student.selected).length;
    if (selectedCount > 0) {
      toast({
        title: "Promotion initiated",
        description: `${selectedCount} students selected for promotion`,
      });
    } else {
      toast({
        title: "No students selected",
        description: "Please select students to promote",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SchoolSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-medium text-gray-600">Master Data / Academic Transition</h1>
          </div>
          
          <Card>
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-lg font-medium">Filter</CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <div className="relative">
                    <select
                      id="academic-year" 
                      className="w-full border rounded-md px-3 py-2 appearance-none pr-10"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      <option value="2023 / 2024">2023 / 2024</option>
                      <option value="2024 / 2025">2024 / 2025</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <div className="relative">
                    <select
                      id="class" 
                      className="w-full border rounded-md px-3 py-2 appearance-none pr-10"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value="All Classes">All Classes</option>
                      <option value="Class A">Class A</option>
                      <option value="Class B">Class B</option>
                      <option value="Class C">Class C</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                    Apply Filter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader className="bg-white flex justify-between items-center border-b p-4">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select 
                  className="border rounded px-2 py-1"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Search..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handlePromoteSelected}
                >
                  Promote Selected
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectAll} 
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-16">NO</TableHead>
                    <TableHead>STUDENT ID</TableHead>
                    <TableHead>NAME</TableHead>
                    <TableHead>CLASS</TableHead>
                    <TableHead>ACADEMIC YEAR</TableHead>
                    <TableHead>STATUS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Checkbox 
                            checked={students.find(s => s.id === student.id)?.selected || false}
                            onCheckedChange={() => handleSelectRow(student.id)}
                            aria-label={`Select ${student.name}`}
                          />
                        </TableCell>
                        <TableCell>{startIndex + index + 1}</TableCell>
                        <TableCell>{student.studentId}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.academicYear}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            
            <div className="p-4 border-t flex justify-between items-center">
              <div>
                Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AcademicTransition;
