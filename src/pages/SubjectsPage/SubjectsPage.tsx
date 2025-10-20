import React, { useState, useEffect, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import { SubjectTable } from '@/components/Admin/Subjects/SubjectTable';
import { SubjectForm } from '@/components/Admin/Subjects/SubjectForm';
import { AssignFacultyModal } from '@/components/Admin/Subjects/AssignFacultyModal';
import { SubjectFilters } from '@/components/Admin/Subjects/SubjectFilter'; 
import { toast } from "@/utils/use-toast"; 
import './SubjectsPage.css';

export interface Subject {
    id: number;
    name: string;
    code: string;
    credits: number;
    courseId: number;
    courseName?: string;
    facultyId?: number;
    facultyName?: string;
}

export interface Course {
    id: number;
    name: string;
}

export interface Faculty {
    id: number;
    name: string;
    department: string;
    designation: string;
}

// Demo data
const DEMO_COURSES: Course[] = [
    { id: 1, name: 'Computer Science Engineering' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Electronics & Communication' },
    { id: 4, name: 'Mechanical Engineering' },
    { id: 5, name: 'Civil Engineering' },
];

const DEMO_FACULTIES: Faculty[] = [
    { id: 1, name: 'Dr. Rajesh Kumar', department: 'Computer Science', designation: 'Professor' },
    { id: 2, name: 'Dr. Priya Sharma', department: 'Computer Science', designation: 'Associate Professor' },
    { id: 3, name: 'Dr. Amit Patel', department: 'Information Technology', designation: 'Professor' },
    { id: 4, name: 'Dr. Sneha Desai', department: 'Electronics', designation: 'Assistant Professor' },
    { id: 5, name: 'Dr. Vikram Singh', department: 'Computer Science', designation: 'Assistant Professor' },
    { id: 6, name: 'Dr. Meera Reddy', department: 'Information Technology', designation: 'Associate Professor' },
    { id: 7, name: 'Dr. Karthik Iyer', department: 'Mechanical', designation: 'Professor' },
    { id: 8, name: 'Dr. Anjali Nair', department: 'Civil', designation: 'Associate Professor' },
];

const DEMO_SUBJECTS: Subject[] = [
    { id: 1, name: 'Data Structures & Algorithms', code: 'CS201', credits: 4, courseId: 1, courseName: 'Computer Science Engineering', facultyId: 1, facultyName: 'Dr. Rajesh Kumar' },
    { id: 2, name: 'Database Management Systems', code: 'CS301', credits: 4, courseId: 1, courseName: 'Computer Science Engineering', facultyId: 2, facultyName: 'Dr. Priya Sharma' },
    { id: 3, name: 'Operating Systems', code: 'CS302', credits: 3, courseId: 1, courseName: 'Computer Science Engineering', facultyId: 5, facultyName: 'Dr. Vikram Singh' },
    { id: 4, name: 'Web Technologies', code: 'IT201', credits: 3, courseId: 2, courseName: 'Information Technology', facultyId: 3, facultyName: 'Dr. Amit Patel' },
    { id: 5, name: 'Computer Networks', code: 'IT301', credits: 4, courseId: 2, courseName: 'Information Technology', facultyId: 6, facultyName: 'Dr. Meera Reddy' },
    { id: 6, name: 'Digital Electronics', code: 'EC201', credits: 3, courseId: 3, courseName: 'Electronics & Communication', facultyId: 4, facultyName: 'Dr. Sneha Desai' },
    { id: 7, name: 'Machine Learning', code: 'CS401', credits: 4, courseId: 1, courseName: 'Computer Science Engineering' },
    { id: 8, name: 'Cloud Computing', code: 'IT401', credits: 3, courseId: 2, courseName: 'Information Technology' },
];

export const SubjectsPage: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>(DEMO_SUBJECTS);
    const [courses] = useState<Course[]>(DEMO_COURSES);
    const [faculties] = useState<Faculty[]>(DEMO_FACULTIES);
    const [loading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [assigningSubject, setAssigningSubject] = useState<Subject | null>(null);
    const [nextId, setNextId] = useState(9);
    
    // State for Search and Sort
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");

    // Filtering and Sorting Logic
    const filteredAndSortedSubjects = useMemo(() => {
        let filtered = subjects.filter((subject) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                subject.name.toLowerCase().includes(searchLower) ||
                subject.code.toLowerCase().includes(searchLower) ||
                (subject.courseName && subject.courseName.toLowerCase().includes(searchLower)) ||
                (subject.facultyName && subject.facultyName.toLowerCase().includes(searchLower))
            );
        });

        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "code":
                    return a.code.localeCompare(b.code);
                case "credits":
                    return a.credits - b.credits;
                case "courseName":
                    const nameA = a.courseName || '';
                    const nameB = b.courseName || '';
                    return nameA.localeCompare(nameB);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [subjects, searchTerm, sortBy]);


    const handleAddSubject = () => {
        setEditingSubject(null);
        setShowForm(true);
    };

    const handleEditSubject = (subject: Subject) => {
        setEditingSubject(subject);
        setShowForm(true);
    };

    const handleDeleteSubject = (id: number) => {
        const subjectToDelete = subjects.find(s => s.id === id);
        if (window.confirm(`Are you sure you want to delete subject "${subjectToDelete?.name}"?`)) {
            setSubjects(subjects.filter(s => s.id !== id));
            toast({
                title: "Success",
                description: "Subject deleted successfully",
            });
        }
    };

    const handleSubmitSubject = (subjectData: Partial<Subject>) => {
        if (editingSubject) {
            // Update existing subject
            const course = courses.find(c => c.id === subjectData.courseId);
            const updatedSubject = {
                ...editingSubject,
                ...subjectData,
                courseName: course?.name,
            } as Subject;
            setSubjects(subjects.map(s => s.id === editingSubject.id ? updatedSubject : s));
            toast({
                title: "Success",
                description: "Subject updated successfully",
            });
        } else {
            // Add new subject
            const course = courses.find(c => c.id === subjectData.courseId);
            const newSubject: Subject = {
                id: nextId,
                name: subjectData.name!,
                code: subjectData.code!,
                credits: subjectData.credits!,
                courseId: subjectData.courseId!,
                courseName: course?.name,
            };
            setSubjects([...subjects, newSubject]);
            setNextId(nextId + 1);
            toast({
                title: "Success",
                description: "Subject added successfully",
            });
        }

        setShowForm(false);
        setEditingSubject(null);
    };

    const handleAssignFaculty = (subject: Subject) => {
        setAssigningSubject(subject);
    };

    const handleConfirmAssignFaculty = (facultyId: number) => {
        if (!assigningSubject) return;

        const faculty = faculties.find(f => f.id === facultyId);
        const updatedSubject = {
            ...assigningSubject,
            facultyId,
            facultyName: faculty?.name,
        };

        setSubjects(subjects.map(s => s.id === assigningSubject.id ? updatedSubject : s));
        toast({
            title: "Success",
            description: "Faculty assigned successfully",
        });
        setAssigningSubject(null);
    };

    return (
        <div className="subjects-page">
            <header className="page-header">
                <div className="header-content">
                    <div>
                        <h1>Subject Management</h1>
                        <p>Manage and assign faculties to subjects</p>
                    </div>
                    <button className="add-btn" onClick={handleAddSubject}>
                        <Plus size={20} />
                        Add Subject
                    </button>
                </div>
            </header>

            {/* New Filters Component */}
            <SubjectFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {loading ? (
                <div className="loading-state">Loading subjects...</div>
            ) : (
                <SubjectTable
                    subjects={filteredAndSortedSubjects}
                    onEdit={handleEditSubject}
                    onDelete={handleDeleteSubject}
                    onAssignFaculty={handleAssignFaculty}
                />
            )}

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</h2>
                            <button className="modal-close" onClick={() => setShowForm(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <SubjectForm
                            subject={editingSubject}
                            courses={courses}
                            onSubmit={handleSubmitSubject}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}

            {assigningSubject && (
                <AssignFacultyModal
                    subject={assigningSubject}
                    faculties={faculties}
                    onConfirm={handleConfirmAssignFaculty}
                    onClose={() => setAssigningSubject(null)}
                />
            )}
        </div>
    );
};