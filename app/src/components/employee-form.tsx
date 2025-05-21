import React, { useState } from "react";
import { states } from "../states";
import DatePicker from "react-datepicker";
import { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import Modal from "@agathemazuret/hrnet-react-modal";
import type { Employee } from "../types";

// On crée un composant personnalisé pour le DatePicker afin de pouvoir typer correctement ses props
const CustomDatePicker =
  DatePicker as React.ComponentType<ReactDatePickerProps>;

interface State {
  name: string;
  abbreviation: string;
}

export function EmployeeForm({
  onSubmit,
}: {
  onSubmit: (employee: Employee) => void;
}) {
  // On gère l'état du formulaire avec un objet contenant toutes les valeurs des champs
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

  // État pour afficher ou non la modale de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Fonction générique pour gérer les changements sur les champs texte et select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction dédiée pour gérer les changements sur les champs de type date
  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  // Lors de la soumission du formulaire, on sauvegarde l'employé dans le localStorage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(formData);
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      startDate: null,
      department: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });

    setShowConfirmation(true);
  };

  // Navigation vers la liste des employés
  const goToEmployeeList = () => {
    navigate("/employees");
  };

  // Navigation vers la liste des employés (bouton secondaire)
  const viewEmployeeList = () => {
    navigate("/employees");
  };

  return (
    <div
      className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg"
      role="region"
      aria-labelledby="employee-form-title"
    >
      <h1
        className="text-3xl font-bold text-center text-purple-600 mb-6"
        id="employee-form-title"
      >
        Employee Form
      </h1>

      {/* Modale de confirmation affichée après la sauvegarde */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirmation"
      >
        <p>Employee saved successfully!</p>
      </Modal>

      <form
        className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        aria-label="Employee registration form"
      >
        {/* Champs du formulaire, chaque champ est relié à formData */}
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />

        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />

        <div className="flex flex-col gap-3">
          <label htmlFor="dateOfBirth" className="sr-only">
            Date of Birth
          </label>
          {/* Utilisation du DatePicker pour la date de naissance */}
          <CustomDatePicker
            id="dateOfBirth"
            selected={formData.dateOfBirth}
            onChange={(date: Date | null) =>
              handleDateChange("dateOfBirth", date)
            }
            placeholderText="Date of Birth"
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            aria-label="Date of Birth"
          />
        </div>

        <label htmlFor="startDate" className="sr-only">
          Start Date
        </label>
        {/* Utilisation du DatePicker pour la date de début */}
        <CustomDatePicker
          id="startDate"
          selected={formData.startDate}
          onChange={(date: Date | null) => handleDateChange("startDate", date)}
          placeholderText="Start Date"
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          aria-label="Start Date"
        />

        <label htmlFor="department" className="sr-only">
          Department
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        >
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>

        <label htmlFor="street" className="sr-only">
          Street
        </label>
        <input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />

        <label htmlFor="city" className="sr-only">
          City
        </label>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />

        <label htmlFor="state" className="sr-only">
          State
        </label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        >
          <option value="">Select State</option>
          {/* Génération dynamique de la liste des états */}
          {states.map((s: State) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.name}
            </option>
          ))}
        </select>

        <label htmlFor="zipCode" className="sr-only">
          Zip Code
        </label>
        <input
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
          aria-required="true"
        />

        <button
          type="submit"
          className="w-full p-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600"
          aria-label="Submit employee form"
        >
          Save
        </button>

        <button
          type="button"
          onClick={viewEmployeeList}
          className="w-full p-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600"
          aria-label="View employee list"
        >
          View Employee List
        </button>
      </form>

      {/* Affichage d'une confirmation supplémentaire après la sauvegarde */}
      {showConfirmation && (
        <div
          className="mt-6 p-4 bg-pink-100 border border-pink-500 rounded-lg shadow"
          role="status"
          aria-live="polite"
        >
          <p className="text-purple-700 font-bold">
            Employee saved successfully!
          </p>
          <button
            onClick={goToEmployeeList}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600"
            aria-label="Go to employee list"
          >
            Go to Employee List
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeForm;
