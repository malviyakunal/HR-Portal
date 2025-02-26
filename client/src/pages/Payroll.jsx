import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";  // Import PropTypes
import { Button, Modal, Form } from "react-bootstrap"; // Import Bootstrap components

const Payroll = ({ employeeId }) => {
  const [payrollData, setPayrollData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    salary: "",
    bonus: "",
    deductions: "",
  });

  // Modal state for viewing and editing
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch payroll data from backend
  useEffect(() => {
    if (employeeId) {
      fetchPayrollData();
    }
  }, [employeeId]);

  const fetchPayrollData = () => {
    axios
      .get(`http://localhost:8010/api/payroll/employee/${employeeId}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPayrollData(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setPayrollData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching payroll data:", error);
        setPayrollData([]);
      });
  };

  // Handle edit button click
  const handleEditClick = (payroll) => {
    setEditingId(payroll.payrollId);
    setEditFormData({
      salary: payroll.salary,
      bonus: payroll.bonus,
      deductions: payroll.deductions,
    });
    setShowEditModal(true);
  };

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Handle form submission (update data)
  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8010/api/payroll/update/${editingId}`, {
        salary: parseFloat(editFormData.salary),
        bonus: parseFloat(editFormData.bonus),
        deductions: parseFloat(editFormData.deductions),
      })
      .then(() => {
        fetchPayrollData(); // Refresh payroll data
        setShowEditModal(false); // Close modal after successful update
      })
      .catch((error) => {
        console.error("Error updating payroll data:", error);
      });
  };

  // Filtered search results
  const filteredData = payrollData.filter(
    (payroll) =>
      payroll.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payroll.employeeId?.toString().includes(searchTerm)
  );

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      <h3 className="mb-4">Employee Payroll Details</h3>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Always show the table, even if there’s no data */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Bonus</th>
            <th>Deductions</th>
            <th>Total Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((payroll) => (
              <tr key={payroll.payrollId}>
                <td>{payroll.employeeId}</td>
                <td>{payroll.employeeName}</td>
                <td>{payroll.salary.toFixed(2)}</td>
                <td>{payroll.bonus.toFixed(2)}</td>
                <td>{payroll.deductions.toFixed(2)}</td>
                <td>{payroll.totalSalary.toFixed(2)}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="mx-1"
                    onClick={() => handleEditClick(payroll)} // Edit button
                  >
                    Edit
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="mx-1"
                    onClick={() => alert("Viewing payslip...")} // Placeholder for Payslip button
                  >
                    View Payslip
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No payroll data available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Editing payroll */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payroll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={editFormData.salary}
                onChange={handleFormChange}
                min="0"
                required
              />
            </Form.Group>
            <Form.Group controlId="bonus">
              <Form.Label>Bonus</Form.Label>
              <Form.Control
                type="number"
                name="bonus"
                value={editFormData.bonus}
                onChange={handleFormChange}
                min="0"
                required
              />
            </Form.Group>
            <Form.Group controlId="deductions">
              <Form.Label>Deductions</Form.Label>
              <Form.Control
                type="number"
                name="deductions"
                value={editFormData.deductions}
                onChange={handleFormChange}
                min="0"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

// PropTypes validation
Payroll.propTypes = {
  employeeId: PropTypes.number.isRequired, // Validate employeeId is a required number
};

export default Payroll;
