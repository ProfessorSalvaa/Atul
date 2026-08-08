import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curitiq",
  description:
    "Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
