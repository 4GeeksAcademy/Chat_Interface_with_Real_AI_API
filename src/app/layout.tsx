import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/modern.css";

export const metadata: Metadata = {
  title: "Chat Interface with Groq API",
  description: "A modern chat application powered by Groq AI API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        {children}
      </body>
    </html>
  );
}
