import React, { useState } from "react";
import { states } from "../states";
import type { Employee } from "../types";

// Objet initial pour réinitialiser le formulaire après soumission
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

// Composant formulaire d'ajout d'employé
const EmployeeForm: React.FC<{
  onSave: (employee: Employee) => void;
}> = ({ onSave }) => {
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  // Gère les changements sur tous les champs du formulaire (texte et select)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire : création d'un nouvel employé avec un id unique (timestamp)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { id: Date.now(), ...employeeData }; // Utilisation de Date.now() pour générer un id unique
    onSave(newEmployee);
    setEmployeeData(initialEmployeeData); // Réinitialise le formulaire après l'ajout
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Employee Form"
    >
      {/* Génération dynamique des champs du formulaire à partir d'un tableau d'objets */}
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
        <div key={field.name} className="block">
          <label htmlFor={field.name} className="block font-medium">
            {field.label}:
          </label>
          <input
            id={field.name}
            type={field.type}
            name={field.name}
            value={employeeData[field.name as keyof Omit<Employee, "id">]}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
            required
            aria-required="true"
          />
        </div>
      ))}

      <div className="block">
        <label htmlFor="state" className="block font-medium">
          State:
        </label>
        {/* Liste déroulante générée dynamiquement à partir du tableau states */}
        <select
          id="state"
          name="state"
          value={employeeData.state}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
          aria-required="true"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.abbreviation} value={state.abbreviation}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        aria-label="Save employee information"
      >
        Save Employee
      </button>
    </form>
  );
};

// Affiche la liste des employés sauvegardés
const EmployeeList: React.FC<{ employees: Employee[] }> = ({ employees }) => (
  <ul className="list-disc pl-5" aria-label="Employee list">
    {employees.map((employee) => (
      <li key={employee.id}>
        {employee.firstName} {employee.lastName} - {employee.department}
      </li>
    ))}
  </ul>
);

// Composant principal qui gère la liste des employés et la persistance dans le localStorage
const SaveEmployee: React.FC = () => {
  // Initialisation de l'état avec les employés stockés dans le localStorage (ou tableau vide si aucun)
  const [employees, setEmployees] = useState<Employee[]>(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );

  // Ajoute un nouvel employé à la liste et met à jour le localStorage
  const handleSaveEmployee = (newEmployee: Employee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };

  // Affichage du formulaire et de la liste des employés
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1
        className="text-3xl font-bold text-center text-purple-600 mb-6"
        id="main-heading"
      >
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
