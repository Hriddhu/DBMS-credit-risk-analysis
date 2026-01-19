
import { Link, NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-blue-50 caret-transparent">
      <section className="px-8 pt-24 pb-12">
        <div className="mx-auto max-w-6xl grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-xl">
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-black md:text-6xl">
              Monitor Your Credit. <br />
              Manage Your Risk.
            </h1>

            <p className="mt-5 text-base text-gray-600">
              Track your score, understand your risk level, and view history
              insights in a clean dashboard.
            </p>

            <div className="mt-7">
              <Link
              to="/Signup"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            </div>
          </div>

          <div className="relative hidden md:block h-[420px]">
            <div className="absolute right-24 top-16 h-64 w-64 rotate-12 rounded-[40px] bg-blue-100 shadow-lg" />
            <div className="absolute right-12 top-8 h-64 w-64 -rotate-6 rounded-[40px] bg-blue-200 shadow-xl" />
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl text-center font-semibold text-slate-600">
          <p>Making credit insights easier to understand.</p>
          <p>Designed for confident financial decisions.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
