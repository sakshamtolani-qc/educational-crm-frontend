import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface ChartData {
  name: string;
  Students: number;
  Revenue: number;
}

const weeklyData: ChartData[] = [
  { name: 'Mon', Students: 12, Revenue: 8400 },
  { name: 'Tue', Students: 15, Revenue: 9200 },
  { name: 'Wed', Students: 10, Revenue: 7800 },
  { name: 'Thu', Students: 18, Revenue: 11500 },
  { name: 'Fri', Students: 14, Revenue: 9800 },
  { name: 'Sat', Students: 8, Revenue: 5200 },
  { name: 'Sun', Students: 6, Revenue: 4100 },
];

const monthlyData: ChartData[] = [
  { name: 'Jan', Students: 40, Revenue: 24000 },
  { name: 'Feb', Students: 30, Revenue: 13980 },
  { name: 'Mar', Students: 60, Revenue: 98000 },
  { name: 'Apr', Students: 50, Revenue: 39080 },
  { name: 'May', Students: 70, Revenue: 48000 },
  { name: 'Jun', Students: 85, Revenue: 62000 },
];

const yearlyData: ChartData[] = [
  { name: '2019', Students: 320, Revenue: 180000 },
  { name: '2020', Students: 420, Revenue: 250000 },
  { name: '2021', Students: 580, Revenue: 380000 },
  { name: '2022', Students: 720, Revenue: 520000 },
  { name: '2023', Students: 890, Revenue: 680000 },
  { name: '2024', Students: 1050, Revenue: 820000 },
];

type TimePeriod = 'week' | 'month' | 'year';

export const ChartPlaceholder: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');

  const dataMap = {
    week: weeklyData,
    month: monthlyData,
    year: yearlyData,
  };

  const currentData = dataMap[timePeriod];
  const totalRevenue = currentData.reduce((sum, item) => sum + item.Revenue, 0).toLocaleString();
  const totalStudents = currentData.reduce((sum, item) => sum + item.Students, 0);

  // Calculate max values for scaling
  const maxRevenue = Math.max(...currentData.map(d => d.Revenue));
  const maxStudents = Math.max(...currentData.map(d => d.Students));

  return (
    <div className="card chart-card">
      <div className="card-header">
        <h2 className="card-title">Performance Trend</h2>
        <div className="chart-info">
          <div className="time-period-selector">
            <button
              className={`period-btn ${timePeriod === 'week' ? 'active' : ''}`}
              onClick={() => setTimePeriod('week')}
            >
              Week
            </button>
            <button
              className={`period-btn ${timePeriod === 'month' ? 'active' : ''}`}
              onClick={() => setTimePeriod('month')}
            >
              Month
            </button>
            <button
              className={`period-btn ${timePeriod === 'year' ? 'active' : ''}`}
              onClick={() => setTimePeriod('year')}
            >
              Year
            </button>
          </div>
          <div className="chart-stats">
            <div className="total-value">${totalRevenue}</div>
            <div className="chart-trend positive">
              <TrendingUp size={16} />
              <span>+8.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-area-placeholder">
        <div className="y-axis-label">Revenue ($K) / Students</div>
        <div className="chart-bars-container">
          {currentData.map((data, index) => {
            const revenueHeight = (data.Revenue / maxRevenue) * 80;
            const studentHeight = (data.Students / maxStudents) * 80;

            return (
              <div key={index} className="chart-bar-group">
                <div className="bar-pair">
                  <div
                    className="chart-bar student-bar"
                    style={{ height: `${studentHeight}%` }}
                    title={`Students: ${data.Students}`}
                  ></div>
                  <div
                    className="chart-bar revenue-bar"
                    style={{ height: `${revenueHeight}%` }}
                    title={`Revenue: $${data.Revenue.toLocaleString()}`}
                  ></div>
                </div>
                <span className="chart-label">{data.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="chart-legend-bottom">
        <span className="legend-item student">New Students ({totalStudents})</span>
        <span className="legend-item revenue">Total Revenue (${totalRevenue})</span>
      </div>
    </div>
  );
};
