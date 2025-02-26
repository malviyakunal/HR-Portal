// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button, Table, Form, Card, Container, Row, Col, Alert } from "react-bootstrap";

// const EmployeeDashboard = () => {
//   const [employee, setEmployee] = useState(null);
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [payroll, setPayroll] = useState(null);
//   const [leaveForm, setLeaveForm] = useState({ startDate: "", endDate: "", reason: "" });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     if (!email) {
//       console.error("No email found in localStorage");
//       navigate("/login");
//       return;
//     }
//     fetchEmployeeData(email);
//     fetchLeaveRequests(email);
//     fetchPayrollData(email);
//   }, [navigate]);

//   const fetchEmployeeData = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:8010/api/employees/getByEmail/${email}`);
//       setEmployee(response.data);
//     } catch (error) {
//       console.error("Error fetching employee details:", error);
//       setError("Failed to fetch employee details.");
//     }
//   };

//   const fetchLeaveRequests = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:8010/api/leave/employee/${email}`);
//       setLeaveRequests(response.data || []);
//     } catch (error) {
//       console.error("Error fetching leave requests:", error);
//       setError("Failed to fetch leave requests.");
//     }
//   };

//   const fetchPayrollData = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:8010/api/payroll/${email}`);
//       setPayroll(response.data);
//     } catch (error) {
//       console.error("Error fetching payroll details:", error);
//       setError("Failed to fetch payroll details.");
//     }
//   };

//   const handleLeaveApply = async () => {
//     try {
//       const email = localStorage.getItem("email");
//       await axios.post("http://localhost:8010/api/leave/add", { ...leaveForm, email });
//       fetchLeaveRequests(email);
//       setLeaveForm({ startDate: "", endDate: "", reason: "" });
//     } catch (error) {
//       console.error("Error applying for leave:", error);
//       setError("Failed to apply for leave.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   return (
//     <Container className="mt-4">
//       {/* Logout Button */}
//       <Row className="mb-4">
//         <Col className="d-flex justify-content-end">
//           <Button variant="danger" onClick={handleLogout}>
//             Logout
//           </Button>
//         </Col>
//       </Row>

//       {/* Employee Details */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Row>
//                 <Col md={3} className="d-flex align-items-center justify-content-center">
//                   <img
//                     src={employee?.profilePhoto || "https://via.placeholder.com/150"}
//                     alt="Profile"
//                     className="rounded-circle img-fluid"
//                     style={{ width: "120px", height: "120px" }}
//                   />
//                 </Col>
//                 <Col md={9}>
//                   <h3 className="mb-3">{employee?.firstName} {employee?.lastName}</h3>
//                   <Row>
//                     <Col md={6}>
//                       <p><strong>Email:</strong> {employee?.email}</p>
//                       <p><strong>Phone:</strong> {employee?.phoneNumber}</p>
//                       <p><strong>Department:</strong> {employee?.departmentName}</p>
//                       <p>Gender: {employee.gender}</p>
//                       <p>Address: {employee.address}</p>
//                     </Col>
//                     <Col md={6}>
//                       <p><strong>Role:</strong> {employee?.roleName}</p>
//                       <p><strong>Hire Date:</strong> {employee?.hireDate}</p>
//                       <p><strong>Salary:</strong> ${employee?.salary}</p>
                     
