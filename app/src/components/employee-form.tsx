import React, { useState } from "react";
import { states } from "./states";
import DatePicker from "react-datepicker";
import { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router";
import Modal from "@agathemazuret/hrnet-react-modal";

const CustomDatePicker =
  DatePicker as React.ComponentType<ReactDatePickerProps>;

interface State {
  name: string;
  abbreviation: string;
}

interface Employee {
  [key: string]: string | Date | null;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  startDate: Date | null;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const fields = [
  { name: "firstName", placeholder: "First Name" },
  { name: "lastName", placeholder: "Last Name" },
  { name: "street", placeholder: "Street" },
  { name: "city", placeholder: "City" },
  { name: "zipCode", placeholder: "Zip Code" },
];

export function EmployeeForm() {
  const [formData, setFormData] = useState<Employee>({
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

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | null) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
        Employee Form
      </h1>
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirmation"
      >
        <p>Employee saved successfully!</p>
        <Link
          to="/employees"
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 inline-block text-center"
        >
          Go to Employee List
        </Link>
      </Modal>

      <form
        className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <input
            key={field.name}
            name={field.name}
            value={formData[field.name] as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
            required
          />
        ))}

        <CustomDatePicker
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
        />

        <CustomDatePicker
          selected={formData.startDate}
          onChange={(date: Date | null) => handleDateChange("startDate", date)}
          placeholderText="Start Date"
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
        />

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

        <button
          type="submit"
          className="w-full p-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600"
        >
          Save
        </button>
        <Link
          to="/employees"
          className="w-full p-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 text-center"
        >
          View Employee List
        </Link>
      </form>
    </div>
  );
}

export default EmployeeForm;
