import LoginForm from "@/components/login/login-form";
import Image from "next/image";

export default function Login() {
  return (
    <main className="flex min-h-screen bg-bg-main">
      {/* Left Panel: Illustration */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-linear-to-br from-[#EEF2FF] to-[#E0E7FF] p-12 relative overflow-hidden">
        <div className="z-10 w-full max-w-lg space-y-8">
          <Image
            src={"/login-illustration.png"}
            alt="Organize Everything"
            width={600}
            height={600}
            priority
          />
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Organize Everything
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
              Keep track of your belongings, warranties, and important documents
              all in one secure place.
            </p>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-24 -left-24 w-120 h-120 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-120 h-120 bg-blue-200/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-6 md:p-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
