
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
import { MoreVertical } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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

// Interface for teacher data
interface TeacherData {
  id: number;
  fullname: string;
  branch: string;
  position: string;
  status: string;
}

// Interface for position data
interface PositionData {
  id: number;
  name: string;
  branch: string;
}

// Sample data for teachers
const teacherData: TeacherData[] = [
  { id: 1, fullname: "Firda Luthfiyatun Nisa, S.Pd", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 2, fullname: "Dyah Ayu Aditya Wardani, S.Hum", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 3, fullname: "Arigi Aldiansyah, S.Pd", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 4, fullname: "Septi Azizah Nur Hanifah, S.Ag", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 5, fullname: "Izza Syifa Kamila S.Ag", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 6, fullname: "Mahdah Amaliyah, S.S", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 7, fullname: "Harfi Widanna, S.sos", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
  { id: 8, fullname: "Tri Pangesti Handayani", branch: "AMS Pontianak", position: "Teacher", status: "ACTIVE" },
  { id: 9, fullname: "Amelia Ana, S.Pd", branch: "AMS Pontianak", position: "Teacher", status: "ACTIVE" },
  { id: 10, fullname: "Lita Pitasari S.S Mont. Dip.", branch: "AMS Bintaro", position: "Teacher", status: "ACTIVE" },
];

// Sample data for positions
const positionData: PositionData[] = [
  { id: 1, name: "Principal", branch: "AMS Bintaro" },
  { id: 2, name: "Teacher", branch: "AMS Bintaro" },
  { id: 3, name: "Principal", branch: "AMS Pontianak" },
  { id: 4, name: "Teacher", branch: "AMS Pontianak" },
];

const Teacher = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter data based on search term
  const filteredTeacherData = teacherData.filter(item => 
    item.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPositionData = positionData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for each tab
  const getPaginationData = (tabName: string) => {
    let filtered = [];
    let total = 0;

    if (tabName === 'teacher') {
      filtered = filteredTeacherData;
      total = filteredTeacherData.length;
    } else {
      filtered = filteredPositionData;
      total = filteredPositionData.length;
    }

    const totalPages = Math.ceil(filtered.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    
    return {
      currentData: filtered.slice(startIndex, endIndex),
      totalPages,
      startIndex,
      endIndex,
      total
    };
  };

  const handleEdit = (id: number) => {
    console.log(`Editing item ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Deleting item ${id}`);
  };

  const renderTeacherTab = () => {
    const { currentData, totalPages, startIndex, total } = getPaginationData('teacher');

    return (
      <TabsContent value="teacher" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <div className="flex items-center">
              <span className="mr-2">Show</span>
              <select
                className="border rounded px-2 py-1"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Search:</span>
              <Input
                placeholder="Search..."
                className="w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox aria-label="Select all" />
                  </TableHead>
                  <TableHead className="w-16">NO</TableHead>
                  <TableHead>FULLNAME</TableHead>
                  <TableHead>BRANCH</TableHead>
                  <TableHead>POSITION</TableHead>
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
                      <TableCell>{item.fullname}</TableCell>
                      <TableCell>{item.branch}</TableCell>
                      <TableCell>{item.position}</TableCell>
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
                    <TableCell colSpan={7} className="text-center py-4">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div>
                Showing {total > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, total)} of {total} entries
              </div>
              <Pagination>
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
      </TabsContent>
    );
  };

  const renderPositionTab = () => {
    const { currentData, totalPages, startIndex, total } = getPaginationData('position');

    return (
      <TabsContent value="position" className="mt-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <div className="flex items-center">
              <span className="mr-2">Show</span>
              <select
                className="border rounded px-2 py-1"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Search:</span>
              <Input
                placeholder="Search..."
                className="w-60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox aria-label="Select all" />
                  </TableHead>
                  <TableHead className="w-16">NO</TableHead>
                  <TableHead>POSITION NAME</TableHead>
                  <TableHead>BRANCH</TableHead>
                  <TableHead className="w-24 text-right">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <TableRow key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <TableCell>
                        <Checkbox aria-label={`Select ${item.name}`} />
                      </TableCell>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.branch}</TableCell>
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
                    <TableCell colSpan={5} className="text-center py-4">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-between px-4 py-4 border-t">
              <div>
                Showing {total > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, total)} of {total} entries
              </div>
              <Pagination>
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
      </TabsContent>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SchoolSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="p-6">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Master Data</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Teacher</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card>
            <CardHeader className="bg-emerald-700 text-white rounded-t-md py-4">
              <CardTitle className="text-base font-medium">Teacher Data</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="teacher" className="w-full">
                <TabsList className="w-full grid grid-cols-2 rounded-none bg-white border-b">
                  <TabsTrigger value="teacher" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Teacher</TabsTrigger>
                  <TabsTrigger value="position" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Position</TabsTrigger>
                </TabsList>
                
                {renderTeacherTab()}
                {renderPositionTab()}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
