import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { ArrowLeft } from "lucide-react";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] px-4">
      {/* Logo */}
      <div className="absolute top-2 left-8">
        <img
          src="/images/inaraWhite.webp" // Replace with the actual path to your logo
          alt="Inaरa Living Logo"
          className="h-16 w-auto"
        />
      </div>

      {/* Login Card */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-6 text-[#1f4e5f]">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-[#6b7280] mb-8">
          Please log in to access the admin dashboard.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#4b5563] mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f4e5f] transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#4b5563] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f4e5f] transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1f4e5f] text-white py-3 rounded-lg font-semibold hover:bg-[#163b49] transition-all"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#e5e7eb]"></div>
          <span className="px-4 text-sm text-[#6b7280]">or</span>
          <div className="flex-grow h-px bg-[#e5e7eb]"></div>
        </div>

        {/* Back to Homepage Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center bg-[#ec4899] text-white py-3 rounded-lg font-semibold hover:bg-[#d0267a] transition-all"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Homepage
        </button>
      </div>
    </div>
  );
}
