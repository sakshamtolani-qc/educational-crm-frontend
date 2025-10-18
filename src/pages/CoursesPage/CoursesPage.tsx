import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import CourseTable from "@/components/Admin/Courses/CourseTable";
import { CourseFilters } from "@/components/Admin/Courses/CourseFilters";
import { CourseModal } from "@/components/Admin/Courses/CourseModal";
import { toast } from "@/hooks/use-toast";
import "./CoursesPage.css";

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  duration: number; // in months
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "C001",
      name: "Computer Science and Engineering",
      code: "CSE",
      description: "Core engineering program covering software, algorithms, and computing systems",
      credits: 3,
      duration: 4
    },
    {
      id: "C002",
      name: "Electronics and Communication Engineering",
      code: "ECE",
      description: "Study of electronic devices, circuits, and communication systems",
      credits: 4,
      duration: 6
    },
    {
      id: "C003",
      name: "Electrical and Electronics Engineering",
      code: "EEE",
      description: "Comprehensive program in electrical power systems and electronics",
      credits: 4,
      duration: 3
    },
    {
      id: "C004",
      name: "Civil Engineering",
      code: "CE",
      description: "Design and construction of infrastructure and buildings",
      credits: 3,
      duration: 4
    },
    {
      id: "C005",
      name: "Mechanical Engineering",
      code: "ME",
      description: "Study of mechanical systems, thermodynamics, and manufacturing",
      credits: 3,
      duration: 4
    },
    {
      id: "C006",
      name: "Information Technology",
      code: "IT",
      description: "Focus on software development, networks, and IT systems",
      credits: 3,
      duration: 4
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "code":
          return a.code.localeCompare(b.code);
        case "credits":
          return a.credits - b.credits;
        case "duration":
          return a.duration - b.duration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchTerm, sortBy]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete "${course?.name}"?`)) {
      setCourses(courses.filter((c) => c.id !== id));
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    }
  };

  const handleSaveCourse = (courseData: Course | Omit<Course, 'id'>) => {
    if ('id' in courseData) {
      setCourses(
        courses.map((c) => (c.id === courseData.id ? courseData : c))
      );
      toast({
        title: "Success",
        description: "Course updated successfully",
      });
    } else {
      const newId = `C${String(courses.length + 1).padStart(3, '0')}`;
      setCourses([...courses, { ...courseData, id: newId }]);
      toast({
        title: "Success",
        description: "Course added successfully",
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="courses-page">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Course Management</h1>
            <p>Manage and view courses</p>
          </div>
          <button className="add-btn" onClick={handleAddCourse}>
            <Plus size={20} />
            Add Course
          </button>
        </div>
      </header>

      <CourseFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <CourseTable
        courses={filteredAndSortedCourses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <CourseModal
          course={selectedCourse}
          onSave={handleSaveCourse}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CoursesPage;
