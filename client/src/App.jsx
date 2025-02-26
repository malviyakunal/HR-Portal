import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HrDashboard from "./pages/HrDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeList from "./pages/EmployeeList";
import HrProfile from "./pages/HrProfile";
import Leave from "./pages/Leave";
import Login from "./pages/Login";
import PropTypes from "prop-types";
import EmployeeDetails from "./pages/EmployeeDetails";
import UpdateEmployee from "./pages/UpdateEmployee";
import AddEmployee from "./pages/AddEmployee";
import AttendanceDashboard from "./pages/AttendanceDashboard"; // ✅ Imported Attendance Page
import Payroll from "./pages/Payroll"; // ✅ Imported Payroll Page

const PrivateRoute = ({ element, roleRequired }) => {
  const role = localStorage.getItem("role");

  // ✅ Fix: Convert both stored role and required role to lowercase for case-insensitive comparison
  return role?.toLowerCase() === roleRequired.toLowerCase() ? element : <Navigate to="/login" />;
};

// ✅ Fix: PropTypes updated to `node` instead of `element`
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roleRequired: PropTypes.string.isRequired,
};

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* HR Routes with Sidebar */}
          <Route
            path="/hr-dashboard"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <HrDashboard />
                </div>
              } />
            }
          />
          <Route
            path="/hr-profile"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <HrProfile />
                </div>
              } />
            }
          />
          <Route
            path="/leave"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <Leave />
                </div>
              } />
            }
          />

          {/* ✅ Employee Management Routes */}
          <Route
            path="/employees"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <EmployeeList />
                </div>
              } />
            }
          />
          <Route
            path="/employees/add"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <AddEmployee />
                </div>
              } />
            }
          />
          <Route
            path="/employees/:employeeId"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <EmployeeDetails />
                </div>
              } />
            }
          />
          <Route
            path="/employees/update/:employeeId"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <UpdateEmployee />
                </div>
              } />
            }
          />

          {/* ✅ Attendance Section */}
          <Route
            path="/attendance"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <AttendanceDashboard />
                </div>
              } />
            }
          />

          {/* ✅ Payroll Section */}
          <Route
            path="/payroll"
            element={
              <PrivateRoute roleRequired="hr" element={
                <div className="d-flex">
                  <Sidebar />
                  <Payroll />
                </div>
              } />
            }
          />

          {/* Employee Dashboard (No Sidebar) */}
          <Route
            path="/employee-dashboard"
            element={
              <PrivateRoute roleRequired="employee" element={<EmployeeDashboard />} />
            }
          />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
