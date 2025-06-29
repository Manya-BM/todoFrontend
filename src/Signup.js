import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setSignupLoading(true);
    setSignupError("");

    try {
      const response = await fetch(
        "https://todobackend-kxbw.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      setSignupLoading(false);

      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        setSignupError(data.message || "Signup failed");
      }
    } catch (err) {
      setSignupLoading(false);
      setSignupError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-orange-50 rounded-lg border border-orange-200">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-600">
        Signup
      </h2>
      {signupError && (
        <div className="mb-3 text-center text-red-600 font-semibold">
          {signupError}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 border-2 border-orange-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border-2 border-orange-300 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded w-full transition-color duration-200"
        >
          {signupLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
      <div className="mt-5 text-center text-gray-700">
        Already have an account?
        <Link to="/login">
          <span className="text-orange-500 hover:underline font-semibold ml-1">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
