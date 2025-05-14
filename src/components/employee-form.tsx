import React, { useState } from "react";
import { states } from "./states";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

// Interface définissant la structure d'un état (state) pour le formulaire
interface State {
  name: string;
  abbreviation: string;
}

// Composant principal du formulaire d'employé
export function EmployeeForm() {
  // État local pour stocker les données du formulaire
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

  // État pour afficher ou masquer le message de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Hook pour naviguer entre les pages
  const navigate = useNavigate();

  /**
   * Gère les changements dans les champs de texte et les sélecteurs
   * @param e - Événement de changement provenant d'un champ de formulaire
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Gère les changements dans les champs de type date
   * @param name - Nom du champ de date
   * @param date - Nouvelle valeur de la date
   */
  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }));
  };

  /**
   * Gère la soumission du formulaire
   * Sauvegarde les données dans le localStorage et affiche un message de confirmation
   * @param e - Événement de soumission du formulaire
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    employees.push(formData);
    localStorage.setItem("employees", JSON.stringify(employees));
    setShowConfirmation(true);
  };

  /**
   * Redirige l'utilisateur vers la liste des employés
   */
  const goToEmployeeList = () => {
    navigate("/employees");
  };

  /**
   * Redirige l'utilisateur vers la liste des employés (bouton secondaire)
   */
  const viewEmployeeList = () => {
    navigate("/employees");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Titre principal du formulaire */}
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Employee Form
      </h1>

      {/* Formulaire principal */}
      <form
        className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Champ pour le prénom */}
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Champ pour le nom */}
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Sélecteur de date pour la date de naissance */}
        <div className="flex flex-col gap-3">
          <DatePicker
            selected={formData.dateOfBirth}
            onChange={(date) => handleDateChange("dateOfBirth", date)}
            placeholderText="Date of Birth"
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Sélecteur de date pour la date de début */}
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => handleDateChange("startDate", date)}
          placeholderText="Start Date"
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />

        {/* Sélecteur pour le département */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>

        {/* Champ pour la rue */}
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Street"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Champ pour la ville */}
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Sélecteur pour l'état */}
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="">Select State</option>
          {states.map((s: State) => (
            <option key={s.abbreviation} value={s.abbreviation}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Champ pour le code postal */}
        <input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Bouton pour soumettre le formulaire */}
        <button
          type="submit"
          className="w-full p-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600"
        >
          Save
        </button>

        {/* Bouton pour afficher la liste des employés */}
        <button
          type="button"
          onClick={viewEmployeeList}
          className="w-full p-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600"
        >
          View Employee List
        </button>
      </form>

      {/* Message de confirmation après la soumission */}
      {showConfirmation && (
        <div className="mt-6 p-4 bg-pink-100 border border-pink-500 rounded-lg shadow">
          <p className="text-purple-700 font-bold">
            Employee saved successfully!
          </p>
          <button
            onClick={goToEmployeeList}
            className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600"
          >
            Go to Employee List
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeForm;
