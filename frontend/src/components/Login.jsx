import { useState } from "react"; // Added for state
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  // 1. State to store credentials
  const [credentials, setCredentials] = useState({
    username: "", // Note: Use username or email depending on your backend view
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  // 2. Handle input changes
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle Login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        login({ token: data.token, username: data.username });
        navigate("/dashboard"); // Or wherever your credit score form is
      } else {
        alert("Login failed: " + (data.error || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server connection failed!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-blue-100 rounded-2xl shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg font-semibold text-gray-900">
            CreditScore
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to CreditScore
        </h2>
        <p className="mt-1 text-sm text-gray-500">Manage your creditscore.</p>

        {/* 4. Added onSubmit to form */}
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <Input
            label="Username" // Changed label to Username to match your test_api.py test
            type="text"
            name="username"
            placeholder="Jenny"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          <div className="text-right text-xs text-blue-600 font-medium cursor-pointer">
            Forgot Password?
          </div>

          <div className="flex justify-center gap-4">
            {/* Admin login can be static for now or a different route */}
            <button
              type="button"
              className="w-full mt-2 rounded-full bg-slate-400 py-3 text-sm font-semibold tracking-wide cursor-pointer text-white shadow-lg transition hover:-translate-y-0.5"
            >
              Admin Login
            </button>

            {/* 5. USER LOGIN button is now type="submit" */}
            <button
              type="submit"
              className="w-full mt-2 rounded-full bg-blue-500 py-3 text-sm font-semibold tracking-wide cursor-pointer text-white shadow-lg transition hover:-translate-y-0.5"
            >
              User Login
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 mt-4">
            <div className="flex-1 h-px bg-gray-200" />
            or
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </form>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-blue-600 font-semibold">
            Create New!
          </Link>
        </p>
      </div>
    </div>
  );
};

// 6. Updated Input component to handle value/onChange
const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="select-text">
      <label className="block mb-1.5 text-xs font-semibold text-gray-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className="w-full h-11 rounded-lg border border-blue-300 px-4 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

export default Login;