//           <p>Birthdate: {employee.birthdate}</p>
//           <p>Status: {employee.status}</p>
//                     </Col>
//                   </Row>
//                 </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Leave Management */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <h4 className="mb-4">Leave Management</h4>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>From</th>
//                     <th>To</th>
//                     <th>Reason</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {leaveRequests.map((leave, index) => (
//                     <tr key={index}>
//                       <td>{leave.startDate}</td>
//                       <td>{leave.endDate}</td>
//                       <td>{leave.reason}</td>
//                       <td>
//                         <span className={`badge ${leave.status === "Approved" ? "bg-success" : leave.status === "Pending" ? "bg-warning" : "bg-danger"}`}>
//                           {leave.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Apply for Leave */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <h4 className="mb-4">Apply for Leave</h4>
//               <Form>
//                 <Row>
//                   <Col md={4}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>From</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={leaveForm.startDate}
//                         onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>To</Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={leaveForm.endDate}
//                         onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3">
//                       <Form.Label>Reason</Form.Label>
//                       <Form.Control
//                         type="text"
//                         value={leaveForm.reason}
//                         onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Button variant="primary" onClick={handleLeaveApply}>
//                   Apply
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Payroll */}
//       <Row className="mb-4">
//         <Col>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <h4 className="mb-4">Payroll</h4>
//               {payroll ? (
//                 <div>
//                   <p><strong>Salary:</strong> ${payroll.salary}</p>
//                   <Button variant="success">Download Payslip</Button>
//                 </div>
//               ) : (
//                 <p>Loading payroll details...</p>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Error Handling */}
//       {error && (
//         <Row className="mb-4">
//           <Col>
//             <Alert variant="danger">{error}</Alert>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default EmployeeDashboard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Form, Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [payroll, setPayroll] = useState(null);
  const [leaveForm, setLeaveForm] = useState({ startDate: "", endDate: "", reason: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("No email found in localStorage. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }
    fetchEmployeeData(email);
    fetchLeaveRequests(email);
    fetchPayrollData(email);
  }, [navigate]);

  const fetchEmployeeData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8010/api/employees/getByEmail/${email}`);
      setEmployee(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch employee details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaveRequests = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8010/api/leave/employee/${email}`);
      setLeaveRequests(response.data || []);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch leave requests.");
    }
  };

  const fetchPayrollData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8010/api/payroll/${email}`);
      setPayroll(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to fetch payroll details.");
    }
  };

  const handleLeaveApply = async () => {
    const { startDate, endDate, reason } = leaveForm;
    if (!startDate || !endDate || !reason.trim()) {
      setError("Please fill all leave details before submitting.");
      return;
    }
    try {
      const email = localStorage.getItem("email");
      await axios.post("http://localhost:8010/api/leave/add", { ...leaveForm, email });
      fetchLeaveRequests(email);
      setLeaveForm({ startDate: "", endDate: "", reason: "" });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to apply for leave.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading employee details...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      {/* Logout Button */}
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Error Handling */}
      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {/* Employee Details */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Row>
                <Col md={3} className="d-flex align-items-center justify-content-center">
                  <img
                    src={employee?.profilePhoto || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle img-fluid"
                    style={{ width: "120px", height: "120px" }}
                  />
                </Col>
                <Col md={9}>
                  <h3 className="mb-3">{employee?.firstName} {employee?.lastName}</h3>
                  <Row>
                    <Col md={6}>
                      <p><strong>Email:</strong> {employee?.email || "N/A"}</p>
                      <p><strong>Phone:</strong> {employee?.phoneNumber || "N/A"}</p>
                      <p><strong>Department:</strong> {employee?.departmentName || "N/A"}</p>
                      <p><strong>Gender:</strong> {employee?.gender || "N/A"}</p>
                      <p><strong>Address:</strong> {employee?.address || "N/A"}</p>
                    </Col>
                    <Col md={6}>
                      <p><strong>Role:</strong> {employee?.roleName || "N/A"}</p>
                      <p><strong>Hire Date:</strong> {employee?.hireDate || "N/A"}</p>
                      <p><strong>Salary:</strong> ${employee?.salary || "N/A"}</p>
                      <p><strong>Birthdate:</strong> {employee?.birthdate || "N/A"}</p>
                      <p><strong>Status:</strong> {employee?.status || "N/A"}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Leave Management */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Leave Management</h4>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.length > 0 ? (
                    leaveRequests.map((leave, index) => (
                      <tr key={index}>
                        <td>{leave.startDate}</td>
                        <td>{leave.endDate}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <span className={`badge ${leave.status === "Approved" ? "bg-success" : leave.status === "Pending" ? "bg-warning" : "bg-danger"}`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center">No leave requests found.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Apply for Leave */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Apply for Leave</h4>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>From</Form.Label>
                      <Form.Control
                        type="date"
                        value={leaveForm.startDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        type="date"
                        value={leaveForm.endDate}
                        onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        type="text"
                        value={leaveForm.reason}
                        onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" onClick={handleLeaveApply}>
                  Apply
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDashboard;
