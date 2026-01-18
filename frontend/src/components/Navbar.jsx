import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center bg-blue-50">
      <nav className="w-[90%] max-w-7xl rounded-2xl bg-blue-50 px-8 py-4">
        <div className="flex items-center">
          {/* Left group: Logo + links */}
          <div className="flex items-center gap-8 text-sm">
            <Link to="/" className="text-lg font-semibold text-gray-900">
              CreditScore
            </Link>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-900 transition"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/risk"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-900 transition"
              }
            >
              Risk
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-gray-900 transition"
              }
            >
              History
            </NavLink>
          </div>

          {/* Right group: Auth */}
          <div className="ml-auto flex items-center gap-4 text-sm">
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 transition"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
