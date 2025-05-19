
import React from 'react';
import { MoreVertical } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 ${color} bg-opacity-20 rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <button>
          <MoreVertical className="h-5 w-5 text-gray-400" />
        </button>
      </div>
      <div className="text-gray-600">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;
