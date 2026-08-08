/**
 * More static sample content — see courses.ts header for why this exists.
 *
 * M2.5 addendum: expanded for the Founder Demo Build — richer notifications,
 * achievement progress, a full user profile, site-wide trust stats, and
 * more blog posts, so every screen reads like a live product instead of a
 * shell with three items in it.
 */

export const SITE_STATS = {
  learners: 112_400,
  coursesCount: 8,
  avgRating: 4.8,
  hoursOfContent: 260,
};

export const TESTIMONIALS = [
  {
    name: "Priya N.",
    role: "Marketing Manager → Data Analyst",
    quote:
      "It's the first learning app that didn't feel like it was trying to trick me into opening it every day. I just... kept opening it.",
  },
  {
    name: "Marcus D.",
    role: "Senior Developer",
    quote:
      "The AI tutor actually stays on topic. I've stopped dreading the moment a lesson doesn't cover my exact edge case.",
  },
  {
    name: "Elena R.",
    role: "Self-taught Designer",
    quote:
      "No streaks screaming at me, no confetti. Just a quiet record of what I've actually learned. That's rare.",
  },
  {
    name: "Jon K.",
    role: "Principal Engineer",
    quote:
      "Recommended the systems design course to my whole team. Three of them finished it in a week.",
  },
  {
    name: "Nadia F.",
    role: "Product Manager",
    quote: "Finally a prompting course that treats it like an engineering discipline, not a trick.",
  },
  {
    name: "Tom V.",
    role: "Staff Engineer",
    quote: "Calm, well-produced, and it respects that I have about 20 minutes a day for this.",
  },
];

export interface SampleAchievement {
  id: string;
  label: string;
  description: string;
  earned: boolean;
  category: "milestone" | "streak" | "mastery";
  progress?: { current: number; target: number };
  earnedDate?: string;
}

export const ACHIEVEMENTS: SampleAchievement[] = [
  {
    id: "first-lesson",
    label: "First Lesson",
    description: "Completed your first lesson.",
    earned: true,
    category: "milestone",
    earnedDate: "2026-05-02",
  },
  {
    id: "seven-day-streak",
    label: "7-Day Streak",
    description: "Learned something 7 days running.",
    earned: true,
    category: "streak",
    earnedDate: "2026-05-14",
  },
  {
    id: "module-master",
    label: "Module Master",
    description: "Finished a full module.",
    earned: true,
    category: "mastery",
    earnedDate: "2026-05-21",
  },
  {
    id: "early-riser",
    label: "Early Riser",
    description: "Studied before 8am three times.",
    earned: true,
    category: "streak",
    earnedDate: "2026-06-03",
  },
  {
    id: "course-graduate",
    label: "Course Graduate",
    description: "Completed an entire course.",
    earned: false,
    category: "milestone",
    progress: { current: 1, target: 1 },
  },
  {
    id: "quiz-sharp",
    label: "Sharp Answers",
    description: "Passed 5 quizzes on the first try.",
    earned: false,
    category: "mastery",
    progress: { current: 3, target: 5 },
  },
  {
    id: "night-owl",
    label: "Night Owl",
    description: "Studied after 10pm three times.",
    earned: false,
    category: "streak",
    progress: { current: 1, target: 3 },
  },
  {
    id: "thirty-day-streak",
    label: "30-Day Streak",
    description: "Learned something 30 days running.",
    earned: false,
    category: "streak",
    progress: { current: 6, target: 30 },
  },
  {
    id: "polyglot-learner",
    label: "Polyglot Learner",
    description: "Started courses in 3 different categories.",
    earned: false,
    category: "mastery",
    progress: { current: 2, target: 3 },
  },
];

export interface SampleBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  author: string;
  authorInitials: string;
  tag: string;
}

