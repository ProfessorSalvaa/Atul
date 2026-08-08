import type { Metadata } from "next";
import { AITutorHost } from "@/components/shell/AITutorHost";
import { CommandPaletteHost } from "@/components/shell/CommandPaletteHost";
import { ScrollManager } from "@/components/shell/ScrollManager";
import { ShellProvider } from "@/components/shell/ShellProvider";
import { ShortcutsHost } from "@/components/shell/ShortcutsHost";
import { SkipLink } from "@/components/shell/SkipLink";
import { ToastHost } from "@/components/shell/ToastHost";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SITE_URL } from "@/lib/seo";
import { ibmPlexMono, instrumentSans, newsreader } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Curitiq — Learn Modern Digital Skills",
    template: "%s · Curitiq",
  },
  description:
    "Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.",
  openGraph: {
    type: "website",
    siteName: "Curitiq",
    title: "Curitiq — Learn Modern Digital Skills",
    description:
      "Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ShellProvider>
            <ToastHost>
              <SkipLink />
              {children}
              <CommandPaletteHost />
              <AITutorHost />
              <ShortcutsHost />
              <ScrollManager />
            </ToastHost>
          </ShellProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
