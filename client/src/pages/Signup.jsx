import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { api } from "../services/api";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

/**
 * Signup page component.
 * Features a modern glassmorphic form with validation and entrance animations.
 * 
 * @returns {JSX.Element}
 */
function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Update form state
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Validate inputs
  function validate() {
    let newErrors = {};

    if (form.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phoneNumber.match(/^\d{10,}$/)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await api.post("/api/auth/signup", {
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="glass w-full max-w-lg p-10 animate-float fade-in">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-3xl font-bold text-center tracking-tight">
            Create Account
          </CardTitle>
          <p className="text-center text-foreground/60 text-sm">
            Join us today and experience the future
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs ml-1 font-medium">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs ml-1 font-medium">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Phone Number"
                  type="text"
                  name="phoneNumber"
                  placeholder="1234567890"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && (
                  <p className="text-red-400 text-xs ml-1 font-medium">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs ml-1 font-medium">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs ml-1 font-medium">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <Button 
              text={loading ? "Creating Account..." : "Register Now"} 
              disabled={loading}
              className="mt-4"
            />

            <p className="text-sm text-center text-foreground/60">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
