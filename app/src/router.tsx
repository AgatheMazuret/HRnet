import EmployeeForm from "./components/employee-form";
import EmployeeList from "./components/employee-list";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

// Composant principal de l'application
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour le formulaire d'employé */}
        <Route path="/" element={<EmployeeForm />} />

        {/* Route pour la liste des employés */}
        <Route path="/employees" element={<EmployeeList />} />

        {/* Redirection pour les routes non définies */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
