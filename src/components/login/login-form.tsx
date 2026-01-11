"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, User, Eye, Box, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import Input from "../ui/input";
import { Button } from "../ui/button";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(username, password);
      // login function handles redirection
    } catch (err: any) {
      setError(
        err.message || "Failed to sign in. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* App Logo */}
      <Image src="/logo.png" alt="Logo" width={80} height={80} />

      {/* Header */}
      <div className="text-center space-y-1.5 mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Home Inventory
        </h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Track and organize your things
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full bg-white border border-slate-100 rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-left">
          Sign in to your account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 animate-in fade-in slide-in-from-top-1 duration-300">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="text-sm font-medium leading-tight">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-[15px] font-semibold text-slate-700 ml-1"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="rounded-xl border-slate-200 bg-white py-3.5 focus:ring-blue-500/10 focus:border-blue-500"
              endIcon={<User size={20} className="text-slate-400" />}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-[15px] font-semibold text-slate-700 ml-1"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl border-slate-200 bg-white py-3.5 focus:ring-blue-500/10 focus:border-blue-500"
              endIcon={<Eye size={20} className="text-slate-400" />}
            />
          </div>

          <div className="flex items-center justify-between text-[14px] px-1">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4.5 h-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-slate-600 font-medium cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link href="#" className="text-blue-600 font-bold hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 text-[16px] font-bold rounded-xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70"
            rightIcon={
              isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <ArrowRight size={20} />
              )
            }
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-8 text-center text-[15px] text-slate-500">
          Don't have an account?{" "}
          <a
            href="http://4.213.57.100:3100/swagger/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Create one
          </a>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center space-y-6">
        <p className="text-[13px] font-semibold text-slate-400">
          Version 1.2.4
        </p>
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link
            href="#"
            className="hover:text-slate-600 transition-colors tracking-wider"
          >
            Help Center
          </Link>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <Link
            href="#"
            className="hover:text-slate-600 transition-colors tracking-wider"
          >
            Privacy Policy
          </Link>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <Link
            href="#"
            className="hover:text-slate-600 transition-colors tracking-wider"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
