import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import type { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

type Employee = {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

const columns: TableColumn<Employee>[] = [
  { name: "First Name", selector: (row) => row.firstName, sortable: true },
  { name: "Last Name", selector: (row) => row.lastName, sortable: true },
  { name: "Start Date", selector: (row) => row.startDate, sortable: true },
  { name: "Department", selector: (row) => row.department, sortable: true },
  { name: "Date of Birth", selector: (row) => row.dateOfBirth, sortable: true },
  { name: "Street", selector: (row) => row.street, sortable: true },
  { name: "City", selector: (row) => row.city, sortable: true },
  { name: "State", selector: (row) => row.state, sortable: true },
  { name: "Zip Code", selector: (row) => row.zipCode, sortable: true },
];

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate(); // Initialisation du hook navigate

  useEffect(() => {
    const data = localStorage.getItem("employees");
    if (data) {
      try {
        setEmployees(JSON.parse(data));
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  // Fonction pour revenir au formulaire
  const goToEmployeeForm = () => {
    navigate("/"); // Redirige vers le formulaire (la route /)
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Employee List</h2>

      <DataTable
        columns={columns}
        data={employees}
        pagination
        highlightOnHover
        striped
        responsive
        defaultSortFieldId={1}
      />

      {/* Bouton pour revenir au formulaire */}
      <button
        onClick={goToEmployeeForm}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Back to Employee Form
      </button>
    </div>
  );
};

export default EmployeeTable;
