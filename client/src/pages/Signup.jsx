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

// Signup page with validations
function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

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

    if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email";
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

  try {
    const res = await api.post("/signup", {
      name: form.name,
      email: form.email,
      password: form.password
    });

    alert(res.data.message);
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <Card className="w-96 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Signup
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button text="Create Account" />

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600">
                Login
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>

    </div>
  );
}

export default Signup;
