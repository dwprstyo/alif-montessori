
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
import { Input } from '@/components/ui/input';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BranchData {
  id: number;
  name: string;
  phone: string;
  principal: string;
  address: string;
}

const Branch = () => {
  const [branches, setBranches] = useState<BranchData[]>([
    { id: 1, name: 'AMS Bintaro', phone: '08118801139', principal: 'Mrs. Lita Pritasari', address: 'Jl. Bintaro Tengah Blok U2 No. 24, Rengas, Ciputat' },
    { id: 2, name: 'AMS Pontianak', phone: '3423432432', principal: 'Tri Pangesti Handayani', address: 'Jl. Raya Pekanbaru' },
  ]);
  
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = branches.filter(branch => 
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    branch.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SchoolSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-xl font-medium text-gray-600">Master Data / Branch</h1>
          </div>
          
          <div className="bg-white rounded-md shadow-sm">
            <div className="p-4 flex justify-between items-center border-b">
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
                <span>Search:</span>
                <Input 
                  type="text" 
                  className="w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="bg-green-600 hover:bg-green-700">Add</Button>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">NO</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>PHONE</TableHead>
                  <TableHead>PRINCIPAL</TableHead>
                  <TableHead>ADDRESS</TableHead>
                  <TableHead className="text-right">ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((branch) => (
                    <TableRow key={branch.id} className="bg-gray-50 even:bg-white">
                      <TableCell>{branch.id}</TableCell>
                      <TableCell>{branch.name}</TableCell>
                      <TableCell>{branch.phone}</TableCell>
                      <TableCell>{branch.principal}</TableCell>
                      <TableCell className="max-w-xs truncate">{branch.address}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <div className="p-4 border-t flex justify-between items-center">
              <div>
                Showing 1 to {filteredData.length} of {filteredData.length} entries
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;
