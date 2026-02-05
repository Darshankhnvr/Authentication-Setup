import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

/**
 * Login page component.
 * Features a modern glassmorphic UI with entrance animations.
 * 
 * @returns {JSX.Element}
 */
function Login() {
  // Global auth context for managing user state
  const { login } = useContext(AuthContext);
  
  // Local state for form inputs and UI feedback
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  /**
   * Updates local form state on input change.
   * @param {React.ChangeEvent<HTMLInputElement>} e 
   */
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /**
   * Submits login credentials to the backend.
   * @param {React.FormEvent} e 
   */
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request to the standardized auth endpoint
      const res = await api.post("/api/auth/login", form);
      
      // Update global auth state with user data
      login(res.data.user);
      
      alert(res.data.message);
    } catch (err) {
      // Handle potential login errors
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      {/* Premium Glassmorphic Card Container */}
      <Card className="glass w-full max-w-md p-8 animate-float fade-in border border-white/10">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-3xl font-bold text-center tracking-tight text-white">
            Welcome Back
          </CardTitle>
          <p className="text-center text-white/60 text-sm">
            Enter your credentials to access your account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Action Button with Loading State */}
            <Button 
              text={loading ? "Authenticating..." : "Sign In"} 
              disabled={loading}
              className="mt-4"
            />

            {/* Visual Separator */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white/40">
                  Secure Access
                </span>
              </div>
            </div>

            {/* Navigation Link to Signup */}
            <p className="text-sm text-center text-white/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline decoration-primary/50 underline-offset-4">
                Register now
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
