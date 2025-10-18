import React from 'react';
import { Target, UserCheck, CheckCircle } from 'lucide-react';

interface FunnelStepProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const FunnelStep: React.FC<FunnelStepProps> = ({ icon, label, value, color }) => {
  return (
    <div className={`funnel-step ${color}`}>
      <div className="funnel-icon-wrapper">{icon}</div>
      <div className="funnel-info">
        <div className="funnel-label">{label}</div>
        <div className="funnel-value">{value.toLocaleString()}</div>
      </div>
    </div>
  );
};

export const AdmissionsFunnel: React.FC = () => {
  const funnelData = [
    {
      label: 'New Leads',
      value: 180,
      icon: <Target size={20} />,
      color: 'orange'
    },
    {
      label: 'Applications Submitted',
      value: 55,
      icon: <UserCheck size={20} />,
      color: 'blue'
    },
    {
      label: 'Approved & Enrolled',
      value: 32,
      icon: <CheckCircle size={20} />,
      color: 'green'
    },
  ];

  const conversionRate = Math.round((funnelData[2].value / funnelData[0].value) * 100);

  return (
    <div className="card funnel-card">
      <div className="card-header">
        <h2 className="card-title">Admissions Funnel</h2>
        <div className="conversion-rate-display">
          <span className="rate-label">Conversion:</span>
          <span className="rate-value">{conversionRate}%</span>
        </div>
      </div>
      <div className="funnel-steps-container">
        {funnelData.map((step, index) => (
          <FunnelStep key={index} {...step} />
        ))}
      </div>
    </div>
  );
};
