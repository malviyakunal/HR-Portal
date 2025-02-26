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
        profilePhoto: "",
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8010/api/employees/get/${employeeId}`);
                if (!response.ok) throw new Error("Failed to fetch employee details");
                const data = await response.json();
                setFormData(data);
                if (data.profilePhoto) {
                    setPreviewImage(data.profilePhoto);
                }
            } catch (error) {
                console.error(error);
                alert("Failed to fetch employee details. Please try again.");
            }
        };
        fetchEmployee();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8010/api/employees/update/${employeeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to update employee");
            alert("Employee updated successfully!");
            navigate("/employees");
        } catch (error) {
            console.error(error);
            alert("Failed to update employee. Please try again.");
        }
    };

    return (
        <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
            <h3 className="mb-3">Update Employee</h3>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Birthdate</label>
                    <input type="date" className="form-control" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Hire Date</label>
                    <input type="date" className="form-control" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Salary</label>
                    <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} required />
                </div>

                <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="col-12 text-center">
                    <a href={`/employees/${employeeId}`} className="btn btn-secondary me-2">Back to Employee Detail</a>
                    <button type="submit" className="btn btn-primary">Update Employee</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;













// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const UpdateEmployee = () => {
//     const { employeeId } = useParams();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         hireDate: "",
//         salary: "",
//         gender: "MALE",
//         address: "",
//         birthdate: "",
//         status: "ACTIVE",
//         profilePhoto: null,
//     });
//     const [previewImage, setPreviewImage] = useState(null);

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             try {
//                 const response = await fetch(`http://localhost:8010/api/employees/get/${employeeId}`);
//                 if (!response.ok) throw new Error("Failed to fetch employee details");
//                 const data = await response.json();
//                 setFormData(data);
//                 if (data.profilePhoto) {
//                     setPreviewImage(`data:image/jpeg;base64,${data.profilePhoto}`);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 alert("Failed to fetch employee details. Please try again.");
//             }
//         };
//         fetchEmployee();
//     }, [employeeId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFormData((prevData) => ({ ...prevData, profilePhoto: file }));
//             const reader = new FileReader();
//             reader.onloadend = () => setPreviewImage(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const formDataToSend = new FormData();
//             Object.keys(formData).forEach((key) => {
//                 if (key === "profilePhoto" && formData[key]) {
//                     formDataToSend.append(key, formData[key]);
//                 } else {
//                     formDataToSend.append(key, formData[key]);
//                 }
//             });

//             const response = await fetch(`http://localhost:8010/api/employees/update/${employeeId}`, {
//                 method: "PUT",
//                 body: formDataToSend,
//             });

//             if (!response.ok) throw new Error("Failed to update employee");
//             alert("Employee updated successfully!");
//             navigate("/employees");
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update employee. Please try again.");
//         }
//     };

//     return (
//         <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
//             <h3 className="mb-3">Update Employee</h3>
//             <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
//                 <div className="col-md-6">
//                     <label className="form-label">First Name</label>
//                     <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Last Name</label>
//                     <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Email</label>
//                     <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Phone Number</label>
//                     <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Birthdate</label>
//                     <input type="date" className="form-control" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Hire Date</label>
//                     <input type="date" className="form-control" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Salary</label>
//                     <input type="number" className="form-control" name="salary" value={formData.salary} onChange={handleChange} required />
//                 </div>

//                 <div className="col-md-6">
//                     <label className="form-label">Profile Photo</label>
//                     <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />
//                     {previewImage && <img src={previewImage} alt="Profile Preview" className="mt-2" width="100" />}
//                 </div>

//                 <div className="col-12">
//                     <label className="form-label">Address</label>
//                     <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} required />
//                 </div>

//                 <div className="col-12 text-center">
//                     <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/employees/${employeeId}`)}>
//                         Back to Employee Detail
//                     </button>
//                     <button type="submit" className="btn btn-primary">Update Employee</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UpdateEmployee;
