/** More static sample content — see courses.ts header for why this exists. */

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
];

export const ACHIEVEMENTS = [
  {
    id: "first-lesson",
    label: "First Lesson",
    description: "Completed your first lesson.",
    earned: true,
  },
  {
    id: "seven-day-streak",
    label: "7-Day Streak",
    description: "Learned something 7 days running.",
    earned: true,
  },
  {
    id: "module-master",
    label: "Module Master",
    description: "Finished a full module.",
    earned: true,
  },
  {
    id: "course-graduate",
    label: "Course Graduate",
    description: "Completed an entire course.",
    earned: false,
  },
  {
    id: "quiz-sharp",
    label: "Sharp Answers",
    description: "Passed 5 quizzes on the first try.",
    earned: false,
  },
  {
    id: "night-owl",
    label: "Night Owl",
    description: "Studied after 10pm three times.",
    earned: false,
  },
];

export const BLOG_POSTS = [
  {
    slug: "why-restraint-is-a-feature",
    title: "Why Restraint Is a Feature, Not a Missing One",
    excerpt:
      "Every learning app wants to gamify you. We think the better product is the one that respects your evening.",
    date: "2026-06-02",
    readMinutes: 6,
  },
  {
    slug: "the-trust-boundary-with-ai-tutors",
    title: "The Trust Boundary With AI Tutors",
    excerpt:
      "Scoping an AI tutor to the current lesson isn't a limitation — it's the reason it can be trusted at all.",
    date: "2026-05-18",
    readMinutes: 8,
  },
  {
    slug: "how-we-chose-our-first-five-courses",
    title: "How We Chose Our First Five Courses",
    excerpt: "Depth over catalog size. Here's the reasoning behind Curitiq's launch curriculum.",
    date: "2026-04-27",
    readMinutes: 5,
  },
  {
    slug: "quiet-progress-beats-loud-streaks",
    title: "Quiet Progress Beats Loud Streaks",
    excerpt: "What we learned watching people quit apps that punished a single missed day.",
    date: "2026-04-09",
    readMinutes: 7,
  },
];

export const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Achievement unlocked",
    description: "You earned “7-Day Streak.”",
    read: false,
  },
  {
    id: "n2",
    title: "Course content updated",
    description: "AI Tooling for Developers added a new lesson.",
    read: false,
  },
  {
    id: "n3",
    title: "Streak at risk",
    description: "Learn something today to keep your streak alive.",
    read: true,
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

export const STREAK = { days: 6, atRisk: false };
