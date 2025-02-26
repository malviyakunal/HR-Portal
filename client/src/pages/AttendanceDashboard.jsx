import { useState, useEffect } from "react"; 
import axios from "axios";

const AttendanceDashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]); // Store attendance data
  const [search, setSearch] = useState(""); // For employee search functionality
  const [year] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().toLocaleString("default", { month: "short" }));

  // Fetch attendance data when component loads
  useEffect(() => {
    // Example: You may need to pass filters like year and month, or change the API if required
    axios.get(`/api/attendance/employee/${year}/${month}`)
      .then(response => {
        console.log("API Response:", response.data);
        const data = Array.isArray(response.data) ? response.data : [];
        setAttendanceData(data);
      })
      .catch(error => {
        console.error("Error fetching attendance data:", error);
        alert("Failed to load attendance data!");
      });
  }, [year, month]);

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fs-3 fw-bold">Attendance - {month} {year}</h2>

        {/* Month Selector */}
        <select className="form-select w-25 me-3 shadow-sm" value={month} onChange={(e) => setMonth(e.target.value)}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control w-25 shadow-sm"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Employee Profile Cards */}
      <div className="d-flex overflow-auto mb-3">
        {attendanceData.length > 0 ? (
          attendanceData.slice(0, 5).map(employee => (
            <div key={employee.employeeId} className="card mx-2 text-center shadow-lg" style={{ width: "140px", borderRadius: "10px" }}>
              <img src={employee.profileImage || "https://source.unsplash.com/100x100/?person"} className="rounded-circle mt-2 mx-auto" alt="Profile" style={{ width: "80px", height: "80px" }} />
              <div className="card-body p-2">
                <h6 className="card-title">{employee.employeeName}</h6>
                <button className="btn btn-outline-primary btn-sm px-3 py-2">Profile Details</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No employees found</p>
        )}
      </div>

      {/* Attendance Table */}
      <table className="table table-bordered shadow-sm bg-white rounded-3">
        <thead className="table-light">
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Check-in Time</th>
            <th>Check-out Time</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData
              .filter(emp => emp.employeeName.toLowerCase().includes(search.toLowerCase())) // Employee search filter
              .map(emp => (
                <tr key={emp.employeeId}>
                  <td>
                    <img src={emp.profileImage || "https://source.unsplash.com/40x40/?person"} className="rounded-circle me-2" alt="Profile" style={{ width: "40px", height: "40px" }} />
                    {emp.employeeName}
                  </td>
                  <td>{new Date(emp.date).toLocaleDateString()}</td>
                  <td>{emp.checkInTime || "-"}</td>
                  <td>{emp.checkOutTime || "-"}</td>
                  <td>
                    <span className={`badge ${emp.status === 'PRESENT' ? 'bg-success' : emp.status === 'LATE' ? 'bg-warning' : 'bg-danger'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>{emp.notes || "N/A"}</td>
                  <td>
                    <button className="btn btn-info btn-sm px-3 py-2">View</button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">No attendance data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDashboard;
