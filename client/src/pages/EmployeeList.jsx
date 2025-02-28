import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserPlus, FaSyncAlt } from "react-icons/fa"; // Import icons

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8010/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (employeeId) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:8010/api/employees/${employeeId}`);
      setEmployees((prev) => prev.filter((emp) => emp.employeeId !== employeeId));
      alert("✅ Employee deleted successfully");
    } catch (error) {
      alert("❌ Error deleting employee: " + error.message);
    }
  };

  const handleDetailClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handleLeave = (employeeId, employeeName) => {
    navigate("/leave-request", { state: { employeeId, employeeName } });
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      
      {/* Header with Add & Refresh Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Employees</h3>
        <div>
          <button className="btn btn-success me-2" onClick={() => navigate("/employees/add")}>
            <FaUserPlus className="me-2" /> Add Employee
          </button>
          <button className="btn btn-primary" onClick={fetchEmployees}>
            <FaSyncAlt className="me-2" /> Refresh
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control w-25 mb-3"
        placeholder="🔍 Search Employee..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Employee Cards */}
      <div className="row">
        {filteredEmployees.map((employee) => (
          <div className="col-md-4 mb-4" key={employee.employeeId}>
            <div className="card p-3 shadow-lg border-0 rounded-3">
              <div className="d-flex align-items-center">
              <img
  src={employee.profilePhoto ? employee.profilePhoto : "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
  alt="profile"
  className="rounded-circle me-3"
  width="60"
  height="60"
/>

                <div>
                  <h5 className="mb-0 fw-bold">{employee.firstName} {employee.lastName}</h5>
                  <p className="text-muted mb-1">{employee.departmentName}</p>
                </div>
              </div>

              <div className="mt-2">
                <span className={`badge p-2 ${
                  employee.status === "ACTIVE" ? "bg-success" :
                  employee.status === "INACTIVE" ? "bg-warning" : "bg-danger"
                }`}>
                  {employee.status}
                </span>
              </div>

              <div className="mt-3 d-flex justify-content-between">
                <button className="btn btn-outline-info btn-sm" onClick={() => handleDetailClick(employee.employeeId)}>👁 View</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(employee.employeeId)}>🗑 Delete</button>
                <button className="btn btn-outline-primary btn-sm" onClick={() => handleLeave(employee.employeeId, employee.firstName)}>✈ Leave</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && <p className="text-center mt-4">No employees found.</p>}
    </div>
  );
};

export default EmployeeList;
