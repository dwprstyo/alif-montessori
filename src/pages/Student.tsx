
import React, { useState } from 'react';
import SchoolSidebar from '@/components/SchoolSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreVertical, Plus, Download, Upload, Trash, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Interface for student data
interface StudentData {
  id: number;
  fullname: string;
  class: string;
  category: string;
  branch: string;
  academic: string;
  status: string;
}

// Sample data for students
const studentData: StudentData[] = [
  { id: 1, fullname: "KHALID MAHIKA FAJRIANSYAH", class: "Al-Biruni", category: "Toddler - 2 days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 2, fullname: "Arashkaba muhammad mbayang", class: "Al-Biruni", category: "Toddler - 3 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 3, fullname: "Muhammad Kyoto Lennon Wijaya", class: "Al-Biruni", category: "Toddler - 3 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 4, fullname: "Kayla Hafizah Previanto", class: "Al-Jabar", category: "Preschool - 3 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 5, fullname: "Rayya Makailah Sutera Darmawan", class: "Al-Biruni", category: "Toddler - 3 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 6, fullname: "Alesha Harumi Inara", class: "Al-Biruni", category: "Toddler - 5 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 7, fullname: "ANINDHITO UWAIS SKALANDRA R", class: "Al-Biruni", category: "Toddler - 3 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 8, fullname: "TSANA SHALIHA ULHAQQ", class: "Al-Biruni", category: "Toddler - 5 Days", branch: "AMS Bintaro", academic: "2023/2024", status: "ACTIVE" },
  { id: 9, fullname: "AHMAD ZAIN QOLBY", class: "Al-Kindi", category: "Preschool - 5 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 10, fullname: "Alesha Trizia Khadijah de Bratakusumah", class: "Al-Jabar", category: "Preschool - 5 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 11, fullname: "Nuwaira Dwi Fatimah de Bratakusumah", class: "Al-Kindi", category: "Preschool - 5 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
  { id: 12, fullname: "Muhammad Fahri Al-Khifari Fadwanto", class: "Al-Jabar", category: "Preschool - 5 Days", branch: "AMS Bintaro", academic: "2024/2025", status: "ACTIVE" },
];

// Sample data for filters
const branchOptions = ["AMS Bintaro", "AMS Pontianak"];
const categoryOptions = ["Toddler - 2 days", "Toddler - 3 Days", "Toddler - 5 Days", "Preschool - 3 Days", "Preschool - 5 Days"];
const classOptions = ["Al-Biruni", "Al-Jabar", "Al-Kindi"];
const statusOptions = ["ACTIVE", "INACTIVE"];

const Student = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    branch: '',
    category: '',
    class: '',
    status: ''
  });
  
  // Filter data based on search term and filters
  const filteredData = studentData.filter(item => {
    const matchesSearch = 
      item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.academic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesBranch = filters.branch ? item.branch === filters.branch : true;
    const matchesCategory = filters.category ? item.category === filters.category : true;
    const matchesClass = filters.class ? item.class === filters.class : true;
    const matchesStatus = filters.status ? item.status === filters.status : true;
    
    return matchesSearch && matchesBranch && matchesCategory && matchesClass && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + entriesPerPage);
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleFilter = () => {
    console.log("Applying filters:", filters);
    // Filter is already applied via state, this is for additional actions if needed
  };
  
  const resetFilters = () => {
    setFilters({
      branch: '',
      category: '',
      class: '',
      status: ''
    });
  };

  const handleEdit = (id: number) => {
    console.log(`Editing student ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting student ${id}`);
  };

  const handleBulkDelete = () => {
    console.log("Bulk delete selected students");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      <SchoolSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="p-3 md:p-4 lg:p-6">
          <Breadcrumb className="mb-4 md:mb-6 overflow-x-auto">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Master Data</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Student</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="mb-4 md:mb-6">
            <CardHeader className="py-3 md:py-4">
              <CardTitle className="text-base font-medium">Filter Data</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              <div>
                <Select onValueChange={(value) => handleFilterChange('branch', value)} value={filters.branch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branchOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select onValueChange={(value) => handleFilterChange('category', value)} value={filters.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select onValueChange={(value) => handleFilterChange('class', value)} value={filters.class}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select onValueChange={(value) => handleFilterChange('status', value)} value={filters.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleFilter} className="bg-emerald-700 hover:bg-emerald-800">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-emerald-700 text-white rounded-t-md py-3 md:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="text-base font-medium">Student</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
                <Button size="sm" variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Upload className="h-4 w-4 mr-1" /> Upload
                </Button>
                <Button size="sm" variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                  <Download className="h-4 w-4 mr-1" /> Download
                </Button>
                <Button size="sm" variant="secondary" className="bg-red-500 hover:bg-red-600 text-white" onClick={handleBulkDelete}>
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border-b">
                <div className="flex items-center mb-3 sm:mb-0">
                  <span className="mr-2 text-sm">Show</span>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={entriesPerPage}
                    onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className="ml-2 text-sm">entries</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm">Search:</span>
                  <Input
                    placeholder="Search..."
                    className="w-full sm:w-60"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox aria-label="Select all" />
                      </TableHead>
                      <TableHead className="w-16">NO</TableHead>
                      <TableHead>FULLNAME</TableHead>
                      <TableHead>CLASS</TableHead>
                      <TableHead>CATEGORY</TableHead>
                      <TableHead>BRANCH</TableHead>
                      <TableHead>ACADEMIC</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead className="w-24 text-right">ACTION</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentData.length > 0 ? (
                      currentData.map((item, index) => (
                        <TableRow key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <TableCell>
                            <Checkbox aria-label={`Select ${item.fullname}`} />
                          </TableCell>
                          <TableCell>{startIndex + index + 1}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{item.fullname}</TableCell>
                          <TableCell>{item.class}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.branch}</TableCell>
                          <TableCell>{item.academic}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {item.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(item.id)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-4">
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between px-3 md:px-4 py-3 md:py-4 border-t">
                <div className="mb-3 sm:mb-0 text-sm">
                  Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
                </div>
                <Pagination className="justify-center sm:justify-end">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Student;
