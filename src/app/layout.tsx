import Navbar from "@/components/Navbar";
import "./globals.css";

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
