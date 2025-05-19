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
import { PlusCircle, Search, Trash2, Edit, ChevronRight, Home } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
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

interface AreaData {
  id: number;
  name: string;
  selected?: boolean;
}

interface EnhancedAreaData extends AreaData {
  mainAreaId?: number;
}

// Interface for apparatus data
interface ApparatusData extends AreaData {
  areaId: number;
}

// Interface for purpose data
interface PurposeData extends AreaData {
  description: string;
  apparatusId: number;
}

const mainAreaData: AreaData[] = [
  { id: 1, name: 'Practical Life' },
  { id: 2, name: 'Sensorial' },
  { id: 3, name: 'Mathematics' },
  { id: 4, name: 'Language' },
  { id: 5, name: 'Cultural Studies' },
];

// Updated area data with main area relationships
const enhancedAreaData: EnhancedAreaData[] = [
  { id: 1, name: 'Visual Discrimination', mainAreaId: 2 },
  { id: 2, name: 'Tactile Discrimination', mainAreaId: 2 },
  { id: 3, name: 'Auditory Discrimination', mainAreaId: 2 },
  { id: 4, name: 'Olfactory Discrimination', mainAreaId: 2 },
  { id: 5, name: 'Gustatory Discrimination', mainAreaId: 2 },
  { id: 6, name: 'Oral Language', mainAreaId: 4 },
  { id: 7, name: 'Writing', mainAreaId: 4 },
  { id: 8, name: 'Reading', mainAreaId: 4 },
  { id: 9, name: 'Quantities and Numerals 1-10', mainAreaId: 3 },
  { id: 10, name: 'Decimal System', mainAreaId: 3 },
  { id: 11, name: 'Science', mainAreaId: 5 },
];

// Apparatus data with area relationships
const apparatusData: ApparatusData[] = [
  { id: 1, name: 'Knobbed Cylinders', areaId: 1 },
  { id: 2, name: 'Pink Tower', areaId: 1 },
  { id: 3, name: 'Broad Star', areaId: 1 },
  { id: 4, name: 'Long Rods', areaId: 1 },
  { id: 5, name: 'Knobbles Cylinders', areaId: 1 },
  { id: 6, name: 'Colour Box 1', areaId: 1 },
  { id: 7, name: 'Colour Box 2', areaId: 1 },
  { id: 8, name: 'Colour Box 1', areaId: 1 },
  { id: 9, name: 'Colour Box 2', areaId: 1 },
  { id: 10, name: 'Colour Box 3', areaId: 1 },
  { id: 11, name: 'Geometric Solids', areaId: 1 },
  { id: 12, name: 'Presentation Tray', areaId: 1 },
  { id: 13, name: 'Geometric Cabinet and Cards', areaId: 1 },
];

// Purpose data with apparatus relationships as shown in the image
const purposeData: PurposeData[] = [
  { id: 1, name: 'To refine the child\'s visual perception of dimension.', description: 'To refine the child\'s visual perception of dimension.', apparatusId: 5 },
  { id: 2, name: 'To match the same primary colour', description: 'To match the same primary colour', apparatusId: 6 },
  { id: 3, name: 'To match the same secondary colour', description: 'To match the same secondary colour', apparatusId: 7 },
  { id: 4, name: 'This activity would help to introduce the names of the primary colours: blue, red and yellow.', description: 'This activity would help to introduce the names of the primary colours: blue, red and yellow.', apparatusId: 6 },
  { id: 5, name: 'To teach the child the names of the colours, if the child does not already know them.', description: 'To teach the child the names of the colours, if the child does not already know them.', apparatusId: 9 },
  { id: 6, name: 'To further refine the child\'s visual perception of colour.', description: 'To further refine the child\'s visual perception of colour.', apparatusId: 10 },
  { id: 7, name: 'To provide experiences of solid shapes.', description: 'To provide experiences of solid shapes.', apparatusId: 11 },
  { id: 8, name: 'To enhance the child\'s experience of the three shapes: circle, square and triangle, and later all the other shapes of the Geometric Cabinet. It would help the child to prepare the child indirectly for later study of geometry by giving the child visual and muscular experience of shapes.', description: 'To enhance the child\'s experience of the three shapes: circle, square and triangle, and later all the other shapes of the Geometric Cabinet. It would help the child to prepare the child indirectly for later study of geometry by giving the child visual and muscular experience of shapes.', apparatusId: 12 },
  { id: 9, name: 'To prepare the child indirectly for later study of geometry by giving the child visual and muscular experience of the plane figures.', description: 'To prepare the child indirectly for later study of geometry by giving the child visual and muscular experience of the plane figures.', apparatusId: 13 },
  { id: 10, name: 'To increase visual discrimination by matching the plane figures from the cabinet with the shapes on the three sets of cards.', description: 'To increase visual discrimination by matching the plane figures from the cabinet with the shapes on the three sets of cards.', apparatusId: 13 },
];

