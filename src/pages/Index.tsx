
import React from 'react';
import { 
  BarChart as BarChartIcon,
  GraduationCap, 
  Baby,
  School,
  CreditCard,
  BadgeIndianRupee
} from 'lucide-react';
import SchoolSidebar from '@/components/SchoolSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import WelcomeSection from '@/components/WelcomeSection';
import StatsCard from '@/components/StatsCard';
import StudentChart from '@/components/StudentChart';
import PaymentSummary from '@/components/PaymentSummary';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SchoolSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <div className="flex-1 p-6">
          <WelcomeSection />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatsCard 
              title="Branch" 
              value="2" 
              icon={<BarChartIcon className="h-5 w-5 text-cyan-500" />} 
              color="bg-cyan-500" 
            />
            <StatsCard 
              title="Teacher" 
              value="11" 
              icon={<GraduationCap className="h-5 w-5 text-amber-500" />} 
              color="bg-amber-500" 
            />
            <StatsCard 
              title="Toodler" 
              value="7" 
              icon={<Baby className="h-5 w-5 text-lime-500" />} 
              color="bg-lime-500" 
            />
            <StatsCard 
              title="Preschool" 
              value="43" 
              icon={<School className="h-5 w-5 text-blue-500" />} 
              color="bg-blue-500" 
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <StudentChart />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <PaymentSummary 
                title="Payment Today's" 
                value="Rp 0,-" 
                icon={<CreditCard className="h-10 w-10 text-red-500" />} 
              />
              <PaymentSummary 
                title="Transaction Today's" 
                value="0" 
                icon={<BadgeIndianRupee className="h-10 w-10 text-blue-500" />} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
