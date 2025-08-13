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
            <body className="bg-gray-50 dark:bg-gray-900 min-h-screen relative flex flex-col">
                <Navbar />
                <main className="container mx-auto px-4 py-8 flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