export const BLOG_POSTS: SampleBlogPost[] = [
  {
    slug: "why-restraint-is-a-feature",
    title: "Why Restraint Is a Feature, Not a Missing One",
    excerpt:
      "Every learning app wants to gamify you. We think the better product is the one that respects your evening.",
    date: "2026-06-02",
    readMinutes: 6,
    author: "Founding team",
    authorInitials: "CQ",
    tag: "Product philosophy",
  },
  {
    slug: "the-trust-boundary-with-ai-tutors",
    title: "The Trust Boundary With AI Tutors",
    excerpt:
      "Scoping an AI tutor to the current lesson isn't a limitation — it's the reason it can be trusted at all.",
    date: "2026-05-18",
    readMinutes: 8,
    author: "Theo Marsh",
    authorInitials: "TM",
    tag: "AI & tutoring",
  },
  {
    slug: "how-we-chose-our-first-five-courses",
    title: "How We Chose Our First Five Courses",
    excerpt: "Depth over catalog size. Here's the reasoning behind Curitiq's launch curriculum.",
    date: "2026-04-27",
    readMinutes: 5,
    author: "Founding team",
    authorInitials: "CQ",
    tag: "Behind the scenes",
  },
  {
    slug: "quiet-progress-beats-loud-streaks",
    title: "Quiet Progress Beats Loud Streaks",
    excerpt: "What we learned watching people quit apps that punished a single missed day.",
    date: "2026-04-09",
    readMinutes: 7,
    author: "Dana Okafor",
    authorInitials: "DO",
    tag: "Product philosophy",
  },
  {
    slug: "grading-our-own-ai-tutor",
    title: "Grading Our Own AI Tutor for a Month",
    excerpt:
      "We logged every tutor answer for 30 days and scored it ourselves. Here's what embarrassed us.",
    date: "2026-03-22",
    readMinutes: 9,
    author: "Theo Marsh",
    authorInitials: "TM",
    tag: "AI & tutoring",
  },
  {
    slug: "designing-a-progress-page-that-doesnt-lie",
    title: "Designing a Progress Page That Doesn't Lie",
    excerpt:
      "Most progress bars are vanity metrics. Ours had to survive a founder asking 'but did I actually learn it?'",
    date: "2026-03-05",
    readMinutes: 6,
    author: "Yuki Tanaka",
    authorInitials: "YT",
    tag: "Design",
  },
];

export interface SampleNotification {
  id: string;
  title: string;
  description: string;
  read: boolean;
  type: "achievement" | "content" | "streak" | "social";
  timeAgo: string;
}

export const NOTIFICATIONS: SampleNotification[] = [
  {
    id: "n1",
    title: "Achievement unlocked",
    description: "You earned “Early Riser.”",
    read: false,
    type: "achievement",
    timeAgo: "2h ago",
  },
  {
    id: "n2",
    title: "Course content updated",
    description: "AI Tooling for Developers added a new lesson.",
    read: false,
    type: "content",
    timeAgo: "5h ago",
  },
  {
    id: "n3",
    title: "Streak at risk",
    description: "Learn something today to keep your 6-day streak alive.",
    read: false,
    type: "streak",
    timeAgo: "1d ago",
  },
  {
    id: "n4",
    title: "New review reply",
    description: "Theo Marsh replied to your question on “The Trust Boundary.”",
    read: true,
    type: "social",
    timeAgo: "2d ago",
  },
  {
    id: "n5",
    title: "Recommended for you",
    description: "Based on your progress: SQL for Product Thinking.",
    read: true,
    type: "content",
    timeAgo: "4d ago",
  },
  {
    id: "n6",
    title: "Module Master unlocked",
    description: "You finished “Foundations Worth Re-Examining.”",
    read: true,
    type: "achievement",
    timeAgo: "1w ago",
  },
];

export const PRICING_FAQ = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Every course opens its first module for free — enough to genuinely judge the teaching quality before you pay for anything.",
  },
  {
    question: "What does Premium include?",
    answer:
      "Full access to every course, an uncapped (but fair-use) AI tutor, and progress tracking across everything you're learning.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, from Settings → Billing, effective at the end of your current billing period.",
  },
  {
    question: "Do you offer team or student pricing?",
    answer:
      "Not yet — one straightforward plan for now. Team plans are on the roadmap post-launch.",
  },
];

export const DASHBOARD_CONTINUE_LEARNING = {
  courseSlug: "ai-tooling-for-developers",
  courseTitle: "AI Tooling for Developers",
  lessonSlug: "reading-a-generated-diff",
  lessonTitle: "Reading a Generated Diff Fast",
  progressPercent: 62,
};

export const DASHBOARD_RECOMMENDED = ["sql-for-product-thinking", "systems-design-deep-dive"];

export const STREAK = { days: 6, atRisk: false, longestStreak: 14 };

export const USER_PROFILE = {
  name: "Atul Kumar",
  initials: "AK",
  email: "atulsinghvfx@gmail.com",
  title: "Learning full-stack AI product development",
  memberSince: "2026-04-18",
  stats: {
    coursesInProgress: 2,
    coursesCompleted: 1,
    hoursLearned: 34,
    currentStreak: 6,
    longestStreak: 14,
  },
};
