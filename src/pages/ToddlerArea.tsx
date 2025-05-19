
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

// Interface for area data
interface AreaData {
  id: number;
  name: string;
}

// Interface for sub area data
interface SubAreaData {
  id: number;
  name: string;
  areaId: number;
}

// Interface for competency data
interface CompetencyData {
  id: number;
  name: string;
  subAreaId: number;
}

// Sample data for tabs
const areaData: AreaData[] = [
  { id: 1, name: 'Fine Motor' },
  { id: 2, name: 'Gross Motor' },
  { id: 3, name: 'Sensorial' },
  { id: 4, name: 'Language' },
  { id: 5, name: 'Art and Music' },
  { id: 6, name: 'Practical Life' },
  { id: 7, name: 'Social Emotional' },
  { id: 8, name: 'Early Math' },
  { id: 9, name: 'Discovery' },
  { id: 10, name: 'Culture' },
];

// Sample data for sub areas
const subAreaData: SubAreaData[] = [
  { id: 1, name: 'Hand Coordination', areaId: 1 },
  { id: 2, name: 'Eye-Hand Coordination', areaId: 1 },
  { id: 3, name: 'Walking', areaId: 2 },
  { id: 4, name: 'Climbing', areaId: 2 },
  { id: 5, name: 'Visual Discrimination', areaId: 3 },
  { id: 6, name: 'Auditory Discrimination', areaId: 3 },
  { id: 7, name: 'Vocabulary Development', areaId: 4 },
  { id: 8, name: 'Listening Skills', areaId: 4 },
  { id: 9, name: 'Painting', areaId: 5 },
  { id: 10, name: 'Singing', areaId: 5 },
];

// Sample data for competencies
const competencyData: CompetencyData[] = [
  { id: 1, name: 'Grasping objects', subAreaId: 1 },
  { id: 2, name: 'Transfer objects between hands', subAreaId: 1 },
  { id: 3, name: 'Stacking blocks', subAreaId: 1 },
  { id: 4, name: 'Using simple tools', subAreaId: 2 },
  { id: 5, name: 'Pointing to objects', subAreaId: 2 },
  { id: 6, name: 'Walking independently', subAreaId: 3 },
  { id: 7, name: 'Walking on uneven surfaces', subAreaId: 3 },
  { id: 8, name: 'Climbing stairs with assistance', subAreaId: 4 },
  { id: 9, name: 'Climbing on age-appropriate play equipment', subAreaId: 4 },
  { id: 10, name: 'Matching identical objects', subAreaId: 5 },
];

const ToddlerArea = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get area name from ID
  const getAreaName = (areaId: number) => {
    const area = areaData.find(area => area.id === areaId);
    return area ? area.name : '';
  };

  // Get sub area name from ID
  const getSubAreaName = (subAreaId: number) => {
    const subArea = subAreaData.find(subArea => subArea.id === subAreaId);
    return subArea ? subArea.name : '';
  };

  // Filter data based on search term
  const filteredAreaData = areaData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSubAreaData = subAreaData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getAreaName(item.areaId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompetencyData = competencyData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getSubAreaName(item.subAreaId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic for each tab
  const getPaginationData = (tabName: string) => {
    let filtered = [];
    let total = 0;

    if (tabName === 'area') {
      filtered = filteredAreaData;
      total = filteredAreaData.length;
    } else if (tabName === 'subarea') {
      filtered = filteredSubAreaData;
      total = filteredSubAreaData.length;
    } else {
      filtered = filteredCompetencyData;
      total = filteredCompetencyData.length;
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

  const renderAreaTab = () => {
    const { currentData, totalPages, startIndex, total } = getPaginationData('area');

    return (
      <TabsContent value="area" className="mt-0">
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
                  <TableHead>AREA</TableHead>
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
                    <TableCell colSpan={4} className="text-center py-4">
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

  const renderSubAreaTab = () => {
    const { currentData, totalPages, startIndex, total } = getPaginationData('subarea');

    return (
      <TabsContent value="subarea" className="mt-0">
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
                  <TableHead>SUB AREA</TableHead>
                  <TableHead>AREA</TableHead>
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
                      <TableCell>{getAreaName(item.areaId)}</TableCell>
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

  const renderCompetencyTab = () => {
    const { currentData, totalPages, startIndex, total } = getPaginationData('competency');

    return (
      <TabsContent value="competency" className="mt-0">
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
                  <TableHead>COMPETENCY</TableHead>
                  <TableHead>SUB AREA</TableHead>
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
                      <TableCell>{getSubAreaName(item.subAreaId)}</TableCell>
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
                <BreadcrumbPage>Toddler Area</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card>
            <CardHeader className="bg-emerald-700 text-white rounded-t-md py-4">
              <CardTitle className="text-base font-medium">Toddler Area Data</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="area" className="w-full">
                <TabsList className="w-full grid grid-cols-3 rounded-none bg-white border-b">
                  <TabsTrigger value="area" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Area</TabsTrigger>
                  <TabsTrigger value="subarea" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Sub Area</TabsTrigger>
                  <TabsTrigger value="competency" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Competency</TabsTrigger>
                </TabsList>
                
                {renderAreaTab()}
                {renderSubAreaTab()}
                {renderCompetencyTab()}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToddlerArea;
