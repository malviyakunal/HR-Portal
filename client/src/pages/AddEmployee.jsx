
// import { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";

// const AddEmployee = () => {
//   const navigate = useNavigate();
//   const [departments, setDepartments] = useState([]);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phoneNumber: "",
//     roleName: "",
//     departmentId: "",
//     hireDate: "",
//     salary: "",
//     gender: "MALE",
//     address: "",
//     birthdate: "",
//     status: "ACTIVE",
//     profilePhoto: null,
//   });

//   useEffect(() => {
//     // Fetch departments and roles
//     const fetchData = async () => {
//       try {
//         const deptRes = await fetch("http://localhost:8010/api/departments");
       
//         if (!deptRes.ok ) throw new Error("Failed to fetch data");
//         setDepartments(await deptRes.json());
   
//       } catch (err) {
//         console.error(err);
//         // eslint-disable-next-line no-undef
//         setError("Failed to load roles or departments");
//       }
//     };
//     fetchData();
//   }, []);

//   const [previewImage, setPreviewImage] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const requestBody = {
//         firstName: formData.firstName,
//         lastName: formData.lastName,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         hireDate: formData.hireDate,
//         salary: formData.salary,
//         gender: formData.gender,
//         address: formData.address,
//         birthdate: formData.birthdate,
//         status: formData.status,
//         department: { dName: formData.departmentName },
//         role: { roleName: formData.roleName },
//       };

//       const response = await fetch("http://localhost:8010/api/employees", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) throw new Error("Failed to add employee");

//       const newEmployee = await response.json();

//       // Upload profile photo if selected
//       if (formData.profilePhoto) {
//         const imageFormData = new FormData();
//         imageFormData.append("profilePhoto", formData.profilePhoto);

//         const imageResponse = await fetch(
//           `http://localhost:8010/api/employees/update-profile-photo/${newEmployee.id}`,
//           {
//             method: "PUT",
//             body: imageFormData,
//           }
//         );

//         if (!imageResponse.ok) throw new Error("Failed to upload profile photo");
//       }

//       alert("✅ Employee added successfully!");
//       navigate("/employees"); // Redirect to employee list
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       alert("❌ Failed to add employee. Please try again.");
//     }
//   };

//   return (
//     <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
//       <h3 className="mb-3">Add Employee</h3>
//       <form onSubmit={handleSubmit} className="row g-3">

//         <div className="col-12 text-center">
//           {previewImage ? (
//             <img src={previewImage} alt="Profile" className="rounded-circle" width="120" height="120" />
//           ) : (
//             <div className="border rounded-circle d-inline-block" style={{ width: "120px", height: "120px", background: "#f8f9fa" }}>
//               <span className="d-flex align-items-center justify-content-center h-100">No Image</span>
//             </div>
//           )}
//         </div>

//         {[
//           { label: "First Name", name: "firstName", type: "text" },
//           { label: "Last Name", name: "lastName", type: "text" },
//           { label: "Email", name: "email", type: "email" },
//           { label: "Phone Number", name: "phoneNumber", type: "text" },
//           { label: "Role", name: "roleName", type: "text" },
//           { label: "Department", name: "departmentName", type: "text" },
//           { label: "Birthdate", name: "birthdate", type: "date" },
//           { label: "Hire Date", name: "hireDate", type: "date" },
//           { label: "Salary", name: "salary", type: "number" },
//         ].map(({ label, name, type }) => (
//           <div className="col-md-6" key={name}>
//             <label className="form-label">{label}</label>
//             <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} required />
//           </div>
//         ))}

// <div className="col-md-6">
//            <label className="form-label">Department</label>
//       <select className="form-select" name="departmentId" value={formData.departmentId} onChange={handleChange} required>
//              <option value="">Select Department</option>
//        {departments.map((dept) => (
//               <option key={dept.departmentId} value={dept.departmentId}>{dept.dName}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-6">
//           <label className="form-label">Gender</label>
//           <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Status</label>
//           <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
//             <option value="ACTIVE">Active</option>
//             <option value="INACTIVE">Inactive</option>
//           </select>
//         </div>

//         <div className="col-12">
//           <label className="form-label">Address</label>
//           <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} required />
//         </div>

//         <div className="col-12">
//           <label className="form-label">Profile Photo</label>
//           <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
//         </div>

//         <div className="col-12 text-center">
//           <a href="/employees" className="btn btn-secondary me-2">Back to Employee List</a>
//           <button type="submit" className="btn btn-success">Add Employee</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddEmployee;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    departmentId: "",
    hireDate: "",
    salary: "",
    roleName: "",
    gender: "MALE",
    address: "",
    birthdate: "",
    status: "ACTIVE",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  // 🔹 Fetch departments from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:8010/api/departments");
        if (!response.ok) throw new Error("Failed to fetch departments");
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 🔹 Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // 🔹 Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Append profile photo if available
      if (profilePhoto) {
        formDataToSend.append("profilePhoto", profilePhoto);
      }

      const response = await fetch("http://localhost:8010/api/employees", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error("Failed to add employee");
      alert("✅ Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add employee. Please try again.");
    }
  };

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      <h3 className="mb-3">Add Employee</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="row g-3">
        
        {/* Profile Photo Preview */}
        <div className="col-12 text-center">
          {previewImage ? (
            <img src={previewImage} alt="Profile" className="rounded-circle" width="120" height="120" />
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
          { label: "Role", name: "roleName", type: "text" },
          { label: "Birthdate", name: "birthdate", type: "date" },
          { label: "Hire Date", name: "hireDate", type: "date" },
          { label: "Salary", name: "salary", type: "number" },
        ].map(({ label, name, type }) => (
          <div className="col-md-6" key={name}>
            <label className="form-label">{label}</label>
            <input type={type} className="form-control" name={name} value={formData[name]} onChange={handleChange} required />
          </div>
        ))}

        {/* Department Dropdown */}
        <div className="col-md-6">
          <label className="form-label">Department</label>
          <select className="form-select" name="departmentId" value={formData.departmentId} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.dName || dept.dname}
              </option>
            ))}
          </select>
        </div>

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
          <a href="/employees" className="btn btn-secondary me-2">Back to Employee List</a>
          <button type="submit" className="btn btn-success">Add Employee</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
