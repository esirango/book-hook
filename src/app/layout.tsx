import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import ThemeInitializer from "@/components/theme/ThemeInitializer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#9d7f5bdf" />
                <link
                    rel="icon"
                    href="/images/icons/icon-192.png"
                    sizes="192x192"
                    type="image/png"
                />
                <link
                    rel="apple-touch-icon"
                    href="/images/icons/icon-512.png"
                />
            </head>
            <body
                className="
          relative min-h-screen flex flex-col
          bg-[var(--bg-gradient)] 
          text-[var(--text)] 
        "
            >
                <ThemeInitializer />

                <Navbar />
                <main className="container mx-auto px-4 py-8 flex-1 relative z-10">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
