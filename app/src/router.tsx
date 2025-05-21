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
        {/* Route pour le formulaire d'employé */}
        <Route
          path="/"
          element={
            <EmployeeForm
              onSubmit={(formData) => setEmployees([...employees, formData])}
            />
          }
        />

        {/* Route pour la liste des employés */}
        <Route
          path="/employees"
          element={<EmployeeList employees={employees} />}
        />

        {/* Redirection pour les routes non définies */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
