import type { Metadata } from "next";
import "./globals.css";
import PopoverCart from "@/components/cartPopover";

export const metadata: Metadata = {
  title: "Store | Shop Premium Products",
  description: "Discover our curated collection of quality products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
          <nav className="flex items-center justify-between px-6 lg:px-8 py-4 max-w-7xl mx-auto">
            <a href="/" className="font-bold text-xl text-gray-900 hover:text-gray-700 transition-colors">
              Store
            </a>
            <PopoverCart />
          </nav>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-100 bg-gray-50 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 Store. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}