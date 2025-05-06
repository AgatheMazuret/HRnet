import React, { useState } from "react";
import { states } from "./states";
import DatePicker from "react-datepicker";
import "../index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

interface State {
  name: string;
  abbreviation: string;
}

export function EmployeeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null as Date | null,
    startDate: null as Date | null,
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate(); // Initialisation du hook navigate

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));
    setShowConfirmation(true);
  };

  // Fonction pour naviguer vers la liste des employés
  const goToEmployeeList = () => {
    navigate("/employees");
  };

  // Fonction pour naviguer directement vers la liste des employés sans passer par save
  const viewEmployeeList = () => {
    navigate("/employees");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Employee Form</h1>
      <form
        className="flex flex-col items-center justify-center gap-7 p-4 bg-gray-100 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />

        <DatePicker
          selected={formData.dateOfBirth}
          onChange={(date) => handleDateChange("dateOfBirth", date)}
          placeholderText="Date of Birth"
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          yearDropdownItemNumber={50} // Nombre d'années à afficher dans le dropdown
          scrollableYearDropdown // Permet de défiler les années si elles sont trop nombreuses
        />

        <DatePicker
          selected={formData.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          placeholderText="Start Date"
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          yearDropdownItemNumber={50} // Nombre d'années à afficher dans le dropdown
          scrollableYearDropdown // Permet de défiler les années si elles sont trop nombreuses
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="mt-2 block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>

        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />

        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-2 block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select State</option>
          {states.map((s: State) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          required
        />

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>

        {/* Ajout du bouton pour accéder à la liste des employés sans sauvegarder */}
        <button
          type="button"
          onClick={viewEmployeeList}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          View Employee List
        </button>
      </form>

      {showConfirmation && (
        <div className="modal p-4 bg-white shadow-md rounded mt-4">
          <p className="text-green-500 font-bold">
            Employee saved successfully!
          </p>
          {/* Bouton pour naviguer vers la liste des employés */}
          <button
            onClick={goToEmployeeList}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Go to Employee List
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeForm;
