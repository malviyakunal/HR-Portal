import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const HrDashboard = () => {
  const [data, setData] = useState({
    totalEmployees: 0,
    departments: 0,
    leavesToday: 0,
    employees: [],
    birthdays: [],
    upcomingBirthdays: [],
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const employeesRes = await axios.get("http://localhost:8010/api/employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const employees = employeesRes.data;

        const leavesRes = await axios.get("http://localhost:8010/api/leave", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const leaveData = leavesRes.data;

        const totalEmployees = employees.length;
        const departments = new Set(employees.map(emp => emp?.departmentName || "Unknown")).size;
        const today = new Date();

        const birthdays = employees.filter(emp => {
          if (!emp?.birthdate) return false;
          const birthDate = new Date(emp.birthdate);
          return birthDate.getDate() === today.getDate() && birthDate.getMonth() === today.getMonth();
        });

        const upcomingBirthdays = employees.filter(emp => {
          if (!emp?.birthdate) return false;
          const birthDate = new Date(emp.birthdate);
          return birthDate > today && birthDate.getMonth() === today.getMonth();
        });

        const leavesToday = leaveData.filter((leave) =>
          new Date(leave.startDate).toLocaleDateString() === today.toLocaleDateString()
        ).length;

        setData({ totalEmployees, departments, leavesToday, employees, birthdays, upcomingBirthdays });
      } catch (err) {
        console.error("❌ Error fetching HR dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center mt-5">Loading HR Dashboard...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">HR Dashboard</h2>
        <div className="fw-bold text-primary">Live Time: {currentTime}</div>
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Employee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text bg-primary text-white" style={{ cursor: "pointer" }}>
            <FaSearch />
          </span>
        </div>
      </div>

      <div className="row g-4">
        {[
          { title: "Total Employees", value: data.totalEmployees },
          { title: "Departments", value: data.departments },
          { title: "Leaves Today", value: data.leavesToday },
        ].map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card shadow p-4 text-center border-0 rounded-3">
              <h6 className="text-muted">{item.title}</h6>
              <h3 className="fw-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-4 g-4">
        <div className="col-md-6">
          <div className="card shadow p-4 border-0 rounded-3">
            <h5 className="fw-bold mb-3">Employee Status</h5>
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Job Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.length > 0 ? (
                  data.employees.map((emp) => (
                    <tr key={emp.employeeId}>
                      <td>{emp.employeeId || "N/A"}</td>
                      <td>{emp.firstName} {emp.lastName}</td>
                      <td>{emp.roleName || "Unknown"}</td>
                      <td>
                        <span className={`badge bg-${emp.status === "Active" ? "success" : "danger"}`}>
                          {emp.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow p-4 border-0 rounded-3">
            <h5 className="fw-bold mb-3">Birthdays</h5>
            <ul className="list-group list-group-flush">
              {data.birthdays.length > 0 ? (
                data.birthdays.map((bday, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{bday.firstName} {bday.lastName}</span>
                    <small className="text-muted">🎂 {new Date(bday.birthdate).toLocaleDateString()}</small>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center text-muted">No birthdays today</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;






// import { useEffect, useState } from "react"; 
// import { FaSearch } from "react-icons/fa";
// import axios from "axios";

// const HrDashboard = () => {
//   const [data, setData] = useState({
//     totalEmployees: 0,
//     departments: 0,
//     leavesToday: 0,
//     employees: [],
//     birthdays: [],
//   });

//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");

//         const employeesRes = await axios.get("http://localhost:8010/api/employees", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const employees = employeesRes.data;

//         const leavesRes = await axios.get("http://localhost:8010/api/leave", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const leaveData = leavesRes.data;

//         const totalEmployees = employees.length;
//         const departments = new Set(employees.map(emp => emp?.departmentName || "Unknown")).size;

//         const today = new Date();
//         const birthdays = employees.filter(emp => {
//           if (!emp?.birthdate) return false;
//           const birthDate = new Date(emp.birthdate);
//           return birthDate.getDate() === today.getDate() && birthDate.getMonth() === today.getMonth();
//         });

//         const upcomingBirthdays = employees.filter(emp => {
//           if (!emp?.birthdate) return false;
//           const birthDate = new Date(emp.birthdate);
//           return birthDate > today && birthDate.getMonth() === today.getMonth();
//         });

//         const leavesToday = leaveData.filter((leave) =>
//           new Date(leave.startDate).toLocaleDateString() === new Date().toLocaleDateString()
//         ).length;

//         setData({ totalEmployees, departments, leavesToday, employees, birthdays, upcomingBirthdays });
//       } catch (err) {
//         console.error("❌ Error fetching HR dashboard data:", err);
//         setError("Failed to load dashboard data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleStatusChange = async (employeeId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:8010/api/employees/${employeeId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setData(prevData => ({
//         ...prevData,
//         employees: prevData.employees.map(emp =>
//           emp.employeeId === employeeId ? { ...emp, status: newStatus } : emp
//         ),
//       }));
//     } catch (err) {
//       console.error("❌ Error updating employee status:", err);
//       alert("Failed to update status. Please try again.");
//     }
//   };

//   if (loading) return <div className="text-center mt-5">Loading HR Dashboard...</div>;
//   if (error) return <div className="text-center text-danger mt-5">{error}</div>;

//   return (
//     <div className="container-fluid" style={{ marginLeft: "250px", padding: "20px" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold">HR Dashboard</h2>
//         <div className="input-group" style={{ maxWidth: "300px" }}>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Employee"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <span className="input-group-text bg-primary text-white" onClick={() => handleSearch()} style={{ cursor: "pointer" }}>
//             <FaSearch />
//           </span>
//         </div>
//       </div>

//       <div className="row mt-4 g-4">
//         <div className="col-md-6">
//           <div className="card shadow p-4 border-0 rounded-3">
//             <h5 className="fw-bold mb-3">Employee Status</h5>
//             <table className="table table-hover align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Job Role</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.employees.length > 0 ? (
//                   data.employees.map((emp) => (
//                     <tr key={emp.employeeId}>
//                       <td>{emp.employeeId || "N/A"}</td>
//                       <td>{emp.firstName} {emp.lastName}</td>
//                       <td>{emp.roleName || "Unknown"}</td>
//                       <td>
//                         <select
//                           className="form-select"
//                           value={emp.status}
//                           onChange={(e) => handleStatusChange(emp.employeeId, e.target.value)}
//                         >
//                           <option value="ACTIVE">Active</option>
//                           <option value="INACTIVE">Inactive</option>
//                           <option value="TERMINATED">Terminated</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center text-muted">No employees found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow p-4 border-0 rounded-3">
//             <h5 className="fw-bold mb-3">Birthdays</h5>
//             <ul className="list-group list-group-flush">
//               {data.birthdays.length > 0 ? (
//                 data.birthdays.map((bday, index) => (
//                   <li key={index} className="list-group-item d-flex justify-content-between">
//                     <span>{bday.firstName} {bday.lastName}</span>
//                     <small className="text-muted">🎂 Today</small>
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-center text-muted">No birthdays today</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HrDashboard;


