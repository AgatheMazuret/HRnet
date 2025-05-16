import EmployeeForm from "./components/employee-form";
import EmployeeList from "./components/employee-list";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

// Composant principal de l'application
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeForm />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
