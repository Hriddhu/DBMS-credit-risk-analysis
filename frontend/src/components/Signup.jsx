import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // IMPORTANT: read as text first so we don't crash if backend returns HTML/error page
      const text = await response.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Error: " + (data.error || text || "Signup failed"));
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert(
        "Could not connect to the server. Check if Django is running and URL is correct.",
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative bg-blue-100 rounded-2xl p-10 hidden md:block">
            <p className="text-xs font-semibold text-slate-500 uppercase">
              Welcome to
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-widest text-gray-900">
              CreditScore
            </h1>
            <div className="relative h-[420px]">
              <div className="absolute right-24 top-16 h-64 w-64 rotate-12 rounded-[40px] bg-blue-500 shadow-lg" />
              <div className="absolute right-12 top-8 h-64 w-64 -rotate-6 rounded-[40px] bg-blue-300 shadow-xl" />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8 md:p-12 flex items-center">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-800">Sign up</h2>
              <p className="mt-1 text-sm text-slate-500">
                Create your account in a minute.
              </p>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full name"
                    name="full_name"
                    placeholder="Jenish Adhikari"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Username"
                    name="username"
                    placeholder="Jenny"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="jenny@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-blue-500 py-3 text-sm font-semibold cursor-pointer tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  CREATE AN ACCOUNT
                </button>
              </form>

              <p className="mt-6 text-xs text-slate-500 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div>
      <label className="block mb-1.5 text-xs font-semibold text-slate-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full h-11 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:shadow-md caret-blue-500"
      />
    </div>
  );
};

export default Signup;
