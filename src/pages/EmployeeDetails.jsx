import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8010/api/employees/get/${employeeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee details");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      <h2 className="mb-4">Employee Profile</h2>
      <div className="row">
        {/* Left Section - Profile Info */}
        <div className="col-md-4">
          <div className="card p-3 text-center">
            <img
              src={employee.profilePhoto || "https://i.pinimg.com/550x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"}
              alt="Profile"
              className="rounded-circle mx-auto"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h4 className="mt-3">{employee.firstName} {employee.lastName}</h4>
            <p>{employee.roleName}</p>
            <p><strong>Status:</strong> {employee.status}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phoneNumber}</p>
          </div>
        </div>
        
        {/* Right Section - Details */}
        <div className="col-md-8">
          <div className="card p-4">
            <h5 className="border-bottom pb-2">Basic Information</h5>
            <p><strong>Employee ID:</strong> {employee.employeeId}</p>
            <p><strong>Hire Date:</strong> {new Date(employee.hireDate).toLocaleDateString()}</p>
            <p><strong>Birthdate:</strong> {new Date(employee.birthdate).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {employee.gender}</p>
            <p><strong>City:</strong> {employee.address}</p>
            
            <h5 className="border-bottom pb-2 mt-3">Work Data</h5>
            <p><strong>Department:</strong> {employee.departmentName}</p>
            <p><strong>Role:</strong> {employee.roleName}</p>
            <p><strong>Salary:</strong> ${employee.salary.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="mt-3 text-center">
        <button className="btn btn-secondary me-2" onClick={() => navigate("/employees")}>Back to Employee List</button>
        <button className="btn btn-primary" onClick={() => navigate(`/employees/update/${employeeId}`)}>Edit Employee</button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