const Area = () => {
  const [data, setData] = useState<EnhancedAreaData[]>(enhancedAreaData);
  const [apparatusItems, setApparatusItems] = useState<ApparatusData[]>(apparatusData);
  const [purposeItems, setPurposeItems] = useState<PurposeData[]>(purposeData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  // Sample data for tabs
  const tabsData = {
    'main-area': mainAreaData,
    'area': enhancedAreaData,
    'apparatus': apparatusData,
    'purpose': purposeData
  };

  // Get main area name from ID
  const getMainAreaName = (mainAreaId?: number) => {
    if (!mainAreaId) return '';
    const mainArea = mainAreaData.find(area => area.id === mainAreaId);
    return mainArea ? mainArea.name : '';
  };

  // Get area name from ID
  const getAreaName = (areaId: number) => {
    const area = enhancedAreaData.find(area => area.id === areaId);
    return area ? area.name : '';
  };

  // Get apparatus name from ID
  const getApparatusName = (apparatusId: number) => {
    const apparatus = apparatusData.find(item => item.id === apparatusId);
    return apparatus ? apparatus.name : '';
  };

  // Filter data based on search term
  const filteredData = (tabName: string) => {
    return tabsData[tabName as keyof typeof tabsData].filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    
    setData(prevData => 
      prevData.map(item => ({
        ...item,
        selected: newSelectAll
      }))
    );
  };

  const handleSelectRow = (id: number) => {
    setData(prevData => 
      prevData.map(item => 
        item.id === id 
          ? { ...item, selected: !item.selected } 
          : item
      )
    );
    
    // Check if all visible rows are selected to update selectAll state
    const updatedData = data.map(item => 
      item.id === id 
        ? { ...item, selected: !item.selected } 
        : item
    );
    
    const allSelected = filteredData('area').every(item => {
      const updated = updatedData.find(i => i.id === item.id);
      return updated?.selected;
    });
    
    setSelectAll(allSelected);
  };

  const handleAddNew = (tab: string) => {
    toast({
      title: "Add new item",
      description: `Adding new item to ${tab}`,
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit item",
      description: `Editing item ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete item",
      description: `Deleting item ${id}`,
    });
  };

  // Pagination logic for current tab
  const getPaginationData = (tabName: string) => {
    const filtered = filteredData(tabName);
    const totalPages = Math.ceil(filtered.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return {
      currentData: filtered.slice(startIndex, endIndex),
      totalPages,
      startIndex,
      endIndex,
      total: filtered.length
    };
  };

  const renderTabContent = (tabName: string) => {
    const { currentData, totalPages, startIndex, total } = getPaginationData(tabName);

    return (
      <TabsContent value={tabName} className="mt-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">Show</span>
                <select
                  className="border rounded px-2 py-1"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                <span className="ml-2">entries</span>
              </div>
              <Button 
                onClick={() => handleAddNew(tabName)}
                className="bg-emerald-700 hover:bg-emerald-800"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
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
                    <Checkbox 
                      checked={selectAll} 
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-16">NO</TableHead>
                  {tabName === 'apparatus' ? (
                    <>
                      <TableHead>APPARATUS</TableHead>
                      <TableHead>AREA</TableHead>
                    </>
                  ) : tabName === 'purpose' ? (
                    <>
                      <TableHead>PURPOSE</TableHead>
                      <TableHead>APPARATUS</TableHead>
                    </>
                  ) : (
                    <TableHead>{tabName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</TableHead>
                  )}
                  {tabName === 'area' && <TableHead>MAIN AREA</TableHead>}
                  <TableHead className="w-24 text-right">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox 
                          checked={data.find(i => i.id === item.id)?.selected || false}
                          onCheckedChange={() => handleSelectRow(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                      </TableCell>
                      <TableCell>{startIndex + index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      {tabName === 'apparatus' && (
                        <TableCell>{getAreaName((item as ApparatusData).areaId)}</TableCell>
                      )}
                      {tabName === 'purpose' && (
                        <TableCell>{getApparatusName((item as PurposeData).apparatusId)}</TableCell>
                      )}
                      {tabName === 'area' && (
                        <TableCell>{getMainAreaName((item as EnhancedAreaData).mainAreaId)}</TableCell>
                      )}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-blue-600"
                            onClick={() => handleEdit(item.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-600"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={tabName === 'apparatus' || tabName === 'purpose' ? 5 : (tabName === 'area' ? 5 : 4)} className="text-center py-4">
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
                <BreadcrumbPage>Area</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card>
            <CardHeader className="bg-emerald-700 text-white rounded-t-md py-4">
              <CardTitle className="text-base font-medium">Area Data</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="main-area" className="w-full">
                <TabsList className="w-full grid grid-cols-4 rounded-none bg-white border-b">
                  <TabsTrigger value="main-area" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Main Area</TabsTrigger>
                  <TabsTrigger value="area" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Area</TabsTrigger>
                  <TabsTrigger value="apparatus" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Apparatus</TabsTrigger>
                  <TabsTrigger value="purpose" className="data-[state=active]:text-emerald-700 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700 rounded-none">Purpose</TabsTrigger>
                </TabsList>
                
                {renderTabContent('main-area')}
                {renderTabContent('area')}
                {renderTabContent('apparatus')}
                {renderTabContent('purpose')}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Area;
