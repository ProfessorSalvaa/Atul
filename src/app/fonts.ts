import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from "next/font/google";

// Self-hosted via next/font (built at compile time, no runtime CDN request).
// Variable names below feed src/styles/tokens/fonts.css, which aliases them
// to the design system's --font-primary / --font-secondary / --font-mono.

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});
