import React from 'react';
import { Users, Calendar, TrendingUp, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import './SummaryCards.css';

interface SummaryCardsProps {
  reportType: string;
}

interface CardData {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  color: string;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ reportType }) => {
  const getCardsForReportType = (): CardData[] => {
    switch (reportType) {
      case 'admissions':
        return [
          {
            icon: <Users size={24} />,
            label: 'Total Admissions',
            value: 1248,
            change: '+12.5%',
            positive: true,
            color: '#27ac1f'
          },
          {
            icon: <CheckCircle size={24} />,
            label: 'Approved',
            value: 1156,
            change: '+8.3%',
            positive: true,
            color: '#16a34a'
          },
          {
            icon: <XCircle size={24} />,
            label: 'Pending',
            value: 92,
            change: '-5.2%',
            positive: true,
            color: '#f59e0b'
          },
          {
            icon: <TrendingUp size={24} />,
            label: 'Success Rate',
            value: '92.6%',
            change: '+3.1%',
            positive: true,
            color: '#10b981'
          }
        ];

      case 'attendance':
        return [
          {
            icon: <Users size={24} />,
            label: 'Total Students',
            value: 2456,
            change: '+5.2%',
            positive: true,
            color: '#27ac1f'
          },
          {
            icon: <CheckCircle size={24} />,
            label: 'Present Today',
            value: 2234,
            change: '+2.1%',
            positive: true,
            color: '#16a34a'
          },
          {
            icon: <XCircle size={24} />,
            label: 'Absent Today',
            value: 222,
            change: '-1.5%',
            positive: true,
            color: '#ef4444'
          },
          {
            icon: <TrendingUp size={24} />,
            label: 'Avg Attendance',
            value: '90.9%',
            change: '+1.2%',
            positive: true,
            color: '#10b981'
          }
        ];

      case 'exams':
        return [
          {
            icon: <Calendar size={24} />,
            label: 'Exams Conducted',
            value: 156,
            change: '+18.2%',
            positive: true,
            color: '#27ac1f'
          },
          {
            icon: <Users size={24} />,
            label: 'Students Appeared',
            value: 2398,
            change: '+6.7%',
            positive: true,
            color: '#16a34a'
          },
          {
            icon: <TrendingUp size={24} />,
            label: 'Pass Rate',
            value: '87.5%',
            change: '+4.3%',
            positive: true,
            color: '#10b981'
          },
          {
            icon: <CheckCircle size={24} />,
            label: 'Avg Score',
            value: '78.2%',
            change: '+2.8%',
            positive: true,
            color: '#3b82f6'
          }
        ];

      case 'fees':
        return [
          {
            icon: <DollarSign size={24} />,
            label: 'Total Fees Collected',
            value: '$1.2M',
            change: '+15.3%',
            positive: true,
            color: '#27ac1f'
          },
          {
            icon: <CheckCircle size={24} />,
            label: 'Paid Students',
            value: 2156,
            change: '+8.9%',
            positive: true,
            color: '#16a34a'
          },
          {
            icon: <XCircle size={24} />,
            label: 'Pending Amount',
            value: '$156K',
            change: '-12.4%',
            positive: true,
            color: '#f59e0b'
          },
          {
            icon: <TrendingUp size={24} />,
            label: 'Collection Rate',
            value: '88.5%',
            change: '+6.2%',
            positive: true,
            color: '#10b981'
          }
        ];

      default:
        return [
          {
            icon: <Users size={24} />,
            label: 'Total Records',
            value: 2456,
            change: '+8.2%',
            positive: true,
            color: '#27ac1f'
          },
          {
            icon: <Calendar size={24} />,
            label: 'Events',
            value: 342,
            change: '+12.5%',
            positive: true,
            color: '#16a34a'
          },
          {
            icon: <TrendingUp size={24} />,
            label: 'Performance',
            value: '92.3%',
            change: '+5.1%',
            positive: true,
            color: '#10b981'
          },
          {
            icon: <CheckCircle size={24} />,
            label: 'Completed',
            value: 1834,
            change: '+9.8%',
            positive: true,
            color: '#3b82f6'
          }
        ];
    }
  };

  const cards = getCardsForReportType();

  return (
    <div className="summary-cards-container">
      <div className="summary-cards-grid">
        {cards.map((card, index) => (
          <div key={index} className="summary-card">
            <div className="summary-card-icon" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
              {card.icon}
            </div>
            <div className="summary-card-content">
              <p className="summary-card-label">{card.label}</p>
              <h3 className="summary-card-value">{card.value}</h3>
              {card.change && (
                <div className={`summary-card-change ${card.positive ? 'positive' : 'negative'}`}>
                  <TrendingUp size={14} />
                  <span>{card.change} from last month</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
