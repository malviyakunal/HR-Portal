import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUsers, FaUserTie, FaClipboardList, FaBuilding, FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div
    className="d-flex flex-column p-3 bg-white shadow-sm"
    style={{
      height: "100vh",
      width: "250px",
      minHeight: "100vh",
      overflowY: "auto",
      position: "fixed",
      left: 0,
      top: 0,
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    }}
  >
      <h4 className="text-center fw-bold text-primary mb-4">
        HR Portal
      </h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link
            to="/hr-dashboard"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/hr-dashboard" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaUsers className="me-2" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/hr-profile"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/hr-profile" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaUserTie className="me-2" /> HR Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/employees"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/employees" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaUsers className="me-2" /> Employees
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/attendance"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/attendance" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaClipboardList className="me-2" /> Attendance
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/leave"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/leave" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaBuilding className="me-2" /> Leave
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/payroll"
            className={`nav-link d-flex align-items-center py-3 px-2 mb-2 rounded-2 ${location.pathname === "/payroll" ? "bg-primary text-white" : "text-dark"}`}
          >
            <FaMoneyCheckAlt className="me-2" /> Payroll
          </Link>
        </li>
      </ul>
      <button
        className="btn btn-danger mt-auto py-3 rounded-3 d-flex align-items-center justify-content-center w-100"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
