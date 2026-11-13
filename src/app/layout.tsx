import type { Metadata } from "next";
import "@/styles/atlas.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Atlas Chat - Groq AI Interface",
  description: "A modern chat application powered by Groq AI API with advanced token tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
