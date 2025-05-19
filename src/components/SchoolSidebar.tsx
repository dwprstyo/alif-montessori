
import React, { useState } from 'react';
import { 
  ChevronRight,
  ChevronDown,
  Database,
  GraduationCap,
  Box,
  Settings,
  User,
  Lock,
  LogOut,
  LineChart,
  PackageOpen,
  Package,
  Calendar
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SchoolLogo from './SchoolLogo';

type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  hasChildren?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  path, 
  hasChildren = false, 
  isActive = false,
  onClick 
}) => (
  <div 
    className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-all cursor-pointer ${isActive ? 'bg-gray-100 text-alif-green border-l-4 border-alif-green' : ''}`}
    onClick={onClick}
  >
    <div className="w-6 h-6 mr-3 flex items-center justify-center">
      {icon}
    </div>
    <span className="flex-1">{label}</span>
    {hasChildren && (isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
  </div>
);

const SubMenuItem: React.FC<{ label: string; path: string; isActive?: boolean }> = ({ 
  label, 
  path,
  isActive = false 
}) => (
  <Link 
    to={path} 
    className={`flex items-center px-4 py-2 ml-9 text-sm hover:bg-gray-100 rounded-md transition-all ${isActive ? 'text-alif-green font-medium' : ''}`}
  >
    <span>{label}</span>
  </Link>
);

const MenuCategory = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="mb-6">
    <h3 className="text-xs font-medium text-gray-400 px-4 mb-2">{title}</h3>
    {children}
  </div>
);

const SchoolSidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({
    master: location.pathname.startsWith('/master'),
    academic: location.pathname.startsWith('/academic'),
    finance: location.pathname.startsWith('/finance'),
    report: location.pathname.startsWith('/report'),
    preference: location.pathname.startsWith('/preference'),
    config: location.pathname.startsWith('/config')
  });
  
  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  // Check if current path is in a submenu
  const isActiveSubMenu = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-60 flex flex-col">
      <div className="p-4 mb-4">
        <SchoolLogo />
      </div>
      
      <Link to="/" className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-none ${location.pathname === '/' ? 'bg-gray-100 text-alif-green border-l-4 border-alif-green' : ''}`}>
        <div className="w-6 h-6 mr-3 flex items-center justify-center">
          <LineChart className="h-5 w-5" />
        </div>
        <span>Dashboard</span>
      </Link>

      <div className="flex-1 overflow-y-auto px-2 py-4">
        <MenuCategory title="MAIN MENU">
          <MenuItem 
            icon={<Database className="h-5 w-5" />} 
            label="Master Data" 
            path="/master" 
            hasChildren 
            isActive={expandedMenus.master}
            onClick={() => toggleMenu('master')}
          />
          
          {expandedMenus.master && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem 
                label="Academic Year" 
                path="/master/academic-year" 
                isActive={isActiveSubMenu('/master/academic-year')} 
              />
              <SubMenuItem 
                label="Academic Transition" 
                path="/master/academic-transition"
                isActive={isActiveSubMenu('/master/academic-transition')}
              />
              <SubMenuItem label="Branch" path="/master/branch" />
              <SubMenuItem label="Semester" path="/master/semester" />
              <SubMenuItem label="Category" path="/master/category" />
              <SubMenuItem label="Classes" path="/master/classes" />
              <SubMenuItem label="Area" path="/master/area" />
              <SubMenuItem label="Semester Area" path="/master/semester-area" />
              <SubMenuItem label="Toddler Area" path="/master/toddler-area" />
              <SubMenuItem label="Teacher" path="/master/teacher" />
              <SubMenuItem label="Student" path="/master/student" />
              <SubMenuItem label="Welcoming Letter" path="/master/welcoming-letter" />
            </div>
          )}
          
          <MenuItem 
            icon={<GraduationCap className="h-5 w-5" />} 
            label="Academic" 
            path="/academic" 
            hasChildren
            isActive={expandedMenus.academic}
            onClick={() => toggleMenu('academic')}
          />
          
          {expandedMenus.academic && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem label="Academic Schedule" path="/academic/schedule" />
              <SubMenuItem label="Academic Progress" path="/academic/progress" />
              <SubMenuItem label="Academic Reports" path="/academic/reports" />
            </div>
          )}
          
          <MenuItem 
            icon={<LineChart className="h-5 w-5" />} 
            label="Finance" 
            path="/finance" 
            hasChildren
            isActive={expandedMenus.finance}
            onClick={() => toggleMenu('finance')}
          />
          
          {expandedMenus.finance && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem label="Invoices" path="/finance/invoices" />
              <SubMenuItem label="Payments" path="/finance/payments" />
              <SubMenuItem label="Financial Reports" path="/finance/reports" />
            </div>
          )}
          
          <MenuItem 
            icon={<LineChart className="h-5 w-5" />} 
            label="Report" 
            path="/report" 
            hasChildren
            isActive={expandedMenus.report}
            onClick={() => toggleMenu('report')}
          />
          
          {expandedMenus.report && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem label="Student Reports" path="/report/students" />
              <SubMenuItem label="Teacher Reports" path="/report/teachers" />
              <SubMenuItem label="Class Reports" path="/report/classes" />
            </div>
          )}
        </MenuCategory>
        
        <MenuCategory title="INVENTORY MANAGEMENT">
          <MenuItem icon={<Box className="h-5 w-5" />} label="Inventory" path="/inventory" />
          <MenuItem icon={<PackageOpen className="h-5 w-5" />} label="Goods In" path="/goods-in" />
          <MenuItem icon={<Package className="h-5 w-5" />} label="Goods Out" path="/goods-out" />
          <MenuItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Preference" 
            path="/preference" 
            hasChildren
            isActive={expandedMenus.preference}
            onClick={() => toggleMenu('preference')}
          />
          
          {expandedMenus.preference && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem label="Inventory Settings" path="/preference/inventory" />
              <SubMenuItem label="Stock Alerts" path="/preference/alerts" />
            </div>
          )}
        </MenuCategory>
        
        <MenuCategory title="SETTING">
          <MenuItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Configuration" 
            path="/config" 
            hasChildren
            isActive={expandedMenus.config}
            onClick={() => toggleMenu('config')}
          />
          
          {expandedMenus.config && (
            <div className="ml-4 mt-1 space-y-1">
              <SubMenuItem label="System Settings" path="/config/system" />
              <SubMenuItem label="User Management" path="/config/users" />
              <SubMenuItem label="Permissions" path="/config/permissions" />
            </div>
          )}
          
          <MenuItem icon={<User className="h-5 w-5" />} label="Profile" path="/profile" />
          <MenuItem icon={<Lock className="h-5 w-5" />} label="Change Password" path="/change-password" />
          <MenuItem icon={<LogOut className="h-5 w-5" />} label="Logout" path="/logout" />
        </MenuCategory>
      </div>
    </div>
  );
};

export default SchoolSidebar;
