import type { CourseSpec } from "../lib/course-spec-types.mts";

export const SPECS: CourseSpec[] = [
  // ---------------------------------------------------------------
  // UX Designer path (remaining 4 of 8)
  // ---------------------------------------------------------------
  {
    slug: "design-systems-fundamentals",
    title: "Design Systems Fundamentals",
    subtitle:
      "Why teams build design systems, what actually belongs in one, and how to keep it from becoming outdated documentation nobody trusts.",
    category: "ui-ux-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["ui-design", "design-systems"],
    skills: ["design-systems"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Explain what belongs in a design system beyond just a component library",
      "Structure design tokens so visual changes propagate without manual rework",
      "Keep a design system trusted and current as a product evolves",
    ],
    prerequisites: [{ courseSlug: "figma-fundamentals" }],
    modules: [
      {
        slug: "what-a-design-system-actually-is",
        title: "What a Design System Actually Is",
        description:
          "More than a component library — a shared language between design and engineering.",
        lessons: [
          {
            slug: "beyond-the-component-library",
            title: "Beyond the Component Library",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A design system includes components, but also design tokens (colors, spacing, typography as named values), usage guidelines, and accessibility standards — a component library alone is just one piece",
              "The real goal is consistency and speed — designers and engineers stop re-deciding solved problems (what does a warning look like, how much padding does a card need) for every new screen",
              "A design system used inconsistently is often worse than no design system — it creates false confidence that the product is unified when it isn't",
            ],
          },
          {
            slug: "design-tokens",
            title: "Design Tokens",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A design token is a named, reusable value (e.g. `color-primary`, `space-md`) referenced by components instead of a hardcoded value — changing the token updates every component that references it",
              "Tokens should be organized in tiers — primitive values (raw hex codes, pixel numbers) feeding semantic tokens (color-primary, color-danger) that components actually reference, insulating components from raw value changes",
              "Syncing tokens between design tools and code (rather than manually re-typing values in both places) is what actually prevents design and implementation from drifting apart over time",
            ],
            code: {
              language: "json",
              code: '{\n  "color": {\n    "primitive": { "blue-600": "#2563eb" },\n    "semantic": { "color-primary": "{color.primitive.blue-600}" }\n  }\n}',
            },
          },
        ],
      },
      {
        slug: "keeping-a-system-trusted",
        title: "Keeping a Design System Trusted",
        description: "The maintenance work that determines whether people actually use it.",
        lessons: [
          {
            slug: "governance-and-contribution",
            title: "Governance and Contribution Models",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A design system needs an owner and a clear process for proposing changes — without governance, components drift into inconsistent, undocumented variants across different teams",
              "A contribution model (who can propose a new component, how it gets reviewed) balances speed (teams shouldn't be blocked waiting for a central team) against consistency (unreviewed additions fragment the system)",
              "Deprecating old components explicitly, with a migration path, prevents a system from accumulating zombie components nobody uses but nobody removes either",
            ],
          },
          {
            slug: "design-systems-glossary",
            title: "Design Systems Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Design token",
                back: "A named, reusable design value (color, spacing, type) referenced by components instead of a hardcoded value.",
              },
              {
                front: "Semantic token",
                back: "A design token named by purpose (e.g. color-primary) that references an underlying primitive value.",
              },
              {
                front: "Governance model",
                back: "The defined process for who can propose, review, and approve changes to a design system.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "mini-design-system",
      title: "Build a Mini Design System",
      deliverables: [
        "A token structure (primitive and semantic tiers) for color, spacing, and typography",
        "5 documented components built using those tokens, with usage guidelines for each",
      ],
      rubric: [
        "Tokens are structured in tiers, not a flat unorganized list",
        "Component documentation includes clear usage guidance, not just a visual example",
      ],
    },
    resources: [
      {
        title: "Design Tokens W3C Community Group",
        type: "external-link",
        url: "https://www.w3.org/community/design-tokens/",
        description: "The evolving standard for design token formats.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the mini design system"],
  },
  {
    slug: "interaction-design-and-microinteractions",
    title: "Interaction Design and Microinteractions",
    subtitle:
      "The small moments — a button press, a loading state, a toggle animation — that quietly determine whether a product feels responsive or broken.",
    category: "ui-ux-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 105,
    tags: ["ui-design"],
    skills: ["interaction-design"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Design feedback states for every interactive element's full lifecycle",
      "Apply the anatomy of a microinteraction: trigger, rules, feedback, loops",
      "Use motion deliberately, not decoratively",
    ],
    prerequisites: [{ courseSlug: "ui-ux-design-foundations" }],
    modules: [
      {
        slug: "the-anatomy-of-feedback",
        title: "The Anatomy of Feedback",
        description:
          "Every interaction has a full lifecycle — most designs only show one frame of it.",
        lessons: [
          {
            slug: "interactive-element-states",
            title: "Designing Every State of an Interactive Element",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "A button isn't one state — it's default, hover, active/pressed, focus, loading, disabled, and error, each needing a deliberate design, not just a color swap left to a developer's guess",
              "Missing states are one of the most common gaps between a design file and a shipped product — an undesigned loading state gets implemented as a jarring blank screen or nothing at all",
              "Focus states specifically matter for keyboard accessibility — a beautiful hover state with no equivalent focus state locks out keyboard-only users",
            ],
          },
          {
            slug: "microinteraction-anatomy",
            title: "The Anatomy of a Microinteraction",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A microinteraction has four parts: a trigger (what starts it), rules (what happens), feedback (how the user perceives it happened), and loops/modes (what happens on repeat or edge cases)",
              "Good feedback is immediate — even a 100ms delay before showing any response to a user's tap or click starts to feel unresponsive",
              "Designing the trigger and rules without designing the feedback is the most common half-finished microinteraction — the user acts, and nothing visibly confirms it happened",
            ],
          },
        ],
      },
      {
        slug: "using-motion-deliberately",
        title: "Using Motion Deliberately",
        description: "Motion should communicate something, not just decorate.",
        lessons: [
          {
            slug: "motion-with-purpose",
            title: "Motion With Purpose, Not Decoration",
            kind: "code",
            durationMinutes: 16,
            points: [
              "Motion should communicate relationship and continuity — an element that slides in from where it was triggered helps users track what just happened, rather than appearing from nowhere",
              "Duration and easing matter more than most designers initially assume — a 300ms+ animation on a frequent interaction starts to feel sluggish; fast, subtle motion (150-200ms) usually reads as more polished",
              "Respect reduced-motion accessibility preferences — some users experience discomfort or distraction from animation and have explicitly opted out at the OS level; the interface should honor that",
            ],
            code: {
              language: "css",
              code: "@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }\n}",
            },
          },
          {
            slug: "interaction-design-glossary",
            title: "Interaction Design Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Microinteraction",
                back: "A small, focused interaction with a trigger, rules, feedback, and loop, like a toggle or a like button.",
              },
              {
                front: "Focus state",
                back: "The visual indication an element is currently selected via keyboard navigation, essential for accessibility.",
              },
              {
                front: "prefers-reduced-motion",
                back: "A user accessibility preference the interface should respect by minimizing or removing animation.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "microinteraction-states-spec",
      title: "Spec Every State for a Real Component",
      deliverables: [
        "A full state spec (default, hover, active, focus, loading, disabled, error) for one real interactive component",
        "A written microinteraction breakdown (trigger, rules, feedback, loop) for one interaction, with a reduced-motion consideration noted",
      ],
      rubric: [
        "All required states are present and visually distinct where they should be",
        "The microinteraction breakdown correctly identifies all four parts and considers reduced motion",
      ],
    },
    resources: [
      {
        title: "Material Design: Motion",
        type: "external-link",
        url: "https://m3.material.io/styles/motion/overview",
        description: "Google's Material Design guidance on motion principles.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the microinteraction states spec"],
  },
  {
    slug: "ux-writing-and-content-design",
    title: "UX Writing and Content Design",
    subtitle:
      "The words in an interface are part of the design — error messages, button labels, and empty states that either help or confuse.",
    category: "ui-ux-design",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["ui-design"],
    skills: ["ux-fundamentals"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Write clear, concise microcopy for common UI moments",
      "Write error messages that explain what happened and what to do next",
      "Design empty states that guide rather than just state absence",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "writing-clear-microcopy",
        title: "Writing Clear Microcopy",
        description:
          "Buttons, labels, and short strings that carry more weight than their length suggests.",
        lessons: [
          {
            slug: "clarity-over-cleverness",
            title: "Clarity Over Cleverness",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "A button labeled 'Delete account' is clearer than a clever alternative like 'Say goodbye' — clarity about consequences matters more than personality, especially for destructive or important actions",
              "Use verbs that match the actual action — 'Save' for saving, 'Delete' for deleting — vague labels like 'Continue' or 'OK' force users to guess what will actually happen",
              "Write for scanning, not reading — most users skim interface text rather than reading it fully, so front-load the most important word",
            ],
          },
          {
            slug: "error-messages-that-help",
            title: "Writing Error Messages That Actually Help",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A good error message explains what happened, why (if useful), and what to do next — 'Something went wrong' tells the user nothing actionable",
              "Avoid blaming the user or the system in the message tone — state the situation plainly and focus entirely on the path forward",
              "Be specific about the actual constraint — 'Password must be at least 8 characters' is far more useful than 'Invalid password'",
            ],
          },
        ],
      },
      {
        slug: "designing-empty-states",
        title: "Designing Empty States",
        description:
          "The moment before there's any content — an opportunity, not just a blank screen.",
        lessons: [
          {
            slug: "empty-states-that-guide",
            title: "Empty States That Guide Instead of Just Stating Absence",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A first-use empty state (nothing here yet because the user hasn't acted) should explain what will appear here and prompt the next action — a plain 'No items' misses the opportunity to guide someone",
              "A zero-results empty state (a search or filter that found nothing) should explain why and suggest a next step, like adjusting filters — distinct from a first-use empty state, and often confused with it",
              "An error-caused empty state (something failed to load) should be honest about the failure and offer a retry, distinct from both other empty state types",
            ],
          },
          {
            slug: "ux-writing-glossary",
            title: "UX Writing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Microcopy",
                back: "Short interface text — button labels, tooltips, helper text — that guides user action.",
              },
              {
                front: "Empty state",
                back: "The screen shown when there's no content yet, ideally guiding the user toward a next action.",
              },
              {
                front: "Zero-results state",
                back: "An empty state specifically caused by a search or filter finding no matches.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "content-design-audit",
      title: "Audit and Rewrite Interface Copy",
      deliverables: [
        "A rewrite of 5 vague or unhelpful interface strings (buttons, errors, empty states) with reasoning for each change",
        "A designed empty state for a first-use scenario, including the guiding copy",
      ],
      rubric: [
        "Rewritten copy is clearer and more actionable than the original, not just shorter",
        "The empty state genuinely guides the user toward a specific next action",
      ],
    },
    resources: [
      {
        title: "Nielsen Norman Group: Microcopy",
        type: "external-link",
        url: "https://www.nngroup.com/articles/microcopy/",
        description: "NN/g's overview of writing effective microcopy.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the content design audit"],
  },
  {
    slug: "accessible-design-practices",
    title: "Accessible Design Practices",
    subtitle:
      "Designing interfaces that genuinely work for people with different abilities — color contrast, keyboard navigation, and screen reader compatibility from the design stage, not bolted on after.",
    category: "ui-ux-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 110,
    tags: ["ui-design"],
    skills: ["ux-fundamentals"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Apply WCAG color contrast requirements when choosing a color palette",
      "Design layouts that work for keyboard-only navigation",
      "Design content that communicates correctly to screen reader users",
    ],
    prerequisites: [{ courseSlug: "ui-ux-design-foundations" }],
    modules: [
      {
        slug: "color-and-contrast",
        title: "Color and Contrast",
        description: "The most common, and most fixable, accessibility gap in real interfaces.",
        lessons: [
          {
            slug: "wcag-contrast-requirements",
            title: "WCAG Color Contrast Requirements",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "WCAG AA requires a 4.5:1 contrast ratio for normal text and 3:1 for large text against its background — this isn't a suggestion, it's the baseline most accessibility audits check first",
              "Never rely on color alone to convey information (e.g. red text meaning 'error') — pair color with an icon, label, or pattern so colorblind users get the same information",
              "Check contrast for every meaningful state, not just default — a low-contrast disabled or placeholder text state is a common overlooked gap",
            ],
          },
          {
            slug: "designing-for-color-blindness",
            title: "Designing for Color Blindness",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Roughly 1 in 12 men and 1 in 200 women have some form of color vision deficiency — this is a large enough population that designing around it is a baseline requirement, not an edge case",
              "Simulate common types of color blindness (deuteranopia, protanopia) on your actual designs — this quickly reveals where color-only distinctions genuinely fail",
              "Data visualizations are especially prone to color-only encoding — use patterns, labels, or distinct shapes alongside color in charts",
            ],
          },
        ],
      },
      {
        slug: "keyboard-and-screen-reader-support",
        title: "Keyboard Navigation and Screen Reader Support",
        description: "Designing for people who don't use a mouse or can't see the screen at all.",
        lessons: [
          {
            slug: "designing-for-keyboard-navigation",
            title: "Designing for Keyboard-Only Navigation",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Every interactive element needs a visible focus state and a logical tab order — a design where tabbing jumps unpredictably around the page is unusable for keyboard-only users",
              "Custom interactive components (a custom dropdown, a modal) need the same keyboard support as their native HTML equivalents — this often gets lost when designers and engineers build custom components without considering keyboard behavior",
              "A modal or dialog should trap focus within it while open, and return focus to the triggering element when closed — this is a specific, well-known pattern worth designing explicitly rather than leaving to chance",
            ],
          },
          {
            slug: "accessible-design-glossary",
            title: "Accessible Design Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "WCAG AA contrast ratio",
                back: "The minimum required contrast (4.5:1 normal text, 3:1 large text) for accessible color choices.",
              },
              {
                front: "Focus trap",
                back: "Keeping keyboard focus contained within an open modal or dialog until it's closed.",
              },
              {
                front: "Color vision deficiency",
                back: "A visual condition affecting how a user perceives certain colors, requiring information not be conveyed by color alone.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "accessibility-audit-and-fixes",
      title: "Accessibility Audit of a Real Screen",
      deliverables: [
        "A contrast audit of a real screen's text and UI elements against WCAG AA, flagging failures",
        "A redesign of one component to properly support keyboard navigation and focus management",
      ],
      rubric: [
        "The contrast audit uses actual measured ratios, not visual guesses",
        "The keyboard redesign correctly addresses focus order, visible focus state, and (if a modal) focus trapping",
      ],
    },
    resources: [
      {
        title: "WCAG 2.1 Quick Reference",
        type: "external-link",
        url: "https://www.w3.org/WAI/WCAG21/quickref/",
        description: "The official W3C WCAG 2.1 quick reference.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the accessibility audit and fixes"],
  },
  // ---------------------------------------------------------------
  // Product / Project Management / Business Analysis (8)
  // ---------------------------------------------------------------
  {
    slug: "product-management-foundations",
    title: "Product Management Foundations",
    subtitle:
      "What a product manager actually does day-to-day — prioritization, working with engineering and design, and making decisions with incomplete information.",
    category: "product-management",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["product"],
    skills: ["product-strategy"],
    careerPaths: ["product-manager"],
    instructor: {
      name: "Marcus Webb",
      title: "Group Product Manager, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Explain the core responsibilities of a PM across discovery, delivery, and strategy",
      "Prioritize a backlog using a structured framework, not gut feel alone",
      "Write a clear, testable product requirement",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "the-pm-role",
        title: "The Product Manager Role",
        description: "What PMs actually spend their time on, and what they don't own.",
        lessons: [
          {
            slug: "what-pms-actually-do",
            title: "What Product Managers Actually Do",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A PM doesn't manage people (usually) — they align a cross-functional team around what to build and why, without direct authority over engineering or design",
              "The job spans discovery (figuring out what problem is worth solving), delivery (shipping it well), and strategy (making sure it fits the broader product direction) — most PMs spend disproportionate time on delivery even though discovery often determines success",
              "'No' is one of the most important words a PM says — every accepted feature request is a tradeoff against everything else the team could build instead",
            ],
          },
          {
            slug: "working-with-engineering-and-design",
            title: "Working With Engineering and Design",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A PM's job is to bring clarity on the problem and constraints, not to specify the exact solution — engineers and designers are the domain experts on how, not just execution of a fully pre-decided plan",
              "Involve engineering early in discovery, not just at handoff — technical feasibility and effort estimates change what's actually worth prioritizing",
              "Trust is built through consistency — a PM who changes direction constantly without clear reasoning erodes the team's confidence in prioritization decisions over time",
            ],
          },
        ],
      },
      {
        slug: "prioritization-and-requirements",
        title: "Prioritization and Requirements",
        description:
          "Deciding what to build next, and writing it down clearly enough to actually build.",
        lessons: [
          {
            slug: "prioritization-frameworks",
            title: "Prioritization Frameworks",
            kind: "code",
            durationMinutes: 17,
            points: [
              "RICE (Reach, Impact, Confidence, Effort) scores each candidate feature to produce a comparable number, forcing explicit reasoning about tradeoffs instead of an unstated gut ranking",
              "A framework's real value is the conversation it forces, not the exact number it produces — two people scoring the same feature differently is a useful signal to discuss, not a bug in the framework",
              "No framework replaces judgment — use it to structure the discussion, but override it when there's a compelling qualitative reason (like a strategic bet or a customer commitment)",
            ],
            code: {
              language: "text",
              code: "RICE score = (Reach x Impact x Confidence) / Effort\nFeature A: (5000 x 2 x 0.8) / 3 = 2666\nFeature B: (500 x 3 x 1.0) / 1 = 1500\n-> Feature A scores higher, but discuss Feature B's Confidence assumption before finalizing",
            },
          },
          {
            slug: "writing-clear-requirements",
            title: "Writing Clear, Testable Requirements",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A good requirement states the user need and the acceptance criteria, not the implementation — 'implementation' decisions belong to engineering, not the requirement doc",
              "Acceptance criteria should be specific enough that anyone (not just the person who wrote it) could verify whether the built feature actually satisfies them",
              "Ambiguous requirements ('make search better') are a recurring, preventable source of wasted engineering effort — push for specificity before work begins, not after",
            ],
          },
        ],
      },
    ],
    project: {
      slug: "prioritized-roadmap-and-prd",
      title: "Prioritize a Backlog and Write a PRD",
      deliverables: [
        "A RICE-scored prioritization of 6 hypothetical feature candidates with reasoning",
        "A one-page PRD for the top-scored feature, including clear, testable acceptance criteria",
      ],
      rubric: [
        "RICE scoring reasoning is explicit and defensible for each factor, not just a final number",
        "The PRD's acceptance criteria are specific enough to be independently verified",
      ],
    },
    resources: [
      {
        title: "Intercom: RICE Prioritization",
        type: "external-link",
        url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/",
        description: "The original explanation of the RICE prioritization framework.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the prioritized roadmap and PRD"],
  },
  {
    slug: "product-strategy-and-roadmapping",
    title: "Product Strategy and Roadmapping",
    subtitle:
      "Connecting daily prioritization decisions to a coherent longer-term direction — and communicating that direction so a whole team can act on it.",
    category: "product-management",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["product"],
    skills: ["product-strategy", "roadmapping"],
    careerPaths: ["product-manager"],
    instructor: {
      name: "Marcus Webb",
      title: "Group Product Manager, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Write a product strategy that connects vision to concrete near-term bets",
      "Build a roadmap organized around outcomes, not just feature dates",
      "Communicate a roadmap clearly to different stakeholder audiences",
    ],
    prerequisites: [{ courseSlug: "product-management-foundations" }],
    modules: [
      {
        slug: "from-vision-to-strategy",
        title: "From Vision to Strategy",
        description: "A vision without a strategy is just a slogan.",
        lessons: [
          {
            slug: "what-makes-a-real-strategy",
            title: "What Makes a Real Strategy, Not Just a Vision Statement",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A vision states where you're going ('be the default tool for X') — a strategy makes specific, falsifiable bets about how you'll get there, and just as importantly, what you're choosing not to do",
              "A strategy that doesn't rule anything out isn't really a strategy — if it can justify literally any roadmap decision, it's providing no actual guidance",
              "Good strategy is grounded in a specific diagnosis of the current situation (market gap, competitive pressure, user need) — a strategy with no diagnosis is usually just aspiration",
            ],
          },
          {
            slug: "outcome-based-roadmaps",
            title: "Outcome-Based Roadmaps",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A feature-and-date roadmap ('Ship X by Q3') optimizes for shipping things, not for whether those things actually work — an outcome-based roadmap organizes around goals ('reduce onboarding drop-off by 20%') with features as hypotheses to test",
              "Outcome-based roadmaps handle uncertainty more honestly — they don't pretend to know in month 1 exactly which feature will achieve the goal by month 6",
              "This approach requires more trust from stakeholders who are used to fixed feature commitments — communicating the tradeoff (flexibility for better outcomes vs. certainty of a fixed date) matters as much as the roadmap itself",
            ],
          },
        ],
      },
      {
        slug: "communicating-the-roadmap",
        title: "Communicating the Roadmap",
        description: "The same roadmap, told differently to different audiences, on purpose.",
        lessons: [
          {
            slug: "roadmap-for-different-audiences",
            title: "Presenting a Roadmap to Different Audiences",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Executives want to know the roadmap serves the business strategy — lead with outcomes and business impact, not feature-level detail",
              "Engineering wants specificity and sequencing logic — they need enough detail to plan technical work and flag dependencies or risks early",
              "Sales and customer-facing teams want to know what they can credibly promise and when — vague timelines create problems downstream when a customer is told something inaccurate",
            ],
          },
          {
            slug: "product-strategy-glossary",
            title: "Product Strategy Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Outcome-based roadmap",
                back: "A roadmap organized around goals to achieve, with features treated as hypotheses rather than fixed commitments.",
              },
              {
                front: "Strategic diagnosis",
                back: "A specific analysis of the current situation that a strategy is built to respond to.",
              },
              {
                front: "Strategic trade-off",
                back: "A deliberate choice of what not to pursue, which is what makes a strategy actually guide decisions.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "strategy-and-roadmap",
      title: "Write a Product Strategy and Outcome-Based Roadmap",
      deliverables: [
        "A one-page strategy including a diagnosis, guiding policy, and 3 specific near-term bets",
        "An outcome-based roadmap for the next 2 quarters tied to that strategy",
      ],
      rubric: [
        "The strategy includes a genuine diagnosis and explicit trade-offs, not just aspirational goals",
        "The roadmap is organized around measurable outcomes, not just a feature list with dates",
      ],
    },
    resources: [
      {
        title: "Silicon Valley Product Group: Product Strategy",
        type: "external-link",
        url: "https://www.svpg.com/category/product-strategy/",
        description:
          "Articles on product strategy from a well-known product leadership consultancy.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the strategy and roadmap"],
  },
  {
    slug: "agile-and-scrum-fundamentals",
    title: "Agile and Scrum Fundamentals",
    subtitle:
      "The actual mechanics of running (or working within) a Scrum team — sprints, ceremonies, and the difference between doing Scrum and being agile.",
    category: "project-management",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["project-management", "agile"],
    skills: ["agile-fundamentals", "sprint-planning"],
    careerPaths: ["project-manager", "product-manager"],
    instructor: {
      name: "Marcus Webb",
      title: "Group Product Manager, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Explain the Scrum roles, artifacts, and ceremonies and what each is for",
      "Run an effective sprint planning session and retrospective",
      "Distinguish being agile from performing Scrum rituals",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "scrum-mechanics",
        title: "Scrum Mechanics",
        description: "Roles, artifacts, and ceremonies — the actual structure of Scrum.",
        lessons: [
          {
            slug: "roles-artifacts-ceremonies",
            title: "Scrum Roles, Artifacts, and Ceremonies",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "The three Scrum roles are Product Owner (owns the backlog and priorities), Scrum Master (owns the process and removes blockers), and the Development Team (builds the work) — conflating these roles is a common source of dysfunction",
              "The key artifacts are the product backlog (everything that could be built), the sprint backlog (what's committed for this sprint), and the increment (the actual working output of the sprint)",
              "The ceremonies — sprint planning, daily standup, sprint review, and retrospective — each serve a distinct purpose; skipping the retrospective specifically is a common mistake that prevents a team from actually improving over time",
            ],
          },
          {
            slug: "running-sprint-planning",
            title: "Running Effective Sprint Planning",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Sprint planning should answer two questions: what can be delivered this sprint, and how will the team deliver it — skipping the second question leads to a sprint backlog that looks committed but isn't actually planned",
              "A backlog that isn't refined (estimated, clarified) before planning turns the planning meeting into an ad hoc discovery session, wasting the whole team's time",
              "Sprint capacity should account for realistic availability (meetings, on-call, time off), not an idealized 100% coding time — overcommitting a sprint repeatedly erodes trust in future estimates",
            ],
          },
        ],
      },
      {
        slug: "agile-vs-scrum-theater",
        title: "Being Agile vs. Doing Scrum Theater",
        description: "Running the ceremonies isn't the same as actually being adaptive.",
        lessons: [
          {
            slug: "avoiding-scrum-theater",
            title: "Avoiding Scrum Theater",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Scrum theater is running all the ceremonies precisely while missing the actual point — a standup that's a status report to a manager instead of the team coordinating with each other is theater, not agility",
              "The Agile Manifesto values individuals and interactions over processes and tools — a rigid, unquestioned process applied without adaptation contradicts the philosophy it claims to follow",
              "A genuinely effective retrospective changes something concrete about how the team works — a retrospective that produces the same vague action items sprint after sprint has stopped being useful",
            ],
          },
          {
            slug: "agile-scrum-glossary",
            title: "Agile and Scrum Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Sprint backlog",
                back: "The specific set of work items the team has committed to complete during the current sprint.",
              },
              {
                front: "Retrospective",
                back: "A recurring Scrum ceremony where the team reflects on how it worked and identifies concrete improvements.",
              },
              {
                front: "Scrum theater",
                back: "Running Scrum ceremonies precisely while missing their actual purpose of adaptive, effective teamwork.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "sprint-plan-and-retro",
      title: "Plan a Sprint and Run a Retrospective",
      deliverables: [
        "A sprint plan for a hypothetical team, including a realistically-sized sprint backlog based on stated capacity",
        "A retrospective summary with at least 2 concrete, owned action items (not vague intentions)",
      ],
      rubric: [
        "The sprint backlog is realistically sized against the stated capacity, not overcommitted",
        "Retrospective action items are specific, owned, and would produce an observable process change",
      ],
    },
    resources: [
      {
        title: "The Scrum Guide",
        type: "external-link",
        url: "https://scrumguides.org/",
        description: "The official, definitive guide to Scrum.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the sprint plan and retrospective"],
  },
  {
    slug: "project-management-fundamentals",
    title: "Project Management Fundamentals",
    subtitle:
      "The core discipline of getting a defined piece of work done — scope, schedule, budget, and the tradeoffs between them that every project eventually faces.",
    category: "project-management",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["project-management"],
    skills: ["scope-management", "gantt-scheduling"],
    careerPaths: ["project-manager"],
    instructor: {
      name: "Diane Foster",
      title: "Senior Program Manager, ex-Deloitte",
      avatarInitials: "DF",
    },
    objectives: [
      "Define a project's scope clearly enough to recognize scope creep when it happens",
      "Build a basic project schedule with dependencies identified",
      "Navigate the triple constraint of scope, schedule, and budget",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "defining-scope-and-schedule",
        title: "Defining Scope and Schedule",
        description: "What's in, what's out, and in what order it happens.",
        lessons: [
          {
            slug: "scope-definition-and-creep",
            title: "Scope Definition and Scope Creep",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A scope statement should explicitly list what's out of scope, not just what's in — 'we didn't discuss X' is a much weaker defense against scope creep than 'X was explicitly listed as out of scope'",
              "Scope creep is rarely one dramatic addition — it's usually many small, individually reasonable-sounding requests that collectively derail the schedule and budget",
              "A formal change request process, even a lightweight one, forces scope changes to be visible and deliberate rather than silently absorbed",
            ],
          },
          {
            slug: "building-a-schedule-with-dependencies",
            title: "Building a Schedule With Dependencies",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Identify task dependencies before estimating a schedule — a task that can't start until another finishes determines the project's critical path, and delays anywhere on that path delay the whole project",
              "The critical path is the longest sequence of dependent tasks — tasks not on the critical path have slack (can slip somewhat without delaying the project), but critical path tasks have none",
              "A Gantt chart visualizes tasks, durations, and dependencies over time — its real value is making the critical path and its risk visible to everyone, not just being a pretty timeline",
            ],
            code: {
              language: "text",
              code: "Task A (5 days) -> Task B (3 days) -> Task D (2 days)   <- critical path, 10 days total\nTask A (5 days) -> Task C (2 days) -> Task D (2 days)   <- has 1 day of slack",
            },
          },
        ],
      },
      {
        slug: "the-triple-constraint",
        title: "The Triple Constraint",
        description:
          "Scope, schedule, and budget — you can't change one without affecting the others.",
        lessons: [
          {
            slug: "navigating-tradeoffs",
            title: "Navigating Scope, Schedule, and Budget Tradeoffs",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "You generally can't hold all three (scope, schedule, budget) fixed while something changes — reduce scope, extend the schedule, or add resources/budget when new information emerges",
              "Silently absorbing pressure on all three simultaneously (more scope, same deadline, same budget) is how projects quietly become impossible to deliver well",
              "Surface the tradeoff explicitly to stakeholders when it arises — 'we can hit this date if we cut X' is a real decision they should make, not one a project manager should just absorb silently",
            ],
          },
          {
            slug: "project-management-glossary",
            title: "Project Management Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Scope creep",
                back: "The gradual, often unnoticed expansion of a project's scope beyond what was originally agreed.",
              },
              {
                front: "Critical path",
                back: "The longest sequence of dependent tasks in a project, determining the minimum possible duration.",
              },
              {
                front: "Triple constraint",
                back: "The interdependence of scope, schedule, and budget — changing one affects the others.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "project-plan-with-schedule",
      title: "Build a Project Plan With a Dependency-Based Schedule",
      deliverables: [
        "A scope statement for a realistic project, explicitly listing in-scope and out-of-scope items",
        "A schedule of at least 8 tasks with dependencies identified and the critical path marked",
      ],
      rubric: [
        "The scope statement would genuinely help prevent scope creep in a real project",
        "The critical path is correctly identified based on the stated task dependencies",
      ],
    },
    resources: [
      {
        title: "PMI: Project Management Body of Knowledge Overview",
        type: "external-link",
        url: "https://www.pmi.org/pmbok-guide-standards",
        description: "The Project Management Institute's overview of PMBOK.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the project plan with schedule"],
  },
  {
    slug: "stakeholder-management-and-communication",
    title: "Stakeholder Management and Communication",
    subtitle:
      "Keeping the right people informed and aligned at the right level of detail — the skill that determines whether a well-run project still feels chaotic to outsiders.",
    category: "project-management",
    difficulty: "intermediate",
    estimatedDurationMinutes: 105,
    tags: ["project-management", "communication"],
    skills: ["stakeholder-management"],
    careerPaths: ["project-manager", "business-analyst"],
    instructor: {
      name: "Diane Foster",
      title: "Senior Program Manager, ex-Deloitte",
      avatarInitials: "DF",
    },
    objectives: [
      "Map stakeholders by influence and interest to prioritize communication effort",
      "Deliver a clear, honest status update including bad news",
      "Manage conflicting stakeholder priorities without letting the project drift",
    ],
    prerequisites: [{ courseSlug: "project-management-fundamentals" }],
    modules: [
      {
        slug: "mapping-and-prioritizing-stakeholders",
        title: "Mapping and Prioritizing Stakeholders",
        description: "Not everyone needs the same level of attention.",
        lessons: [
          {
            slug: "stakeholder-mapping",
            title: "Stakeholder Mapping by Influence and Interest",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Map stakeholders on two axes — influence (how much power they have over the project) and interest (how much they care about the outcome) — to decide the right level of engagement for each",
              "High influence, high interest stakeholders need close, frequent engagement — low influence, low interest stakeholders just need periodic, lightweight updates",
              "Missing a high-influence, currently-low-interest stakeholder is a common trap — they can derail a project late if they suddenly become engaged without having been kept informed",
            ],
          },
          {
            slug: "tailored-communication",
            title: "Tailoring Communication to the Audience",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "An executive sponsor wants a concise status and clear risks — a working-level stakeholder wants enough detail to coordinate their own team's dependent work",
              "Match communication frequency to the stakeholder's actual need, not a single one-size-fits-all cadence — over-communicating to a low-interest stakeholder wastes their attention and yours",
              "Written status updates should be scannable — lead with status (on track / at risk / off track) before the supporting detail, not the other way around",
            ],
          },
        ],
      },
      {
        slug: "delivering-hard-news",
        title: "Delivering Hard News and Managing Conflict",
        description: "The moments that actually test stakeholder management skill.",
        lessons: [
          {
            slug: "delivering-bad-news-early",
            title: "Delivering Bad News Early and Clearly",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Bad news delivered early, with a plan, is manageable — bad news discovered late, with no plan, damages trust far more than the news itself",
              "State the situation plainly, its impact, and your proposed path forward — burying a problem in vague language ('some challenges have emerged') reads as evasive even when unintentional",
              "A stakeholder who hears bad news directly from the project lead, rather than secondhand, is far more likely to stay a constructive partner in solving it",
            ],
          },
          {
            slug: "stakeholder-glossary",
            title: "Stakeholder Management Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Stakeholder mapping",
                back: "Categorizing stakeholders by influence and interest to prioritize communication effort appropriately.",
              },
              {
                front: "Status: at risk",
                back: "A project status indicating a risk exists that could impact delivery if unaddressed, short of already off track.",
              },
              {
                front: "Tailored communication",
                back: "Adjusting the content, detail, and frequency of updates to match each stakeholder's actual needs.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "stakeholder-map-and-status-update",
      title: "Build a Stakeholder Map and Write a Status Update",
      deliverables: [
        "A stakeholder map for a realistic project, categorized by influence and interest with a communication plan for each group",
        "A written status update delivering a piece of genuinely bad news clearly, including impact and a proposed path forward",
      ],
      rubric: [
        "The stakeholder map correctly differentiates engagement approaches by quadrant, not one generic plan for everyone",
        "The status update states the bad news plainly and includes a credible next step",
      ],
    },
    resources: [
      {
        title: "PMI: Stakeholder Engagement",
        type: "external-link",
        url: "https://www.pmi.org/learning/library/stakeholder-engagement-planning-model-9591",
        description: "PMI's guidance on stakeholder engagement planning.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the stakeholder map and status update"],
  },
  {
    slug: "business-analysis-fundamentals",
    title: "Business Analysis Fundamentals",
    subtitle:
      "The discipline of figuring out what a business actually needs before jumping to a solution — process mapping, gap analysis, and asking the right questions.",
    category: "business-analysis",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["business"],
    skills: ["process-mapping"],
    careerPaths: ["business-analyst"],
    instructor: {
      name: "Diane Foster",
      title: "Senior Program Manager, ex-Deloitte",
      avatarInitials: "DF",
    },
    objectives: [
      "Distinguish a business problem from a proposed solution prematurely assumed",
      "Map a current-state process to identify inefficiencies",
      "Conduct a basic gap analysis between current and desired state",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "problems-vs-solutions",
        title: "Problems vs. Prematurely Assumed Solutions",
        description: "The most common failure in business analysis: skipping straight to a fix.",
        lessons: [
          {
            slug: "separating-problem-from-solution",
            title: "Separating the Problem From a Premature Solution",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "'We need a new CRM' is a solution, not a problem — the actual problem might be 'sales reps lose track of follow-ups,' which could be solved several different ways, not necessarily by a new tool",
              "Stakeholders often present solutions because that's how the problem occurred to them — a business analyst's job includes asking 'what problem would this solve' to get back to the actual underlying need",
              "The Five Whys technique (repeatedly asking 'why' about a stated problem) is a simple, effective way to dig past a surface-level request to its root cause",
            ],
          },
          {
            slug: "process-mapping-basics",
            title: "Process Mapping Basics",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A current-state process map documents how work actually happens today, including the messy exceptions — mapping the idealized version instead of reality misses the actual inefficiencies",
              "Look specifically for handoffs between people or systems — this is where delays, dropped information, and errors most commonly accumulate in a real process",
              "Map the process by observing or interviewing the people who actually do the work, not just by asking a manager who describes the intended process rather than the real one",
            ],
            code: {
              language: "text",
              code: "Current state: Customer submits request -> sits in shared inbox (avg 2 days) -> manually assigned -> rep manually checks 3 systems for context -> responds\nBottleneck: manual assignment + manual context-gathering, both handoff points",
            },
          },
        ],
      },
      {
        slug: "gap-analysis",
        title: "Gap Analysis",
        description: "Comparing where things are to where they need to be.",
        lessons: [
          {
            slug: "current-state-vs-desired-state",
            title: "Current State vs. Desired State",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A gap analysis compares the current state (documented via process mapping) against a clearly defined desired state — without both sides defined concretely, the 'gap' stays vague and unactionable",
              "Prioritize gaps by their actual business impact, not just how easy they'd be to fix — an easy fix for a minor gap is less valuable than a harder fix for a major one",
              "Some gaps are process gaps (the workflow is inefficient) and some are capability gaps (the team lacks a skill or tool) — the recommended fix differs significantly depending on which type it is",
            ],
          },
          {
            slug: "business-analysis-glossary",
            title: "Business Analysis Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Five Whys",
                back: "A technique of repeatedly asking 'why' to trace a stated problem back to its root cause.",
              },
              {
                front: "Current-state process map",
                back: "A documented view of how a process actually works today, including real exceptions and handoffs.",
              },
              {
                front: "Gap analysis",
                back: "A structured comparison between current state and desired state to identify specific, prioritized gaps.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "process-map-and-gap-analysis",
      title: "Map a Process and Conduct a Gap Analysis",
      deliverables: [
        "A current-state process map for a realistic business workflow, with handoff points identified",
        "A gap analysis comparing current state to a defined desired state, with prioritized findings",
      ],
      rubric: [
        "The process map reflects realistic messiness (exceptions, handoffs), not an idealized flow",
        "Gap analysis findings are prioritized by business impact with clear reasoning",
      ],
    },
    resources: [
      {
        title: "IIBA: Business Analysis Body of Knowledge",
        type: "external-link",
        url: "https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/",
        description: "The International Institute of Business Analysis's core standard reference.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the process map and gap analysis"],
  },
  {
    slug: "requirements-gathering-and-user-stories",
    title: "Requirements Gathering and User Stories",
    subtitle:
      "Turning stakeholder conversations into requirements a team can actually build from — user stories, acceptance criteria, and avoiding ambiguity that costs time later.",
    category: "business-analysis",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["business"],
    skills: ["requirements-gathering", "user-story-writing"],
    careerPaths: ["business-analyst", "product-manager"],
    instructor: {
      name: "Diane Foster",
      title: "Senior Program Manager, ex-Deloitte",
      avatarInitials: "DF",
    },
    objectives: [
      "Elicit requirements through structured stakeholder interviews and workshops",
      "Write user stories with clear, testable acceptance criteria",
      "Identify and resolve conflicting requirements between stakeholders",
    ],
    prerequisites: [{ courseSlug: "business-analysis-fundamentals" }],
    modules: [
      {
        slug: "eliciting-requirements",
        title: "Eliciting Requirements",
        description: "Getting the real requirement, not just the first thing someone says.",
        lessons: [
          {
            slug: "requirements-elicitation-techniques",
            title: "Requirements Elicitation Techniques",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "One-on-one interviews surface individual perspective and detail — workshops with multiple stakeholders surface disagreement and conflicting priorities that a series of separate interviews would miss entirely",
              "Ask about edge cases and exceptions explicitly, not just the happy path — stakeholders default to describing the normal case unless specifically prompted for exceptions",
              "Document and confirm requirements back to the stakeholder in writing — an unconfirmed verbal understanding is one of the most common sources of later disputes about what was actually agreed",
            ],
          },
          {
            slug: "resolving-conflicting-requirements",
            title: "Resolving Conflicting Stakeholder Requirements",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Conflicting requirements between stakeholders are normal, not a sign something went wrong — surface the conflict explicitly rather than quietly picking one side or trying to satisfy both with a vague compromise",
              "Trace conflicting requirements back to underlying goals — two stakeholders often want different things because they're optimizing for different underlying business goals worth surfacing explicitly",
              "Escalate genuinely unresolvable conflicts to whoever has decision authority, with both perspectives represented fairly — don't let a requirements document quietly resolve a conflict that stakeholders themselves haven't actually agreed on",
            ],
          },
        ],
      },
      {
        slug: "user-stories-and-acceptance-criteria",
        title: "User Stories and Acceptance Criteria",
        description:
          "The format that turns a requirement into something a team can build and verify.",
        lessons: [
          {
            slug: "writing-user-stories",
            title: "Writing User Stories",
            kind: "code",
            durationMinutes: 17,
            points: [
              "The standard format — 'As a [user], I want [goal], so that [benefit]' — forces you to state who benefits and why, not just what to build, which keeps the team focused on the actual value",
              "A story should be small enough to complete within a sprint — a story that's too large ('as a user, I want a dashboard') should be split into smaller, independently valuable stories",
              "INVEST is a useful checklist for a good story: Independent, Negotiable, Valuable, Estimable, Small, Testable",
            ],
            code: {
              language: "text",
              code: "As a returning customer, I want my saved payment method pre-filled at checkout, so that I can complete a purchase faster.\n\nAcceptance criteria:\n- Saved card shows as pre-selected if one exists\n- User can still choose a different payment method\n- No saved card is shown if none exists (no error state)",
            },
          },
          {
            slug: "requirements-glossary",
            title: "Requirements Gathering Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Elicitation",
                back: "The structured process of drawing out requirements from stakeholders through interviews, workshops, or observation.",
              },
              {
                front: "INVEST",
                back: "A checklist for good user stories: Independent, Negotiable, Valuable, Estimable, Small, Testable.",
              },
              {
                front: "Acceptance criteria",
                back: "Specific, testable conditions that must be true for a requirement or story to be considered complete.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "requirements-and-user-stories",
      title: "Elicit Requirements and Write User Stories",
      deliverables: [
        "A documented set of requirements for a realistic feature, elicited from a hypothetical set of stakeholder inputs, including one identified conflict and its resolution",
        "5 user stories with clear acceptance criteria derived from those requirements",
      ],
      rubric: [
        "The requirements document identifies and resolves at least one genuine stakeholder conflict",
        "User stories follow the standard format and have specific, testable acceptance criteria",
      ],
    },
    resources: [
      {
        title: "Mountain Goat Software: User Stories",
        type: "external-link",
        url: "https://www.mountaingoatsoftware.com/agile/user-stories",
        description: "A widely referenced practical guide to writing user stories.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the requirements and user stories"],
  },
  {
    slug: "risk-management-for-projects",
    title: "Risk Management for Projects",
    subtitle:
      "Identifying what could go wrong before it does, and building a response plan instead of reacting in the moment.",
    category: "project-management",
    difficulty: "intermediate",
    estimatedDurationMinutes: 105,
    tags: ["project-management"],
    skills: ["risk-management"],
    careerPaths: ["project-manager", "business-analyst"],
    instructor: {
      name: "Diane Foster",
      title: "Senior Program Manager, ex-Deloitte",
      avatarInitials: "DF",
    },
    objectives: [
      "Identify project risks systematically, not just the obvious ones",
      "Score risks by probability and impact to prioritize response effort",
      "Build response plans for the highest-priority risks before they occur",
    ],
    prerequisites: [{ courseSlug: "project-management-fundamentals" }],
    modules: [
      {
        slug: "identifying-and-scoring-risk",
        title: "Identifying and Scoring Risk",
        description:
          "Finding risks systematically, then deciding which ones actually deserve attention.",
        lessons: [
          {
            slug: "systematic-risk-identification",
            title: "Systematic Risk Identification",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Brainstorm risks across categories (technical, resource, schedule, external/market) systematically rather than relying only on whatever risks happen to come to mind first",
              "Review risks from past similar projects — the same categories of risk (a key dependency slipping, an underestimated task) tend to recur across projects at a given organization",
              "A risk register documenting each identified risk, its owner, and status keeps risk management visible and accountable rather than existing only in someone's head",
            ],
          },
          {
            slug: "scoring-probability-and-impact",
            title: "Scoring Risks by Probability and Impact",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Score each risk on probability (how likely) and impact (how bad if it happens) — a risk matrix combining these two dimensions helps prioritize where response effort actually goes",
              "A low-probability, high-impact risk (a key vendor going out of business) still deserves a response plan, even though it's easy to deprioritize because it 'probably won't happen'",
              "Re-score risks periodically as the project progresses — a risk's probability and impact can change significantly as circumstances evolve",
            ],
            code: {
              language: "text",
              code: "Risk matrix (Probability x Impact):\nHigh probability + High impact -> respond immediately\nLow probability + High impact -> have a contingency plan ready\nHigh probability + Low impact -> monitor, mitigate cheaply\nLow probability + Low impact -> accept and move on",
            },
          },
        ],
      },
      {
        slug: "responding-to-risk",
        title: "Responding to Risk",
        description:
          "Four standard response strategies, chosen deliberately rather than defaulted into.",
        lessons: [
          {
            slug: "risk-response-strategies",
            title: "Risk Response Strategies",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Avoid (change the plan to eliminate the risk), mitigate (reduce probability or impact), transfer (shift the risk, e.g. via insurance or a vendor contract), or accept (consciously decide the risk is tolerable) — four standard strategies, chosen deliberately for each risk",
              "'Accept' is a legitimate strategy for low-priority risks — the mistake isn't accepting a risk, it's accepting it silently without ever having consciously decided to",
              "A contingency plan for a high-impact risk should be prepared before the risk materializes — writing a response plan during an active crisis is much worse than having one ready in advance",
            ],
          },
          {
            slug: "risk-management-glossary",
            title: "Risk Management Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Risk register",
                back: "A documented log of identified project risks, their scores, owners, and current status.",
              },
              {
                front: "Risk matrix",
                back: "A tool combining probability and impact scores to prioritize which risks need active response.",
              },
              {
                front: "Contingency plan",
                back: "A prepared response plan for a risk, ready to execute if that risk actually occurs.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "risk-register-and-response-plan",
      title: "Build a Risk Register and Response Plans",
      deliverables: [
        "A risk register of at least 8 risks for a realistic project, scored by probability and impact",
        "Response strategies (avoid/mitigate/transfer/accept) with a written contingency plan for the top 2 highest-priority risks",
      ],
      rubric: [
        "Risks span multiple categories (technical, resource, schedule, external), not just one type",
        "Response strategies are appropriately matched to each risk's score, with concrete contingency plans for top risks",
      ],
    },
    resources: [
      {
        title: "PMI: Project Risk Management Overview",
        type: "external-link",
        url: "https://www.pmi.org/learning/library/risk-management-project-success-7482",
        description: "PMI's overview of risk management in project delivery.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the risk register and response plans"],
  },
  // ---------------------------------------------------------------
  // Digital Marketing (8)
  // ---------------------------------------------------------------
  {
    slug: "digital-marketing-foundations",
    title: "Digital Marketing Foundations",
    subtitle:
      "How the major digital marketing channels fit together — and how to reason about which one actually deserves budget for a given goal.",
    category: "digital-marketing",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["marketing"],
    skills: ["content-strategy"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Explain the major digital marketing channels and what each is good at",
      "Distinguish paid, owned, and earned media",
      "Match a marketing goal to the appropriate channel mix",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "the-channel-landscape",
        title: "The Channel Landscape",
        description: "Search, social, email, and content — different tools for different jobs.",
        lessons: [
          {
            slug: "major-channels-overview",
            title: "Major Digital Marketing Channels",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Search (SEO and paid search) captures existing demand — people already looking for something — while social media largely creates or interrupts attention rather than capturing an active search intent",
              "Email marketing is uniquely effective for retention and repeat engagement with people who've already opted in, but does nothing for reaching entirely new audiences",
              "Content marketing (blog posts, guides, videos) builds compounding organic value over time but has a much slower payoff than paid channels, which stop producing results the moment spend stops",
            ],
          },
          {
            slug: "paid-owned-earned-media",
            title: "Paid, Owned, and Earned Media",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Paid media is anything you pay directly for reach (ads) — fast but stops working the moment budget stops",
              "Owned media is anything you control directly (your website, your email list, your app) — durable but requires you to already have an audience to reach through it",
              "Earned media is attention you didn't pay for or fully control (press coverage, word of mouth, organic shares) — the highest-trust category, but also the least controllable",
            ],
          },
        ],
      },
      {
        slug: "matching-goals-to-channels",
        title: "Matching Goals to Channels",
        description:
          "Not every channel fits every goal — a common early-career marketing mistake is treating them interchangeably.",
        lessons: [
          {
            slug: "channel-selection-by-goal",
            title: "Selecting Channels by Marketing Goal",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Awareness goals favor channels with broad reach (social, display ads, PR) — conversion goals favor channels that reach people already close to a decision (search ads, retargeting, email)",
              "A limited budget spread thin across every channel usually underperforms a focused budget concentrated on the one or two channels best matched to the specific goal and audience",
              "Test small before scaling spend on any channel — early signal (cost per result, engagement quality) tells you whether a channel is actually working for this specific goal before committing a large budget",
            ],
          },
          {
            slug: "digital-marketing-glossary",
            title: "Digital Marketing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Owned media",
                back: "Marketing channels a company fully controls, like its website or email list.",
              },
              {
                front: "Earned media",
                back: "Attention gained without direct payment, like press coverage or organic word of mouth.",
              },
              {
                front: "Retargeting",
                back: "Advertising specifically targeted at people who've already interacted with a brand, aimed at conversion.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "channel-strategy-plan",
      title: "Build a Channel Strategy for a Marketing Goal",
      deliverables: [
        "A channel mix recommendation for a stated marketing goal (e.g. launch awareness vs. lead conversion), with reasoning for each chosen channel",
        "A budget allocation across the recommended channels with justification",
      ],
      rubric: [
        "The channel selection is clearly matched to the stated goal, not a generic 'use everything' answer",
        "Budget allocation reasoning reflects an understanding of each channel's actual strengths",
      ],
    },
    resources: [
      {
        title: "HubSpot: Digital Marketing Overview",
        type: "external-link",
        url: "https://blog.hubspot.com/marketing/what-is-digital-marketing",
        description: "An overview of core digital marketing channels and concepts.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the channel strategy plan"],
  },
  {
    slug: "seo-fundamentals",
    title: "SEO Fundamentals",
    subtitle:
      "How search engines actually decide what to rank — keyword research, on-page optimization, and why most 'SEO tricks' don't work anymore.",
    category: "seo",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["seo"],
    skills: ["seo-fundamentals", "keyword-research"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Conduct keyword research that reflects genuine search intent",
      "Apply on-page SEO best practices to a piece of content",
      "Explain why backlinks and content quality still matter more than technical tricks",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "keyword-research-and-intent",
        title: "Keyword Research and Search Intent",
        description:
          "Finding what people actually search for, and what they actually want when they do.",
        lessons: [
          {
            slug: "keyword-research-basics",
            title: "Keyword Research Basics",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Search volume alone is a poor targeting metric — a high-volume keyword with intent that doesn't match what you offer will rank you for traffic that never converts",
              "Long-tail keywords (longer, more specific phrases) have lower volume individually but collectively capture significant traffic, and often convert better because the searcher's intent is more specific",
              "Look at what's currently ranking for a target keyword — if the results are all a different content type (e.g. all product pages when you're planning a blog post), that's a signal about what search intent actually expects there",
            ],
          },
          {
            slug: "search-intent-types",
            title: "Types of Search Intent",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Informational intent ('how does X work') wants an explanation — navigational intent ('X login') wants a specific known destination — transactional intent ('buy X') wants to complete a purchase or action",
              "Matching content type to intent matters as much as matching the keyword — a product page targeting an informational-intent keyword will underperform an in-depth guide, regardless of keyword targeting accuracy",
              "Intent can shift for the same keyword over time as the underlying user need or the competitive landscape changes — keyword research isn't a one-time exercise",
            ],
          },
        ],
      },
      {
        slug: "on-page-and-off-page-seo",
        title: "On-Page SEO and Why Backlinks Still Matter",
        description:
          "What you can control on the page, and why what other sites say about you still matters.",
        lessons: [
          {
            slug: "on-page-optimization",
            title: "On-Page SEO Optimization",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Title tags and meta descriptions matter for both ranking signal and click-through rate from the results page — a technically optimized but unappealing title still underperforms",
              "Header structure (a single clear H1, logically nested H2s/H3s) helps both search engines and readers understand content structure — this isn't just a stylistic choice",
              "Internal linking between related pages on your own site distributes authority and helps search engines understand your site's content structure — an isolated page with no internal links is harder to discover and rank",
            ],
            code: {
              language: "html",
              code: '<title>Best Running Shoes for Beginners (2026 Guide) | BrandName</title>\n<meta name="description" content="A practical guide to choosing your first pair of running shoes, covering fit, cushioning, and budget options.">',
            },
          },
          {
            slug: "why-backlinks-still-matter",
            title: "Why Backlinks and Content Quality Still Matter Most",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A backlink from a relevant, trusted site is still one of the strongest ranking signals search engines use — it functions as a vote of credibility from another source",
              "Content that's genuinely more useful, comprehensive, or current than competing results tends to earn both rankings and organic backlinks over time — this remains true even as algorithms evolve",
              "Technical SEO tricks with no underlying content quality behind them produce diminishing or temporary results — search engines have gotten consistently better at detecting and discounting manipulation over time",
            ],
          },
        ],
      },
    ],
    project: {
      slug: "seo-content-plan",
      title: "Build a Keyword-Researched SEO Content Plan",
      deliverables: [
        "Keyword research for 5 target keywords, each tagged with its likely search intent",
        "An on-page optimization outline (title, meta description, header structure) for one piece of content targeting the highest-priority keyword",
      ],
      rubric: [
        "Keyword intent classification is correct and would meaningfully inform the content approach",
        "The on-page outline follows real best practices, not just keyword stuffing",
      ],
    },
    resources: [
      {
        title: "Google Search Central: SEO Starter Guide",
        type: "external-link",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        description: "Google's own official SEO starter guide.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the SEO content plan"],
  },
  {
    slug: "content-marketing-strategy",
    title: "Content Marketing Strategy",
    subtitle:
      "Building a content plan that compounds instead of a stream of disconnected posts — pillar content, topic clusters, and content that actually earns an audience's trust.",
    category: "digital-marketing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["marketing", "seo"],
    skills: ["content-strategy"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Structure content around pillar pages and topic clusters",
      "Define a content strategy tied to specific business outcomes",
      "Build an editorial calendar that balances consistency with quality",
    ],
    prerequisites: [{ courseSlug: "seo-fundamentals" }],
    modules: [
      {
        slug: "pillar-content-and-clusters",
        title: "Pillar Content and Topic Clusters",
        description:
          "Structuring content so it reinforces itself instead of existing as scattered, disconnected posts.",
        lessons: [
          {
            slug: "the-pillar-cluster-model",
            title: "The Pillar-Cluster Content Model",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A pillar page comprehensively covers a broad topic, and cluster content covers specific subtopics in depth, all internally linked back to the pillar — this structure signals topical authority to both readers and search engines",
              "This model beats a stream of disconnected, one-off blog posts because each new cluster piece reinforces the pillar's authority, compounding value rather than existing in isolation",
              "Choose pillar topics based on genuine strategic importance to the business, not just search volume — a pillar with no real connection to what you offer won't convert even if it ranks well",
            ],
          },
          {
            slug: "content-tied-to-business-outcomes",
            title: "Tying Content Strategy to Business Outcomes",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Content produced with no clear connection to a business outcome (awareness, lead generation, retention) tends to accumulate as unfocused volume rather than driving results",
              "Map content types to the funnel stage they serve — top-of-funnel educational content builds awareness, bottom-of-funnel comparison or case study content supports a near-decision buyer",
              "Track outcome-relevant metrics per content piece (not just traffic) — a highly-trafficked piece that never converts and a lower-traffic piece that converts well tell very different stories about what's actually working",
            ],
          },
        ],
      },
      {
        slug: "sustainable-content-production",
        title: "Sustainable Content Production",
        description: "Consistency matters, but not at the cost of quality.",
        lessons: [
          {
            slug: "editorial-calendar-and-quality-bar",
            title: "Building an Editorial Calendar Without Sacrificing Quality",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "An editorial calendar creates accountability and consistency, but a fixed cadence shouldn't force publishing content that hasn't met a real quality bar just to hit the schedule",
              "Batch similar production stages (all research, then all writing, then all editing) rather than fully producing one piece end-to-end before starting the next — this is often more efficient at scale",
              "Repurposing a single well-researched piece into multiple formats (a guide into a video, a social thread, an email) gets more value from the same research investment than producing entirely separate content for each channel",
            ],
          },
          {
            slug: "content-strategy-glossary",
            title: "Content Strategy Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Pillar page",
                back: "A comprehensive page covering a broad topic, linked to and reinforced by more specific cluster content.",
              },
              {
                front: "Topic cluster",
                back: "A group of content pieces covering subtopics of a pillar page, internally linked to reinforce topical authority.",
              },
              {
                front: "Content repurposing",
                back: "Adapting a single piece of researched content into multiple formats across channels.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "content-strategy-and-calendar",
      title: "Build a Pillar-Cluster Content Strategy",
      deliverables: [
        "A pillar topic with 4 supporting cluster topics, mapped to funnel stage and business outcome",
        "A one-quarter editorial calendar sequencing the pillar and cluster content with realistic production pacing",
      ],
      rubric: [
        "Cluster topics genuinely support and link back to the pillar, not just loosely related content",
        "The editorial calendar reflects a realistic, sustainable production pace, not an unrealistic burst",
      ],
    },
    resources: [
      {
        title: "HubSpot: Topic Clusters",
        type: "external-link",
        url: "https://blog.hubspot.com/marketing/topic-clusters-seo",
        description: "A widely referenced explanation of the pillar-cluster content model.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the content strategy and calendar"],
  },
  {
    slug: "social-media-marketing-fundamentals",
    title: "Social Media Marketing Fundamentals",
    subtitle:
      "Choosing the right platforms, building content that fits how each one actually gets used, and measuring what genuinely matters beyond vanity metrics.",
    category: "digital-marketing",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["marketing"],
    skills: ["social-media-marketing"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Choose social platforms based on audience fit, not popularity alone",
      "Adapt content format and tone to how each platform is actually used",
      "Distinguish vanity metrics from metrics tied to real business outcomes",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "platform-selection",
        title: "Platform Selection",
        description:
          "Being everywhere is usually worse than being genuinely good on the platforms that matter for your audience.",
        lessons: [
          {
            slug: "choosing-platforms-by-audience",
            title: "Choosing Platforms Based on Audience Fit",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Each platform has a different dominant audience demographic and content culture — choosing a platform because it's popular in general, rather than where your specific audience actually spends attention, wastes effort",
              "A B2B audience of enterprise decision-makers behaves very differently on social media than a consumer audience of teenagers — the platform and content strategy should reflect that difference specifically",
              "Spreading limited resources across every platform usually produces mediocre content everywhere rather than excellent content where it would actually matter most",
            ],
          },
          {
            slug: "platform-native-content",
            title: "Making Content That Fits Each Platform",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Content repurposed identically across every platform, with no adaptation, usually underperforms content made natively for each one — a format that works on one platform can feel out of place on another",
              "Understand the platform's dominant content format and unspoken tone norms (short-form video, professional long-form, casual and reactive) before producing content for it",
              "Native features (platform-specific tools, trending formats) tend to get algorithmic preference over content that looks like it was clearly repurposed from somewhere else",
            ],
          },
        ],
      },
      {
        slug: "measuring-what-matters",
        title: "Measuring What Matters",
        description:
          "Likes and follower counts feel good, but they're rarely the metric that matters.",
        lessons: [
          {
            slug: "vanity-vs-meaningful-metrics",
            title: "Vanity Metrics vs. Metrics Tied to Outcomes",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Follower count and likes are easy to track but rarely connect directly to a business outcome — they're worth watching as a general health signal, but shouldn't be the primary success metric",
              "Engagement rate, click-through to a specific destination, and conversion from social traffic are much stronger signals of actual value, though harder to track and often lower in raw number",
              "Define the actual goal (awareness, traffic, leads) before choosing which metric to optimize for — the same content might look successful or unsuccessful depending on which metric you're using to judge it",
            ],
          },
          {
            slug: "social-media-glossary",
            title: "Social Media Marketing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Vanity metric",
                back: "A metric that's easy to track and feels good but doesn't clearly connect to a business outcome.",
              },
              {
                front: "Platform-native content",
                back: "Content produced specifically to fit a platform's dominant format and tone, rather than repurposed identically elsewhere.",
              },
              {
                front: "Engagement rate",
                back: "A metric measuring interaction relative to reach, generally a stronger signal than raw follower count.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "platform-strategy-and-metrics",
      title: "Build a Platform Strategy With Meaningful Metrics",
      deliverables: [
        "A platform selection with reasoning tied to a specific target audience",
        "3 content concepts adapted natively for that platform, plus a chosen success metric tied to the actual campaign goal",
      ],
      rubric: [
        "Platform choice is justified by audience fit, not popularity alone",
        "The chosen success metric is genuinely tied to the stated goal, not a default vanity metric",
      ],
    },
    resources: [
      {
        title: "Sprout Social: Social Media Metrics That Matter",
        type: "external-link",
        url: "https://sproutsocial.com/insights/social-media-metrics/",
        description: "An overview of meaningful vs. vanity social media metrics.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the platform strategy and metrics"],
  },
  {
    slug: "email-marketing-fundamentals",
    title: "Email Marketing Fundamentals",
    subtitle:
      "Still one of the highest-ROI marketing channels when done well — list segmentation, deliverability, and writing subject lines that actually get opened.",
    category: "digital-marketing",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["marketing"],
    skills: ["email-marketing"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Segment an email list to send more relevant messages",
      "Write subject lines and copy that improve open and click rates",
      "Understand deliverability basics that keep emails out of spam folders",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "segmentation-and-relevance",
        title: "Segmentation and Relevance",
        description:
          "The single biggest lever in email marketing: sending the right message to the right person.",
        lessons: [
          {
            slug: "why-segmentation-matters",
            title: "Why List Segmentation Matters",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Sending the same email to your entire list regardless of their interests or stage in the relationship with you produces mediocre results for almost everyone on it",
              "Segment by behavior (recent purchase, engagement level, content interest) rather than just demographics — behavioral segments tend to be more predictive of what someone actually wants to receive",
              "A smaller, highly relevant email to a well-matched segment consistently outperforms a broad blast to an entire list, both in engagement and in avoiding fatigue/unsubscribes",
            ],
          },
          {
            slug: "lifecycle-and-triggered-emails",
            title: "Lifecycle and Triggered Emails",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A triggered email (sent automatically based on a specific action, like an abandoned cart) is generally far more effective than a scheduled broadcast, because it's relevant to something the recipient just did",
              "A welcome sequence for new subscribers sets expectations and builds engagement early — the first few emails someone receives disproportionately shape whether they stay engaged long-term",
              "Design lifecycle emails around the recipient's actual journey (new subscriber, active customer, lapsed customer), not a single generic flow applied to everyone",
            ],
          },
        ],
      },
      {
        slug: "writing-and-deliverability",
        title: "Writing Emails People Open, and Getting Them Delivered",
        description:
          "A great email that lands in spam, or that nobody opens, accomplishes nothing.",
        lessons: [
          {
            slug: "subject-lines-and-copy",
            title: "Subject Lines and Email Copy",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A specific, relevant subject line consistently outperforms a vague or clickbait one — clickbait subject lines might drive opens short-term but damage trust and hurt long-term engagement",
              "Personalization beyond just a first name (referencing actual behavior or interest) tends to meaningfully improve engagement, when done accurately — inaccurate personalization is worse than none at all",
              "One clear call to action per email outperforms several competing ones — asking for too many different actions dilutes the response to all of them",
            ],
          },
          {
            slug: "email-marketing-glossary",
            title: "Email Marketing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Triggered email",
                back: "An automated email sent in response to a specific recipient action, generally more effective than a broadcast.",
              },
              {
                front: "List segmentation",
                back: "Dividing an email list into groups based on behavior or characteristics to send more relevant messages.",
              },
              {
                front: "Deliverability",
                back: "The likelihood an email actually reaches the recipient's inbox rather than being filtered as spam.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "segmented-email-campaign",
      title: "Design a Segmented Email Campaign",
      deliverables: [
        "A list segmentation plan for a realistic audience, with the rationale for each segment",
        "3 email drafts (subject line + copy) tailored to different segments, each with a single clear call to action",
      ],
      rubric: [
        "Segments are behaviorally meaningful, not arbitrary demographic splits",
        "Each email is genuinely tailored to its segment, with a single clear, relevant call to action",
      ],
    },
    resources: [
      {
        title: "Mailchimp: Email Marketing Best Practices",
        type: "external-link",
        url: "https://mailchimp.com/resources/email-marketing-best-practices/",
        description: "Practical email marketing guidance from a major ESP.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the segmented email campaign"],
  },
  {
    slug: "marketing-analytics-and-attribution",
    title: "Marketing Analytics and Attribution",
    subtitle:
      "Figuring out which marketing actually drove a result — attribution models, funnel analysis, and why 'which channel gets credit' is genuinely hard to answer.",
    category: "digital-marketing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["marketing"],
    skills: ["analytics-and-attribution"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Explain common attribution models and their tradeoffs",
      "Analyze a marketing funnel to find the biggest drop-off point",
      "Choose meaningful metrics for a given campaign goal",
    ],
    prerequisites: [{ courseSlug: "digital-marketing-foundations" }],
    modules: [
      {
        slug: "attribution-models",
        title: "Attribution Models",
        description:
          "A customer typically touches multiple channels before converting — deciding who gets credit is genuinely contested.",
        lessons: [
          {
            slug: "common-attribution-models",
            title: "Common Attribution Models",
            kind: "reading",
            durationMinutes: 18,
            free: true,
            points: [
              "Last-click attribution gives 100% credit to the final touchpoint before conversion — simple to implement, but systematically undervalues awareness channels that started the journey",
              "First-click attribution gives all credit to the first touchpoint — this overvalues awareness and undervalues the channels that actually closed the conversion",
              "Multi-touch models (linear, time-decay, position-based) distribute credit across multiple touchpoints — more realistic, but require more data infrastructure and involve real modeling assumptions worth understanding, not just trusting blindly",
            ],
          },
          {
            slug: "no-perfect-model",
            title: "Why No Attribution Model Is Perfectly Correct",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Every attribution model makes a simplifying assumption about how influence actually works across a customer's journey — none of them perfectly captures reality",
              "Cross-device and offline touchpoints (a customer sees an ad on their phone, converts later on a laptop, or hears about you from a friend) are often invisible to tracking entirely, understating true impact",
              "Use attribution as directional guidance for budget decisions, not as an infallible ground truth — treating an imperfect model's output as exact can lead to systematically defunding channels that are actually contributing value",
            ],
          },
        ],
      },
      {
        slug: "funnel-analysis-and-metrics",
        title: "Funnel Analysis and Choosing Metrics",
        description:
          "Finding where people actually drop off, and what to measure to know if a fix worked.",
        lessons: [
          {
            slug: "funnel-drop-off-analysis",
            title: "Analyzing Funnel Drop-Off",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Map the full funnel (awareness, consideration, conversion, retention) and measure the conversion rate between each stage — the stage with the steepest relative drop-off usually deserves the most attention, not necessarily the stage with the largest absolute number lost",
              "A drop-off between two specific stages points to a specific hypothesis to test — e.g. a big drop between 'added to cart' and 'completed purchase' points toward friction in the checkout flow specifically",
              "Segment funnel analysis by traffic source or campaign — an overall funnel conversion rate can hide the fact that one channel converts far better or worse than the aggregate suggests",
            ],
            code: {
              language: "text",
              code: "Awareness (10,000) -> Consideration (1,200, 12%) -> Cart (300, 25%) -> Purchase (90, 30%)\nSteepest relative drop: Awareness -> Consideration (88% drop) -> investigate first",
            },
          },
          {
            slug: "attribution-glossary",
            title: "Attribution and Analytics Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Last-click attribution",
                back: "An attribution model giving all credit to the final touchpoint before a conversion.",
              },
              {
                front: "Multi-touch attribution",
                back: "An attribution model distributing conversion credit across multiple touchpoints in the customer journey.",
              },
              {
                front: "Funnel drop-off",
                back: "The decline in conversion rate between two adjacent stages of a marketing or product funnel.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "funnel-and-attribution-analysis",
      title: "Analyze a Funnel and Recommend an Attribution Approach",
      deliverables: [
        "A funnel drop-off analysis identifying the single biggest relative drop-off point and a hypothesis for its cause",
        "A recommended attribution model for a stated business context, with reasoning for why it fits better than the alternatives",
      ],
      rubric: [
        "The identified drop-off point and hypothesis are grounded in the actual funnel data provided",
        "The attribution model recommendation shows understanding of its tradeoffs, not just a default choice",
      ],
    },
    resources: [
      {
        title: "Google Analytics: Attribution Models",
        type: "external-link",
        url: "https://support.google.com/analytics/answer/10596866",
        description: "Google's overview of attribution modeling approaches.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the funnel and attribution analysis"],
  },
  {
    slug: "paid-advertising-fundamentals",
    title: "Paid Advertising Fundamentals",
    subtitle:
      "How paid search and social ads actually work under the hood — auctions, targeting, and the metrics that tell you whether spend is working.",
    category: "digital-marketing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["marketing"],
    skills: ["analytics-and-attribution"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Explain how ad auctions determine cost and placement",
      "Build audience targeting appropriate to a campaign goal",
      "Read core paid ad metrics (CPC, CTR, CPA, ROAS) and know what each actually indicates",
    ],
    prerequisites: [{ courseSlug: "digital-marketing-foundations" }],
    modules: [
      {
        slug: "how-ad-auctions-work",
        title: "How Ad Auctions Work",
        description: "Paid placement isn't just about who bids highest.",
        lessons: [
          {
            slug: "auction-mechanics",
            title: "Auction Mechanics: Bid, Quality, and Relevance",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Most ad auctions (search and social) don't simply award placement to the highest bidder — a quality/relevance score combines with bid to determine both placement and actual cost paid",
              "A highly relevant, well-targeted ad with a lower bid can outperform a poorly targeted ad with a higher bid — this is why targeting and creative quality directly affect cost efficiency, not just reach",
              "Actual cost paid is often just enough to beat the next-highest competitor's effective bid, not your full maximum bid — understanding this changes how you should think about setting bids",
            ],
          },
          {
            slug: "audience-targeting",
            title: "Audience Targeting Approaches",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Demographic and interest targeting reaches people matching defined criteria — retargeting reaches people who've already interacted with you, generally converting at a much higher rate since intent is already established",
              "Lookalike/similar audiences use an existing high-value audience (like past customers) as a template to find new people with similar characteristics — often more effective than broad interest targeting alone",
              "Overly narrow targeting can starve an ad of enough volume to gather meaningful performance data — there's a real tradeoff between precision and having enough signal to optimize against",
            ],
          },
        ],
      },
      {
        slug: "reading-paid-ad-metrics",
        title: "Reading Paid Ad Metrics",
        description: "CPC, CTR, CPA, ROAS — knowing which one tells you what.",
        lessons: [
          {
            slug: "core-paid-metrics",
            title: "Core Paid Advertising Metrics",
            kind: "code",
            durationMinutes: 18,
            points: [
              "CPC (cost per click) measures traffic cost, CTR (click-through rate) measures ad relevance/appeal, CPA (cost per acquisition) measures cost per actual result, and ROAS (return on ad spend) measures revenue generated per dollar spent",
              "A low CPC with a low CTR often means cheap but irrelevant traffic — a high CTR with a poor CPA often means an appealing ad that isn't converting once people land on the page",
              "Optimize toward the metric that reflects the actual campaign goal — optimizing for CTR alone on a campaign meant to drive purchases can produce clicks that never convert",
            ],
            code: {
              language: "text",
              code: "CTR = clicks / impressions\nCPC = spend / clicks\nCPA = spend / conversions\nROAS = revenue / spend\n\nExample: $500 spend, 10,000 impressions, 200 clicks, 10 conversions, $2,000 revenue\nCTR = 2% | CPC = $2.50 | CPA = $50 | ROAS = 4x",
            },
          },
          {
            slug: "paid-advertising-glossary",
            title: "Paid Advertising Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Quality/relevance score",
                back: "A metric ad platforms use alongside bid to determine ad placement and actual cost paid.",
              },
              {
                front: "Lookalike audience",
                back: "A targeting approach finding new people similar to an existing high-value audience.",
              },
              {
                front: "ROAS",
                back: "Return on ad spend — revenue generated per dollar of advertising spend.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "paid-campaign-plan",
      title: "Plan a Paid Ad Campaign With Targeting and Metrics",
      deliverables: [
        "A targeting plan (audience type and reasoning) for a stated campaign goal",
        "A metrics plan identifying which of CPC/CTR/CPA/ROAS matters most for this goal, with a target threshold and reasoning",
      ],
      rubric: [
        "Targeting approach is well matched to the stated goal and budget constraints",
        "The chosen primary metric is correctly justified relative to the actual campaign goal",
      ],
    },
    resources: [
      {
        title: "Google Ads Help: How Auctions Work",
        type: "external-link",
        url: "https://support.google.com/google-ads/answer/6366577",
        description: "Google's official explanation of ad auction mechanics.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the paid campaign plan"],
  },
  {
    slug: "copywriting-for-marketers",
    title: "Copywriting for Marketers",
    subtitle:
      "Writing that actually persuades — clear value propositions, benefit-driven headlines, and calls to action that don't get ignored.",
    category: "digital-marketing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 105,
    tags: ["marketing", "writing"],
    skills: ["content-strategy"],
    careerPaths: ["digital-marketer"],
    instructor: {
      name: "Rosa Delgado",
      title: "Head of Growth Marketing, ex-HubSpot",
      avatarInitials: "RD",
    },
    objectives: [
      "Write a clear value proposition centered on customer benefit, not just features",
      "Write headlines and calls to action that drive a specific action",
      "Apply a proven copywriting structure (AIDA/PAS) to a piece of marketing copy",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "benefit-driven-writing",
        title: "Benefit-Driven Writing",
        description:
          "Features describe the product; benefits describe why the customer should care.",
        lessons: [
          {
            slug: "features-vs-benefits",
            title: "Features vs. Benefits",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A feature is what the product has ('256GB storage') — a benefit is what that means for the customer ('never worry about running out of space for your photos') — copy that stops at features leaves the customer to do the translation themselves, and many won't bother",
              "Ask 'so what?' repeatedly after stating a feature until you reach something the customer genuinely cares about — this simple exercise reliably surfaces the actual benefit",
              "Different customer segments often care about different benefits of the same feature — the strongest copy is specific to the audience it's written for, not generic",
            ],
          },
          {
            slug: "writing-a-value-proposition",
            title: "Writing a Clear Value Proposition",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A value proposition should answer, in one clear statement, what you offer, who it's for, and why it's better than the alternative — vague or clever value propositions that don't communicate this clearly fail at their basic job",
              "Test a value proposition by asking whether someone unfamiliar with the product could repeat back what it does and why they'd want it — if they can't, it's not clear enough yet",
              "A value proposition trying to appeal to everyone usually appeals strongly to no one — specificity about who it's for tends to outperform breadth",
            ],
          },
        ],
      },
      {
        slug: "copywriting-structures",
        title: "Copywriting Structures That Work",
        description:
          "Proven frameworks for organizing persuasive copy, not starting from a blank page each time.",
        lessons: [
          {
            slug: "aida-and-pas",
            title: "AIDA and PAS Frameworks",
            kind: "code",
            durationMinutes: 17,
            points: [
              "AIDA (Attention, Interest, Desire, Action) structures copy to first grab attention, build interest in the offer, create desire for the specific benefit, then prompt a clear action",
              "PAS (Problem, Agitate, Solution) opens by naming a real problem the reader has, agitates why it matters/hurts, then presents the offer as the solution — especially effective when the audience already feels the problem acutely",
              "A strong call to action is specific and low-friction — 'Get Started Free' commits to less than 'Sign Up Now' even though both are short, and that difference in perceived commitment measurably affects click rates",
            ],
            code: {
              language: "text",
              code: "PAS example:\nProblem: Your team's onboarding docs are scattered across five tools.\nAgitate: New hires spend their first two weeks just finding the right doc, not doing real work.\nSolution: [Product] puts everything in one searchable place — see how in 2 minutes.",
            },
          },
          {
            slug: "copywriting-glossary",
            title: "Copywriting Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Value proposition",
                back: "A clear statement of what you offer, who it's for, and why it's better than the alternative.",
              },
              {
                front: "AIDA",
                back: "A copywriting structure: Attention, Interest, Desire, Action.",
              },
              { front: "PAS", back: "A copywriting structure: Problem, Agitate, Solution." },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "landing-page-copy",
      title: "Write Landing Page Copy Using a Proven Structure",
      deliverables: [
        "A clear value proposition for a realistic product or service",
        "Full landing page copy (headline, body, call to action) using either AIDA or PAS structure",
      ],
      rubric: [
        "The value proposition clearly states what, for whom, and why it's better, testable by a stranger reading it",
        "The copy correctly follows the chosen structure and leads to one clear, low-friction call to action",
      ],
    },
    resources: [
      {
        title: "Copyhackers: Copywriting Frameworks",
        type: "external-link",
        url: "https://copyhackers.com/",
        description: "A widely referenced resource on practical copywriting techniques.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the landing page copy"],
  },
];
