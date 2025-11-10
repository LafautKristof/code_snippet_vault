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
                <body>{children}</body>
            </html>
        </>
    );
}
