import React, { useState } from "react";
import { states } from "../states";
import type { Employee } from "../types";

// État initial du formulaire (hors id)
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

// Props attendues : une fonction de sauvegarde d'un employé
// (le parent gère la persistance ou l'ajout à la liste)
type EmployeeFormProps = {
  onSave: (employee: Employee) => void;
};

const EmployeeForm = ({ onSave }: EmployeeFormProps) => {
  // État local pour stocker les valeurs du formulaire
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);

  // Gère le changement de tous les champs du formulaire (input et select)
  // Utilise le nom du champ pour mettre à jour dynamiquement la bonne propriété
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //Met à jour dynamiquement la propriété de l’objet employeeData avec la nouvelle value issue de l’événement
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire : crée un nouvel employé avec un id unique
  // puis réinitialise le formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { id: Date.now(), ...employeeData };
    onSave(newEmployee);
    setEmployeeData(initialEmployeeData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Employee Form"
    >
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

      {/* Sélecteur d'état (dropdown), options générées à partir de la liste des états */}
      <div className="block">
        <label htmlFor="state" className="block font-medium">
          State:
        </label>
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

export default EmployeeForm;
