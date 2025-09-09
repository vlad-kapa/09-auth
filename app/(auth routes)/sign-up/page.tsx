"use client";
import { Credentials, register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useState } from "react";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const credentials = Object.fromEntries(formData) as unknown as Credentials;
    try {
      const user = await register(credentials);
      if (user) {
        setUser(user);
        router.push("/profile");
      }
    } catch (error) {
      setError((error as ApiError).message ?? "something went wrong");
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;