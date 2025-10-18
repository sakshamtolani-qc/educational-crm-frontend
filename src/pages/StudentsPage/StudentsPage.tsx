import React, { useState, useMemo } from 'react';
import { StudentTable } from '@/components/Admin/Students/StudentTable';
import { StudentFilters } from '@/components/Admin/Students/StudentFilters';
import { StudentModal } from '@/components/Admin/Students/StudentModal';
import { Plus } from 'lucide-react';

import './StudentsPage.css';

export interface Student {
  id: number;
  name: string;
  rollNo: string;
  email: string;
  course: string;
  year: number;
  status: 'Active' | 'Inactive';
}

interface PageProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

const initialStudents: Student[] = [
  { id: 1, name: 'Rahul Sharma', rollNo: 'CSE001', email: 'rahul.sharma@edu.in', course: 'CSE', year: 2, status: 'Active' },
  { id: 2, name: 'Priya Patel', rollNo: 'ECE045', email: 'priya.patel@edu.in', course: 'ECE', year: 3, status: 'Active' },
  { id: 3, name: 'Amit Kumar', rollNo: 'ME089', email: 'amit.kumar@edu.in', course: 'ME', year: 1, status: 'Inactive' },
  { id: 4, name: 'Sneha Reddy', rollNo: 'CSE112', email: 'sneha.reddy@edu.in', course: 'CSE', year: 4, status: 'Active' },
  { id: 5, name: 'Vikram Singh', rollNo: 'ECE078', email: 'vikram.singh@edu.in', course: 'ECE', year: 2, status: 'Active' },
];

export const StudentsPage: React.FC<PageProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeNav,
  setActiveNav
}) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (courseFilter !== 'All') {
      result = result.filter((s) => s.course === courseFilter);
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'rollNo': return a.rollNo.localeCompare(b.rollNo);
        case 'course': return a.course.localeCompare(b.course);
        case 'year': return a.year - b.year;
        case 'status': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });
    return result;
  }, [students, searchTerm, courseFilter, sortBy]);

  const handleAddOrEditStudent = (student: Student | Omit<Student, 'id'>) => {
    if ('id' in student) {
      setStudents(students.map((s) => (s.id === student.id ? student : s)));
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleViewStudent = (student: Student) => {
    alert(`Viewing details for ${student.name}\nRoll No: ${student.rollNo}\nEmail: ${student.email}\nCourse: ${student.course}\nYear: ${student.year}\nStatus: ${student.status}`);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="students-page-content">
      <main className="content-area">
        <div className="page-title-section-wrapper">
          <div className="page-title-section">
            <h1 className="page-title">Manage Students</h1>
            <p className="page-subtitle">View, add, edit, or remove student records.</p>
          </div>
          <button className="primary-action-btn" onClick={openAddModal}>
            <Plus size={20} />
            <span>Add New Student</span>
          </button>
        </div>

        <div className="students-content-wrapper">
          <StudentFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            courseFilter={courseFilter}
            setCourseFilter={setCourseFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          <StudentTable
            students={filteredAndSortedStudents}
            onEdit={openEditModal}
            onDelete={handleDeleteStudent}
            onView={handleViewStudent}
          />
        </div>
      </main>

      {isModalOpen && (
        <StudentModal
          student={editingStudent}
          onSave={handleAddOrEditStudent}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StudentsPage;