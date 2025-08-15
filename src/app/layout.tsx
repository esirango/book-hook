import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="relative min-h-screen flex flex-col text-[var(--text-light)] dark:text-[var(--text-dark)]">
                <Navbar />
                <main className="container mx-auto px-4 py-8 flex-1 relative z-10">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
