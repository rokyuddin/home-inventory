import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center bg-bg-main px-6 py-12 min-h-screen text-center">
            {/* Decorative background elements matching the login page */}
            <div className="z-0 absolute inset-0 overflow-hidden pointer-events-none">
                <div className="-top-24 -left-24 absolute bg-blue-200/20 blur-3xl rounded-full w-96 h-96 animate-pulse" />
                <div className="-right-24 -bottom-24 absolute bg-indigo-200/20 blur-3xl rounded-full w-96 h-96 animate-pulse" />
            </div>

            <div className="slide-in-from-bottom-4 z-10 relative max-w-2xl animate-in duration-1000 fade-in">
                {/* Illustration */}
                <div className="relative drop-shadow-2xl mx-auto mb-8 w-64 md:w-80 h-64 md:h-80">
                    <Image
                        src="/not-found-illustration.png"
                        alt="404 Not Found"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Text Content */}
                <h1 className="mb-4 font-extrabold text-slate-900 text-4xl md:text-6xl tracking-tight">
                    Oops! Page Not Found
                </h1>
                <p className="mb-10 text-slate-600 text-lg md:text-xl">
                    We looked everywhere, but we couldn't find the item you were searching for.
                    It might have been moved or doesn't exist anymore.
                </p>

                {/* Buttons */}
                <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
                    <Link href="/dashboard/inventory">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 shadow-lg px-8 py-6 rounded-xl w-full sm:w-auto font-bold text-base active:scale-95 transition-all"
                            leftIcon={<Home size={20} />}
                        >
                            Back to Inventory
                        </Button>
                    </Link>
                    <Link href="/dashboard/inventory">
                        <Button
                            variant="outline"
                            className="hover:bg-slate-50 px-8 py-6 border-slate-200 rounded-xl w-full sm:w-auto font-bold text-base active:scale-95 transition-all"
                            leftIcon={<Search size={20} />}
                        >
                            Search Items
                        </Button>
                    </Link>
                </div>

                {/* Helper Text */}
                <p className="mt-12 font-medium text-slate-400 text-sm">
                    Need help? <Link href="#" className="text-blue-600 hover:underline">Contact Support</Link>
                </p>
            </div>
        </div>
    );
}
