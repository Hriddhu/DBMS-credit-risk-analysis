const Signup = () => {
  return (
    <div className="min-h-screen w-full bg-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl]">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative bg-blue-100 rounded-2xl p-10 hidden md:block">
            <p className="text-xs font-semibold text-slate-500">
              WELCOME TO
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-widest text-gray-900">
              CreditScore
            </h1>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8 md:p-12 flex items-center">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-slate-800">Sign up</h2>
              <p className="mt-1 text-sm text-slate-500">
                Create your account in a minute.
              </p>

              <form className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full name" placeholder="Jenish Adhikari" />
                  <Input label="Username" placeholder="Jenny" />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="jenny@example.com"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className="w-full mt-2 rounded-xl bg-blue-500 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  CREATE AN ACCOUNT
                </button>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-4">
                  <div className="flex-1 h-px bg-slate-200" />
                  Sign up with
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <div className="flex justify-center gap-3 mt-4">
                  <SocialButton label="Google" />
                  <SocialButton label="X" />
                  <SocialButton label="Facebook" />
                </div>
              </form>

              <p className="mt-6 text-xs text-slate-500 text-center">
                Already have an account?{" "}
                <span className="text-blue-600 font-semibold cursor-pointer">
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", placeholder }) => {
  return (
    <div>
      <label className="block mb-1.5 text-xs font-semibold text-slate-500">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:shadow-md"
      />
    </div>
  );
};

const SocialButton = ({ label }) => {
  return (
    <button
      type="button"
      className="h-11 w-11 rounded-xl border border-indigo-100 bg-white shadow-md flex items-center justify-center text-xs font-semibold text-slate-600 hover:-translate-y-0.5 transition"
    >
      {label[0]}
    </button>
  );
};

export default Signup;
