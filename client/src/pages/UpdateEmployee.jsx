import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        hireDate: "",
        salary: "",
        gender: "MALE",
        address: "",
        birthdate: "",
        status: "ACTIVE",
    });

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);

    // 🔹 Fetch Employee Data (Including Image)
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8010/api/employees/get/${employeeId}`);
                if (!response.ok) throw new Error("Failed to fetch employee details");
                const data = await response.json();

                setFormData({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    hireDate: data.hireDate ? data.hireDate.split("T")[0] : "",
                    salary: data.salary,
                    gender: data.gender,
                    address: data.address,
                    birthdate: data.birthdate ? data.birthdate.split("T")[0] : "",
                    status: data.status,
                });

                if (data.profilePhoto) {
                    setPreviewImage(`data:image/jpeg;base64,${data.profilePhoto}`);
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch employee details. Please try again.");
            }
        };
        fetchEmployee();
    }, [employeeId]);

    // 🔹 Handle Form Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // 🔹 Handle Profile Photo Change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // 🔹 Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();

            // Convert dates to YYYY-MM-DD format
            const formattedData = {
                ...formData,
                birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString().split("T")[0] : "",
                hireDate: formData.hireDate ? new Date(formData.hireDate).toISOString().split("T")[0] : "",
            };

            // Append text fields
            Object.entries(formattedData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            // Append profile photo if available
            if (profilePhoto) {
                formDataToSend.append("profilePhoto", profilePhoto);
            }

            const response = await fetch(`http://localhost:8010/api/employees/update/${employeeId}`, {
                method: "PUT",
                body: formDataToSend,
            });

            if (!response.ok) throw new Error("Failed to update employee");
            alert("✅ Employee updated successfully!");
            navigate("/employees");
        } catch (error) {
            console.error(error);
            setError("Failed to update employee. Please try again.");
        }
    };

    return (
        <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
            <h3 className="mb-3">Update Employee</h3>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit} className="row g-3">
                
                {/* Profile Photo Preview */}
                <div className="col-12 text-center">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile Preview"
                            className="rounded-circle border"
                            width="120"
                            height="120"
                            onLoad={() => URL.revokeObjectURL(previewImage)} // Prevent memory leak
                        />
                    ) : (
                        <div className="border rounded-circle d-inline-block" style={{ width: "120px", height: "120px", background: "#f8f9fa" }}>
                            <span className="d-flex align-items-center justify-content-center h-100">No Image</span>
                        </div>
                    )}
                </div>

                {/* Text Inputs */}
                {[
                    { label: "First Name", name: "firstName", type: "text" },
                    { label: "Last Name", name: "lastName", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Phone Number", name: "phoneNumber", type: "text" },
                    { label: "Birthdate", name: "birthdate", type: "date" },
                    { label: "Hire Date", name: "hireDate", type: "date" },
                    { label: "Salary", name: "salary", type: "number" },
                ].map(({ label, name, type }) => (
                    <div className="col-md-6" key={name}>
                        <label className="form-label">{label}</label>
                        <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} required />
                    </div>
                ))}

                {/* Gender Dropdown */}
                <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                {/* Status Dropdown */}
                <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>

                {/* Address Field */}
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                {/* Profile Photo Upload */}
                <div className="col-12">
                    <label className="form-label">Profile Photo</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
                </div>

                {/* Submit and Back Buttons */}
                <div className="col-12 text-center">
                    <a href={`/employees/${employeeId}`} className="btn btn-secondary me-2">Back to Employee Detail</a>
                    <button type="submit" className="btn btn-primary">Update Employee</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;
