import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import './Charts.css';

interface ChartsProps {
  reportType: string;
}

export const Charts: React.FC<ChartsProps> = ({ reportType }) => {
  const getChartTitle = () => {
    switch (reportType) {
      case 'admissions':
        return 'Admissions Trends';
      case 'attendance':
        return 'Attendance Overview';
      case 'exams':
        return 'Exam Performance';
      case 'fees':
        return 'Fee Collection Analysis';
      default:
        return 'Analytics Overview';
    }
  };

  const getBarChartData = () => {
    switch (reportType) {
      case 'admissions':
        return [
          { label: 'Jan', value: 85, percentage: 85 },
          { label: 'Feb', value: 92, percentage: 92 },
          { label: 'Mar', value: 78, percentage: 78 },
          { label: 'Apr', value: 95, percentage: 95 },
          { label: 'May', value: 88, percentage: 88 },
          { label: 'Jun', value: 91, percentage: 91 }
        ];
      case 'attendance':
        return [
          { label: 'Mon', value: 92, percentage: 92 },
          { label: 'Tue', value: 88, percentage: 88 },
          { label: 'Wed', value: 90, percentage: 90 },
          { label: 'Thu', value: 85, percentage: 85 },
          { label: 'Fri', value: 87, percentage: 87 },
          { label: 'Sat', value: 75, percentage: 75 }
        ];
      case 'exams':
        return [
          { label: 'CS', value: 87, percentage: 87 },
          { label: 'Math', value: 92, percentage: 92 },
          { label: 'Phy', value: 84, percentage: 84 },
          { label: 'Chem', value: 88, percentage: 88 },
          { label: 'Bio', value: 90, percentage: 90 },
          { label: 'Eng', value: 85, percentage: 85 }
        ];
      case 'fees':
        return [
          { label: 'Q1', value: 85, percentage: 85 },
          { label: 'Q2', value: 90, percentage: 90 },
          { label: 'Q3', value: 88, percentage: 88 },
          { label: 'Q4', value: 92, percentage: 92 }
        ];
      default:
        return [
          { label: 'A', value: 85, percentage: 85 },
          { label: 'B', value: 92, percentage: 92 },
          { label: 'C', value: 78, percentage: 78 },
          { label: 'D', value: 88, percentage: 88 }
        ];
    }
  };

  const getPieChartData = () => {
    switch (reportType) {
      case 'admissions':
        return [
          { label: 'Approved', value: 92.6, color: '#27ac1f' },
          { label: 'Pending', value: 5.2, color: '#f59e0b' },
          { label: 'Rejected', value: 2.2, color: '#ef4444' }
        ];
      case 'attendance':
        return [
          { label: 'Present', value: 90.9, color: '#27ac1f' },
          { label: 'Absent', value: 6.5, color: '#ef4444' },
          { label: 'Leave', value: 2.6, color: '#f59e0b' }
        ];
      case 'exams':
        return [
          { label: 'Passed', value: 87.5, color: '#27ac1f' },
          { label: 'Failed', value: 8.3, color: '#ef4444' },
          { label: 'Absent', value: 4.2, color: '#f59e0b' }
        ];
      case 'fees':
        return [
          { label: 'Paid', value: 88.5, color: '#27ac1f' },
          { label: 'Partial', value: 7.8, color: '#3b82f6' },
          { label: 'Pending', value: 3.7, color: '#f59e0b' }
        ];
      default:
        return [
          { label: 'Category A', value: 45, color: '#27ac1f' },
          { label: 'Category B', value: 30, color: '#3b82f6' },
          { label: 'Category C', value: 25, color: '#f59e0b' }
        ];
    }
  };

  const barData = getBarChartData();
  const pieData = getPieChartData();
  const maxValue = Math.max(...barData.map((d) => d.value));

  return (
    <div className="charts-container">
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title-section">
              <BarChart3 size={20} />
              <h3 className="chart-title">{getChartTitle()}</h3>
            </div>
          </div>
          <div className="bar-chart">
            <div className="bar-chart-grid">
              {barData.map((item, index) => (
                <div key={index} className="bar-item">
                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                      title={`${item.label}: ${item.value}%`}
                    >
                      <span className="bar-value">{item.value}%</span>
                    </div>
                  </div>
                  <span className="bar-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title-section">
              <PieChart size={20} />
              <h3 className="chart-title">Distribution</h3>
            </div>
          </div>
          <div className="pie-chart">
            <div className="pie-visualization">
              <svg viewBox="0 0 200 200" className="pie-svg">
                {pieData.map((item, index) => {
                  const total = pieData.reduce((sum, d) => sum + d.value, 0);
                  const startAngle = pieData
                    .slice(0, index)
                    .reduce((sum, d) => sum + (d.value / total) * 360, 0);
                  const endAngle = startAngle + (item.value / total) * 360;

                  const startRad = ((startAngle - 90) * Math.PI) / 180;
                  const endRad = ((endAngle - 90) * Math.PI) / 180;

                  const x1 = 100 + 80 * Math.cos(startRad);
                  const y1 = 100 + 80 * Math.sin(startRad);
                  const x2 = 100 + 80 * Math.cos(endRad);
                  const y2 = 100 + 80 * Math.sin(endRad);

                  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                      className="pie-slice"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="45" fill="white" />
              </svg>
              <div className="pie-center-text">
                <div className="pie-total">{pieData.reduce((sum, d) => sum + d.value, 0).toFixed(1)}%</div>
                <div className="pie-label">Total</div>
              </div>
            </div>
            <div className="pie-legend">
              {pieData.map((item, index) => (
                <div key={index} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                  <div className="legend-text">
                    <span className="legend-label">{item.label}</span>
                    <span className="legend-value">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card trend-card">
          <div className="chart-header">
            <div className="chart-title-section">
              <TrendingUp size={20} />
              <h3 className="chart-title">Key Insights</h3>
            </div>
          </div>
          <div className="insights-list">
            <div className="insight-item">
              <div className="insight-icon positive">
                <TrendingUp size={18} />
              </div>
              <div className="insight-content">
                <p className="insight-title">Performance Increase</p>
                <p className="insight-description">Overall metrics improved by 12.5% this month</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon positive">
                <TrendingUp size={18} />
              </div>
              <div className="insight-content">
                <p className="insight-title">High Success Rate</p>
                <p className="insight-description">Maintaining 87%+ average across all categories</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon neutral">
                <BarChart3 size={18} />
              </div>
              <div className="insight-content">
                <p className="insight-title">Steady Growth</p>
                <p className="insight-description">Consistent performance over the last quarter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
