import React, { useState } from "react";
import { states } from "../components/states";

export const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    department: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  interface Employee {
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

  const [employees, setEmployees] = useState<Employee[]>(
    JSON.parse(localStorage.getItem("employees") || "[]")
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { ...employeeData };

    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, newEmployee];
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      return updatedEmployees;
    });

    alert("Employee saved successfully!");
  };

  return (
    <div>
      <form onSubmit={handleSaveEmployee}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={employeeData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={employeeData.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={employeeData.department}
            onChange={handleChange}
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={employeeData.street}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={employeeData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <select
            name="state"
            value={employeeData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={employeeData.zipCode}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save Employee</button>
      </form>

      <h2>Employees:</h2>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            {employee.firstName} {employee.lastName} - {employee.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeForm;
