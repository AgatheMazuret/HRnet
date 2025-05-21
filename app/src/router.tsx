import { useState } from "react";
import EmployeeForm from "./components/employee-form";
import EmployeeList from "./components/employee-list";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import type { Employee } from "./types";

// Composant principal de l'application
const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <EmployeeForm
              onSubmit={(formData) => setEmployees([...employees, formData])}
            />
          }
        />
        <Route
          path="/employees"
          element={<EmployeeList employees={employees} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
