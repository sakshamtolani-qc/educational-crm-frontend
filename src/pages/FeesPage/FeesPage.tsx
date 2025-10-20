import React, { useState, useEffect, useMemo } from "react";
import { Filters, FeeFilters } from "@/components/Admin/Fees/Filters";
import { FeeTable, FeeRecord } from "@/components/Admin/Fees/FeeTable";
import { PaymentModal } from "@/components/Admin/Fees/PaymentModal";
import { SummaryCards } from "@/components/Admin/Fees/SummaryCards";
import "./FeesPage.css";

const initialFeeRecords: FeeRecord[] = [
  {
    id: "f001",
    studentName: "Alice Smith",
    studentId: "S001",
    course: "Computer Science",
    amount: 1500.0,
    dueDate: "2023-04-01",
    status: "pending",
  },
  {
    id: "f002",
    studentName: "Bob Johnson",
    studentId: "S002",
    course: "Electrical Engineering",
    amount: 2000.0,
    dueDate: "2023-03-15",
    status: "paid",
    paymentDate: "2023-03-10",
  },
  {
    id: "f003",
    studentName: "Charlie Brown",
    studentId: "S003",
    course: "Civil Engineering",
    amount: 1800.0,
    dueDate: "2023-05-01",
    status: "pending",
  },
  {
    id: "f004",
    studentName: "Alice Smith",
    studentId: "S001",
    course: "Computer Science",
    amount: 500.0,
    dueDate: "2023-06-01",
    status: "pending",
  },
  {
    id: "f005",
    studentName: "Eve Davis",
    studentId: "S004",
    course: "Mechanical Engineering",
    amount: 2200.0,
    dueDate: "2023-04-20",
    status: "paid",
    paymentDate: "2023-04-18",
  },
  {
    id: "f006",
    studentName: "Frank White",
    studentId: "S005",
    course: "Computer Science",
    amount: 1000.0,
    dueDate: "2023-07-01",
    status: "pending",
  },
  {
    id: "f007",
    studentName: "Alice Smith",
    studentId: "S001",
    course: "Computer Science",
    amount: 750.0,
    dueDate: "2023-03-01",
    status: "paid",
    paymentDate: "2023-02-28",
  },
];

const ITEMS_PER_PAGE = 5;

interface FeesPageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

export const FeesPage: React.FC<FeesPageProps> = () => {
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>(initialFeeRecords);
  const [filters, setFilters] = useState<FeeFilters>({
    studentName: "",
    studentId: "",
    course: "",
    dateFrom: "",
    dateTo: "",
    status: "all",
  });
  const [sortColumn, setSortColumn] = useState<keyof FeeRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);

  const filteredAndSortedRecords = useMemo(() => {
    let tempRecords = feeRecords.filter((record) => {
      // FIX: Check if EITHER studentName OR studentId matches the filter.
      // Filters component guarantees only one of these fields will be set.
      const matchesStudentName = filters.studentName
        ? record.studentName
            .toLowerCase()
            .includes(filters.studentName.toLowerCase())
        : true;

      const matchesStudentId = filters.studentId
        ? record.studentId
            .toLowerCase()
            .includes(filters.studentId.toLowerCase())
        : true;

      const matchesStudent = matchesStudentName && matchesStudentId;

      const matchesCourse = filters.course
        ? record.course.toLowerCase().includes(filters.course.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all" ? true : record.status === filters.status;
      const matchesDateFrom = filters.dateFrom
        ? record.dueDate >= filters.dateFrom
        : true;
      const matchesDateTo = filters.dateTo
        ? record.dueDate <= filters.dateTo
        : true;
      return (
        matchesStudent &&
        matchesCourse &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo
      );
    });

    if (sortColumn) {
      tempRecords.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    return tempRecords;
  }, [feeRecords, filters, sortColumn, sortDirection]);

  const totalPages = Math.ceil(
    filteredAndSortedRecords.length / ITEMS_PER_PAGE
  );
  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedRecords.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedRecords, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortColumn, sortDirection]);

  const handleFilterChange = (newFilters: FeeFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (column: keyof FeeRecord) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRecordPaymentClick = (feeId: string) => {
    const feeToPay = feeRecords.find((fee) => fee.id === feeId);
    if (feeToPay) {
      setSelectedFee(feeToPay);
      setIsModalOpen(true);
    }
  };

  const handleConfirmPayment = (
    feeId: string,
    paymentDetails: { method: string; date: string; notes?: string }
  ) => {
    console.log(
      "Simulating API call to record payment:",
      feeId,
      paymentDetails
    );
    setFeeRecords((prevRecords) =>
      prevRecords.map((fee) =>
        fee.id === feeId
          ? { ...fee, status: "paid", paymentDate: paymentDetails.date }
          : fee
      )
    );
    alert(`Payment for ${selectedFee?.studentName} recorded successfully!`);
    setSelectedFee(null);
  };

  const totalFeesDue = useMemo(
    () => feeRecords.reduce((sum, record) => sum + record.amount, 0),
    [feeRecords]
  );
  const pendingPayments = useMemo(
    () =>
      feeRecords
        .filter((record) => record.status === "pending")
        .reduce((sum, record) => sum + record.amount, 0),
    [feeRecords]
  );
  const paidThisMonth = useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return feeRecords
      .filter(
        (record) =>
          record.status === "paid" &&
          record.paymentDate?.startsWith(currentMonth)
      )
      .reduce((sum, record) => sum + record.amount, 0);
  }, [feeRecords]);

  return (
    <div className="fees-page">
      <h1 className="fees-main-title">Fees & Payments</h1>{" "}
      <SummaryCards
        totalFeesDue={totalFeesDue}
        pendingPayments={pendingPayments}
        paidThisMonth={paidThisMonth}
      />
      <Filters onFilterChange={handleFilterChange} />{" "}
      <FeeTable
        feeRecords={paginatedRecords}
        onRecordPayment={handleRecordPaymentClick}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />{" "}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feeId={selectedFee?.id || null}
        studentName={selectedFee?.studentName || ""}
        amount={selectedFee?.amount || 0}
        onConfirmPayment={handleConfirmPayment}
      />{" "}
    </div>
  );
};
