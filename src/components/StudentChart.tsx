
import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MoreVertical, ChevronDown } from 'lucide-react';

const data = [
  {
    name: '2023',
    male: 9,
    female: 7,
  },
  {
    name: '2024',
    male: 28,
    female: 18,
  },
];

const StudentChart = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Active Student's : All Data</h2>
        <div className="flex items-center">
          <button className="border border-alif-green text-alif-green px-3 py-1 rounded-md text-sm flex items-center">
            <span>Pilih</span>
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center mb-4 gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-600">Male</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-cyan-400 mr-2"></div>
          <span className="text-sm text-gray-600">Female</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="male" fill="#8A70FF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="female" fill="#30D5E1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentChart;
