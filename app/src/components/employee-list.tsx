import React, { useEffect } from "react";
import { Link } from "react-router";
import type { Employee } from "../types";

// Définition du type Employee pour représenter les données d'un employé

// Composant principal pour afficher la liste des employés
const EmployeeTable = ({ employees }: { employees: Employee[] }) => {
  const mountedRef = React.useRef(false);

  // Utilisation de useEffect pour initialiser DataTables une seule fois après le montage
  useEffect(() => {
    if (mountedRef.current) {
      // Empêche la réinitialisation de DataTables lors des re-rendus
      return;
    }
    // Vérification de l'existence de jQuery et DataTables puis initialisation du tableau dynamique
    $(function () {
      $("#employee-table").DataTable({
        data: employees, // Injection des données des employés dans DataTables
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
    mountedRef.current = true; // Marque le composant comme monté pour éviter une réinitialisation
  }, [employees]);

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Employee List
      </h2>

      {/* Affichage conditionnel du tableau ou d'un message si la liste est vide */}
      {employees.length > 0 ? (
        // Le tableau est géré dynamiquement par DataTables via jQuery
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
