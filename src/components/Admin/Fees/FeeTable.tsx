import React from "react";
import { Edit2, CheckCircle } from "lucide-react";
import "./FeeTable.css";

export interface FeeRecord {
  id: string;
  studentName: string;
  studentId: string;
  course: string;
  amount: number;
  dueDate: string;
  status: "pending" | "paid";
  paymentDate?: string;
}

interface FeeTableProps {
  feeRecords: FeeRecord[];
  onRecordPayment: (feeId: string) => void;
  onSort: (key: keyof FeeRecord) => void;
  sortColumn: keyof FeeRecord | null;
  sortDirection: "asc" | "desc";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const FeeTable: React.FC<FeeTableProps> = ({
  feeRecords,
  onRecordPayment,
  onSort,
  sortColumn,
  sortDirection,
  currentPage,
  totalPages,
  onPageChange,
}) => {

  const getSortIndicator = (column: keyof FeeRecord) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <span className="sort-indicator active"> 🔼</span>
      ) : (
        <span className="sort-indicator active"> 🔽</span>
      );
    }
    return <span className="sort-indicator inactive"> ↕</span>;
  };

  return (
    <div className="fee-table-container">
      <table className="fee-data-table">
        <thead>
          <tr>
            <th onClick={() => onSort("studentName")}>
              Student Name {getSortIndicator("studentName")}
            </th>
            <th onClick={() => onSort("studentId")}>
              User ID {getSortIndicator("studentId")}
            </th>
            <th onClick={() => onSort("course")}>
              Course {getSortIndicator("course")}
            </th>
            <th onClick={() => onSort("amount")}>
              Amount {getSortIndicator("amount")}
            </th>
            <th onClick={() => onSort("dueDate")}>
              Due Date {getSortIndicator("dueDate")}
            </th>
            <th onClick={() => onSort("status")}>
              Status {getSortIndicator("status")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeRecords.length === 0 ? (
            <tr>
              <td colSpan={7} className="no-data">No fee records found.</td>
            </tr>
          ) : (
            feeRecords.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.studentName}</td>
                <td>{fee.studentId}</td>
                <td>{fee.course}</td>
                <td>${fee.amount.toFixed(2)}</td>
                <td>{fee.dueDate}</td>
                <td>
                  <span className={`status-badge ${fee.status}`}>
                    {fee.status === "paid" ? <CheckCircle size={14} /> : null} {fee.status}
                  </span>
                </td>
                <td className="actions-cell">
                  {fee.status === "pending" && (
                    <button
                      className="action-btn record-payment-btn"
                      onClick={() => onRecordPayment(fee.id)}
                      title="Record Payment"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};
