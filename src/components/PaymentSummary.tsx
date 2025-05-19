
import React from 'react';

type PaymentSummaryProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-gray-500 text-sm mb-1">{title}</div>
          <div className="text-xl font-bold">{value}</div>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default PaymentSummary;
