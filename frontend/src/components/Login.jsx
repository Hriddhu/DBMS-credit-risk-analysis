import { Link, NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center p-6 select-none">
      <div className="w-full max-w-md bg-blue-100 rounded-2xl shadow-xl p-8 md:p-10">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg font-semibold text-gray-900">
            CreditScore
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to CreditScore
        </h2>
        <p className="mt-1 text-sm text-gray-500">Manage your creditscore.</p>

        {/* Form */}
        <form className="mt-6 space-y-4 bg-blue-100">
          <Input label="Email" type="email" placeholder="jenny@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />

          <div className="text-right text-xs text-blue-600 font-medium cursor-pointer">
            Forgot Password?
          </div>

          <button
            type="button"
            className="w-full mt-2 rounded-xl bg-blue-500 py-3 text-sm font-semibold tracking-wide cursor-pointer text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Login to account
          </button>

          <div className="flex items-center gap-3 text-xs text-gray-400 mt-4">
            <div className="flex-1 h-px bg-gray-200" />
            or
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </form>

        {/* Footer text-blue-600 font-semibold cursor-pointer */}
        <p className="mt-6 text-xs text-gray-500 text-center">
          Don’t have an account?{" "}
          <Link
              to="/Signup"
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Create New!
            </Link>
        </p>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", placeholder }) => {
  return (
    <div className="select-text">
      <label className="block mb-1.5 text-xs font-semibold text-gray-500">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="
          w-full h-11 rounded-lg
          border border-blue-300
          px-4 text-sm text-gray-800
          outline-none transition
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100
        "
      />
    </div>
  );
};

export default Login;
