import { BookOpen, LayoutDashboard, Search, Settings, Sparkles, Trophy, User } from "lucide-react";
import type { FooterColumn } from "@/components/navigation/Footer";

/** Public/marketing site nav — matches P0 §1 public IA. */
export const PUBLIC_NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

/** Desktop sidebar — matches P0 §4: "Dashboard, My Courses,
 *  Explore/Catalog, Achievements, Settings." */
export const APP_SIDEBAR_LINKS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "learn", label: "My Courses", href: "/learn", icon: <BookOpen size={18} /> },
  { id: "catalog", label: "Explore", href: "/courses", icon: <Search size={18} /> },
  { id: "achievements", label: "Achievements", href: "/achievements", icon: <Trophy size={18} /> },
  { id: "settings", label: "Settings", href: "/settings", icon: <Settings size={18} /> },
] as const;

/** Mobile bottom nav — matches P0 §4: "Home, Learn, Search, Tutor,
 *  Profile" (5 max, matches MobileNav's designed slot count). "Tutor"
 *  opens the AI Tutor slide-over rather than navigating. */
export const MOBILE_NAV_ITEMS = [
  { id: "home", label: "Home", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "learn", label: "Learn", href: "/learn", icon: <BookOpen size={18} /> },
  { id: "search", label: "Search", href: "/search", icon: <Search size={18} /> },
  { id: "tutor", label: "Tutor", icon: <Sparkles size={18} /> },
  { id: "profile", label: "Profile", href: "/profile", icon: <User size={18} /> },
] as const;

/** Settings sub-nav — tabs inside the Settings Layout. */
export const SETTINGS_NAV_LINKS = [
  { label: "Account", href: "/settings" },
  { label: "Billing", href: "/settings/billing" },
  { label: "Notifications", href: "/settings/notifications" },
] as const;

export const PUBLIC_FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
];
