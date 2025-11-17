import Navbar from "@/components/Navbar";
import "./globals.css";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Code Snippet Vault",
    description: "Code Snippet Vault",
    icons: {
        icon: "/myfavicon.png",
        shortcut: "/myfavicon.png",
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <html lang="en">
                <body className="bg-gray-200">{children}</body>
            </html>
        </>
    );
}
