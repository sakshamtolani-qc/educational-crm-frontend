import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import FacultyTable from "@/components/Admin/Faculties/FacultyTable";
import { FacultyFilters } from "@/components/Admin/Faculties/FacultyFilters";
import { FacultyModal } from "@/components/Admin/Faculties/FacultyModal";
import "./FacultiesPage.css";

export interface Faculty {
  id: string; 
  name: string;
  email: string;
  department: string;
  specialization: string;
  designation: string;
  hire_date: string;
  status: 'active' | 'inactive';
}

const FacultiesPage = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([
    {
      id: "F001",
      name: "Dr. John Smith",
      email: "john.smith@university.edu",
      department: "Computer Science",
      specialization: "Artificial Intelligence",
      designation: "Professor",
      hire_date: "2010-06-15",
      status: "active"
    },
    {
      id: "F002",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      department: "Mathematics",
      specialization: "Applied Statistics",
      designation: "Associate Professor",
      hire_date: "2012-08-20",
      status: "active"
    },
    {
      id: "F003",
      name: "Prof. Michael Brown",
      email: "michael.brown@university.edu",
      department: "Physics",
      specialization: "Quantum Mechanics",
      designation: "Assistant Professor",
      hire_date: "2005-02-10",
      status: "inactive"
    }

  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const filteredAndSortedFaculties = useMemo(() => {
    let filtered = faculties.filter((faculty) => {
      const matchesSearch =
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === "All" || faculty.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "id":
          return a.id.localeCompare(b.id);
        case "department":
          return a.department.localeCompare(b.department);
        case "hire_date":
          // Sort by hire date: newest (later date) first
          return new Date(b.hire_date).getTime() - new Date(a.hire_date).getTime();
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [faculties, searchTerm, departmentFilter, sortBy]);

  const handleAddFaculty = () => {
    setSelectedFaculty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      setFaculties(faculties.filter((f) => f.id !== id));
    }
  };

  const handleView = (faculty: Faculty) => {
    alert(`
Viewing Details:
Faculty ID: ${faculty.id}
Name: ${faculty.name}
Email: ${faculty.email}
Department: ${faculty.department}
Specialization: ${faculty.specialization}
Designation: ${faculty.designation}
Hire Date: ${faculty.hire_date}
Status: ${faculty.status}
    `);
  };

  const handleSaveFaculty = (facultyData: Faculty | Omit<Faculty, 'id'>) => {
    if ('id' in facultyData) {
      setFaculties(
        faculties.map((f) => (f.id === facultyData.id ? facultyData : f))
      );
    } else {
      const newId = `F${String(faculties.length + 1).padStart(3, '0')}`;
      setFaculties([...faculties, { ...facultyData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="faculties-page">
      <header className="page-header">
        <div className="header-content">
          <div>
            <h1>Faculty Management</h1>
            <p>Manage and view faculty members</p>
          </div>
          <button className="add-btn" onClick={handleAddFaculty}>
            <Plus size={20} />
            Add Faculty
          </button>
        </div>
      </header>

      <FacultyFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <FacultyTable
        faculties={filteredAndSortedFaculties}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {isModalOpen && (
        <FacultyModal
          faculty={selectedFaculty}
          onSave={handleSaveFaculty}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default FacultiesPage;