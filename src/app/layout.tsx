import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Baseer Tech Store",
  description: "Baseer Tech Store for easy shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}