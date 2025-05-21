import React, { useEffect } from "react";
import { Link } from "react-router";
import type { Employee } from "../types";

// Définition du type Employee pour représenter les données d'un employé

// Composant principal pour afficher la liste des employés
const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  const mountedRef = React.useRef(false);

  // Chargement des employés depuis le localStorage au montage du composant
  useEffect(() => {
    if (mountedRef.current) {
      return;
    }
    // Vérification de l'existence de jQuery et DataTables
    $(function () {
      $("#employee-table").DataTable({
        data: employees,
        columns: [
          { title: "First Name", data: "firstName" },
          { title: "Last Name", data: "lastName" },
          { title: "Start Date", data: "startDate" },
          { title: "Department", data: "department" },
          { title: "Date of Birth", data: "dateOfBirth" },
          { title: "Street", data: "street" },
          { title: "City", data: "city" },
          { title: "State", data: "state" },
          { title: "Zip Code", data: "zipCode" },
        ],
      });
    });
    mountedRef.current = true;
  }, [employees]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Employee List
      </h2>

      {/* Tableau des employés */}
      {employees.length > 0 ? (
        <table id="employee-table" className="display"></table>
      ) : (
        <p className="text-center text-gray-500">No employees found.</p>
      )}

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600"
      >
        Back to Employee Form
      </Link>
    </div>
  );
};

export default EmployeeTable;
