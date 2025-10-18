import React from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign,
  Calendar,
  Target,
  Circle
} from 'lucide-react';
import './DashboardPage.css';
import { ChartPlaceholder } from '@/components/Admin/Dashboard/ChartPlaceholder';
import { AdmissionsFunnel } from '@/components/Admin/Dashboard/AdmissionsFunnel';

interface PageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  subtitle?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, subtitle, color }) => {
  return (
    <div className="stat-card-modern">
      <div className="stat-card-content">
        <div className="stat-card-top">
          <div className="stat-card-label">{title}</div>
          {trend !== undefined && (
            <div className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
              {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="stat-card-bottom">
          <div className="stat-value">{value}</div>
          <div className={`stat-icon-wrapper ${color}`}>
            {icon}
          </div>
        </div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );
};

interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const NotificationItem: React.FC<NotificationItemProps> = ({ title, message, time, type }) => {
  return (
    <div className={`notification-item ${type}`}>
      <div className="notification-header">
        <span className="notification-title">{title}</span>
        <span className="notification-time">{time}</span>
      </div>
      <p className="notification-message">{message}</p>
    </div>
  );
};

const performanceData = {
  top: [
    { course: 'Advanced Mathematics', score: '92.5%', trend: 5 },
    { course: 'Physics 101', score: '88.1%', trend: 2 },
    { course: 'Chemistry Lab', score: '85.9%', trend: 1 },
  ],
  bottom: [
    { course: 'Economics', score: '62.4%', trend: -12 },
    { course: 'History of Art', score: '65.0%', trend: -8 },
    { course: 'Data Science Basics', score: '70.1%', trend: -5 },
  ],
};

const PerformanceItem: React.FC<{ item: typeof performanceData.top[0], type: 'top' | 'bottom' }> = ({ item, type }) => {
  const Icon = type === 'top' ? TrendingUp : TrendingDown;
  const color = type === 'top' ? 'positive' : 'negative';

  return (
    <div className="performance-item">
      <div className="course-dot-wrapper">
        <Circle size={8} className={`dot-${color}`} />
      </div>
      <span className="course-name">{item.course}</span>
      <span className={`course-score ${color}`}>{item.score}</span>
      <div className={`performance-trend ${color}`}>
        <Icon size={14} />
      </div>
    </div>
  );
};

export const DashboardPage: React.FC<PageProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeNav,
  setActiveNav,
}) => {
  const stats = [
    {
      title: 'TOTAL STUDENTS',
      value: '1,234',
      icon: <Users size={28} />,
      trend: 12,
      subtitle: '+145 this month',
      color: 'blue'
    },
    {
      title: 'ACTIVE TEACHERS',
      value: '56',
      icon: <GraduationCap size={28} />,
      trend: 8,
      subtitle: '4 new this week',
      color: 'green'
    },
    {
      title: 'COURSES',
      value: '89',
      icon: <BookOpen size={28} />,
      trend: 5,
      subtitle: '12 in progress',
      color: 'purple'
    },
    {
      title: 'PENDING TASKS',
      value: '45',
      icon: <Target size={28} />,
      trend: -15,
      subtitle: '8 due today',
      color: 'orange'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      student: 'Sarah Johnson',
      action: 'enrolled in',
      course: 'Advanced Mathematics',
      time: '2 min ago',
      avatar: 'SJ'
    },
    {
      id: 2,
      type: 'payment',
      student: 'Michael Chen',
      action: 'completed payment for',
      course: 'Physics 101',
      time: '15 min ago',
      avatar: 'MC'
    },
    {
      id: 3,
      type: 'assignment',
      student: 'Emma Wilson',
      action: 'submitted assignment in',
      course: 'Chemistry Lab',
      time: '1 hour ago',
      avatar: 'EW'
    },
    {
      id: 4,
      type: 'exam',
      student: 'James Brown',
      action: 'completed exam in',
      course: 'Biology Basics',
      time: '2 hours ago',
      avatar: 'JB'
    },
  ];

  const notifications = [
    {
      title: 'New Assignment Submitted',
      message: 'John Smith submitted Math Assignment #5',
      time: '2 minutes ago',
      type: 'success' as const
    },
    {
      title: 'Course Enrollment',
      message: '15 new students enrolled in Physics',
      time: '1 hour ago',
      type: 'info' as const
    },
    {
      title: 'System Update',
      message: 'Dashboard maintenance scheduled',
      time: '3 hours ago',
      type: 'warning' as const
    },
    {
      title: 'Grade Report',
      message: 'Monthly report generation completed',
      time: '1 day ago',
      type: 'success' as const
    },
  ];

  return (
    <div className="dashboard-page-content">
      <main className="content-area">
        <div className="page-title-section-wrapper">
          <div className="page-title-section">
            <h1 className="page-title">Dashboard Overview</h1>
            <p className="page-subtitle">Welcome back! Here's what's happening with your institution today.</p>
          </div>
          <button className="primary-action-btn">
            <UserCheck size={20} />
            <span>Quick Enroll Student</span>
          </button>
        </div>

        <div className="stats-grid-modern">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="content-sections">
          <div className="main-section">
            <ChartPlaceholder />

            <div className="quick-stats-row">
              <AdmissionsFunnel />

              <div className="quick-stat-card green">
                <div className="quick-stat-icon">
                  <DollarSign size={24} />
                </div>
                <div className="quick-stat-info">
                  <div className="quick-stat-label">Revenue Target</div>
                  <div className="quick-stat-value">$150,000</div>
                  <div className="quick-stat-change positive">78% Achieved YTD</div>
                </div>
              </div>

              <div className="quick-stat-card purple">
                <div className="quick-stat-icon">
                  <Calendar size={24} />
                </div>
                <div className="quick-stat-info">
                  <div className="quick-stat-label">Upcoming Exams</div>
                  <div className="quick-stat-value">12</div>
                  <div className="quick-stat-change neutral">Next exam in 3 days</div>
                </div>
              </div>
            </div>

            <div className="card activities-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activities</h2>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activities-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="activity-row">
                    <div className="activity-avatar">{activity.avatar}</div>
                    <div className="activity-details">
                      <p className="activity-text">
                        <strong>{activity.student}</strong> {activity.action}{' '}
                        <span className="activity-course">{activity.course}</span>
                      </p>
                      <div className="activity-meta">
                        <Clock size={14} />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <button className="activity-action-btn">View</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="side-section">
            <div className="card performance-card">
              <div className="card-header">
                <h2 className="card-title">Academic Performance</h2>
                <button className="view-all-btn">Full Report</button>
              </div>
              <div className="performance-list-wrapper">
                <h3>Top Performing Courses:</h3>
                <div className="performance-list top-list">
                  {performanceData.top.map((item, index) => (
                    <PerformanceItem key={index} item={item} type="top" />
                  ))}
                </div>

                <h3 className="mt-4">Areas for Improvement:</h3>
                <div className="performance-list bottom-list">
                  {performanceData.bottom.map((item, index) => (
                    <PerformanceItem key={index} item={item} type="bottom" />
                  ))}
                </div>
              </div>
            </div>

            <div className="card notifications-card">
              <div className="card-header">
                <h2 className="card-title">Recent Notifications</h2>
              </div>
              <div className="notifications-list">
                {notifications.map((notification, index) => (
                  <NotificationItem key={index} {...notification} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};