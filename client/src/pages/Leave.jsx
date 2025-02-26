
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

const Leave = () => {
  
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      fetchLeaveRequests();
    }, []);
  
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8010/api/leave");
        if (Array.isArray(response.data)) {
          const updatedRequests = response.data.map(request => ({
            ...request,
            status: request.status || "PENDING",
            from: request.from ? new Date(request.from).toISOString().split("T")[0] : "N/A",
            to: request.to ? new Date(request.to).toISOString().split("T")[0] : "N/A",
          }));
          setLeaveRequests(updatedRequests);
        } else {
          console.error("Unexpected API response:", response.data);
          setLeaveRequests([]);
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
        setLeaveRequests([]);
      }
    };
  
    const handleApprove = async (leaveId) => {
      if (!leaveId) {
        console.error("Error: Leave ID is undefined");
        return;
      }
      try {
        await axios.put(`http://localhost:8010/api/leave/approve/${leaveId}`);
        fetchLeaveRequests();
      } catch (error) {
        console.error("Error approving leave request:", error);
      }
    };
  
    const handleReject = async (leaveId) => {
      if (!leaveId) {
        console.error("Error: Leave ID is undefined");
        return;
      }
      try {
        await axios.put(`http://localhost:8010/api/leave/reject/${leaveId}`);
        fetchLeaveRequests();
      } catch (error) {
        console.error("Error rejecting leave request:", error);
      }
    };
  
    return (
      <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
        <h2>HR Leave Management</h2>
  
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by Employee Name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Status</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests
              .filter(request =>
                request.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.employeeId?.toString().includes(searchTerm)
              )
              .map((request) => (
                <tr key={request.id}>
                  <td>{request.employeeId}</td>
                  <td>
                    {request.profilePic ? (
                      <img 
                        src={request.profilePic} 
                        alt="profile" 
                        width="30" 
                        height="30" 
                        className="rounded-circle me-2" 
                      />
                    ) : (
                      <span>👤</span>
                    )}
                    {request.employeeName}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        request.status === "APPROVED"
                          ? "bg-success"
                          : request.status === "REJECTED"
                          ? "bg-danger"
                          : "bg-warning"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>{request.startDate}</td>
              <td>{request.endDate}</td>
                  <td>{request.reason}</td>
                  <td>
                    {request.status === "PENDING" && (
                      <>
                        <Button variant="success" size="sm" onClick={() => handleApprove(request.leaveId)}>✔</Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(request.leaveId)}>✖</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  };
  
  
  
export default Leave;
