import React, { useState } from "react";
import { states } from "../components/states";

// Définition du type Employee pour représenter un employé
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Données initiales pour le formulaire d'employé
const initialEmployeeData: Omit<Employee, "id"> = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  startDate: "",
  department: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

// Composant pour le formulaire d'employé
const EmployeeForm: React.FC<{
  onSave: (employee: Employee) => void;
}> = ({ onSave }) => {
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  /**
   * Gère les changements dans les champs du formulaire
   * @param e - Événement de changement
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * Gère la soumission du formulaire
   * @param e - Événement de soumission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { id: Date.now(), ...employeeData };
    onSave(newEmployee);
    setEmployeeData(initialEmployeeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Champs du formulaire */}
      {(
        [
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Date of Birth", name: "dateOfBirth", type: "date" },
          { label: "Start Date", name: "startDate", type: "date" },
          { label: "Department", name: "department", type: "text" },
          { label: "Street", name: "street", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "Zip Code", name: "zipCode", type: "text" },
        ] as const
      ).map((field) => (
        <label key={field.name} className="block">
          {field.label}:
          <input
            type={field.type}
            name={field.name}
            value={employeeData[field.name as keyof Omit<Employee, "id">]}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
          />
        </label>
      ))}

      {/* Sélecteur pour l'état */}
      <label className="block">
        State:
        <select
          name="state"
          value={employeeData.state}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
      </label>

      {/* Bouton pour soumettre le formulaire */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Employee
      </button>
    </form>
  );
};

// Composant pour afficher la liste des employés
const EmployeeList: React.FC<{ employees: Employee[] }> = ({ employees }) => (
  <ul className="list-disc pl-5">
    {employees.map((employee) => (
      <li key={employee.id}>
        {employee.firstName} {employee.lastName} - {employee.department}
      </li>
    ))}
  </ul>
);

// Composant principal pour gérer les employés
const SaveEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );

  /**
   * Ajoute un nouvel employé à la liste
   * @param newEmployee - Nouvel employé à ajouter
   */
  const handleSaveEmployee = (newEmployee: Employee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Save Employee
      </h1>
      <EmployeeForm onSave={handleSaveEmployee} />
      <h2 className="text-2xl font-semibold text-gray-700 mt-8">
        Employees List
      </h2>
      <EmployeeList employees={employees} />
    </div>
  );
};

export default SaveEmployee;
