import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Search, X } from 'lucide-react';
import './ResultList.css';

interface ResultListProps {
  examId: string;
  onEdit: (resultId: string) => void;
}

const MOCK_RESULTS_WITH_STUDENTS = [
    { id: 'r-1', exam_id: 'mock-exam-1', student_id: 'st-1', marks_obtained: 85, students: { student_id: 'S001', name: 'Alice Johnson' } },
    { id: 'r-2', exam_id: 'mock-exam-1', student_id: 'st-2', marks_obtained: 92, students: { student_id: 'S002', name: 'Bob Smith' } },
    { id: 'r-3', exam_id: 'mock-exam-1', student_id: 'st-3', marks_obtained: 77, students: { student_id: 'S003', name: 'Charlie Brown' } },
    { id: 'r-4', exam_id: 'mock-exam-1', student_id: 'st-4', marks_obtained: 45, students: { student_id: 'S004', name: 'Diana Prince' } },
    { id: 'r-5', exam_id: 'mock-exam-1', student_id: 'st-5', marks_obtained: 68, students: { student_id: 'S005', name: 'Ethan Hunt' } },
];

const MOCK_EXAM_TOTAL_MARKS = { total_marks: 100 };

export const ResultList: React.FC<ResultListProps> = ({ examId, onEdit }) => {
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResults();
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = results.filter(
        (result) =>
          result.students?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.students?.student_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    } else {
      setFilteredResults(results);
    }
  }, [searchTerm, results]);

  const fetchExam = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    setExam(MOCK_EXAM_TOTAL_MARKS);
  };

  const fetchResults = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setResults(MOCK_RESULTS_WITH_STUDENTS);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      fetchResults();
    }
  };

  const getPercentage = (marks: number): string => {
    if (!exam) return '0.00';
    return ((marks / exam.total_marks) * 100).toFixed(2);
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  if (loading) return <div className="loading-state">Loading results...</div>;

  if (results.length === 0) {
    return <div className="empty-state">No results added yet</div>;
  }

  const displayResults = filteredResults;

  return (
    <div className="result-list-container">
      <div className="result-search-bar">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by student name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>
        {searchTerm && (
          <div className="search-results-count">
            Showing {displayResults.length} of {results.length} results
          </div>
        )}
      </div>
      <div className="result-table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Marks Obtained</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayResults.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                  No students found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              displayResults.map((result) => {
              const percentage = parseFloat(getPercentage(result.marks_obtained));
              const grade = getGrade(percentage);
              return (
                <tr key={result.id}>
                  <td>{result.students?.student_id}</td>
                  <td>{result.students?.name}</td>
                  <td>
                    {result.marks_obtained} / {exam?.total_marks}
                  </td>
                  <td>{percentage}%</td>
                  <td>
                    <span className={`grade-badge grade-${grade.replace('+', 'plus')}`}>
                      {grade}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => onEdit(result.id)}
                        title="Edit Result"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(result.id)}
                        title="Delete Result"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};