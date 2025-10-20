import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import './ReportsTable.css';

interface ReportsTableProps {
  reportType: string;
  filters: any;
}

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TableRow {
  [key: string]: any;
}

export const ReportsTable: React.FC<ReportsTableProps> = ({ reportType }) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const getTableData = (): { columns: TableColumn[]; rows: TableRow[] } => {
    switch (reportType) {
      case 'admissions':
        return {
          columns: [
            { key: 'id', label: 'ID', sortable: true },
            { key: 'studentName', label: 'Student Name', sortable: true },
            { key: 'course', label: 'Course', sortable: true },
            { key: 'date', label: 'Admission Date', sortable: true },
            { key: 'status', label: 'Status', sortable: true },
            { key: 'fees', label: 'Fees', sortable: true }
          ],
          rows: [
            { id: 'ADM-001', studentName: 'Alice Williams', course: 'Computer Science', date: '2024-01-15', status: 'Approved', fees: '$12,000' },
            { id: 'ADM-002', studentName: 'Bob Anderson', course: 'Mathematics', date: '2024-01-18', status: 'Approved', fees: '$10,000' },
            { id: 'ADM-003', studentName: 'Carol Davis', course: 'Physics', date: '2024-01-20', status: 'Pending', fees: '$11,500' },
            { id: 'ADM-004', studentName: 'David Miller', course: 'Chemistry', date: '2024-01-22', status: 'Approved', fees: '$10,500' },
            { id: 'ADM-005', studentName: 'Emma Wilson', course: 'Biology', date: '2024-01-25', status: 'Approved', fees: '$11,000' },
            { id: 'ADM-006', studentName: 'Frank Brown', course: 'Computer Science', date: '2024-01-28', status: 'Pending', fees: '$12,000' },
            { id: 'ADM-007', studentName: 'Grace Taylor', course: 'Mathematics', date: '2024-02-01', status: 'Approved', fees: '$10,000' },
            { id: 'ADM-008', studentName: 'Henry Garcia', course: 'Physics', date: '2024-02-03', status: 'Approved', fees: '$11,500' },
            { id: 'ADM-009', studentName: 'Ivy Martinez', course: 'Chemistry', date: '2024-02-05', status: 'Approved', fees: '$10,500' },
            { id: 'ADM-010', studentName: 'Jack Robinson', course: 'Biology', date: '2024-02-08', status: 'Pending', fees: '$11,000' }
          ]
        };

      case 'attendance':
        return {
          columns: [
            { key: 'id', label: 'Student ID', sortable: true },
            { key: 'studentName', label: 'Student Name', sortable: true },
            { key: 'course', label: 'Course', sortable: true },
            { key: 'present', label: 'Present', sortable: true },
            { key: 'absent', label: 'Absent', sortable: true },
            { key: 'percentage', label: 'Attendance %', sortable: true }
          ],
          rows: [
            { id: 'STU-001', studentName: 'Alice Williams', course: 'Computer Science', present: 45, absent: 5, percentage: '90%' },
            { id: 'STU-002', studentName: 'Bob Anderson', course: 'Mathematics', present: 48, absent: 2, percentage: '96%' },
            { id: 'STU-003', studentName: 'Carol Davis', course: 'Physics', present: 42, absent: 8, percentage: '84%' },
            { id: 'STU-004', studentName: 'David Miller', course: 'Chemistry', present: 46, absent: 4, percentage: '92%' },
            { id: 'STU-005', studentName: 'Emma Wilson', course: 'Biology', present: 47, absent: 3, percentage: '94%' },
            { id: 'STU-006', studentName: 'Frank Brown', course: 'Computer Science', present: 44, absent: 6, percentage: '88%' },
            { id: 'STU-007', studentName: 'Grace Taylor', course: 'Mathematics', present: 49, absent: 1, percentage: '98%' },
            { id: 'STU-008', studentName: 'Henry Garcia', course: 'Physics', present: 43, absent: 7, percentage: '86%' },
            { id: 'STU-009', studentName: 'Ivy Martinez', course: 'Chemistry', present: 46, absent: 4, percentage: '92%' },
            { id: 'STU-010', studentName: 'Jack Robinson', course: 'Biology', present: 41, absent: 9, percentage: '82%' }
          ]
        };

      case 'exams':
        return {
          columns: [
            { key: 'id', label: 'Exam ID', sortable: true },
            { key: 'examName', label: 'Exam Name', sortable: true },
            { key: 'course', label: 'Course', sortable: true },
            { key: 'date', label: 'Date', sortable: true },
            { key: 'appeared', label: 'Appeared', sortable: true },
            { key: 'passed', label: 'Passed', sortable: true }
          ],
          rows: [
            { id: 'EXM-001', examName: 'Midterm Exam', course: 'Computer Science', date: '2024-02-15', appeared: 156, passed: 142 },
            { id: 'EXM-002', examName: 'Final Exam', course: 'Mathematics', date: '2024-03-10', appeared: 178, passed: 165 },
            { id: 'EXM-003', examName: 'Unit Test 1', course: 'Physics', date: '2024-02-20', appeared: 145, passed: 128 },
            { id: 'EXM-004', examName: 'Practical Exam', course: 'Chemistry', date: '2024-03-05', appeared: 132, passed: 119 },
            { id: 'EXM-005', examName: 'Quiz 1', course: 'Biology', date: '2024-02-25', appeared: 168, passed: 156 },
            { id: 'EXM-006', examName: 'Midterm Exam', course: 'Mathematics', date: '2024-03-01', appeared: 189, passed: 174 },
            { id: 'EXM-007', examName: 'Final Exam', course: 'Computer Science', date: '2024-03-15', appeared: 164, passed: 148 },
            { id: 'EXM-008', examName: 'Unit Test 2', course: 'Physics', date: '2024-03-08', appeared: 152, passed: 134 },
            { id: 'EXM-009', examName: 'Lab Exam', course: 'Chemistry', date: '2024-03-12', appeared: 138, passed: 122 },
            { id: 'EXM-010', examName: 'Quiz 2', course: 'Biology', date: '2024-03-18', appeared: 172, passed: 161 }
          ]
        };

      case 'fees':
        return {
          columns: [
            { key: 'id', label: 'Receipt ID', sortable: true },
            { key: 'studentName', label: 'Student Name', sortable: true },
            { key: 'course', label: 'Course', sortable: true },
            { key: 'amount', label: 'Amount', sortable: true },
            { key: 'paid', label: 'Paid', sortable: true },
            { key: 'status', label: 'Status', sortable: true }
          ],
          rows: [
            { id: 'FEE-001', studentName: 'Alice Williams', course: 'Computer Science', amount: '$12,000', paid: '$12,000', status: 'Paid' },
            { id: 'FEE-002', studentName: 'Bob Anderson', course: 'Mathematics', amount: '$10,000', paid: '$10,000', status: 'Paid' },
            { id: 'FEE-003', studentName: 'Carol Davis', course: 'Physics', amount: '$11,500', paid: '$5,000', status: 'Partial' },
            { id: 'FEE-004', studentName: 'David Miller', course: 'Chemistry', amount: '$10,500', paid: '$10,500', status: 'Paid' },
            { id: 'FEE-005', studentName: 'Emma Wilson', course: 'Biology', amount: '$11,000', paid: '$11,000', status: 'Paid' },
            { id: 'FEE-006', studentName: 'Frank Brown', course: 'Computer Science', amount: '$12,000', paid: '$0', status: 'Pending' },
            { id: 'FEE-007', studentName: 'Grace Taylor', course: 'Mathematics', amount: '$10,000', paid: '$10,000', status: 'Paid' },
            { id: 'FEE-008', studentName: 'Henry Garcia', course: 'Physics', amount: '$11,500', paid: '$11,500', status: 'Paid' },
            { id: 'FEE-009', studentName: 'Ivy Martinez', course: 'Chemistry', amount: '$10,500', paid: '$7,000', status: 'Partial' },
            { id: 'FEE-010', studentName: 'Jack Robinson', course: 'Biology', amount: '$11,000', paid: '$0', status: 'Pending' }
          ]
        };

      default:
        return {
          columns: [
            { key: 'id', label: 'ID', sortable: true },
            { key: 'name', label: 'Name', sortable: true },
            { key: 'type', label: 'Type', sortable: true },
            { key: 'date', label: 'Date', sortable: true },
            { key: 'status', label: 'Status', sortable: true }
          ],
          rows: [
            { id: '001', name: 'Record 1', type: 'Type A', date: '2024-01-15', status: 'Active' },
            { id: '002', name: 'Record 2', type: 'Type B', date: '2024-01-18', status: 'Active' },
            { id: '003', name: 'Record 3', type: 'Type A', date: '2024-01-20', status: 'Inactive' }
          ]
        };
    }
  };

  const { columns, rows } = getTableData();
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'paid':
      case 'active':
        return 'status-approved';
      case 'pending':
        return 'status-pending';
      case 'partial':
        return 'status-partial';
      default:
        return '';
    }
  };

  return (
    <div className="reports-table-container">
      <div className="table-header">
        <h2 className="table-title">Detailed Report</h2>
        <p className="table-subtitle">
          Showing {startIndex + 1} to {Math.min(endIndex, rows.length)} of {rows.length} records
        </p>
      </div>

      <div className="table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.sortable ? 'sortable' : ''} onClick={() => column.sortable && handleSort(column.key)}>
                  <div className="th-content">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="sort-icons">
                        {sortColumn === column.key ? (
                          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        ) : (
                          <ChevronDown size={16} className="inactive" />
                        )}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'status' ? (
                      <span className={`status-badge ${getStatusClass(row[column.key])}`}>
                        {row[column.key]}
                      </span>
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
          <span>Previous</span>
        </button>

        <div className="pagination-numbers">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
