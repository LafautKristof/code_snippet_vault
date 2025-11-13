// next imports
import Link from "next/link";
import Image from "next/image";

// component imports
import LogoutButton from "./LogoutButton";

// lib imports
import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function Navbar() {
    const user = await getCurrentUser();

    const navNotLoggedIn = [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
    ];

    const navLoggedIn = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Snippets", href: "/public-snippets" },
        { name: "Profile", href: "/profile" },
    ];

    return (
        <nav className="w-full bg-black text-white px-6 py-3 shadow-sm border-b border-border/40">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* LEFT SIDE — LOGO OR TITLE */}
                <Link
                    href="/"
                    className="flex items-center gap-4 hover:opacity-80 transition"
                >
                    <Image
                        src="/myfavicon.png" // of wat je wilt
                        alt="favicon"
                        width={28}
                        height={28}
                    />
                    <span className="font-semibold text-lg">SnippetVault</span>
                </Link>

                {/* RIGHT SIDE — NAV LINKS */}
                <div className="flex items-center gap-4">
                    {/* 🧑 Logged OUT */}
                    {!user &&
                        navNotLoggedIn.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-3 py-1.5 rounded-md border border-white/20 hover:bg-white hover:text-black transition text-sm"
                            >
                                {item.name}
                            </Link>
                        ))}

                    {/* 🔐 Logged IN */}
                    {user && (
                        <>
                            {navLoggedIn.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="px-3 py-1.5 rounded-md border border-white/20 hover:bg-white hover:text-black transition text-sm"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Logout button */}
                            <LogoutButton />
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
