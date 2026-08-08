import type { CourseSpec } from "../lib/course-spec-types.mts";

export const SPECS: CourseSpec[] = [
  // ---------------------------------------------------------------
  // Finance / Communication / Career Development (10)
  // ---------------------------------------------------------------
  {
    slug: "financial-modeling-fundamentals",
    title: "Financial Modeling Fundamentals",
    subtitle:
      "Building a financial model that actually answers a real business question — assumptions, drivers, and knowing what to trust in the output.",
    category: "finance",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["finance"],
    skills: ["financial-modeling"],
    careerPaths: [],
    instructor: {
      name: "Nadia Okafor",
      title: "FP&A Director, ex-Goldman Sachs",
      avatarInitials: "NO",
    },
    objectives: [
      "Structure a financial model around clearly separated inputs, calculations, and outputs",
      "Identify the key drivers that actually determine a model's outcome",
      "Stress-test a model with sensitivity analysis before trusting its conclusions",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "model-structure",
        title: "Structuring a Model",
        description:
          "The difference between a model that's trustworthy and one that's a tangle of hardcoded numbers.",
        lessons: [
          {
            slug: "inputs-calculations-outputs",
            title: "Separating Inputs, Calculations, and Outputs",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Assumptions (growth rate, churn, price) should live in clearly labeled input cells, never buried inside a formula — a formula with a hardcoded '1.05' hides an assumption that should be easy to find and change",
              "Calculations should flow in one consistent direction (e.g. left to right, top to bottom) — a model where formulas reference cells scattered unpredictably is hard to audit and prone to hidden errors",
              "Outputs (the answer to the actual business question) should be clearly separated from the underlying calculation detail, so a reader can find the conclusion without wading through every intermediate step",
            ],
          },
          {
            slug: "identifying-key-drivers",
            title: "Identifying the Key Drivers",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Not every input matters equally — identify which 2-3 assumptions actually drive most of the variance in the output, and spend proportionally more scrutiny on getting those right",
              "A model with 30 inputs but only 3 that meaningfully move the outcome creates false precision — the other 27 give an illusion of rigor without adding real accuracy",
              "Ask 'what would have to be true for this conclusion to be wrong' — this question quickly reveals which assumption the whole model actually rests on",
            ],
            code: {
              language: "text",
              code: "Revenue = Customers x Price x (1 - Churn)\nIf Customers and Price are well-known but Churn is a rough guess,\nChurn is the key driver worth stress-testing hardest.",
            },
          },
        ],
      },
      {
        slug: "sensitivity-and-trust",
        title: "Sensitivity Analysis and Trusting the Output",
        description: "Knowing how much to actually believe the number a model produces.",
        lessons: [
          {
            slug: "sensitivity-analysis",
            title: "Running Sensitivity Analysis",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Vary a key driver across a realistic range (e.g. churn from 2% to 8%) and observe how much the output changes — a wide swing in output from a plausible input range means the conclusion should be stated with real uncertainty, not false confidence",
              "Present a range or scenario set (best case, base case, worst case) rather than a single point estimate when the underlying assumptions carry real uncertainty",
              "A single-point forecast presented without its sensitivity is one of the most common ways financial models mislead their audience, even unintentionally",
            ],
          },
          {
            slug: "financial-modeling-glossary",
            title: "Financial Modeling Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Key driver",
                back: "An input assumption that disproportionately determines a financial model's output.",
              },
              {
                front: "Sensitivity analysis",
                back: "Testing how much a model's output changes as a key input varies across a realistic range.",
              },
              {
                front: "Base case",
                back: "The central, most-likely scenario in a financial model, typically presented alongside best and worst cases.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "revenue-model-with-sensitivity",
      title: "Build a Revenue Model With Sensitivity Analysis",
      deliverables: [
        "A structured revenue model with clearly separated inputs, calculations, and outputs",
        "A sensitivity analysis on the single most impactful driver, presented as best/base/worst case scenarios",
      ],
      rubric: [
        "Inputs are clearly separated from calculations, with no hardcoded assumptions buried in formulas",
        "The sensitivity analysis correctly identifies and stress-tests the model's actual key driver",
      ],
    },
    resources: [
      {
        title: "CFI: Financial Modeling Guidelines",
        type: "external-link",
        url: "https://corporatefinanceinstitute.com/resources/financial-modeling/financial-modeling-guidelines/",
        description: "A widely referenced overview of financial modeling best practices.",
      },
    ],
    certificateCriteria: [
      "Complete both modules",
      "Submit the revenue model with sensitivity analysis",
    ],
  },
  {
    slug: "budgeting-and-forecasting-for-business",
    title: "Budgeting and Forecasting for Business",
    subtitle:
      "Building a budget that's a genuine planning tool, not a document assembled once a year and ignored — plus a rolling forecast that stays honest as the year unfolds.",
    category: "finance",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["finance", "budgeting"],
    skills: ["budgeting-forecasting"],
    careerPaths: [],
    instructor: {
      name: "Nadia Okafor",
      title: "FP&A Director, ex-Goldman Sachs",
      avatarInitials: "NO",
    },
    objectives: [
      "Distinguish top-down and bottom-up budgeting approaches",
      "Build a rolling forecast that updates as actuals come in",
      "Analyze budget variance to explain what actually drove a deviation",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "building-a-budget",
        title: "Building a Budget",
        description: "Top-down goals meeting bottom-up reality.",
        lessons: [
          {
            slug: "top-down-vs-bottom-up",
            title: "Top-Down vs. Bottom-Up Budgeting",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Top-down budgeting starts from a target (e.g. a revenue or margin goal) and allocates down to departments — fast, but can set unrealistic targets disconnected from what's actually achievable",
              "Bottom-up budgeting builds from department-level detail up to a total — more accurate to reality, but can lack strategic coherence if departments aren't aligned to shared priorities",
              "Most functional budgeting processes combine both — a top-down target that gets reconciled against bottom-up detail, with explicit negotiation where they don't match",
            ],
          },
          {
            slug: "rolling-forecasts",
            title: "Rolling Forecasts",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A rolling forecast updates continuously (e.g. always projecting the next 12 months) rather than being fixed once a year and left stale as conditions change",
              "Update the forecast with actual results as they come in, not just at quarter-end — the more current the input data, the more useful the forecast is for actual decision-making",
              "A forecast that never changes from the original budget isn't actually forecasting anything — it's just repeating the original plan regardless of what's actually happening",
            ],
          },
        ],
      },
      {
        slug: "variance-analysis",
        title: "Variance Analysis",
        description:
          "Explaining why actual results differed from the plan, not just reporting that they did.",
        lessons: [
          {
            slug: "explaining-variance",
            title: "Explaining Budget Variance",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A variance report stating '$50K over budget' without explanation isn't useful — break the variance into its actual drivers (volume, price, timing) to understand what happened",
              "Distinguish a timing variance (spending happened but earlier/later than planned, will net out) from a true variance (the total spend is genuinely different than planned) — conflating these leads to wrong conclusions",
              "A recurring pattern of variance in the same category quarter after quarter usually means the original budget assumption was wrong, not that execution keeps failing — the fix is often to update the assumption, not to blame the team",
            ],
            code: {
              language: "text",
              code: "Budgeted marketing spend: $100K | Actual: $130K | Variance: +$30K\nBreakdown: $20K = ran a campaign one quarter earlier than planned (timing)\n           $10K = higher cost-per-click than assumed (true variance, update assumption)",
            },
          },
          {
            slug: "budgeting-glossary",
            title: "Budgeting and Forecasting Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Rolling forecast",
                back: "A continuously updated forecast projecting a fixed horizon forward, rather than a static annual plan.",
              },
              {
                front: "Timing variance",
                back: "A budget variance caused by spending happening earlier or later than planned, which nets out over time.",
              },
              {
                front: "Bottom-up budgeting",
                back: "Building a budget total from detailed department-level estimates rather than a top-down target.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "budget-and-variance-report",
      title: "Build a Budget and Explain a Variance",
      deliverables: [
        "A department budget built using a stated combination of top-down target and bottom-up detail",
        "A variance analysis explaining a hypothetical actual-vs-budget gap, broken into timing vs. true variance",
      ],
      rubric: [
        "The budget reconciles a top-down target against bottom-up detail with explicit reasoning where they diverge",
        "The variance analysis correctly separates timing effects from genuine assumption misses",
      ],
    },
    resources: [
      {
        title: "CFI: Budgeting and Forecasting",
        type: "external-link",
        url: "https://corporatefinanceinstitute.com/resources/fpa/budgeting-and-forecasting/",
        description: "An overview of budgeting and forecasting methods in FP&A.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the budget and variance report"],
  },
  {
    slug: "reading-financial-statements",
    title: "Reading Financial Statements",
    subtitle:
      "Making sense of the income statement, balance sheet, and cash flow statement — and why a profitable company can still run out of cash.",
    category: "finance",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["finance"],
    skills: ["financial-statements"],
    careerPaths: [],
    instructor: {
      name: "Nadia Okafor",
      title: "FP&A Director, ex-Goldman Sachs",
      avatarInitials: "NO",
    },
    objectives: [
      "Read and interpret the three core financial statements",
      "Explain why profit and cash flow can diverge significantly",
      "Calculate and interpret basic financial ratios",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "the-three-core-statements",
        title: "The Three Core Statements",
        description:
          "Income statement, balance sheet, and cash flow — each answering a different question.",
        lessons: [
          {
            slug: "income-statement-and-balance-sheet",
            title: "The Income Statement and Balance Sheet",
            kind: "reading",
            durationMinutes: 18,
            free: true,
            points: [
              "The income statement shows performance over a period — revenue, expenses, and the resulting profit or loss for that specific timeframe",
              "The balance sheet shows a snapshot at a single point in time — what the company owns (assets), owes (liabilities), and the difference (equity)",
              "Assets = Liabilities + Equity is the fundamental balance sheet identity — it must always balance, which is literally where the statement gets its name",
            ],
          },
          {
            slug: "cash-flow-vs-profit",
            title: "Why Cash Flow and Profit Diverge",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "A company can be profitable on paper (income statement) while running out of actual cash — if customers haven't paid yet (accounts receivable) or inventory is tied up, profit doesn't equal cash in the bank",
              "The cash flow statement tracks actual cash moving in and out, split into operating, investing, and financing activities — this is what actually determines whether a company can pay its bills",
              "'Profitable but cash-poor' is a specific, well-known failure mode, especially for fast-growing companies whose receivables and inventory grow faster than their cash collection",
            ],
          },
        ],
      },
      {
        slug: "basic-financial-ratios",
        title: "Basic Financial Ratios",
        description: "A handful of ratios that quickly summarize a company's financial health.",
        lessons: [
          {
            slug: "key-ratios",
            title: "Key Financial Ratios",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Gross margin (gross profit / revenue) shows how much is left after direct costs of producing what you sell, before overhead",
              "Current ratio (current assets / current liabilities) indicates short-term liquidity — a ratio well below 1 signals a company may struggle to cover near-term obligations",
              "A single ratio in isolation says little — compare it against the company's own trend over time and against similar companies in the same industry",
            ],
            code: {
              language: "text",
              code: "Gross margin = Gross profit / Revenue\nCurrent ratio = Current assets / Current liabilities\nExample: Revenue $1M, COGS $600K -> Gross margin = 40%",
            },
          },
          {
            slug: "financial-statements-glossary",
            title: "Financial Statements Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Balance sheet identity",
                back: "Assets = Liabilities + Equity, the fundamental equation a balance sheet must always satisfy.",
              },
              {
                front: "Gross margin",
                back: "Gross profit divided by revenue, showing profitability after direct costs of production.",
              },
              {
                front: "Current ratio",
                back: "Current assets divided by current liabilities, a measure of short-term liquidity.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "financial-statement-analysis",
      title: "Analyze a Set of Financial Statements",
      deliverables: [
        "A written summary of what a sample company's income statement, balance sheet, and cash flow statement each reveal",
        "Calculated gross margin and current ratio, with an interpretation of what each indicates about the company's health",
      ],
      rubric: [
        "The summary correctly identifies what each statement is actually showing, not conflating profit with cash",
        "Ratio calculations are correct and interpreted with appropriate context, not just stated as numbers",
      ],
    },
    resources: [
      {
        title: "SEC: Beginners' Guide to Financial Statements",
        type: "external-link",
        url: "https://www.investor.gov/introduction-investing/investing-basics/how-read-financial-statement",
        description: "The US SEC's official guide to reading financial statements.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the financial statement analysis"],
  },
  {
    slug: "public-speaking-and-presentation-skills",
    title: "Public Speaking and Presentation Skills",
    subtitle:
      "Structuring a talk people actually follow, and managing the nerves that make even well-prepared speakers freeze up.",
    category: "communication",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["communication"],
    skills: ["public-speaking"],
    careerPaths: [],
    instructor: {
      name: "James Okonkwo",
      title: "Executive Communication Coach",
      avatarInitials: "JO",
    },
    objectives: [
      "Structure a presentation around one clear core message",
      "Manage speaking nerves with concrete, practiced techniques",
      "Handle Q&A confidently, including questions you don't fully know the answer to",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "structuring-a-talk",
        title: "Structuring a Talk",
        description:
          "One clear message, supported clearly, beats a talk trying to cover everything.",
        lessons: [
          {
            slug: "one-core-message",
            title: "Building Around One Core Message",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Audiences remember one thing, maybe two, from most talks — decide what that one thing is before building any slides, and cut anything that doesn't support it",
              "State the core message early, not just at the end — don't make the audience wait until the conclusion to learn what the talk is actually about",
              "A talk trying to cover everything you know about a topic usually communicates less than a talk making one point clearly, because the audience can't tell what mattered most",
            ],
          },
          {
            slug: "structuring-supporting-content",
            title: "Structuring Supporting Content",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Use a clear structure the audience can follow along with — problem/solution, chronological, or a simple 3-point structure all work; an unstructured ramble doesn't, regardless of content quality",
              "Signpost transitions explicitly ('now that we've covered X, let's look at Y') — this helps the audience track where they are in the talk, especially in a longer presentation",
              "End with a clear takeaway or call to action, not just a fade-out — 'thanks for listening' without restating the core message wastes the last, most memorable moment of the talk",
            ],
          },
        ],
      },
      {
        slug: "delivery-and-nerves",
        title: "Delivery and Managing Nerves",
        description: "The parts that no amount of slide-building alone will fix.",
        lessons: [
          {
            slug: "managing-speaking-nerves",
            title: "Managing Speaking Nerves",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Physical preparation (slow breathing, a moment of stillness before starting) genuinely reduces the physiological nervousness response before speaking — it's not just a mental trick",
              "Rehearsing out loud, not just reading through slides silently, is what actually builds comfort with the material — many speakers overestimate their readiness because silent review feels more thorough than it is",
              "A small stumble or forgotten point is far less noticeable to the audience than it feels to the speaker — recovering calmly matters more than trying to appear like it never happened",
            ],
          },
          {
            slug: "public-speaking-glossary",
            title: "Public Speaking Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Core message",
                back: "The single main point a presentation is built to communicate and have the audience remember.",
              },
              {
                front: "Signposting",
                back: "Explicitly telling the audience where they are in a talk's structure during transitions.",
              },
              {
                front: "Rehearsing out loud",
                back: "Practicing a talk by actually speaking it, which builds more genuine readiness than silent review.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "structured-talk-outline",
      title: "Outline and Script a Short Talk",
      deliverables: [
        "A one-core-message outline for a 5-minute talk on a topic of your choice",
        "A written opening and closing that clearly states and reinforces the core message",
      ],
      rubric: [
        "The outline is built around one identifiable core message, not several competing points",
        "The opening and closing clearly and consistently reinforce the same message",
      ],
    },
    resources: [
      {
        title: "Toastmasters International: Speaking Resources",
        type: "external-link",
        url: "https://www.toastmasters.org/resources",
        description: "Public speaking resources from a well-known speaking organization.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the structured talk outline"],
  },
  {
    slug: "difficult-conversations-at-work",
    title: "Difficult Conversations at Work",
    subtitle:
      "Having the conversation you've been avoiding — giving hard feedback, addressing conflict, and staying constructive when it would be easier to stay quiet.",
    category: "communication",
    difficulty: "intermediate",
    estimatedDurationMinutes: 105,
    tags: ["communication"],
    skills: ["difficult-conversations"],
    careerPaths: [],
    instructor: {
      name: "James Okonkwo",
      title: "Executive Communication Coach",
      avatarInitials: "JO",
    },
    objectives: [
      "Separate observation from interpretation when raising a concern",
      "Give direct, specific feedback without softening it into vagueness",
      "Stay constructive when a conversation becomes emotionally charged",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "starting-the-conversation-well",
        title: "Starting the Conversation Well",
        description: "How you open a hard conversation shapes everything that follows.",
        lessons: [
          {
            slug: "observation-vs-interpretation",
            title: "Separating Observation From Interpretation",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "'You missed the deadline' is an observation — 'you don't care about this project' is an interpretation layered on top of it, and interpretations are exactly what people get defensive about",
              "Lead with the specific, observable fact, then explain the impact — this keeps the conversation grounded in something the other person can't reasonably dispute, rather than a character judgment they'll want to argue against",
              "Ask about the other person's perspective before assuming your interpretation is correct — there's often context you're missing that changes the entire picture",
            ],
          },
          {
            slug: "giving-direct-feedback",
            title: "Giving Direct, Specific Feedback",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Vague feedback ('try to be more proactive') is comfortable to give but useless to act on — specific feedback ('in the last three standups, blockers weren't raised until the day they became urgent') is uncomfortable but actionable",
              "Softening hard feedback into vagueness to avoid discomfort is a common, well-intentioned mistake that actually does the other person a disservice by leaving them without what they need to improve",
              "State the impact of the behavior, not just the behavior itself — this helps the other person understand why it matters, not just what happened",
            ],
          },
        ],
      },
      {
        slug: "staying-constructive-under-tension",
        title: "Staying Constructive Under Tension",
        description: "What to do when the conversation gets emotionally charged.",
        lessons: [
          {
            slug: "de-escalating-and-staying-on-track",
            title: "De-escalating and Staying on Track",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "When a conversation heats up, naming it explicitly ('I can tell this is frustrating — let's slow down') often does more to de-escalate than continuing to push the original point",
              "Return to the shared goal when a conversation drifts into blame — reminding both people of what you're both actually trying to achieve reframes the conversation away from who's at fault",
              "It's acceptable, and often wise, to pause and reconvene rather than push through a conversation that's become unproductive in the moment — a scheduled follow-up beats a conversation that spirals",
            ],
          },
          {
            slug: "difficult-conversations-glossary",
            title: "Difficult Conversations Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Observation vs. interpretation",
                back: "Distinguishing a specific observable fact from the meaning or motive layered on top of it.",
              },
              {
                front: "Impact statement",
                back: "Explaining the effect of a behavior, not just describing the behavior itself, to help someone understand why it matters.",
              },
              {
                front: "De-escalation",
                back: "Techniques used to reduce emotional intensity in a tense conversation so it can stay constructive.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "difficult-conversation-script",
      title: "Script a Real Difficult Conversation",
      deliverables: [
        "A conversation opening for a realistic scenario, separating observation from interpretation",
        "Specific, actionable feedback statements for the scenario, including the impact of the behavior",
      ],
      rubric: [
        "The opening leads with a specific, observable fact rather than an interpretation or judgment",
        "Feedback is specific and actionable, not softened into vagueness",
      ],
    },
    resources: [
      {
        title: "Harvard Business Review: Difficult Conversations",
        type: "external-link",
        url: "https://hbr.org/topic/subject/difficult-conversations",
        description:
          "HBR's collection of articles on navigating difficult workplace conversations.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the difficult conversation script"],
  },
  {
    slug: "executive-communication",
    title: "Executive Communication",
    subtitle:
      "Communicating up — getting to the point fast, anticipating the questions a senior stakeholder will actually ask, and earning trust through clarity.",
    category: "communication",
    difficulty: "intermediate",
    estimatedDurationMinutes: 100,
    tags: ["communication"],
    skills: ["executive-communication"],
    careerPaths: [],
    instructor: {
      name: "James Okonkwo",
      title: "Executive Communication Coach",
      avatarInitials: "JO",
    },
    objectives: [
      "Structure a message using the 'answer first' principle",
      "Anticipate and preempt the questions an executive is likely to ask",
      "Write a concise executive summary that stands on its own",
    ],
    prerequisites: [{ courseSlug: "difficult-conversations-at-work" }],
    modules: [
      {
        slug: "answer-first-communication",
        title: "Answer-First Communication",
        description:
          "Executives want the conclusion first, and the reasoning only if they ask for it.",
        lessons: [
          {
            slug: "leading-with-the-answer",
            title: "Leading With the Answer, Not the Journey",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "State the recommendation or conclusion in the first sentence — building up through background and context before the point is a common instinct, but it costs a busy executive's attention before they hear what matters",
              "This structure isn't about hiding reasoning — the supporting detail is still there, just placed after the headline for anyone who wants to dig in, not before",
              "Practicing an 'answer first' habit in writing tends to improve verbal communication too — it forces genuine clarity about what the actual point is before you start explaining anything",
            ],
          },
          {
            slug: "anticipating-questions",
            title: "Anticipating the Questions an Executive Will Ask",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Before presenting, list the 3-5 most likely questions a senior stakeholder will ask and make sure your material already answers them — being caught flat-footed on an obvious question undermines credibility disproportionately",
              "Executives commonly ask about risk, cost, timeline, and what's needed from them — anticipate these categories specifically even if the presentation topic doesn't seem to obviously require it",
              "If you genuinely don't know an answer, say so directly and commit to following up — a confident, honest 'I don't know, I'll find out' builds more trust than an unconvincing guess",
            ],
          },
        ],
      },
      {
        slug: "writing-concise-summaries",
        title: "Writing Concise Executive Summaries",
        description: "A summary that works even if it's the only part someone reads.",
        lessons: [
          {
            slug: "executive-summary-structure",
            title: "Structuring an Executive Summary",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "An executive summary should stand alone — someone who reads only the summary and nothing else should walk away with the correct conclusion and the key supporting reasons",
              "Cut anything that doesn't change the decision being asked for — interesting-but-not-decision-relevant detail belongs in an appendix, not the summary",
              "State explicitly what you're asking for (a decision, approval, resources) — a summary that's purely informational without a clear ask leaves the reader unsure what to do with it",
            ],
          },
          {
            slug: "executive-communication-glossary",
            title: "Executive Communication Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Answer-first structure",
                back: "Leading a message with its conclusion or recommendation before the supporting reasoning.",
              },
              {
                front: "Executive summary",
                back: "A concise standalone summary that communicates the conclusion and key reasoning without requiring the full document.",
              },
              {
                front: "The ask",
                back: "The specific decision, approval, or resource a communication is requesting from its audience.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "executive-summary-and-qa-prep",
      title: "Write an Executive Summary and Anticipate Q&A",
      deliverables: [
        "A one-page executive summary for a realistic proposal, using answer-first structure and a clear ask",
        "A list of 5 anticipated executive questions with prepared, honest answers",
      ],
      rubric: [
        "The summary genuinely stands alone and leads with the conclusion, not background",
        "Anticipated questions reflect realistic executive concerns (risk, cost, timeline), not superficial ones",
      ],
    },
    resources: [
      {
        title: "Harvard Business Review: Executive Communication",
        type: "external-link",
        url: "https://hbr.org/topic/subject/business-communication",
        description: "HBR's collection on effective business and executive communication.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the executive summary and Q&A prep"],
  },
  {
    slug: "resume-writing-and-personal-branding",
    title: "Resume Writing and Personal Branding",
    subtitle:
      "Writing a resume that survives both a human skim and an ATS filter, and building a consistent professional story across LinkedIn and beyond.",
    category: "career-growth",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["career"],
    skills: ["resume-writing", "personal-branding"],
    careerPaths: [],
    instructor: {
      name: "Priya Shah",
      title: "Career Coach, ex-LinkedIn Talent Solutions",
      avatarInitials: "PS",
    },
    objectives: [
      "Write resume bullets that demonstrate impact, not just responsibility",
      "Understand how ATS systems parse resumes and avoid common formatting pitfalls",
      "Build a consistent personal brand across resume, LinkedIn, and portfolio",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "writing-impact-driven-bullets",
        title: "Writing Impact-Driven Resume Bullets",
        description: "The difference between describing a job and demonstrating impact.",
        lessons: [
          {
            slug: "impact-over-responsibility",
            title: "Impact Over Responsibility",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "'Responsible for managing social media accounts' describes a duty — 'grew Instagram following 40% in 6 months through a redesigned content calendar' demonstrates a measurable result, and the second is what actually gets attention",
              "Use the format: action verb + what you did + measurable result — even an approximate or estimated number is usually stronger than no number at all",
              "Not every bullet needs a hard metric, but every bullet should show a specific outcome, not just a listed task — 'improved onboarding documentation' is weaker than 'rewrote onboarding docs, cutting new-hire questions to support by half'",
            ],
          },
          {
            slug: "ats-friendly-formatting",
            title: "ATS-Friendly Formatting",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Applicant Tracking Systems parse resumes for keywords and structure before a human ever sees them — a resume in complex tables, columns, or graphics can parse incorrectly or fail entirely",
              "Mirror language from the job description where genuinely accurate — an ATS and a human reviewer both respond to matching terminology, but never fabricate a skill or experience just to match keywords",
              "Standard section headers (Experience, Education, Skills) parse more reliably than creative alternatives — clever formatting can actively work against you here",
            ],
          },
        ],
      },
      {
        slug: "building-a-consistent-brand",
        title: "Building a Consistent Personal Brand",
        description:
          "Making sure your resume, LinkedIn, and portfolio tell the same coherent story.",
        lessons: [
          {
            slug: "consistent-professional-narrative",
            title: "A Consistent Professional Narrative",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A recruiter or hiring manager often checks LinkedIn right after (or instead of) reading a resume — inconsistent titles, dates, or framing between the two raises unnecessary doubt",
              "Your personal brand isn't a slogan — it's the specific, consistent story of what you're good at and what kind of role you're aiming for, reflected the same way across every professional surface",
              "Update LinkedIn and resume together when your story changes (a new focus area, a career pivot) — a stale profile that contradicts your current pitch undermines the pitch itself",
            ],
          },
          {
            slug: "resume-branding-glossary",
            title: "Resume and Branding Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "ATS",
                back: "Applicant Tracking System — software that parses and filters resumes before a human reviewer sees them.",
              },
              {
                front: "Impact-driven bullet",
                back: "A resume line demonstrating a measurable result, not just a listed responsibility.",
              },
              {
                front: "Personal brand",
                back: "The consistent professional story reflected across resume, LinkedIn, and portfolio.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "resume-rewrite",
      title: "Rewrite a Resume for Impact and ATS Compatibility",
      deliverables: [
        "5 rewritten resume bullets converting responsibility-based statements into impact-driven ones",
        "A brief audit of a resume's formatting for ATS compatibility, flagging any risky elements",
      ],
      rubric: [
        "Rewritten bullets demonstrate a specific, plausible measurable outcome, not just rephrased duties",
        "The ATS audit correctly identifies real formatting risks (tables, graphics, non-standard headers)",
      ],
    },
    resources: [
      {
        title: "LinkedIn Career Advice",
        type: "external-link",
        url: "https://www.linkedin.com/business/talent/blog",
        description: "LinkedIn's official career and hiring insights.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the resume rewrite"],
  },
  {
    slug: "salary-negotiation-fundamentals",
    title: "Salary Negotiation Fundamentals",
    subtitle:
      "Negotiating an offer without burning the relationship — research, anchoring, and handling the moments that feel the most uncomfortable.",
    category: "career-growth",
    difficulty: "intermediate",
    estimatedDurationMinutes: 95,
    tags: ["career"],
    skills: ["salary-negotiation"],
    careerPaths: [],
    instructor: {
      name: "Priya Shah",
      title: "Career Coach, ex-LinkedIn Talent Solutions",
      avatarInitials: "PS",
    },
    objectives: [
      "Research a realistic salary range before entering a negotiation",
      "Use anchoring effectively without overreaching",
      "Handle common negotiation moments, including a firm 'no' from the employer",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "preparing-to-negotiate",
        title: "Preparing to Negotiate",
        description:
          "Most negotiation outcomes are determined before the conversation even starts.",
        lessons: [
          {
            slug: "researching-your-range",
            title: "Researching a Realistic Range",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Use multiple sources (industry salary data, peer conversations, recruiter insight) to build a realistic range — relying on a single data point risks anchoring to an inaccurate number",
              "Your range should reflect the specific role, level, location, and company stage, not a generic industry average — a senior role at a well-funded company and the same title at an early-stage startup can differ substantially",
              "Know your walk-away point before the conversation starts — deciding this under pressure, in the moment, leads to worse decisions than deciding it calmly in advance",
            ],
          },
          {
            slug: "anchoring-effectively",
            title: "Anchoring Effectively",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "The first number stated in a negotiation tends to anchor the entire remaining conversation — this is why avoiding stating a number first, when possible, can be advantageous, and why an employer's first offer isn't automatically the ceiling",
              "If asked for a number, give a range with the low end at what you'd genuinely be satisfied with — the top end can be ambitious, but the range should still be grounded in real research, not made up",
              "Anchoring too aggressively without research to back it up risks seeming unrealistic and can damage the negotiation's overall tone",
            ],
          },
        ],
      },
      {
        slug: "handling-the-conversation",
        title: "Handling the Actual Conversation",
        description:
          "The specific moments that feel hardest, handled with a plan instead of improvised in the moment.",
        lessons: [
          {
            slug: "negotiating-total-compensation",
            title: "Negotiating Beyond Base Salary",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Total compensation includes base, bonus, equity, and benefits — a company with limited flexibility on base salary may have more room on signing bonus, equity, or start date",
              "Ask what's flexible before assuming only base salary is negotiable — this question alone often reveals options you hadn't considered",
              "A firm, respectful 'the range you've offered is below what I'm looking for, is there room to move' keeps the conversation open without being adversarial",
            ],
          },
          {
            slug: "handling-a-no",
            title: "Handling a Firm 'No'",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "If an employer says a number is truly fixed, believe them and decide based on the offer as it stands, rather than repeating the same ask — persistence past a genuine 'no' damages the relationship without changing the outcome",
              "Consider non-monetary asks (title, start date, remote flexibility, a scheduled review date) when compensation itself is firm — these can still meaningfully improve the offer",
              "A negotiation, even one that doesn't move the number, rarely damages a genuine offer when conducted professionally — most employers expect and respect a reasonable negotiation attempt",
            ],
          },
        ],
      },
    ],
    project: {
      slug: "negotiation-prep-plan",
      title: "Prepare a Full Negotiation Plan",
      deliverables: [
        "A researched salary range for a realistic role, including sources used and a stated walk-away point",
        "A scripted response for the specific scenario of the employer holding firm on base salary",
      ],
      rubric: [
        "The range is grounded in multiple real sources and appropriately specific to the role and context",
        "The scripted response is professional, specific, and pivots constructively rather than just repeating the original ask",
      ],
    },
    resources: [
      {
        title: "Levels.fyi",
        type: "external-link",
        url: "https://www.levels.fyi/",
        description: "A widely used source for compensation data by role, level, and company.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the negotiation prep plan"],
  },
  {
    slug: "career-planning-and-goal-setting",
    title: "Career Planning and Goal Setting",
    subtitle:
      "Building a career direction deliberately instead of reactively — setting goals you'll actually revisit, and recognizing when it's time to change course.",
    category: "career-growth",
    difficulty: "beginner",
    estimatedDurationMinutes: 95,
    tags: ["career"],
    skills: ["career-planning"],
    careerPaths: [],
    instructor: {
      name: "Priya Shah",
      title: "Career Coach, ex-LinkedIn Talent Solutions",
      avatarInitials: "PS",
    },
    objectives: [
      "Set career goals that are specific enough to actually act on",
      "Build a skills gap plan connecting current abilities to a target role",
      "Recognize signals that indicate it's time to reassess a career direction",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "setting-actionable-goals",
        title: "Setting Actionable Career Goals",
        description: "A vague goal like 'grow my career' doesn't actually guide any decision.",
        lessons: [
          {
            slug: "specific-vs-vague-goals",
            title: "Specific Goals vs. Vague Aspirations",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "'Become a senior engineer within 2 years' is specific enough to plan against — 'advance my career' isn't, because it doesn't tell you what to actually do differently tomorrow",
              "A good career goal specifies a target role or capability and a rough timeframe — this doesn't need to be rigid, but it needs to be concrete enough to check progress against",
              "Revisit career goals periodically (e.g. every 6-12 months) — a goal set two years ago in different circumstances may no longer reflect what you actually want",
            ],
          },
          {
            slug: "skills-gap-planning",
            title: "Building a Skills Gap Plan",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Compare your current skills honestly against what a target role actually requires — this comparison, done specifically rather than vaguely, reveals exactly what to prioritize learning",
              "Prioritize gaps by how much they block the target role — a nice-to-have skill matters less than one that's a genuine prerequisite for the next step",
              "Seek specific opportunities (a stretch project, a mentor, a course) that close a particular identified gap, rather than generically 'trying to learn more'",
            ],
          },
        ],
      },
      {
        slug: "knowing-when-to-change-course",
        title: "Knowing When to Change Course",
        description: "Recognizing the signals that a career direction needs reassessment.",
        lessons: [
          {
            slug: "signals-for-reassessment",
            title: "Signals It's Time to Reassess",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Sustained disengagement (not just a hard week, but months of consistent lack of energy for the work) is a signal worth taking seriously, not dismissing as a temporary phase",
              "A persistent mismatch between what the role actually rewards and what genuinely motivates you tends to compound over time rather than resolve on its own",
              "A career change doesn't have to be dramatic — often the right adjustment is a shift within the same field or company, not a complete restart",
            ],
          },
          {
            slug: "career-planning-glossary",
            title: "Career Planning Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Skills gap plan",
                back: "A specific comparison of current skills against a target role's requirements, prioritized by what blocks progress most.",
              },
              {
                front: "Actionable goal",
                back: "A career goal specific enough to plan concrete next steps against, unlike a vague aspiration.",
              },
              {
                front: "Career reassessment",
                back: "A deliberate review of career direction, often triggered by sustained disengagement or a values mismatch.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "career-plan-with-skills-gap",
      title: "Build a Career Plan With a Skills Gap Analysis",
      deliverables: [
        "A specific career goal with a realistic timeframe",
        "A skills gap analysis comparing current abilities to the target role, prioritized by importance, with a specific plan to close the top gap",
      ],
      rubric: [
        "The goal is specific enough to act on, not a vague aspiration",
        "The skills gap analysis is honest and specific, with a concrete plan for the highest-priority gap",
      ],
    },
    resources: [
      {
        title: "80,000 Hours: Career Planning",
        type: "external-link",
        url: "https://80000hours.org/career-guide/",
        description: "A widely referenced framework for thinking about career decisions.",
      },
    ],
    certificateCriteria: [
      "Complete both modules",
      "Submit the career plan with skills gap analysis",
    ],
  },
  {
    slug: "interview-preparation-for-tech-roles",
    title: "Interview Preparation for Tech Roles",
    subtitle:
      "Preparing for the full arc of a tech interview loop — behavioral questions, technical rounds, and the questions you should be asking the interviewer too.",
    category: "career-growth",
    difficulty: "intermediate",
    estimatedDurationMinutes: 110,
    tags: ["career", "interview-prep"],
    skills: ["career-planning"],
    careerPaths: [],
    instructor: {
      name: "Priya Shah",
      title: "Career Coach, ex-LinkedIn Talent Solutions",
      avatarInitials: "PS",
    },
    objectives: [
      "Structure behavioral answers using a consistent, evidence-based method",
      "Prepare effectively for a technical interview round without over- or under-preparing",
      "Ask interviewers questions that genuinely inform your own decision",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "behavioral-interview-prep",
        title: "Behavioral Interview Preparation",
        description:
          "Answering 'tell me about a time when' with substance instead of a vague summary.",
        lessons: [
          {
            slug: "the-star-method",
            title: "The STAR Method",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "STAR — Situation, Task, Action, Result — structures a behavioral answer so it stays specific and concrete instead of drifting into generalities",
              "The 'Action' section deserves the most detail — this is where the interviewer learns what you specifically did, not what 'the team' did collectively",
              "Prepare 5-6 strong stories in advance covering different themes (conflict, failure, leadership, ambiguity) — most behavioral questions can be answered by adapting one of a small set of well-prepared stories",
            ],
          },
          {
            slug: "picking-the-right-stories",
            title: "Picking the Right Stories to Prepare",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Choose stories with a genuine, specific result — a story where the outcome is vague or unstated leaves the interviewer without evidence of actual impact",
              "Include at least one story about a real failure or mistake, told honestly with what you learned — refusing to acknowledge any real failure often reads as a lack of self-awareness, not as flawlessness",
              "Practice telling stories out loud, not just having them mentally outlined — the gap between 'I remember the story' and 'I can tell it smoothly under pressure' is larger than most candidates expect",
            ],
          },
        ],
      },
      {
        slug: "technical-rounds-and-your-own-questions",
        title: "Technical Rounds and Your Own Questions",
        description:
          "Preparing for the technical side, and using your own questions to actually evaluate the opportunity.",
        lessons: [
          {
            slug: "preparing-for-technical-rounds",
            title: "Preparing for Technical Interview Rounds",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Practice explaining your thinking out loud while solving a problem — many technical interviews evaluate reasoning process as much as the final answer, and silent problem-solving gives the interviewer nothing to assess",
              "Ask clarifying questions before diving into a solution — this is expected, not a sign of weakness, and jumping straight to code on an ambiguous problem often produces the wrong solution efficiently",
              "If stuck, narrate what you're trying and why, rather than going silent — an interviewer generally wants to see how you handle being stuck, since that happens on the actual job too",
            ],
          },
          {
            slug: "questions-to-ask-interviewers",
            title: "Questions Worth Asking the Interviewer",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Interviews are a two-way evaluation — ask specific, genuine questions that would actually inform your decision, not generic questions you already know the polished answer to",
              "Ask about how success is actually measured in the role, and what's changed on the team recently — these tend to surface more honest, useful information than 'what's the culture like'",
              "Avoid questions easily answered by the company website — asking them signals you didn't do basic research, undermining an otherwise strong interview",
            ],
          },
        ],
      },
    ],
    project: {
      slug: "interview-prep-kit",
      title: "Build a Personal Interview Prep Kit",
      deliverables: [
        "3 STAR-structured stories covering different behavioral themes (e.g. conflict, failure, leadership)",
        "5 specific questions to ask an interviewer, each with a note on what it would actually reveal",
      ],
      rubric: [
        "Stories are specific, include a clear result, and are told using genuine STAR structure",
        "Questions are specific and non-generic, each with a clear stated purpose",
      ],
    },
    resources: [
      {
        title: "Pramp: Technical Interview Practice",
        type: "external-link",
        url: "https://www.pramp.com/",
        description: "A platform for practicing technical interviews with peers.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the interview prep kit"],
  },
  // ---------------------------------------------------------------
  // System Design / Machine Learning / Data Science (10)
  // ---------------------------------------------------------------
  {
    slug: "system-design-interview-fundamentals",
    title: "System Design Interview Fundamentals",
    subtitle:
      "The building blocks behind every system design interview — scaling, the CAP theorem, and the vocabulary you need before tackling a real design problem.",
    category: "system-design",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: ["system-design"],
    skills: ["distributed-systems"],
    careerPaths: ["software-engineer"],
    instructor: { name: "Tomasz Wilk", title: "Staff Engineer, ex-Uber", avatarInitials: "TW" },
    objectives: [
      "Explain horizontal vs. vertical scaling and when each applies",
      "Apply the CAP theorem to reason about a distributed system's tradeoffs",
      "Use a consistent framework to approach an open-ended system design question",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "scaling-basics",
        title: "Scaling Basics",
        description: "The two directions a system can grow, and why one runs out of room faster.",
        lessons: [
          {
            slug: "horizontal-vs-vertical-scaling",
            title: "Horizontal vs. Vertical Scaling",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Vertical scaling means making a single machine more powerful (more CPU, RAM) — simple, but has a hard physical and cost ceiling, and creates a single point of failure",
              "Horizontal scaling means adding more machines and distributing load across them — has effectively no ceiling, but introduces real complexity around coordination, data consistency, and network communication between nodes",
              "Most systems start vertical (simpler) and move horizontal as they outgrow a single machine's capacity or need redundancy against failure — knowing when to make that shift matters as much as knowing how",
            ],
          },
          {
            slug: "the-cap-theorem",
            title: "The CAP Theorem",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "CAP theorem states a distributed system can only guarantee two of three properties during a network partition: Consistency (everyone sees the same data), Availability (every request gets a response), and Partition tolerance (the system keeps working despite network failures)",
              "Since network partitions are unavoidable in any real distributed system, the actual choice in practice is between consistency and availability during a partition — this is the real tradeoff CAP forces you to reason about",
              "A system doesn't have to make the same choice everywhere — different parts of the same system (e.g. inventory count vs. product description) can reasonably make different consistency/availability tradeoffs based on what actually matters for that data",
            ],
          },
        ],
      },
      {
        slug: "approaching-a-design-question",
        title: "Approaching a Design Question",
        description: "A consistent framework beats improvising from scratch each time.",
        lessons: [
          {
            slug: "a-framework-for-open-ended-design",
            title: "A Framework for Open-Ended Design Questions",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Start by clarifying requirements and scale (how many users, how much data, read-heavy or write-heavy) — designing before understanding scale produces a plausible-sounding answer that doesn't actually fit the real constraints",
              "Sketch a high-level architecture before diving into any one component's detail — this avoids over-engineering one part while leaving major pieces of the system unaddressed",
              "Explicitly state tradeoffs as you make design decisions — an interviewer (and a real design review) cares more about your reasoning for a choice than whether you picked the 'textbook' answer",
            ],
            code: {
              language: "text",
              code: "1. Clarify requirements and scale\n2. Estimate rough capacity (requests/sec, storage)\n3. Sketch high-level architecture\n4. Deep-dive the 1-2 most interesting/critical components\n5. Discuss tradeoffs and what you'd reconsider at 10x scale",
            },
          },
          {
            slug: "system-design-fundamentals-glossary",
            title: "System Design Fundamentals Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Horizontal scaling",
                back: "Adding more machines to distribute load, as opposed to making one machine more powerful.",
              },
              {
                front: "CAP theorem",
                back: "A distributed system can guarantee only two of Consistency, Availability, and Partition tolerance during a network partition.",
              },
              {
                front: "Capacity estimation",
                back: "Roughly calculating expected scale (requests/sec, storage) early in a design to ground later decisions.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "high-level-system-design",
      title: "Design a System at a High Level",
      deliverables: [
        "A capacity estimate and high-level architecture for a realistic system (e.g. a URL shortener or a basic messaging app)",
        "A written explanation of one CAP theorem tradeoff made in the design, with reasoning",
      ],
      rubric: [
        "The capacity estimate is grounded in stated assumptions, not arbitrary numbers",
        "The CAP tradeoff explanation correctly identifies which property was prioritized and why, for this specific system",
      ],
    },
    resources: [
      {
        title: "System Design Primer (GitHub)",
        type: "external-link",
        url: "https://github.com/donnemartin/system-design-primer",
        description: "A widely referenced open-source system design reference.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the high-level system design"],
  },
  {
    slug: "database-scaling-and-caching-patterns",
    title: "Database Scaling and Caching Patterns",
    subtitle:
      "What actually happens when a single database can't keep up — replication, sharding, and caching strategies, with their real tradeoffs.",
    category: "system-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["system-design"],
    skills: ["caching-strategy"],
    careerPaths: ["software-engineer"],
    instructor: { name: "Tomasz Wilk", title: "Staff Engineer, ex-Uber", avatarInitials: "TW" },
    objectives: [
      "Explain replication and sharding, and the tradeoffs each introduces",
      "Choose an appropriate caching strategy for a given access pattern",
      "Reason about cache invalidation, the hardest part of caching in practice",
    ],
    prerequisites: [{ courseSlug: "system-design-interview-fundamentals" }],
    modules: [
      {
        slug: "scaling-a-database",
        title: "Scaling a Database",
        description: "Replication for read capacity and durability, sharding for write capacity.",
        lessons: [
          {
            slug: "replication",
            title: "Database Replication",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Replication copies data across multiple database instances — a primary handles writes while replicas handle reads, letting read capacity scale independently of write capacity",
              "Replication lag (a delay before a write propagates to replicas) means a read right after a write might return stale data — systems that can't tolerate this need to read from the primary for that specific case",
              "Replication also improves durability and availability — if the primary fails, a replica can be promoted, though this failover process introduces its own complexity and brief unavailability",
            ],
          },
          {
            slug: "sharding",
            title: "Database Sharding",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "Sharding splits data across multiple databases based on a shard key (e.g. user ID range) — this scales write capacity, which replication alone doesn't address",
              "Choosing a good shard key matters enormously — a poor choice creates hot shards (uneven load) where some shards handle disproportionately more traffic than others",
              "Cross-shard queries (needing data from multiple shards at once) become significantly harder after sharding — this is a real cost that should factor into the decision to shard in the first place, not just be discovered afterward",
            ],
          },
        ],
      },
      {
        slug: "caching-strategies",
        title: "Caching Strategies",
        description: "The fastest way to make a system faster, and the hardest thing to get right.",
        lessons: [
          {
            slug: "cache-strategies-and-invalidation",
            title: "Cache Strategies and Invalidation",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Cache-aside (application checks cache, falls back to database on a miss, then populates the cache) is the most common pattern and gives the application full control over caching logic",
              "Write-through (writes go to the cache and database together) keeps the cache always current at the cost of slightly slower writes — appropriate when read freshness matters most",
              "'There are only two hard things in computer science: cache invalidation and naming things' is a well-known joke for a reason — deciding when cached data is stale enough to refresh is genuinely difficult, and a wrong TTL either serves stale data or defeats the cache's purpose with excessive misses",
            ],
            code: {
              language: "text",
              code: "Cache-aside read: check cache -> miss -> read DB -> write result to cache -> return\nCache-aside write: write DB -> invalidate (or update) the corresponding cache entry",
            },
          },
          {
            slug: "database-scaling-glossary",
            title: "Database Scaling Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Replication lag",
                back: "The delay before a write on a primary database propagates to its replicas.",
              },
              {
                front: "Hot shard",
                back: "A database shard receiving disproportionately more load than others due to a poor shard key choice.",
              },
              {
                front: "Cache-aside",
                back: "A caching pattern where the application checks the cache first and falls back to the database on a miss.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "scaling-and-caching-design",
      title: "Design a Database Scaling and Caching Strategy",
      deliverables: [
        "A replication and sharding plan for a realistic high-read, high-write system, including the chosen shard key and its tradeoffs",
        "A caching strategy for the system's hottest read path, including the invalidation approach",
      ],
      rubric: [
        "The shard key choice is justified and its cross-shard query limitations are acknowledged",
        "The caching strategy addresses invalidation explicitly, not just cache population",
      ],
    },
    resources: [
      {
        title: "AWS: Database Caching Strategies",
        type: "external-link",
        url: "https://aws.amazon.com/caching/database-caching/",
        description: "An overview of common database caching strategies.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the scaling and caching design"],
  },
  {
    slug: "message-queues-and-event-driven-architecture",
    title: "Message Queues and Event-Driven Architecture",
    subtitle:
      "Decoupling services so they don't all have to be up at once — queues, pub/sub, and the tradeoffs of async communication.",
    category: "system-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["system-design"],
    skills: ["message-queues"],
    careerPaths: ["software-engineer"],
    instructor: { name: "Tomasz Wilk", title: "Staff Engineer, ex-Uber", avatarInitials: "TW" },
    objectives: [
      "Explain when asynchronous, queue-based communication beats a direct synchronous call",
      "Distinguish point-to-point queues from publish/subscribe patterns",
      "Design for at-least-once delivery and idempotent message handling",
    ],
    prerequisites: [{ courseSlug: "system-design-interview-fundamentals" }],
    modules: [
      {
        slug: "why-use-a-queue",
        title: "Why Use a Queue",
        description:
          "Decoupling producers from consumers changes what happens under load or failure.",
        lessons: [
          {
            slug: "sync-vs-async-communication",
            title: "Synchronous vs. Asynchronous Communication",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A synchronous call requires the caller to wait for the callee to respond — simple, but the caller is blocked (and can fail) if the callee is slow or down",
              "A queue decouples the producer from the consumer — the producer publishes a message and moves on, and the consumer processes it whenever it's able to, even if temporarily behind or down",
              "Queues are especially valuable for absorbing traffic spikes — messages pile up in the queue rather than overwhelming the downstream service directly, smoothing out load over time",
            ],
          },
          {
            slug: "point-to-point-vs-pubsub",
            title: "Point-to-Point Queues vs. Publish/Subscribe",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A point-to-point queue delivers each message to exactly one consumer — appropriate for work distribution, like a pool of workers processing jobs",
              "Publish/subscribe delivers each message to every subscriber — appropriate when multiple independent services all need to know about the same event",
              "Choosing the wrong pattern is a common design mistake — using pub/sub for work distribution means every worker processes every job redundantly, while using point-to-point for an event multiple services need misses that other services never see it",
            ],
          },
        ],
      },
      {
        slug: "delivery-guarantees",
        title: "Delivery Guarantees and Idempotency",
        description:
          "What 'the message was delivered' actually promises, and why that's rarely exactly-once.",
        lessons: [
          {
            slug: "at-least-once-and-idempotency",
            title: "At-Least-Once Delivery and Idempotent Handling",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Most real message queues guarantee at-least-once delivery, not exactly-once — a message can be delivered more than once (e.g. if a consumer crashes after processing but before acknowledging)",
              "Design message handlers to be idempotent — processing the same message twice should produce the same result as processing it once, typically by checking whether the effect (e.g. an order) already exists before applying it",
              "Assuming exactly-once delivery without designing for idempotency is a common, costly system design mistake — it eventually causes duplicate processing (double charges, duplicate emails) under real-world failure conditions",
            ],
            code: {
              language: "text",
              code: "Non-idempotent handler: on message, always create a new order row  <- duplicate message = duplicate order\nIdempotent handler: on message, check if order with this message_id already exists; skip if so",
            },
          },
          {
            slug: "message-queues-glossary",
            title: "Message Queues Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "At-least-once delivery",
                back: "A guarantee that a message will be delivered one or more times, but never zero times.",
              },
              {
                front: "Idempotent handler",
                back: "A message handler that produces the same result whether it processes a message once or multiple times.",
              },
              {
                front: "Publish/subscribe",
                back: "A messaging pattern where each published message is delivered to every subscriber, not just one consumer.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "event-driven-design",
      title: "Design an Event-Driven Component",
      deliverables: [
        "A design for a realistic async workflow (e.g. order processing) choosing between point-to-point and pub/sub, with reasoning",
        "An idempotent handler design for the workflow's message consumer, explaining how duplicate delivery is handled",
      ],
      rubric: [
        "The queue pattern choice is correctly justified for the specific workflow's needs",
        "The idempotency design would genuinely prevent duplicate side effects under at-least-once delivery",
      ],
    },
    resources: [
      {
        title: "AWS: Message Queuing Concepts",
        type: "external-link",
        url: "https://aws.amazon.com/message-queue/",
        description: "An overview of message queuing concepts and patterns.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the event-driven design"],
  },
  {
    slug: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    subtitle:
      "What machine learning actually is beneath the hype — the core workflow of training a model on data, and the vocabulary that shows up everywhere else in ML.",
    category: "machine-learning",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["machine-learning"],
    skills: ["ml-fundamentals"],
    careerPaths: ["ai-engineer", "data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Explain the difference between supervised, unsupervised, and reinforcement learning",
      "Describe the standard ML workflow from data to a trained model",
      "Explain overfitting and why it's the central challenge of model training",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "types-of-machine-learning",
        title: "Types of Machine Learning",
        description:
          "Three fundamentally different problem setups, often confused with each other.",
        lessons: [
          {
            slug: "supervised-unsupervised-reinforcement",
            title: "Supervised, Unsupervised, and Reinforcement Learning",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Supervised learning trains on labeled examples (input paired with the correct output) to predict outputs for new inputs — most real-world business ML applications are supervised",
              "Unsupervised learning finds structure in unlabeled data (clustering similar items, reducing dimensionality) without being told the 'correct' answer in advance",
              "Reinforcement learning trains an agent to take actions in an environment to maximize a reward signal over time, learning through trial and consequence rather than from a fixed labeled dataset",
            ],
          },
          {
            slug: "the-standard-ml-workflow",
            title: "The Standard ML Workflow",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "The typical workflow: collect and clean data, split into train/validation/test sets, train a model on the training set, tune it using validation performance, and finally evaluate once on the held-out test set",
              "The test set should only be used once, at the very end — repeatedly checking test performance and adjusting based on it effectively turns the test set into a second validation set, defeating its purpose as an honest final check",
              "Most of the actual time in a real ML project goes into data collection and cleaning, not model training itself — this surprises many people new to the field who expect the modeling step to dominate",
            ],
          },
        ],
      },
      {
        slug: "the-central-challenge",
        title: "The Central Challenge: Overfitting",
        description:
          "A model that memorizes its training data isn't actually learning anything generalizable.",
        lessons: [
          {
            slug: "overfitting-and-generalization",
            title: "Overfitting and Generalization",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Overfitting happens when a model learns the training data's noise and specific quirks rather than the underlying pattern — it performs great on training data but poorly on new, unseen data",
              "Underfitting is the opposite problem — the model is too simple to capture the real pattern, performing poorly even on the training data itself",
              "A gap between strong training performance and weak validation performance is the classic signal of overfitting — this comparison is exactly why a held-out validation set exists in the first place",
            ],
            code: {
              language: "text",
              code: "Training accuracy: 99% | Validation accuracy: 68%  <- large gap = overfitting\nTraining accuracy: 62% | Validation accuracy: 60%  <- both low = likely underfitting",
            },
          },
          {
            slug: "ml-fundamentals-glossary",
            title: "Machine Learning Fundamentals Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Supervised learning",
                back: "Training a model on labeled examples to predict outputs for new, unseen inputs.",
              },
              {
                front: "Overfitting",
                back: "When a model learns training data's noise rather than the underlying pattern, hurting generalization.",
              },
              {
                front: "Validation set",
                back: "A held-out dataset used to tune a model and detect overfitting before the final test evaluation.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "ml-workflow-plan",
      title: "Plan an ML Workflow for a Real Problem",
      deliverables: [
        "A classification of a realistic business problem as supervised, unsupervised, or reinforcement learning, with reasoning",
        "A described train/validation/test workflow for the problem, including how you'd detect overfitting",
      ],
      rubric: [
        "The problem classification is correct and well-reasoned",
        "The workflow correctly uses validation performance (not test performance) to detect and address overfitting",
      ],
    },
    resources: [
      {
        title: "Google: Machine Learning Crash Course",
        type: "external-link",
        url: "https://developers.google.com/machine-learning/crash-course",
        description: "Google's introductory machine learning course.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the ML workflow plan"],
  },
  {
    slug: "supervised-learning-in-practice",
    title: "Supervised Learning in Practice",
    subtitle:
      "Going from theory to an actual trained model — regression vs. classification, choosing a baseline algorithm, and reading a model's real performance honestly.",
    category: "machine-learning",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["machine-learning"],
    skills: ["supervised-learning"],
    careerPaths: ["ai-engineer", "data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Distinguish regression and classification problems and match algorithms to each",
      "Establish a baseline before reaching for a complex model",
      "Explain the bias-variance tradeoff in practical terms",
    ],
    prerequisites: [{ courseSlug: "machine-learning-fundamentals" }],
    modules: [
      {
        slug: "regression-vs-classification",
        title: "Regression vs. Classification",
        description:
          "Predicting a number and predicting a category are genuinely different problems.",
        lessons: [
          {
            slug: "regression-and-classification-basics",
            title: "Regression and Classification Basics",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Regression predicts a continuous numeric value (predicted house price, predicted delivery time) — classification predicts a discrete category (spam or not spam, which of several product categories)",
              "Linear/logistic regression are simple, interpretable baseline algorithms for regression and classification respectively — they're often underrated as a starting point before jumping to more complex models",
              "Tree-based models (decision trees, random forests, gradient boosting) handle non-linear relationships well and are a common strong default for structured/tabular data problems",
            ],
          },
          {
            slug: "starting-with-a-baseline",
            title: "Starting With a Baseline",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A baseline (even something as simple as 'always predict the most common class' or 'predict the average value') establishes a floor — a sophisticated model that barely beats this baseline may not be worth its added complexity",
              "Jumping straight to a complex model without a baseline makes it impossible to know how much value the complexity is actually adding versus a much simpler approach",
              "A simple, interpretable baseline model is also easier to debug and explain to stakeholders — complexity should be earned by a genuine, measured performance improvement, not assumed to be better by default",
            ],
          },
        ],
      },
      {
        slug: "bias-variance-tradeoff",
        title: "The Bias-Variance Tradeoff",
        description: "The fundamental tension in model complexity, explained without heavy math.",
        lessons: [
          {
            slug: "bias-variance-in-practice",
            title: "Bias-Variance Tradeoff in Practice",
            kind: "code",
            durationMinutes: 18,
            points: [
              "High bias means a model is too simple to capture real patterns (underfitting) — high variance means a model is too sensitive to the specific training data's noise (overfitting)",
              "Increasing model complexity typically reduces bias but increases variance — the goal is finding the complexity level that minimizes total error, not simply maximizing or minimizing either one",
              "Regularization techniques deliberately constrain a model to reduce variance at a small cost to bias — this is a common, practical way to fight overfitting without changing the model architecture itself",
            ],
            code: {
              language: "text",
              code: "Too simple (high bias): straight line through clearly curved data -> underfits both train and test\nToo complex (high variance): a wiggly curve hitting every training point exactly -> overfits, fails on new data\nGoal: complexity that generalizes well to held-out data",
            },
          },
          {
            slug: "supervised-learning-glossary",
            title: "Supervised Learning Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Baseline model",
                back: "A simple model establishing a performance floor before investing in more complex approaches.",
              },
              {
                front: "Bias-variance tradeoff",
                back: "The tension between a model being too simple (high bias) or too sensitive to training noise (high variance).",
              },
              {
                front: "Regularization",
                back: "A technique constraining model complexity to reduce variance and fight overfitting.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "baseline-and-model-comparison",
      title: "Build a Baseline and Compare to a Stronger Model",
      deliverables: [
        "A defined baseline for a realistic supervised learning problem, with its expected performance",
        "A comparison of a stronger model's performance against the baseline, with a bias-variance interpretation of the result",
      ],
      rubric: [
        "The baseline is genuinely simple and appropriate as a floor for the stated problem",
        "The bias-variance interpretation correctly explains the comparison's result, not just restating the numbers",
      ],
    },
    resources: [
      {
        title: "scikit-learn: Choosing the Right Estimator",
        type: "external-link",
        url: "https://scikit-learn.org/stable/machine_learning_map.html",
        description:
          "A practical guide to choosing an appropriate algorithm for a given ML problem.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the baseline and model comparison"],
  },
  {
    slug: "model-evaluation-and-validation",
    title: "Model Evaluation and Validation",
    subtitle:
      "Why accuracy alone lies to you constantly — precision, recall, and cross-validation as the actual tools for knowing if a model works.",
    category: "machine-learning",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["machine-learning"],
    skills: ["model-evaluation"],
    careerPaths: ["ai-engineer", "data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Explain why accuracy is misleading on imbalanced datasets",
      "Choose between precision and recall based on the actual cost of different error types",
      "Use cross-validation to get a more reliable performance estimate",
    ],
    prerequisites: [{ courseSlug: "machine-learning-fundamentals" }],
    modules: [
      {
        slug: "beyond-accuracy",
        title: "Beyond Accuracy",
        description: "A single number that can hide a model that's actually useless.",
        lessons: [
          {
            slug: "the-accuracy-trap",
            title: "The Accuracy Trap on Imbalanced Data",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "On a dataset where 99% of examples belong to one class (e.g. fraud detection, where fraud is rare), a model that always predicts 'not fraud' scores 99% accuracy while being completely useless",
              "This is why accuracy alone is a dangerous default metric — it can look excellent while the model has learned nothing useful about the minority class that actually matters",
              "Check the class balance of a dataset before trusting accuracy as the primary metric — a roughly balanced dataset makes accuracy far more meaningful than a heavily imbalanced one",
            ],
          },
          {
            slug: "precision-and-recall",
            title: "Precision and Recall",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Precision answers 'of everything the model flagged as positive, how much was actually positive' — recall answers 'of everything that was actually positive, how much did the model catch'",
              "The right metric to prioritize depends on the actual cost of each error type — a spam filter prioritizes precision (a false positive means losing a real email), while a cancer screening test prioritizes recall (a false negative means missing a real case)",
              "There's usually a tradeoff between precision and recall — adjusting a model's decision threshold to increase one typically decreases the other, so the choice should be a deliberate business decision, not a default",
            ],
            code: {
              language: "text",
              code: "Precision = True Positives / (True Positives + False Positives)\nRecall = True Positives / (True Positives + False Negatives)\nFraud model that flags too aggressively: high recall, low precision (many false alarms)",
            },
          },
        ],
      },
      {
        slug: "getting-a-reliable-estimate",
        title: "Getting a Reliable Performance Estimate",
        description:
          "A single train/test split can mislead you — cross-validation gives a more honest picture.",
        lessons: [
          {
            slug: "cross-validation",
            title: "Cross-Validation",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "K-fold cross-validation splits the data into k parts, training on k-1 and validating on the remaining part, rotating through all k combinations — this gives a performance estimate less dependent on one particular lucky or unlucky split",
              "A single train/test split can produce a misleadingly optimistic or pessimistic result purely by chance, especially with a smaller dataset — cross-validation's average across multiple splits is more robust",
              "Cross-validation costs more compute (training the model k times instead of once) — this tradeoff is usually worth it for a more trustworthy estimate, especially before finalizing an important model",
            ],
          },
          {
            slug: "model-evaluation-glossary",
            title: "Model Evaluation Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Precision",
                back: "Of everything predicted positive, the fraction that was actually positive.",
              },
              {
                front: "Recall",
                back: "Of everything actually positive, the fraction the model correctly identified.",
              },
              {
                front: "K-fold cross-validation",
                back: "Splitting data into k parts and rotating training/validation across all combinations for a more robust performance estimate.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "metric-selection-and-evaluation",
      title: "Select Metrics and Evaluate a Model Properly",
      deliverables: [
        "A metric selection (precision vs. recall priority) for a realistic imbalanced classification problem, with cost-based reasoning",
        "A cross-validation plan for the problem, explaining why a single train/test split would be less reliable here",
      ],
      rubric: [
        "The metric choice is justified by the actual real-world cost of false positives vs. false negatives",
        "The cross-validation explanation correctly identifies why it's more robust than a single split for this case",
      ],
    },
    resources: [
      {
        title: "scikit-learn: Model Evaluation",
        type: "external-link",
        url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
        description: "scikit-learn's documentation on model evaluation metrics.",
      },
    ],
    certificateCriteria: [
      "Complete both modules",
      "Submit the metric selection and evaluation plan",
    ],
  },
  {
    slug: "feature-engineering-for-machine-learning",
    title: "Feature Engineering for Machine Learning",
    subtitle:
      "Why the inputs you give a model usually matter more than the algorithm you choose — encoding, scaling, and creating features that actually carry signal.",
    category: "machine-learning",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["machine-learning"],
    skills: ["feature-engineering"],
    careerPaths: ["ai-engineer", "data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Encode categorical variables appropriately for a given model type",
      "Apply feature scaling where it actually matters",
      "Create derived features that expose signal a raw column doesn't",
    ],
    prerequisites: [{ courseSlug: "machine-learning-fundamentals" }],
    modules: [
      {
        slug: "encoding-and-scaling",
        title: "Encoding and Scaling",
        description: "Getting raw data into a form a model can actually use well.",
        lessons: [
          {
            slug: "encoding-categorical-variables",
            title: "Encoding Categorical Variables",
            kind: "code",
            durationMinutes: 17,
            free: true,
            points: [
              "One-hot encoding creates a separate binary column per category — works well for algorithms without an assumption of ordering, but can create many columns for a high-cardinality feature",
              "Label encoding assigns each category an integer — appropriate for tree-based models, but risky for algorithms like linear regression that would incorrectly interpret the numbers as having a meaningful order or magnitude",
              "For high-cardinality categorical features (e.g. thousands of distinct product IDs), target encoding or embedding-based approaches often outperform one-hot encoding, which would create an unwieldy number of columns",
            ],
            code: {
              language: "text",
              code: "One-hot: color=[red,blue,green] -> is_red, is_blue, is_green (3 binary columns)\nLabel: color=[red,blue,green] -> 0, 1, 2  (risky for linear models: implies red < blue < green)",
            },
          },
          {
            slug: "feature-scaling",
            title: "Feature Scaling",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Features on very different scales (e.g. age in years vs. income in dollars) can cause distance-based or gradient-based algorithms to be dominated by whichever feature happens to have a larger raw numeric range",
              "Standardization (mean 0, standard deviation 1) or min-max scaling puts features on comparable scales — tree-based models are generally unaffected by this and don't require it, but many other algorithms genuinely need it",
              "Fit the scaler only on training data, then apply it to validation/test data — fitting on the full dataset before splitting leaks information from the test set into training, producing an overly optimistic evaluation",
            ],
          },
        ],
      },
      {
        slug: "creating-derived-features",
        title: "Creating Derived Features",
        description:
          "Sometimes the most valuable feature isn't in the raw data at all — it has to be built.",
        lessons: [
          {
            slug: "deriving-useful-features",
            title: "Deriving Features That Expose Signal",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A raw timestamp is rarely as useful as derived features from it — day of week, hour of day, or time since a relevant event often carry far more predictive signal than the raw datetime value",
              "Ratios and interactions between existing features (e.g. price per square foot, rather than price and square footage separately) can expose a relationship a model would otherwise have to learn indirectly and imperfectly",
              "Domain knowledge about the actual problem is often what makes the difference in feature engineering — understanding what genuinely drives the outcome usually beats mechanically generating many generic derived features",
            ],
          },
          {
            slug: "feature-engineering-glossary",
            title: "Feature Engineering Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "One-hot encoding",
                back: "Representing a categorical variable as separate binary columns, one per category.",
              },
              {
                front: "Feature scaling",
                back: "Transforming features onto a comparable numeric range so no feature dominates purely due to its raw scale.",
              },
              {
                front: "Derived feature",
                back: "A new feature computed from existing raw data to expose signal not directly present in the raw columns.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "feature-engineering-plan",
      title: "Build a Feature Engineering Plan for a Real Dataset",
      deliverables: [
        "An encoding plan for at least 2 categorical features of different cardinality, with the chosen approach justified",
        "3 derived features for a realistic dataset, each with reasoning for why it would carry useful signal",
      ],
      rubric: [
        "Encoding choices are appropriately matched to cardinality and the intended model type",
        "Derived features are genuinely plausible sources of signal, not arbitrary transformations",
      ],
    },
    resources: [
      {
        title: "Google: Feature Engineering",
        type: "external-link",
        url: "https://developers.google.com/machine-learning/crash-course/representation/feature-engineering",
        description: "Google's guidance on feature engineering fundamentals.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the feature engineering plan"],
  },
  {
    slug: "data-science-workflow-and-tooling",
    title: "Data Science Workflow and Tooling",
    subtitle:
      "How a data science project actually moves from a vague business question to a decision-ready answer — and the tools that support each stage.",
    category: "data-science",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["data-science"],
    skills: ["data-storytelling"],
    careerPaths: ["data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Translate a vague business question into a well-scoped analytical question",
      "Describe the standard data science project lifecycle",
      "Communicate a data science finding to a non-technical audience effectively",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "from-question-to-analysis",
        title: "From Business Question to Analysis",
        description: "The step most new data scientists skip past too quickly.",
        lessons: [
          {
            slug: "scoping-the-question",
            title: "Scoping a Vague Business Question",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "'Why are sales down' is too vague to analyze directly — scope it into a specific, answerable question, like 'has the drop been concentrated in a specific region, product line, or customer segment'",
              "Clarify what decision the answer would actually inform — an analysis with no connected decision often produces an interesting but unused finding",
              "Confirm scope with the stakeholder before investing significant analysis time — a mismatch discovered after the analysis is finished wastes far more time than a short scoping conversation upfront",
            ],
          },
          {
            slug: "the-ds-project-lifecycle",
            title: "The Data Science Project Lifecycle",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A typical lifecycle: scope the question, gather and clean data, explore and analyze, build a model or answer if needed, and communicate findings — communication is a distinct, often underweighted final stage, not an afterthought",
              "Exploratory analysis frequently reveals the original question needs to be refined or the available data doesn't support the original plan — looping back and re-scoping is normal, not a sign of a failed process",
              "A finding that never gets communicated in a way stakeholders act on delivers zero actual value, regardless of how rigorous the underlying analysis was",
            ],
          },
        ],
      },
      {
        slug: "communicating-findings",
        title: "Communicating Data Science Findings",
        description: "Rigor that never reaches a decision-maker doesn't change any decision.",
        lessons: [
          {
            slug: "communicating-to-non-technical-audiences",
            title: "Communicating to Non-Technical Audiences",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Lead with the finding and its business implication, not the methodology — a stakeholder generally cares what it means for their decision far more than how the analysis was technically performed",
              "Use a visualization appropriate to the finding, and be prepared to explain the methodology if specifically asked, rather than front-loading technical detail nobody asked for",
              "State the analysis's real limitations and confidence level honestly — overselling a preliminary or uncertain finding as definitive damages trust once reality catches up",
            ],
          },
          {
            slug: "ds-workflow-glossary",
            title: "Data Science Workflow Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Question scoping",
                back: "Translating a vague business question into a specific, analyzable question tied to a decision.",
              },
              {
                front: "Exploratory analysis",
                back: "The stage of investigating data to understand patterns before committing to a specific modeling approach.",
              },
              {
                front: "Finding communication",
                back: "Presenting an analysis's results and implications clearly to a non-technical decision-maker.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "scoped-analysis-and-summary",
      title: "Scope a Question and Write a Findings Summary",
      deliverables: [
        "A scoped, specific analytical question derived from a vague hypothetical business question",
        "A one-page findings summary for a hypothetical analysis result, written for a non-technical stakeholder",
      ],
      rubric: [
        "The scoped question is specific, answerable, and clearly tied to a decision",
        "The findings summary leads with implication, not methodology, and states limitations honestly",
      ],
    },
    resources: [
      {
        title: "Harvard Business Review: Data Science and the Art of Persuasion",
        type: "external-link",
        url: "https://hbr.org/2020/01/data-science-and-the-art-of-persuasion",
        description: "An HBR article on communicating data science findings effectively.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the scoped analysis and summary"],
  },
  {
    slug: "experiment-design-and-ab-testing",
    title: "Experiment Design and A/B Testing",
    subtitle:
      "Running an experiment that actually proves what you think it proves — sample size, statistical significance, and the traps that invalidate results silently.",
    category: "data-science",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["data-science"],
    skills: ["experiment-design"],
    careerPaths: ["data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Design an A/B test with a clear hypothesis and success metric",
      "Calculate an appropriate sample size before running a test",
      "Recognize common experiment design mistakes that invalidate results",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "designing-a-valid-experiment",
        title: "Designing a Valid Experiment",
        description:
          "The setup decisions that determine whether a test's result can actually be trusted.",
        lessons: [
          {
            slug: "hypothesis-and-success-metric",
            title: "Defining a Hypothesis and Success Metric",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A clear hypothesis states what change you're making and what effect you expect — 'changing the button color will increase clicks' is testable; 'let's see what happens if we change the button color' isn't a hypothesis at all",
              "Choose the success metric before running the test, not after seeing the results — picking a metric retroactively based on what happened to move is a well-known way to fool yourself into seeing a false effect",
              "A single primary metric should determine success or failure — tracking many secondary metrics is fine for context, but treating any one of many metrics as evidence of success (if it happens to move) inflates the false positive rate substantially",
            ],
          },
          {
            slug: "sample-size-and-significance",
            title: "Sample Size and Statistical Significance",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Calculate the required sample size before running a test, based on the minimum effect size you actually care about detecting — an underpowered test can fail to detect a real effect simply because it didn't collect enough data",
              "Statistical significance (typically p < 0.05) indicates the observed effect is unlikely to be due to random chance alone — it doesn't by itself indicate the effect is large or practically important",
              "Stopping a test early because it happens to look significant partway through ('peeking') inflates the false positive rate — decide the sample size and stopping point in advance, and stick to it",
            ],
            code: {
              language: "text",
              code: "Underpowered test: small sample -> real 5% improvement exists but isn't detected (false negative)\n'Peeking': checking results daily and stopping the moment p < 0.05 appears -> inflated false positive rate",
            },
          },
        ],
      },
      {
        slug: "common-experiment-pitfalls",
        title: "Common Experiment Pitfalls",
        description:
          "Mistakes that quietly invalidate a test's result, often without anyone noticing.",
        lessons: [
          {
            slug: "experiment-pitfalls",
            title: "Pitfalls That Invalidate Experiment Results",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Novelty effects — a change performs well initially simply because it's new and gets extra attention, not because it's genuinely better — can make a short test look more successful than the effect will hold up long-term",
              "Contamination between test groups (e.g. users seeing both variants, or word-of-mouth influencing the control group) undermines the clean comparison an experiment depends on",
              "Running many simultaneous experiments on overlapping users without accounting for interaction effects between them can produce misleading results for each individual test",
            ],
          },
          {
            slug: "ab-testing-glossary",
            title: "A/B Testing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Statistical significance",
                back: "A measure of how unlikely an observed effect is to be due to random chance alone.",
              },
              {
                front: "Peeking",
                back: "Checking test results repeatedly and stopping early once significance appears, which inflates false positives.",
              },
              {
                front: "Novelty effect",
                back: "A temporary performance boost from a change simply being new, not reflecting its true long-term effect.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "ab-test-design",
      title: "Design a Complete A/B Test",
      deliverables: [
        "A hypothesis and primary success metric for a realistic product change, defined before any results exist",
        "A sample size and stopping-point plan, plus identification of at least one pitfall relevant to this specific test",
      ],
      rubric: [
        "The hypothesis and metric are specific and defined prospectively, not fitted after the fact",
        "The pitfall identified is genuinely relevant to the specific test design, not a generic list item",
      ],
    },
    resources: [
      {
        title: "Optimizely: A/B Testing Statistics",
        type: "external-link",
        url: "https://www.optimizely.com/optimization-glossary/ab-testing-statistics/",
        description: "A practical guide to the statistics behind A/B testing.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the A/B test design"],
  },
  {
    slug: "mlops-and-model-deployment-fundamentals",
    title: "MLOps and Model Deployment Fundamentals",
    subtitle:
      "What happens after a model works in a notebook — serving it reliably, monitoring for drift, and the operational discipline that separates a demo from a production ML system.",
    category: "machine-learning",
    difficulty: "advanced",
    estimatedDurationMinutes: 130,
    tags: ["machine-learning", "devops"],
    skills: ["ml-fundamentals", "monitoring-and-observability"],
    careerPaths: ["ai-engineer", "data-scientist"],
    instructor: { name: "Hana Kobayashi", title: "ML Engineer, ex-DeepMind", avatarInitials: "HK" },
    objectives: [
      "Explain the gap between a notebook model and a production ML system",
      "Design a model serving approach appropriate to a given latency requirement",
      "Detect and respond to model and data drift after deployment",
    ],
    prerequisites: [{ courseSlug: "machine-learning-fundamentals" }],
    modules: [
      {
        slug: "from-notebook-to-production",
        title: "From Notebook to Production",
        description: "A model that works in a notebook is a prototype, not a deployed system.",
        lessons: [
          {
            slug: "the-notebook-to-production-gap",
            title: "The Gap Between a Notebook and a Production System",
            kind: "reading",
            durationMinutes: 18,
            free: true,
            points: [
              "A notebook proves a model can work on a static dataset — production requires reliable serving under real traffic, versioned reproducible training, monitoring, and a plan for what happens when something goes wrong",
              "Reproducibility matters enormously in production — being able to answer 'exactly which code, data, and parameters produced this specific deployed model' is essential when something needs debugging or rolling back",
              "Treat the training pipeline itself as production code — version it, test it, and review changes to it, not just the final model artifact",
            ],
          },
          {
            slug: "model-serving-approaches",
            title: "Model Serving Approaches",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Real-time serving (a live API endpoint) fits use cases needing an immediate prediction, like fraud detection at checkout — batch serving (running predictions on a schedule) fits use cases where predictions can be precomputed, like a weekly churn risk score",
              "Real-time serving has stricter latency and uptime requirements, generally costing more in engineering complexity than batch serving for the same underlying model",
              "Choose the serving approach based on the actual latency requirement of the use case, not by default — over-engineering real-time serving for a use case that only needed batch predictions wastes significant effort",
            ],
          },
        ],
      },
      {
        slug: "monitoring-deployed-models",
        title: "Monitoring Deployed Models",
        description:
          "A model's performance can silently degrade after deployment — you need to actually watch for it.",
        lessons: [
          {
            slug: "model-and-data-drift",
            title: "Detecting Model and Data Drift",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Data drift happens when the real-world input distribution shifts away from what the model was trained on (e.g. new customer behavior post-launch of a competitor) — the model's assumptions quietly become less valid over time",
              "Model performance can degrade even without an obvious code change — this is why production ML needs ongoing performance monitoring, not just a one-time evaluation before deployment",
              "Monitor both prediction distribution (is the model suddenly predicting very differently than before) and, where possible, actual outcome accuracy once ground truth becomes available — the former gives an early warning before the latter confirms a real problem",
            ],
            code: {
              language: "text",
              code: "Signal: model's predicted positive rate jumps from 5% to 22% with no known change in the underlying business\nLikely cause: data drift, or an upstream data pipeline change feeding the model different-looking input than it was trained on",
            },
          },
          {
            slug: "mlops-glossary",
            title: "MLOps Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Data drift",
                back: "A shift in the real-world input distribution away from what a model was originally trained on.",
              },
              {
                front: "Real-time serving",
                back: "Serving model predictions via a live API for use cases needing an immediate result.",
              },
              {
                front: "Batch serving",
                back: "Running model predictions on a schedule for use cases where precomputed results are acceptable.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "deployment-and-monitoring-plan",
      title: "Design a Model Deployment and Monitoring Plan",
      deliverables: [
        "A serving approach (real-time or batch) for a realistic ML use case, justified by its latency requirement",
        "A monitoring plan defining what drift signals would be tracked and what action each would trigger",
      ],
      rubric: [
        "The serving approach is correctly matched to the use case's actual latency needs",
        "The monitoring plan defines specific, actionable signals, not a vague 'monitor performance' statement",
      ],
    },
    resources: [
      {
        title: "Google Cloud: MLOps Overview",
        type: "external-link",
        url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
        description: "Google Cloud's overview of MLOps practices and pipelines.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the deployment and monitoring plan"],
  },
];
