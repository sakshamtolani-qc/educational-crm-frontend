import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { ExamList } from "@/components/Admin/Exams/ExamList";
import { Clipboard, BookOpen, FileCheck } from "lucide-react";
import { ViewAllExamsPage } from "./ViewAllExamsPage";
import { ExamDetailsPage } from "./ExamDetailsPage";
import "./ExamsDashboard.css";

const ExamsTabbedView: React.FC<{ onViewExam: (id: string) => void }> = ({
  onViewExam,
}) => {
  const [activeTab, setActiveTab] = useState<"midterm" | "final" | "quiz">(
    "midterm"
  );

  return (
    <>
      <div className="exam-tabs">
        <button
          className={`exam-tab ${activeTab === "midterm" ? "active" : ""}`}
          onClick={() => setActiveTab("midterm")}
        >
          <BookOpen size={20} />
          Midterm Exams
        </button>
        <button
          className={`exam-tab ${activeTab === "final" ? "active" : ""}`}
          onClick={() => setActiveTab("final")}
        >
          <FileCheck size={20} />
          Final Exams
        </button>
        <button
          className={`exam-tab ${activeTab === "quiz" ? "active" : ""}`}
          onClick={() => setActiveTab("quiz")}
        >
          <Clipboard size={20} />
          Quizzes
        </button>
      </div>

      <div className="exam-content">
        {activeTab === "midterm" && (
          <ExamList examType="midterm" onViewExam={onViewExam} />
        )}
        {activeTab === "final" && (
          <ExamList examType="final" onViewExam={onViewExam} />
        )}
        {activeTab === "quiz" && (
          <ExamList examType="quiz" onViewExam={onViewExam} />
        )}
      </div>
    </>
  );
};

export const ExamsDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleViewExam = (examId: string) => {
    navigate(examId);
  };

  return (
    <div className="exams-dashboard">
      <div className="dashboard-header">
        <div className="header-row">
          <div className="header-icon">
            <Clipboard size={27} />
          </div>
          <div className="header-text">
            <h1 className="dashboard-title">Exam Management</h1>
            <p className="dashboard-subtitle">
              Create, manage, and track exam results across all courses
            </p>
          </div>
        </div>
      </div>

      <Routes>
        <Route index element={<ExamsTabbedView onViewExam={handleViewExam} />} />
        <Route path="view-all/:examType" element={<ViewAllExamsPage />} />
        <Route path=":examId" element={<ExamDetailsPage />} />
      </Routes>
    </div>
  );
};
