import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [role, setRole] = useState("Employee");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  // 🔹 Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      navigate(storedRole.toLowerCase() === "hr" ? "/hr-dashboard" : "/employee-dashboard");
    }
    setIsCheckingAuth(false);
  }, [navigate]);

  // ✅ Prevent blinking until auth check is complete
  if (isCheckingAuth) return null;

  // 🔹 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8010/api/auth/login", {
        email: username,
        password: password,
      });
  
      if (response.status === 200) {
        const { token, role: backendRole, email } = response.data;
  
        if (!email) {
          console.error("🚨 Email is missing in API response! Check Backend.");
          alert("Login failed: Missing email in API response.");
          return;
        }
  
        // 🔹 Ensure selected role matches backend role
        if (backendRole.toLowerCase() !== role.toLowerCase()) {
          alert("❌ Incorrect role selected. Please try again.");
          return;
        }
  
        // ✅ Store credentials
        localStorage.setItem("token", token);
        localStorage.setItem("role", backendRole);
        localStorage.setItem("email", email);
  
        console.log("✅ Stored Token:", token);
        console.log("✅ Stored Role:", backendRole);
        console.log("✅ Stored Email:", email);
  
        // 🔹 Navigate based on role
        navigate(backendRole.toLowerCase() === "hr" ? "/hr-dashboard" : "/employee-dashboard");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("❌ Invalid Credentials! Please try again.");
    }
  };
  
  // 🔹 Handle Password Reset
  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:8010/api/auth/reset-password", {
        email: username,
        oldPassword,
        newPassword,
      });
      alert("✅ Password reset successful.");
      setResetPassword(false);
    } catch (error) {
      console.error("❌ Password Reset Error:", error);
      alert("❌ Failed to reset password. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1673697240011-76f7f9220300?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          color: "black",
          border: "1px solid #ddd",
        }}
      >
        <div className="text-center mb-4">
          <h2>{resetPassword ? "Reset Password" : "Login"}</h2>
        </div>
        {resetPassword ? (
          <>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button onClick={handleResetPassword} className="btn btn-primary w-100">
              Reset Password
            </button>
            <button onClick={() => setResetPassword(false)} className="btn btn-secondary w-100 mt-2">
              Back to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Employee">Employee</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <button type="button" onClick={() => setResetPassword(true)} className="btn btn-link w-100 mt-2">
              Forgot Password?
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;











