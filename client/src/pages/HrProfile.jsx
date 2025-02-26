import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HrProfile = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150?text=Profile");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      navigate("/login");
      return;
    }

    axios.get(`http://localhost:8010/api/employees/getByEmail/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      setEmployee(response.data);
      setImagePreview(response.data.profilePhoto || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg");
    })
    .catch(() => setError("Failed to load profile. Please try again."));
  }, [navigate]);

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      {error ? (
        <p className="text-danger text-center">{error}</p>
      ) : employee ? (
        <div className="card shadow-lg p-4">
          <div className="text-center mb-4">
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="rounded-circle border border-4 border-light shadow-sm" 
              width="150" 
              height="150"
              style={{ objectFit: "cover" }}
            />
            <h3 className="mt-3 fw-bold">{employee.firstName} {employee.lastName}</h3>
            <p className="text-muted fs-5">{employee.roleName}</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card p-3 h-100">
                <div className="mb-3"><strong>Employee ID:</strong> {employee.employeeId}</div>
                <div className="mb-3"><strong>Email:</strong> {employee.email}</div>
                <div className="mb-3"><strong>Phone:</strong> {employee.phoneNumber}</div>
                <div className="mb-3"><strong>Address:</strong> {employee.address}</div>
                <div className="mb-3"><strong>Department:</strong> {employee.departmentName}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3 h-100">
                <div className="mb-3"><strong>Hire Date:</strong> {employee.hireDate}</div>
                <div className="mb-3"><strong>Salary:</strong> ${employee.salary}</div>
                <div className="mb-3"><strong>Gender:</strong> {employee.gender}</div>
                <div className="mb-3"><strong>Birthdate:</strong> {employee.birthdate}</div>
                <div className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span className={`badge ${employee.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center fs-4">Loading profile...</p>
      )}
    </div>
  );
};

export default HrProfile;