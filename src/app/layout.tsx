import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ibmPlexMono, instrumentSans, newsreader } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curitiq",
  description:
    "Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
