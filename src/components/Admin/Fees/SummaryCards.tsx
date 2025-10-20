import React from 'react';
import { DollarSign, Hourglass, CheckSquare } from 'lucide-react';
import './SummaryCards.css';

interface SummaryCardsProps {
  totalFeesDue: number;
  pendingPayments: number;
  paidThisMonth: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalFeesDue,
  pendingPayments,
  paidThisMonth,
}) => {
  return (
    <div className="fee-summary-cards">
      <div className="summary-card total-due">
        <div className="card-icon">
          <DollarSign size={24} />
        </div>
        <div className="card-content">
          <p className="card-label">Total Fees Due</p>
          <h3 className="card-value">${totalFeesDue.toFixed(2)}</h3>
        </div>
      </div>

      <div className="summary-card pending-payments">
        <div className="card-icon">
          <Hourglass size={24} />
        </div>
        <div className="card-content">
          <p className="card-label">Pending Payments</p>
          <h3 className="card-value">${pendingPayments.toFixed(2)}</h3>
        </div>
      </div>

      <div className="summary-card paid-this-month">
        <div className="card-icon">
          <CheckSquare size={24} />
        </div>
        <div className="card-content">
          <p className="card-label">Paid This Month</p>
          <h3 className="card-value">${paidThisMonth.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};