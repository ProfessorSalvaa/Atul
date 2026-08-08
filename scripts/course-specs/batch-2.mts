import type { CourseSpec } from "../lib/course-spec-types.mts";

export const SPECS: CourseSpec[] = [
  // ---------------------------------------------------------------
  // Data Analyst path (remaining 4)
  // ---------------------------------------------------------------
  {
    slug: "data-cleaning-and-preparation",
    title: "Data Cleaning and Preparation",
    subtitle:
      "The unglamorous, high-leverage skill of turning messy raw data into something you can actually trust and analyze.",
    category: "data-analytics",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["data", "analytics"],
    skills: ["data-cleaning"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Identify the most common data quality problems before they corrupt an analysis",
      "Apply a repeatable process for cleaning a new dataset",
      "Document cleaning decisions so an analysis is reproducible",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "spotting-data-quality-problems",
        title: "Spotting Data Quality Problems",
        description: "What to check before you trust a single number from a new dataset.",
        lessons: [
          {
            slug: "common-data-problems",
            title: "The Most Common Data Quality Problems",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Missing values: are they truly missing, or coded as 0, blank string, or 'N/A' inconsistently across the dataset?",
              "Duplicates: exact duplicates are easy to catch; near-duplicates from formatting differences (trailing spaces, case differences) are not",
              "Inconsistent categories: 'NY', 'New York', and 'ny' representing the same value will silently split what should be one group into three",
              "Outliers that are actually data entry errors (an age of 999, a negative price) versus outliers that are genuinely real and meaningful",
            ],
          },
          {
            slug: "a-repeatable-cleaning-process",
            title: "A Repeatable Cleaning Process",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Step 1: profile the data first — row/column counts, types, and a summary of missing values per column, before changing anything",
              "Step 2: decide and document a rule for each problem found (e.g. 'missing region defaults to Unknown, not dropped') rather than making silent ad hoc fixes as you go",
              "Step 3: keep the raw data untouched and do all cleaning in a separate copy or script — this makes your work reproducible and lets you catch your own mistakes",
            ],
          },
        ],
      },
      {
        slug: "documenting-your-cleaning",
        title: "Documenting Cleaning Decisions",
        description: "The step most people skip, and the one that saves the most time later.",
        lessons: [
          {
            slug: "why-document-cleaning",
            title: "Why Every Cleaning Decision Needs a Written Reason",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "A cleaning decision made silently is a decision someone else (including future you) can't evaluate or question later",
              "Document what you changed, why, and how many rows it affected — this turns 'I think I removed some bad rows' into an auditable, defensible choice",
              "When in doubt about a rule, flag it explicitly as an assumption in your write-up rather than picking one silently and moving on",
            ],
          },
          {
            slug: "data-cleaning-glossary",
            title: "Data Cleaning Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Data profiling",
                back: "A first-pass summary of a dataset's shape, types, and missing values before any cleaning begins.",
              },
              {
                front: "Near-duplicate",
                back: "Records that represent the same real-world entity but differ due to formatting, casing, or typos.",
              },
              {
                front: "Reproducibility",
                back: "The ability for someone else (or future you) to re-run your cleaning process and get the same result.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "cleaning-process-writeup",
      title: "Clean a Messy Dataset with a Documented Process",
      deliverables: [
        "A messy dataset cleaned following the 3-step process, with each rule applied clearly documented",
        "A before/after summary showing row counts and what changed at each step",
      ],
      rubric: [
        "Cleaning rules are explicit and justified, not silent or arbitrary",
        "The before/after summary makes the impact of cleaning clearly visible",
      ],
    },
    resources: [
      {
        title: "Tidy Data (Hadley Wickham)",
        type: "external-link",
        url: "https://vita.had.co.nz/papers/tidy-data.pdf",
        description: "A foundational paper on structuring data for analysis.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cleaning process write-up"],
  },
  {
    slug: "cohort-and-funnel-analysis",
    title: "Cohort and Funnel Analysis",
    subtitle:
      "Analyzing how groups of users behave over time and where they drop off in a process — the analysis behind most real retention and conversion decisions.",
    category: "data-analytics",
    difficulty: "advanced",
    estimatedDurationMinutes: 130,
    tags: ["data", "analytics", "sql"],
    skills: ["cohort-analysis", "funnel-analysis"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Build a cohort retention table and interpret what it actually shows",
      "Build a funnel analysis and identify the highest-leverage drop-off point",
      "Avoid the most common statistical traps in cohort and funnel analysis",
    ],
    prerequisites: [
      { courseSlug: "data-analytics-foundations" },
      { courseSlug: "intermediate-sql-joins-and-aggregation" },
    ],
    modules: [
      {
        slug: "cohort-analysis",
        title: "Cohort Analysis",
        description: "Tracking how a group's behavior changes over time since they joined.",
        lessons: [
          {
            slug: "building-a-cohort-table",
            title: "Building a Cohort Retention Table",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "A cohort groups users by a shared starting point (e.g. signup month), then tracks a behavior (e.g. still active) over subsequent periods since that start",
              "The classic triangular retention table format (cohort month down the side, periods-since-signup across the top) makes it easy to compare cohorts of different ages fairly",
              "Comparing raw counts across cohorts of different sizes is misleading — always convert to a percentage of the original cohort size",
            ],
            code: {
              language: "sql",
              code: "SELECT\n  DATE_TRUNC('month', u.signup_date) AS cohort_month,\n  DATE_PART('month', AGE(a.activity_date, u.signup_date)) AS months_since_signup,\n  COUNT(DISTINCT a.user_id) AS active_users\nFROM users u\nJOIN activity a ON a.user_id = u.user_id\nGROUP BY 1, 2;",
            },
          },
          {
            slug: "interpreting-cohort-tables",
            title: "Interpreting What a Cohort Table Actually Shows",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A declining diagonal (each cohort retaining worse than the last) usually signals a product or acquisition-quality problem worth investigating, not just normal churn",
              "Newer cohorts naturally have fewer data points (you can't measure month-6 retention for a cohort that signed up 2 months ago) — don't compare incomplete cohorts to complete ones as if they were equivalent",
              "Retention curves that flatten out (rather than continuing to decline toward zero) indicate a stable core user base — the flattening point itself is often the most useful single number to track over time",
            ],
          },
        ],
      },
      {
        slug: "funnel-analysis",
        title: "Funnel Analysis",
        description: "Finding exactly where people drop off in a multi-step process.",
        lessons: [
          {
            slug: "building-a-funnel",
            title: "Building a Funnel and Finding the Real Bottleneck",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Define each funnel step as a specific, unambiguous event — vague step definitions make drop-off numbers meaningless",
              "Calculate conversion rate step-to-step, not just step-to-first-step — a step with a low overall conversion rate might actually convert fine relative to the step before it, meaning the real problem is upstream",
              "Segment the funnel by acquisition source or user type — an aggregate funnel can hide that one segment is converting fine while another is failing badly",
            ],
            code: {
              language: "sql",
              code: "WITH funnel AS (\n  SELECT user_id,\n    MAX(CASE WHEN event = 'viewed_pricing' THEN 1 ELSE 0 END) AS step1,\n    MAX(CASE WHEN event = 'started_signup' THEN 1 ELSE 0 END) AS step2,\n    MAX(CASE WHEN event = 'completed_signup' THEN 1 ELSE 0 END) AS step3\n  FROM events GROUP BY user_id\n)\nSELECT SUM(step1) AS viewed, SUM(step2) AS started, SUM(step3) AS completed FROM funnel;",
            },
          },
          {
            slug: "cohort-funnel-glossary",
            title: "Cohort & Funnel Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Cohort",
                back: "A group of users defined by a shared starting event (e.g. signup month), tracked over time.",
              },
              {
                front: "Retention curve",
                back: "A chart showing what percentage of a cohort remains active over successive time periods.",
              },
              {
                front: "Funnel",
                back: "A defined sequence of steps a user takes toward a goal, analyzed for drop-off at each step.",
              },
              {
                front: "Step-to-step conversion",
                back: "The conversion rate from one specific funnel step to the very next one, as opposed to overall conversion from the first step.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "retention-and-conversion-analysis",
      title: "Build a Cohort Table and Funnel for a Realistic Product",
      deliverables: [
        "A cohort retention table for at least 3 cohorts, with percentages not raw counts",
        "A funnel analysis identifying the single highest-leverage drop-off point, with a stated recommendation",
      ],
      rubric: [
        "The cohort table correctly normalizes to percentage of original cohort size",
        "The funnel recommendation is backed by the step-to-step conversion data, not just the weakest-looking step in isolation",
      ],
    },
    resources: [
      {
        title: "Reforge: Retention & Engagement",
        type: "external-link",
        url: "https://www.reforge.com",
        description: "A reference for growth and retention analysis frameworks.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the retention and conversion analysis"],
  },
  {
    slug: "data-visualization-principles",
    title: "Data Visualization Principles",
    subtitle:
      "Choosing the right chart, cutting the noise, and designing visuals that make the right conclusion obvious instead of merely possible.",
    category: "data-analytics",
    difficulty: "intermediate",
    estimatedDurationMinutes: 100,
    tags: ["data", "analytics", "design"],
    skills: ["data-visualization", "dashboard-design"],
    careerPaths: ["data-analyst", "data-scientist"],
    instructor: { name: "Yuki Tanaka", title: "Design Lead, ex-Notion", avatarInitials: "YT" },
    objectives: [
      "Choose the correct chart type for a given data relationship",
      "Remove visual clutter that competes with the actual finding",
      "Design a chart that leads a viewer to the correct conclusion without a caption",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "choosing-chart-types",
        title: "Choosing the Right Chart Type",
        description: "Matching the visual form to the shape of the question.",
        lessons: [
          {
            slug: "matching-chart-to-question",
            title: "Matching Chart Type to the Question Being Asked",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Trend over time → line chart. Comparing discrete categories → bar chart. Distribution of a single variable → histogram. Relationship between two numeric variables → scatter plot",
              "Pie charts are hard to read accurately beyond 3-4 slices — a sorted bar chart almost always communicates part-to-whole comparisons better",
              "Avoid dual-axis charts where possible — they invite readers to misread correlation between two differently-scaled lines that don't actually relate the way the visual suggests",
            ],
          },
          {
            slug: "removing-clutter",
            title: "Removing Clutter That Competes with the Finding",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Every gridline, border, and unnecessary label is competing for attention with the actual data — remove anything that isn't earning its place",
              "Direct-label data points instead of relying solely on a legend when there are only a few series — this reduces the back-and-forth eye movement required to read the chart",
              "Truncated y-axes can visually exaggerate small differences — be deliberate and transparent about axis choices, especially if the chart will be used to argue a point",
            ],
          },
        ],
      },
      {
        slug: "designing-for-clarity",
        title: "Designing for a Clear Takeaway",
        description: "A chart should make its point without a paragraph of explanation next to it.",
        lessons: [
          {
            slug: "the-so-what-test",
            title: "The 'So What' Test",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Before finalizing a chart, ask: could someone glance at this for 5 seconds and state the finding correctly? If not, the chart needs simplifying, not more annotation",
              "Use color deliberately to highlight the one series or category that matters, and gray out the rest — color applied uniformly draws attention to nothing in particular",
              "A clear, specific chart title stating the finding ('Revenue grew 18% in Q4, driven by the West region') does more work than a generic title like 'Revenue by Quarter'",
            ],
          },
          {
            slug: "dataviz-glossary",
            title: "Data Visualization Terms",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Chart junk",
                back: "Unnecessary visual elements (excess gridlines, 3D effects, decorative icons) that distract from the actual data.",
              },
              {
                front: "Truncated axis",
                back: "A chart axis that doesn't start at zero, which can visually exaggerate small differences.",
              },
              {
                front: "Pre-attentive attribute",
                back: "A visual property (like color or size) the eye notices almost instantly, useful for highlighting the key data point in a chart.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "chart-redesign",
      title: "Redesign a Cluttered Chart",
      deliverables: [
        "A 'before' chart with at least 3 clutter or clarity problems identified",
        "An 'after' redesign, with a written explanation of each change and why it improves clarity",
      ],
      rubric: [
        "The redesign passes the 5-second 'so what' test for a first-time viewer",
        "Each change is justified by a specific clarity principle, not just aesthetic preference",
      ],
    },
    resources: [
      {
        title: "Storytelling with Data",
        type: "external-link",
        url: "https://www.storytellingwithdata.com",
        description: "A widely referenced resource on data visualization practice.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the chart redesign"],
  },
  {
    slug: "statistics-for-data-analysts",
    title: "Statistics for Data Analysts",
    subtitle:
      "The core statistical concepts analysts actually use day to day — distributions, significance, and confidence — explained without a math degree.",
    category: "data-analytics",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["data", "analytics"],
    skills: ["statistical-inference"],
    careerPaths: ["data-analyst", "data-scientist"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Interpret mean, median, and standard deviation correctly, including when each is misleading",
      "Explain statistical significance in plain language, without misrepresenting what a p-value means",
      "Recognize sample-size and selection-bias problems in a dataset",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "describing-data",
        title: "Describing Data Correctly",
        description: "The everyday statistics that get misused constantly.",
        lessons: [
          {
            slug: "mean-median-and-when-they-mislead",
            title: "Mean, Median, and When Each One Misleads",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "The mean is pulled toward outliers; the median is not — for skewed data (like income or order values), the median often represents the 'typical' case far better",
              "A rising average doesn't necessarily mean a rising typical value — a few very large values can drag the average up while most values stay flat or fall",
              "Standard deviation describes spread — two datasets with the same mean can have very different standard deviations, meaning very different day-to-day experiences underneath the same headline number",
            ],
          },
          {
            slug: "sample-size-and-bias",
            title: "Sample Size and Selection Bias",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A small sample can show a dramatic-looking pattern that's just noise — the smaller the sample, the more skeptical you should be of a striking result",
              "Selection bias occurs when the sample you have isn't representative of the population you're trying to conclude something about — e.g. survey respondents who bothered to respond are rarely a random sample",
              "Ask explicitly: who or what is missing from this data, and would their inclusion change the conclusion? This single question catches a large share of bad analyses",
            ],
          },
        ],
      },
      {
        slug: "significance-in-plain-language",
        title: "Statistical Significance in Plain Language",
        description: "What a p-value actually tells you, and what it doesn't.",
        lessons: [
          {
            slug: "what-significance-means",
            title: "What 'Statistically Significant' Actually Means",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A p-value estimates the probability of seeing a result this extreme (or more) if there were truly no effect — it is not the probability that your hypothesis is correct",
              "'Statistically significant' does not mean 'practically important' — with a large enough sample, even a tiny, meaningless difference can become statistically significant",
              "A common threshold (p < 0.05) is a convention, not a law of nature — treat a result just above or below the line as roughly equally uncertain, not categorically different",
            ],
          },
          {
            slug: "stats-glossary",
            title: "Statistics Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Standard deviation",
                back: "A measure of how spread out values are around the mean.",
              },
              {
                front: "Selection bias",
                back: "A systematic error where the sample analyzed isn't representative of the population being studied.",
              },
              {
                front: "P-value",
                back: "The probability of observing a result at least this extreme if the null hypothesis (no real effect) were true.",
              },
              {
                front: "Statistical vs. practical significance",
                back: "A result can be statistically significant (unlikely due to chance) while still being too small to matter practically.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "statistical-claims-audit",
      title: "Audit 3 Statistical Claims",
      deliverables: [
        "3 real statistical claims (from news, a report, or your own data) evaluated for sample size, selection bias, and mean-vs-median appropriateness",
        "For each, a verdict: trustworthy, needs caveats, or misleading — with reasoning",
      ],
      rubric: [
        "Each verdict is backed by a specific, correct statistical reasoning point from this course",
        "At least one claim's evaluation correctly distinguishes statistical from practical significance",
      ],
    },
    resources: [
      {
        title: "Seeing Theory",
        type: "external-link",
        url: "https://seeing-theory.brown.edu",
        description: "A visual introduction to probability and statistics.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the statistical claims audit"],
  },
  // ---------------------------------------------------------------
  // Software Developer path (12 courses)
  // ---------------------------------------------------------------
  {
    slug: "python-fundamentals",
    title: "Python Fundamentals",
    subtitle:
      "Real Python, from variables through functions, written the way working developers actually write it — not textbook syntax drills.",
    category: "python",
    difficulty: "beginner",
    estimatedDurationMinutes: 130,
    tags: ["python", "programming"],
    skills: ["python-fundamentals"],
    careerPaths: ["software-engineer", "data-analyst"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Write functions with clear inputs, outputs, and error handling",
      "Use Python's core data types (lists, dicts, sets) appropriately for a given problem",
      "Read and debug a Python traceback confidently",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "core-syntax-and-types",
        title: "Core Syntax and Data Types",
        description: "The building blocks every Python program is made of.",
        lessons: [
          {
            slug: "variables-and-data-types",
            title: "Variables and Core Data Types",
            kind: "code",
            durationMinutes: 16,
            free: true,
            points: [
              "Python is dynamically typed — a variable's type is determined by the value assigned to it, and can change, unlike statically typed languages",
              "Lists are ordered and mutable; tuples are ordered and immutable; dicts map keys to values; sets hold unique unordered items — choosing the right one for the job matters for both correctness and performance",
              "Use f-strings for readable string formatting instead of manual string concatenation",
            ],
            code: {
              language: "python",
              code: 'name = "Priya"\nage = 29\nskills = ["Python", "SQL", "Excel"]\nprofile = {"name": name, "age": age, "skills": skills}\n\nprint(f"{name} is {age} and knows {len(skills)} tools.")',
            },
          },
          {
            slug: "control-flow",
            title: "Control Flow: Conditionals and Loops",
            kind: "code",
            durationMinutes: 16,
            points: [
              "Python uses indentation, not braces, to define code blocks — inconsistent indentation is a syntax error, not just a style issue",
              "Use a `for` loop when iterating over a known collection; use `while` when looping until a condition changes, not based on a fixed collection",
              "List comprehensions (`[x*2 for x in nums if x > 0]`) are more Pythonic and often faster than an equivalent manual loop with `.append()`",
            ],
            code: {
              language: "python",
              code: 'scores = [55, 88, 62, 91, 40]\npassing = [s for s in scores if s >= 60]\nprint(f"{len(passing)} of {len(scores)} passed")',
            },
          },
        ],
      },
      {
        slug: "functions-and-debugging",
        title: "Functions and Debugging",
        description: "Writing reusable code and reading Python's error messages without dread.",
        lessons: [
          {
            slug: "writing-good-functions",
            title: "Writing Functions with Clear Inputs and Outputs",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A function should do one clear thing — if you can't summarize what it does in one sentence without 'and', it's probably doing too much",
              "Use default arguments for optional parameters, but avoid mutable default arguments (like `def f(x, items=[])`) — this is a classic Python gotcha that causes shared state bugs",
              "Raise a specific, descriptive exception when input is invalid rather than letting the function fail confusingly three lines later",
            ],
            code: {
              language: "python",
              code: 'def calculate_discount(price, percent):\n    if not 0 <= percent <= 100:\n        raise ValueError(f"percent must be between 0 and 100, got {percent}")\n    return price * (1 - percent / 100)',
            },
          },
          {
            slug: "reading-tracebacks",
            title: "Reading a Traceback Without Panicking",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Read a Python traceback from the bottom up — the last line names the actual error, and the lines above trace the call path that led there",
              "The line number and file shown for each frame tell you exactly where to look — you rarely need to guess where an error happened",
              "Common beginner errors: TypeError (wrong type used in an operation), KeyError (dict key doesn't exist), IndexError (list index out of range) — recognizing these by name speeds up debugging enormously",
            ],
          },
          {
            slug: "python-glossary",
            title: "Python Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "List comprehension",
                back: "A concise Python syntax for creating a list by transforming/filtering another iterable in one line.",
              },
              {
                front: "Traceback",
                back: "The error report Python prints showing the sequence of calls that led to an exception.",
              },
              {
                front: "Mutable default argument",
                back: "A common Python bug where a default argument (like a list) is shared across all calls instead of being fresh each time.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "command-line-tool",
      title: "Build a Small Command-Line Tool",
      deliverables: [
        "A command-line Python script solving a real small task (e.g. a to-do list, a unit converter, a word counter)",
        "At least 2 functions with clear docstrings and explicit error handling for bad input",
      ],
      rubric: [
        "The script runs correctly and handles at least one invalid-input case gracefully",
        "Functions are focused (single responsibility) rather than one large block of code",
      ],
    },
    resources: [
      {
        title: "Python Official Tutorial",
        type: "external-link",
        url: "https://docs.python.org/3/tutorial/",
        description: "The official Python documentation tutorial.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the command-line tool project"],
  },
  {
    slug: "python-for-automation-and-scripting",
    title: "Python for Automation and Scripting",
    subtitle:
      "Using Python to automate repetitive file, spreadsheet, and web tasks that would otherwise eat hours every week.",
    category: "python",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["python", "programming", "workflow"],
    skills: ["automation-scripting", "python-fundamentals"],
    careerPaths: ["software-engineer", "data-analyst"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Automate file and folder operations reliably",
      "Read and write CSV/Excel data programmatically",
      "Schedule and log an automation so failures are visible, not silent",
    ],
    prerequisites: [{ courseSlug: "python-fundamentals" }],
    modules: [
      {
        slug: "file-automation",
        title: "File and Folder Automation",
        description: "The scripts that save the most time for the least code.",
        lessons: [
          {
            slug: "working-with-files-and-paths",
            title: "Working with Files and Paths Reliably",
            kind: "code",
            durationMinutes: 17,
            free: true,
            points: [
              "Use `pathlib` instead of manual string concatenation for file paths — it handles cross-platform path differences (Windows vs. Mac/Linux) automatically",
              "Always check whether a file/folder exists before acting on it, and handle the case where it doesn't, rather than letting the script crash",
              "When renaming or moving many files in bulk, do a dry run first (print what would happen) before executing the actual changes — bulk file operations are hard to undo",
            ],
            code: {
              language: "python",
              code: 'from pathlib import Path\n\nfolder = Path("reports")\nfor file in folder.glob("*.csv"):\n    new_name = file.with_stem(file.stem.lower().replace(" ", "_"))\n    print(f"Would rename: {file.name} -> {new_name.name}")  # dry run first',
            },
          },
          {
            slug: "csv-and-excel-automation",
            title: "Reading and Writing CSV and Excel Data",
            kind: "code",
            durationMinutes: 18,
            points: [
              "The `csv` module handles CSV reading/writing without external dependencies; `openpyxl` or `pandas` handle Excel files, including multiple sheets",
              "Always specify encoding explicitly when reading files from unknown sources — silent encoding mismatches cause garbled text that's confusing to debug later",
              "Validate row counts and a few known values after any bulk read/write — a script that 'ran successfully' can still have silently written the wrong data",
            ],
            code: {
              language: "python",
              code: 'import csv\n\nwith open("orders.csv", encoding="utf-8") as f:\n    reader = csv.DictReader(f)\n    total = sum(float(row["amount"]) for row in reader if row["amount"])\nprint(f"Total: {total}")',
            },
          },
        ],
      },
      {
        slug: "reliable-automations",
        title: "Making Automations Reliable, Not Just Working",
        description:
          "The difference between a script that works once and one you can trust unattended.",
        lessons: [
          {
            slug: "logging-and-scheduling",
            title: "Logging Failures and Scheduling Runs",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Use Python's `logging` module instead of scattered `print()` statements — logs can be filtered by severity and persisted, unlike print output that disappears",
              "Any scheduled automation (via cron, Task Scheduler, or a workflow tool) needs a way to alert someone on failure — a silently-failing scheduled script is worse than no automation at all",
              "Wrap the risky part of a script in try/except and log the specific exception, rather than a bare except that swallows the real error message",
            ],
          },
          {
            slug: "automation-terms",
            title: "Automation Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Dry run",
                back: "Running a script's logic to preview what it would do, without actually making changes — used to validate risky bulk operations.",
              },
              {
                front: "pathlib",
                back: "Python's object-oriented, cross-platform module for working with file paths.",
              },
              {
                front: "Idempotent script",
                back: "A script that produces the same end result whether run once or multiple times, safe to re-run after a failure.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "weekly-report-automation",
      title: "Automate a Repetitive Reporting Task",
      deliverables: [
        "A script that reads data from CSV/Excel, processes it, and outputs a summary file automatically",
        "Logging that records success/failure and would alert on an unexpected error",
      ],
      rubric: [
        "The script handles at least one realistic bad-input case (missing file, malformed row) without crashing uninformatively",
        "Logging clearly distinguishes a successful run from a failed one",
      ],
    },
    resources: [
      {
        title: "Automate the Boring Stuff with Python",
        type: "external-link",
        url: "https://automatetheboringstuff.com",
        description: "A widely used free resource for practical Python automation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the reporting automation project"],
  },
  {
    slug: "python-data-structures-and-algorithms",
    title: "Python Data Structures and Algorithms",
    subtitle:
      "The core data structures and algorithmic thinking that show up constantly in real code and technical interviews alike.",
    category: "python",
    difficulty: "intermediate",
    estimatedDurationMinutes: 135,
    tags: ["python", "programming"],
    skills: ["python-data-structures", "debugging"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Choose the right data structure based on the operations a problem needs",
      "Explain the time complexity of common operations in plain terms",
      "Solve problems using recursion and understand when it's the wrong tool",
    ],
    prerequisites: [{ courseSlug: "python-fundamentals" }],
    modules: [
      {
        slug: "choosing-data-structures",
        title: "Choosing the Right Data Structure",
        description: "Performance and correctness both start with picking the right container.",
        lessons: [
          {
            slug: "time-complexity-basics",
            title: "Time Complexity, Explained Without the Math Anxiety",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Big-O notation describes how an operation's cost grows as input size grows — O(1) stays constant, O(n) grows linearly, O(n²) grows quadratically and gets slow fast",
              "Checking if an item exists in a Python list is O(n) — it has to check each item; checking a set or dict key is O(1) on average — this single fact explains a huge number of real performance bugs",
              "You don't need to calculate exact complexity by hand for most real work — you need the intuition to recognize 'this loop inside a loop over the same large list is going to be slow'",
            ],
          },
          {
            slug: "picking-the-right-container",
            title: "Picking the Right Container for the Job",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Need fast membership checks ('is this item in the collection?') → use a set, not a list",
              "Need to count occurrences of items → use `collections.Counter` rather than manually building a dict with a loop",
              "Need insertion order preserved with fast lookups → a regular dict already preserves insertion order in modern Python",
            ],
            code: {
              language: "python",
              code: "from collections import Counter\n\nwords = \"the quick brown fox the lazy fox\".split()\ncounts = Counter(words)\nprint(counts.most_common(2))  # [('the', 2), ('fox', 2)]",
            },
          },
        ],
      },
      {
        slug: "recursion-and-problem-solving",
        title: "Recursion and Problem-Solving",
        description: "When breaking a problem into smaller versions of itself actually helps.",
        lessons: [
          {
            slug: "recursion-basics",
            title: "Recursion: When It Helps and When It Doesn't",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Every recursive function needs a base case (when to stop) and a step that moves toward it — missing either causes infinite recursion and a crash",
              "Recursion is a natural fit for tree-like or nested structures (folder hierarchies, nested JSON); for simple linear iteration, a plain loop is usually clearer and avoids Python's recursion depth limit",
              "If you find yourself debugging a recursive function's depth or state, adding print statements showing the input at each call is often faster than reasoning about it abstractly",
            ],
            code: {
              language: "python",
              code: "def sum_nested(data):\n    if isinstance(data, (int, float)):\n        return data\n    return sum(sum_nested(item) for item in data)\n\nprint(sum_nested([1, [2, 3, [4, 5]], 6]))  # 21",
            },
          },
          {
            slug: "dsa-glossary",
            title: "Data Structures & Algorithms Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Big-O notation",
                back: "A way of describing how an algorithm's runtime or memory use grows as input size increases.",
              },
              {
                front: "Base case",
                back: "The condition in a recursive function that stops further recursive calls.",
              },
              {
                front: "Hash-based lookup",
                back: "The O(1) average-case lookup mechanism behind Python sets and dicts, much faster than scanning a list.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "algorithm-practice-set",
      title: "Solve and Document 3 Algorithm Problems",
      deliverables: [
        "3 solved problems (e.g. find duplicates, flatten a nested structure, group items by a key) with working Python code",
        "For each, a one-line note on the time complexity of your solution and whether a faster approach exists",
      ],
      rubric: [
        "Solutions use appropriate data structures (not a list where a set/dict would be clearly better)",
        "Complexity notes are accurate, not just asserted",
      ],
    },
    resources: [
      {
        title: "Python Time Complexity Reference",
        type: "external-link",
        url: "https://wiki.python.org/moin/TimeComplexity",
        description: "Official reference for the time complexity of Python's built-in operations.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the algorithm practice set"],
  },
  {
    slug: "object-oriented-programming-fundamentals",
    title: "Object-Oriented Programming Fundamentals",
    subtitle:
      "Organizing code around objects and responsibilities, using Python — the design habit that scales far better than one giant script.",
    category: "python",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["python", "programming"],
    skills: ["object-oriented-design"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Design a class with clear responsibilities and a sensible interface",
      "Use inheritance appropriately, and recognize when composition is the better choice",
      "Explain encapsulation in terms of what it actually prevents",
    ],
    prerequisites: [{ courseSlug: "python-fundamentals" }],
    modules: [
      {
        slug: "classes-and-objects",
        title: "Classes and Objects",
        description: "Bundling data and behavior together with a clear purpose.",
        lessons: [
          {
            slug: "designing-a-class",
            title: "Designing a Class with a Clear Responsibility",
            kind: "code",
            durationMinutes: 17,
            free: true,
            points: [
              "A class should represent one clear concept and own the data and behavior related to it — a class doing too many unrelated things is a sign it should be split",
              "`__init__` sets up an object's initial state; methods define what it can do — keep methods focused on the object's own responsibility, not unrelated logic",
              "Use `self` consistently to refer to the instance's own data — forgetting `self` on an attribute is one of the most common beginner OOP bugs",
            ],
            code: {
              language: "python",
              code: 'class ShoppingCart:\n    def __init__(self):\n        self.items = []\n\n    def add_item(self, name, price):\n        self.items.append({"name": name, "price": price})\n\n    def total(self):\n        return sum(item["price"] for item in self.items)',
            },
          },
          {
            slug: "encapsulation",
            title: "Encapsulation: What It Prevents",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Encapsulation means an object controls access to its own internal state, rather than letting external code reach in and modify it directly and unpredictably",
              "In Python, a leading underscore (`_balance`) signals 'internal, don't touch directly' by convention, even though Python doesn't strictly enforce it like some languages",
              "The real benefit: if an object's internal representation needs to change later, code using the object's public methods doesn't break — only code that reached into internals directly would",
            ],
          },
        ],
      },
      {
        slug: "inheritance-vs-composition",
        title: "Inheritance vs. Composition",
        description:
          "Two ways to reuse and share behavior between classes, and when each is the better call.",
        lessons: [
          {
            slug: "when-to-use-inheritance",
            title: "When Inheritance Actually Fits",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Inheritance models a genuine 'is-a' relationship — a `SavingsAccount` is-a `BankAccount` is a reasonable inheritance; a `Car` is-a `Engine` is not, even if a car 'has' an engine",
              "Deep inheritance hierarchies (5+ levels) tend to become fragile and hard to reason about — favor shallow hierarchies or composition once things get complex",
              "Composition ('has-a', building an object out of other objects) is often more flexible than inheritance for combining unrelated behaviors",
            ],
            code: {
              language: "python",
              code: 'class Engine:\n    def start(self):\n        return "Engine started"\n\nclass Car:\n    def __init__(self):\n        self.engine = Engine()  # composition: Car HAS an Engine\n\n    def start(self):\n        return self.engine.start()',
            },
          },
          {
            slug: "oop-glossary",
            title: "OOP Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Encapsulation",
                back: "Controlling access to an object's internal state through its public methods rather than direct external access.",
              },
              {
                front: "Inheritance",
                back: "A relationship where a class derives shared behavior and structure from a parent class ('is-a' relationship).",
              },
              {
                front: "Composition",
                back: "Building a class out of other objects it owns and delegates to ('has-a' relationship), often more flexible than inheritance.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "small-oop-system",
      title: "Design a Small Object-Oriented System",
      deliverables: [
        "2-3 classes modeling a real small system (e.g. a library checkout system, a simple booking system), with clear responsibilities",
        "At least one use of composition and a written justification for why inheritance wasn't used there instead",
      ],
      rubric: [
        "Each class has a single, clear responsibility with no obvious overlap between classes",
        "The composition-vs-inheritance justification reflects genuine understanding, not just following a rule",
      ],
    },
    resources: [
      {
        title: "Python Classes Documentation",
        type: "external-link",
        url: "https://docs.python.org/3/tutorial/classes.html",
        description: "Official Python documentation on classes.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the small OOP system project"],
  },
  {
    slug: "programming-fundamentals-thinking-like-a-developer",
    title: "Programming Fundamentals: Thinking Like a Developer",
    subtitle:
      "The problem-solving habits underneath any programming language — breaking problems down, naming things well, and reasoning about edge cases before you code.",
    category: "programming-fundamentals",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["programming"],
    skills: ["debugging", "testing-fundamentals"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Break an ambiguous problem into concrete, codeable steps",
      "Identify edge cases before writing the first line of code",
      "Read someone else's code and describe what it does before changing it",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "breaking-down-problems",
        title: "Breaking Down Problems",
        description: "The habit that matters more than any specific syntax.",
        lessons: [
          {
            slug: "decomposing-a-problem",
            title: "Decomposing an Ambiguous Problem",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Restate the problem in your own words before coding — if you can't restate it clearly, you don't understand it well enough to solve it yet",
              "Break it into the smallest steps that each do one clear thing, in plain language, before translating any of it into code",
              "Solve the simplest version of the problem first (ignore edge cases initially), get that working, then add complexity incrementally",
            ],
          },
          {
            slug: "thinking-through-edge-cases",
            title: "Thinking Through Edge Cases Before You Code",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Ask explicitly: what happens with empty input? The largest possible input? A negative number, if the domain allows one?",
              "Edge cases found before coding are cheap to handle; edge cases found by a user in production are expensive — the 5 minutes spent thinking about them upfront is rarely wasted",
              "Write down the edge cases you've identified, even informally — this turns 'I'll remember to handle that' into something you can actually check off",
            ],
          },
        ],
      },
      {
        slug: "reading-code",
        title: "Reading Other People's Code",
        description:
          "A skill that matters as much as writing code, and gets far less deliberate practice.",
        lessons: [
          {
            slug: "reading-before-changing",
            title: "Understand Before You Change",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Before modifying unfamiliar code, trace through what it currently does with a specific example input — guessing at intent and being wrong is how regressions happen",
              "Good variable and function names are a form of documentation — if you find yourself unable to guess what something does from its name, that's a signal worth noting, not just a personal struggle",
              "When you don't understand why code does something a certain way, assume there's a reason before assuming it's a mistake — then verify",
            ],
          },
          {
            slug: "programming-fundamentals-glossary",
            title: "Programming Fundamentals Terms",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Edge case",
                back: "An input or condition at the extreme boundary of what a program needs to handle, often where bugs hide.",
              },
              {
                front: "Decomposition",
                back: "Breaking a large, ambiguous problem into smaller, well-defined sub-problems.",
              },
              {
                front: "Happy path",
                back: "The expected, error-free flow through a program — the case that's easiest to get right and least likely to reveal bugs.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "problem-decomposition-writeup",
      title: "Decompose and Solve a Real Problem",
      deliverables: [
        "A written decomposition of an ambiguous problem into concrete steps, before any code",
        "A list of at least 4 edge cases identified in advance, with how each would be handled",
      ],
      rubric: [
        "The decomposition breaks the problem into genuinely smaller, well-defined pieces",
        "Edge cases are specific and realistic, not generic placeholders",
      ],
    },
    resources: [
      {
        title: "How to Solve It (George Pólya) — Summary",
        type: "external-link",
        url: "https://en.wikipedia.org/wiki/How_to_Solve_It",
        description:
          "A classic reference on problem-solving methodology, applicable to programming.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the problem decomposition write-up"],
  },
  {
    slug: "web-development-foundations-html-css",
    title: "Web Development Foundations: HTML and CSS",
    subtitle:
      "Structuring and styling a real web page from scratch — the foundation every framework and tool sits on top of.",
    category: "web-development",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: ["web-development", "html-css"],
    skills: ["html-css", "responsive-design"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Elena Rossi",
      title: "Frontend Engineer, ex-Shopify",
      avatarInitials: "ER",
    },
    objectives: [
      "Structure a page semantically with correct HTML elements",
      "Style layouts with CSS Flexbox and Grid",
      "Make a page responsive across mobile and desktop viewports",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "semantic-html",
        title: "Semantic HTML",
        description: "Structure that means something, not just divs everywhere.",
        lessons: [
          {
            slug: "why-semantic-elements-matter",
            title: "Why Semantic Elements Matter",
            kind: "code",
            durationMinutes: 15,
            free: true,
            points: [
              "Use `<nav>`, `<header>`, `<main>`, `<article>`, and `<footer>` instead of generic `<div>`s wherever the meaning fits — this helps screen readers, search engines, and future developers all at once",
              "Every image needs meaningful `alt` text describing its content or purpose — this is both an accessibility requirement and one of the easiest wins for SEO",
              "A well-structured document uses one `<h1>` per page and a logical heading hierarchy after it — headings aren't just for making text bigger",
            ],
            code: {
              language: "html",
              code: '<header>\n  <nav><a href="/">Home</a></nav>\n</header>\n<main>\n  <article>\n    <h1>Page Title</h1>\n    <p>Content...</p>\n  </article>\n</main>\n<footer>© 2026</footer>',
            },
          },
          {
            slug: "forms-and-accessibility",
            title: "Forms and Basic Accessibility",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Every form input needs an associated `<label>` — clicking the label should focus the input, and screen readers depend on this association",
              "Use the correct input type (`email`, `number`, `tel`) — this improves mobile keyboards and gives free basic validation",
              "Keyboard navigation should work without a mouse — tab order should follow a logical visual order, which usually just means writing HTML in a sensible order",
            ],
          },
        ],
      },
      {
        slug: "layout-with-css",
        title: "Layout with CSS",
        description: "Flexbox, Grid, and making a layout that survives a smaller screen.",
        lessons: [
          {
            slug: "flexbox-and-grid",
            title: "Flexbox and Grid Fundamentals",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Flexbox is for one-dimensional layout (a row or a column of items); Grid is for two-dimensional layout (rows and columns together) — picking the wrong one makes simple layouts unnecessarily hard",
              "`justify-content` controls alignment along the main axis, `align-items` controls the cross axis — mixing these up is one of the most common Flexbox confusions",
              "Grid's `fr` unit distributes remaining space proportionally, making flexible layouts far simpler than manually calculating percentages",
            ],
            code: {
              language: "css",
              code: ".card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}",
            },
          },
          {
            slug: "responsive-design-basics",
            title: "Responsive Design Basics",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Design mobile-first (base styles for small screens, then add complexity with media queries for larger ones) — this tends to produce simpler, more robust CSS than the reverse approach",
              "Use relative units (rem, %, viewport units) instead of fixed pixels for anything that should scale with the user's settings or screen size",
              "Test at actual breakpoints (not just by resizing a desktop browser window) — real device behavior sometimes differs from a resized browser",
            ],
          },
          {
            slug: "html-css-glossary",
            title: "HTML & CSS Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Semantic HTML",
                back: "Using HTML elements that convey meaning about their content, not just visual appearance.",
              },
              {
                front: "Flexbox",
                back: "A CSS layout model for arranging items in a single row or column, with flexible sizing and alignment.",
              },
              {
                front: "CSS Grid",
                back: "A CSS layout model for arranging items in two dimensions, rows and columns simultaneously.",
              },
              {
                front: "Mobile-first design",
                back: "Designing base styles for small screens first, then progressively enhancing for larger viewports.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "responsive-landing-page",
      title: "Build a Responsive Landing Page",
      deliverables: [
        "A single-page site with semantic HTML structure and a working contact form",
        "A layout built with Flexbox and/or Grid that adapts correctly between mobile and desktop widths",
      ],
      rubric: [
        "HTML uses semantic elements appropriately, not just divs with classes",
        "The layout is genuinely responsive, tested at more than one viewport width",
      ],
    },
    resources: [
      {
        title: "MDN Web Docs",
        type: "external-link",
        url: "https://developer.mozilla.org",
        description: "The definitive reference for HTML, CSS, and web standards.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the responsive landing page"],
  },
  {
    slug: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    subtitle:
      "Core JavaScript for the browser — variables, functions, and the DOM — written the way it's actually used in real front-end code.",
    category: "web-development",
    difficulty: "beginner",
    estimatedDurationMinutes: 130,
    tags: ["web-development", "javascript"],
    skills: ["javascript-fundamentals"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Elena Rossi",
      title: "Frontend Engineer, ex-Shopify",
      avatarInitials: "ER",
    },
    objectives: [
      "Manipulate the DOM to respond to user interaction",
      "Understand asynchronous JavaScript well enough to avoid the most common bugs",
      "Use modern JavaScript syntax (arrow functions, destructuring, template literals) idiomatically",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "js-basics-and-dom",
        title: "JavaScript Basics and the DOM",
        description: "Making a page actually respond to the user.",
        lessons: [
          {
            slug: "variables-functions-modern-syntax",
            title: "Variables, Functions, and Modern Syntax",
            kind: "code",
            durationMinutes: 16,
            free: true,
            points: [
              "Use `const` by default, `let` only when a variable needs to be reassigned — avoid `var`, which has confusing scoping behavior that causes real bugs",
              "Arrow functions (`(x) => x * 2`) are more concise and don't rebind `this`, which matters especially inside callbacks and class methods",
              "Destructuring (`const { name, age } = user`) and template literals (`` `Hello, ${name}` ``) make code substantially more readable than manual property access and string concatenation",
            ],
            code: {
              language: "javascript",
              code: 'const user = { name: "Sam", age: 34 };\nconst { name, age } = user;\nconsole.log(`${name} is ${age} years old.`);',
            },
          },
          {
            slug: "dom-manipulation",
            title: "Selecting and Updating the DOM",
            kind: "code",
            durationMinutes: 18,
            points: [
              "`document.querySelector`/`querySelectorAll` are the modern default for selecting elements, using familiar CSS selector syntax",
              "Add event listeners with `addEventListener` rather than inline `onclick` attributes — this keeps behavior separate from markup and allows multiple listeners on one element",
              "Batch DOM updates where possible — repeatedly triggering layout recalculation in a tight loop is a common, avoidable source of janky performance",
            ],
            code: {
              language: "javascript",
              code: 'const button = document.querySelector("#submit");\nbutton.addEventListener("click", () => {\n  const input = document.querySelector("#name").value;\n  document.querySelector("#greeting").textContent = `Hello, ${input}!`;\n});',
            },
          },
        ],
      },
      {
        slug: "asynchronous-javascript",
        title: "Asynchronous JavaScript",
        description:
          "The part of JavaScript that trips up almost everyone at first — and why it works the way it does.",
        lessons: [
          {
            slug: "promises-and-async-await",
            title: "Promises and async/await",
            kind: "code",
            durationMinutes: 18,
            points: [
              "A Promise represents a value that isn't available yet but will be (or will fail) — `async`/`await` is syntax that makes working with Promises read like synchronous code",
              "Always handle rejection — an `await`ed call that fails needs a `try`/`catch`, or the error is silently unhandled and hard to trace",
              "JavaScript is single-threaded with an event loop — async code doesn't run in parallel threads, it's interleaved; understanding this prevents a lot of confusion about execution order",
            ],
            code: {
              language: "javascript",
              code: 'async function loadUser(id) {\n  try {\n    const res = await fetch(`/api/users/${id}`);\n    if (!res.ok) throw new Error(`Request failed: ${res.status}`);\n    return await res.json();\n  } catch (err) {\n    console.error("Failed to load user:", err.message);\n    return null;\n  }\n}',
            },
          },
          {
            slug: "javascript-glossary",
            title: "JavaScript Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Promise",
                back: "An object representing the eventual result (or failure) of an asynchronous operation.",
              },
              {
                front: "Event loop",
                back: "The mechanism that lets single-threaded JavaScript handle asynchronous operations by interleaving tasks.",
              },
              {
                front: "Destructuring",
                back: "JavaScript syntax for extracting values from objects or arrays into individual variables concisely.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "interactive-widget",
      title: "Build an Interactive Widget with Real Data Fetching",
      deliverables: [
        "A small interactive UI (e.g. a search filter, a live counter, a simple form) using DOM manipulation",
        "At least one async operation (a fetch call, real or mocked) with proper error handling",
      ],
      rubric: [
        "Event listeners and DOM updates work correctly across repeated interactions, not just the first click",
        "The async error case is genuinely handled (tested by making it fail), not just wrapped in an empty try/catch",
      ],
    },
    resources: [
      {
        title: "MDN: Asynchronous JavaScript",
        type: "external-link",
        url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
        description: "MDN's guide to asynchronous JavaScript concepts.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the interactive widget project"],
  },
  {
    slug: "building-web-apps-with-rest-apis",
    title: "Building Web Apps with REST APIs",
    subtitle:
      "Connecting a front end to a real backend — fetching, sending, and handling data over HTTP the way production apps actually do it.",
    category: "web-development",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["web-development", "javascript", "apis"],
    skills: ["rest-apis", "javascript-fundamentals"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Elena Rossi",
      title: "Frontend Engineer, ex-Shopify",
      avatarInitials: "ER",
    },
    objectives: [
      "Explain REST conventions (resources, HTTP methods, status codes) and use them correctly",
      "Handle API errors and loading states in a front-end app gracefully",
      "Send authenticated requests using tokens correctly and securely",
    ],
    prerequisites: [{ courseSlug: "javascript-fundamentals" }],
    modules: [
      {
        slug: "rest-conventions",
        title: "REST Conventions",
        description: "The shared vocabulary that makes APIs predictable to work with.",
        lessons: [
          {
            slug: "resources-methods-status-codes",
            title: "Resources, HTTP Methods, and Status Codes",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "REST models data as resources with URLs (`/users/42`), acted on via HTTP methods: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)",
              "2xx means success, 4xx means the client made a bad request (400 malformed, 401 unauthenticated, 403 forbidden, 404 not found), 5xx means the server failed — checking the status code range tells you who's responsible for the failure",
              "A well-designed API's status codes and response bodies are consistent — inconsistency here is one of the most common sources of confusing integration bugs",
            ],
          },
          {
            slug: "fetching-and-sending-data",
            title: "Fetching and Sending Data Correctly",
            kind: "code",
            durationMinutes: 17,
            points: [
              "GET requests don't have a body; POST/PUT/PATCH typically do — set `Content-Type: application/json` explicitly when sending JSON, or the server may not parse it correctly",
              "Always check `response.ok` (or the status code) before assuming a request succeeded — `fetch()` doesn't reject on a 404 or 500, only on network failure",
              "Parse the response body inside the same async function where you checked the status, so error and success paths stay clearly separated",
            ],
            code: {
              language: "javascript",
              code: 'async function createUser(data) {\n  const res = await fetch("/api/users", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(data),\n  });\n  if (!res.ok) throw new Error(`Create failed: ${res.status}`);\n  return res.json();\n}',
            },
          },
        ],
      },
      {
        slug: "handling-real-world-conditions",
        title: "Handling Real-World Conditions",
        description:
          "Loading states, errors, and authentication — the parts that make an app feel production-ready.",
        lessons: [
          {
            slug: "loading-and-error-states",
            title: "Loading States and Error Handling in the UI",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Every async operation triggered by user action needs 3 UI states considered: loading, success, and error — skipping any one leaves a confusing experience",
              "Disable the triggering button while a request is in flight to prevent duplicate submissions from an impatient double-click",
              "Show a specific, useful error message where possible ('Email already in use') rather than a generic 'Something went wrong' for every failure case",
            ],
            code: {
              language: "javascript",
              code: "button.disabled = true;\ntry {\n  await createUser(formData);\n  showSuccess();\n} catch (err) {\n  showError(err.message);\n} finally {\n  button.disabled = false;\n}",
            },
          },
          {
            slug: "api-glossary",
            title: "REST API Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Idempotent",
                back: "An HTTP method (like GET, PUT, DELETE) where making the same request multiple times has the same effect as making it once.",
              },
              {
                front: "Status code",
                back: "A 3-digit HTTP response code indicating the result of a request — 2xx success, 4xx client error, 5xx server error.",
              },
              {
                front: "Bearer token",
                back: "An authentication token sent in a request header, granting access without re-sending a password each time.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "api-connected-app",
      title: "Build a Small App Connected to a Real or Mock API",
      deliverables: [
        "A front-end app that fetches, creates, and updates data via HTTP requests",
        "Explicit loading, success, and error UI states for at least one async action",
      ],
      rubric: [
        "Requests use the correct HTTP method and check response status before assuming success",
        "The error state is genuinely reachable and tested, not just written defensively without verification",
      ],
    },
    resources: [
      {
        title: "MDN: Using Fetch",
        type: "external-link",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        description: "MDN's guide to the Fetch API.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the API-connected app project"],
  },
  {
    slug: "api-design-fundamentals",
    title: "API Design Fundamentals",
    subtitle:
      "Designing the other side of the API — endpoints, request/response shapes, and versioning decisions that are easy to consume and hard to break.",
    category: "web-development",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["web-development", "apis"],
    skills: ["api-design"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Design resource-oriented endpoints with predictable naming",
      "Design request/response payloads that are easy to consume and extend",
      "Version an API without breaking existing clients",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "designing-endpoints",
        title: "Designing Endpoints",
        description: "Predictability is the single most valuable property of an API's surface.",
        lessons: [
          {
            slug: "resource-naming",
            title: "Resource-Oriented Naming",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Use plural nouns for collections (`/orders`, not `/order` or `/getOrders`) — the HTTP method already conveys the action, the URL should name the resource",
              "Nest resources to reflect real ownership (`/customers/42/orders`) rather than encoding relationships in query parameters when the relationship is fundamental to the resource",
              "Keep URLs stable — once a client depends on an endpoint's shape, changing it without a version bump breaks them silently",
            ],
          },
          {
            slug: "designing-payloads",
            title: "Designing Request and Response Payloads",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Return only what the client actually needs by default, with a way to request more (fields parameter, or a dedicated detail endpoint) rather than always returning everything",
              "Use consistent field naming and casing across every endpoint — inconsistency (camelCase in one endpoint, snake_case in another) is a constant source of integration friction",
              "Design error responses with a consistent shape (error code, human-readable message, and enough detail to act on) across every endpoint, not ad hoc per failure",
            ],
          },
        ],
      },
      {
        slug: "versioning-and-evolution",
        title: "Versioning and Evolving an API",
        description: "Changing an API without breaking the clients already depending on it.",
        lessons: [
          {
            slug: "versioning-strategies",
            title: "Versioning Strategies",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "URL versioning (`/v1/orders`, `/v2/orders`) is explicit and simple for clients to understand, at the cost of duplicating routes over time",
              "Additive changes (new optional fields) are usually safe without a version bump; removing or renaming a field, or changing its type, is a breaking change requiring one",
              "Deprecate old versions with a clear timeline communicated in advance — silently killing an old version without warning breaks every client still depending on it",
            ],
          },
          {
            slug: "api-design-glossary",
            title: "API Design Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Breaking change",
                back: "A change to an API that could cause existing client code to fail or behave incorrectly.",
              },
              {
                front: "Resource-oriented design",
                back: "An API design approach modeling data as named resources acted on via standard HTTP methods.",
              },
              {
                front: "Deprecation",
                back: "Marking an API version or field as no longer recommended, with a plan to eventually remove it.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "api-design-spec",
      title: "Write an API Design Spec for a Real Feature",
      deliverables: [
        "A spec for 4-5 endpoints of a realistic feature (resource names, methods, request/response shapes, status codes)",
        "A short section on how you'd version a future breaking change to one of these endpoints",
      ],
      rubric: [
        "Endpoint naming and payload shapes are consistent across the whole spec",
        "The versioning approach correctly distinguishes a breaking change from an additive one",
      ],
    },
    resources: [
      {
        title: "Microsoft REST API Guidelines",
        type: "external-link",
        url: "https://github.com/microsoft/api-guidelines",
        description: "A widely referenced practical guide to REST API design.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the API design spec"],
  },
  {
    slug: "git-and-github-essentials",
    title: "Git and GitHub Essentials",
    subtitle:
      "The version control workflow every developer uses daily — commits, branches, and not losing work, explained without the jargon overload.",
    category: "git-github",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["git", "github", "version-control"],
    skills: ["git-fundamentals"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Make clear, well-scoped commits with useful messages",
      "Use branches to work on changes without disrupting the main codebase",
      "Resolve a simple merge conflict without panic",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "commits-that-make-sense",
        title: "Commits That Make Sense Later",
        description: "The habit that makes a project's history actually useful.",
        lessons: [
          {
            slug: "what-makes-a-good-commit",
            title: "What Makes a Good Commit",
            kind: "code",
            durationMinutes: 14,
            free: true,
            points: [
              "One commit should represent one logical change — a commit that mixes an unrelated bug fix with a new feature makes history harder to read and harder to revert selectively",
              "Write commit messages in the imperative mood ('Fix login redirect', not 'Fixed' or 'Fixes') — this matches Git's own generated messages and is the de facto convention",
              "`git status` and `git diff` before committing are the two commands that prevent the most accidental commits of unintended changes",
            ],
            code: {
              language: "text",
              code: 'git add src/auth.py\ngit status   # confirm exactly what\'s staged\ngit commit -m "Fix session timeout not clearing on logout"',
            },
          },
          {
            slug: "undoing-mistakes",
            title: "Undoing Mistakes Without Panic",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "`git restore` reverts uncommitted changes to a file; `git reset` moves the current branch pointer, which is more powerful and more dangerous — know which one you actually need",
              "`git revert` creates a new commit undoing a previous one, safely, without rewriting history — this is almost always the right choice on a shared branch",
              "Before any command you're unsure about, check if the branch has unpushed work you'd hate to lose — most Git mistakes are recoverable, but it's much easier to prevent than to recover",
            ],
          },
        ],
      },
      {
        slug: "branching-and-merging",
        title: "Branching and Merging",
        description: "Working on changes in isolation, then bringing them together safely.",
        lessons: [
          {
            slug: "branching-basics",
            title: "Branching Basics",
            kind: "code",
            durationMinutes: 16,
            points: [
              "A branch is a lightweight, independent line of development — create one per feature or fix so unrelated work doesn't get tangled together",
              "Keep branches short-lived where possible — a branch that diverges from main for weeks accumulates conflict risk that grows the longer it's open",
              "`git switch` (or `git checkout`) moves between branches; `git switch -c` creates and moves to a new one in a single step",
            ],
            code: {
              language: "text",
              code: "git switch -c fix/login-redirect\n# ... make changes, commit ...\ngit push -u origin fix/login-redirect",
            },
          },
          {
            slug: "resolving-merge-conflicts",
            title: "Resolving a Simple Merge Conflict",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A conflict happens when the same lines were changed differently on two branches — Git marks the conflicting section in the file with `<<<<<<<`, `=======`, and `>>>>>>>` markers",
              "Read both versions carefully and decide the correct combined result — resolving a conflict is a decision about intent, not a mechanical text merge",
              "After editing the file to resolve the conflict, remove the conflict markers entirely, then `git add` the file and complete the merge with a commit",
            ],
          },
          {
            slug: "git-glossary",
            title: "Git Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Commit",
                back: "A saved snapshot of changes in a Git repository, with a message describing what changed.",
              },
              {
                front: "Branch",
                back: "An independent line of development, allowing work to happen in isolation before merging.",
              },
              {
                front: "Merge conflict",
                back: "A situation where Git can't automatically combine changes because the same lines were edited differently on two branches.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "git-workflow-practice",
      title: "Practice a Full Branch-to-Merge Workflow",
      deliverables: [
        "A repository with at least 3 well-scoped commits with clear messages, made on a feature branch",
        "A merge back into main, including resolving at least one deliberately created conflict",
      ],
      rubric: [
        "Commit messages clearly and accurately describe each change",
        "The conflict resolution shows the correct combined intent, not just a mechanical pick of one side",
      ],
    },
    resources: [
      {
        title: "Git Documentation",
        type: "external-link",
        url: "https://git-scm.com/doc",
        description: "Official Git documentation and reference.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the git workflow project"],
  },
  {
    slug: "collaborating-on-code-branching-and-pull-requests",
    title: "Collaborating on Code: Branching and Pull Requests",
    subtitle:
      "Working on a shared codebase with a team — branching strategy, writing a reviewable pull request, and giving useful code review feedback.",
    category: "git-github",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["git", "github", "version-control"],
    skills: ["branching-strategy", "pull-requests", "code-review"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Choose a branching strategy appropriate for a team's size and release cadence",
      "Write a pull request that's fast and easy for someone else to review",
      "Give code review feedback that's specific and actionable, not just correct",
    ],
    prerequisites: [{ courseSlug: "git-and-github-essentials" }],
    modules: [
      {
        slug: "branching-strategies",
        title: "Branching Strategies for Teams",
        description: "How a team decides what 'main' means and how work flows into it.",
        lessons: [
          {
            slug: "trunk-based-vs-git-flow",
            title: "Trunk-Based Development vs. Git Flow",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Trunk-based development keeps branches short-lived (hours to a couple days) and merges to main frequently behind feature flags if needed — this suits fast-moving teams with strong CI",
              "Git Flow uses longer-lived develop/release/feature branches with more structure — this can suit teams with slower, more formal release cycles, at the cost of more merge overhead",
              "The right choice depends on team size, release cadence, and CI maturity — there's no universally correct answer, only a better fit for a given team's constraints",
            ],
          },
          {
            slug: "writing-reviewable-prs",
            title: "Writing a Pull Request That's Fast to Review",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Keep pull requests small and focused on one change — a 2,000-line PR touching five unrelated things gets a slower, shallower review than five focused 400-line PRs",
              "Write a clear description: what changed, why, and how to test it — a reviewer shouldn't have to reverse-engineer intent from the diff alone",
              "Self-review your own diff before requesting review — catching your own typo or leftover debug statement first respects the reviewer's time",
            ],
          },
        ],
      },
      {
        slug: "giving-good-code-review",
        title: "Giving Good Code Review Feedback",
        description:
          "Feedback that actually helps, instead of feedback that's just technically correct.",
        lessons: [
          {
            slug: "specific-actionable-feedback",
            title: "Specific, Actionable, and Kind",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "'This could be clearer' is not actionable; 'consider extracting this into a named function — it's doing three things' is — specificity is what makes feedback useful, not just accurate",
              "Distinguish blocking issues (bugs, security problems) from suggestions (style preferences, minor improvements) explicitly, so the author knows what's required vs. optional",
              "Comment on the code, not the person — 'this function has a bug' lands very differently than 'you wrote a bug', even when factually equivalent",
            ],
          },
          {
            slug: "collaboration-glossary",
            title: "Collaboration Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Trunk-based development",
                back: "A branching strategy favoring short-lived branches merged frequently into a single main branch.",
              },
              {
                front: "Feature flag",
                back: "A toggle allowing incomplete or risky code to be merged and deployed while disabled, then enabled when ready.",
              },
              {
                front: "Blocking comment",
                back: "Code review feedback that must be addressed before a pull request can be merged, as opposed to an optional suggestion.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "team-workflow-simulation",
      title: "Simulate a Full PR Review Cycle",
      deliverables: [
        "A pull request with a clear description (what, why, how to test) on a small, focused change",
        "Written review feedback on a piece of sample code, using specific and actionable comments, with blocking vs. suggestion clearly distinguished",
      ],
      rubric: [
        "The PR description would let a reviewer understand the change without reading every line of the diff first",
        "Review feedback is specific enough that the author would know exactly what to change",
      ],
    },
    resources: [
      {
        title: "GitHub Docs: About Pull Requests",
        type: "external-link",
        url: "https://docs.github.com/pull-requests",
        description: "Official GitHub documentation on pull requests.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the PR + review simulation"],
  },
  {
    slug: "debugging-and-testing-fundamentals",
    title: "Debugging and Testing Fundamentals",
    subtitle:
      "A systematic process for finding bugs faster, and writing tests that actually catch regressions instead of just existing.",
    category: "programming-fundamentals",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["programming"],
    skills: ["debugging", "testing-fundamentals"],
    careerPaths: ["software-engineer"],
    instructor: {
      name: "Marcus Webb",
      title: "Senior Software Engineer, ex-Stripe",
      avatarInitials: "MW",
    },
    objectives: [
      "Apply a systematic process for isolating the cause of a bug",
      "Write unit tests that cover edge cases, not just the happy path",
      "Recognize the difference between a test that passes and a test that actually verifies something",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "systematic-debugging",
        title: "A Systematic Debugging Process",
        description: "Debugging as a repeatable method, not a random guess-and-check loop.",
        lessons: [
          {
            slug: "isolating-the-cause",
            title: "Isolating the Cause Before Guessing at a Fix",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Reproduce the bug reliably first — a bug you can't consistently trigger is very hard to confirm you've actually fixed",
              "Binary search the problem space: comment out or bypass half the suspect code, check if the bug persists, and repeat — this narrows the cause far faster than reading every line hoping to spot it",
              "Read the actual error message and stack trace carefully before forming a theory — jumping to a guess before reading the evidence wastes more time than it saves",
            ],
          },
          {
            slug: "using-a-debugger",
            title: "Using a Debugger Instead of Print Statements Everywhere",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "A breakpoint lets you pause execution and inspect the actual state of variables at that exact point — far more precise than guessing what to print and re-running repeatedly",
              "Step-over executes the current line without entering function calls; step-into goes inside them — knowing which to use saves time navigating unfamiliar code",
              "Print debugging is still useful for quick checks, but a debugger is faster once a bug requires inspecting more than one or two values",
            ],
          },
        ],
      },
      {
        slug: "writing-tests-that-matter",
        title: "Writing Tests That Actually Matter",
        description: "The difference between test coverage and test usefulness.",
        lessons: [
          {
            slug: "unit-tests-covering-edge-cases",
            title: "Writing Unit Tests That Cover Edge Cases",
            kind: "code",
            durationMinutes: 18,
            points: [
              "A test suite that only covers the happy path gives false confidence — the bugs that matter usually live in edge cases: empty input, boundary values, unexpected types",
              "Each test should verify one specific behavior and fail with a clear message when that behavior breaks — a test with 10 assertions that all fail together tells you far less than 10 separate focused tests",
              "Write a test that fails first (for a bug you're fixing, or a feature you're adding) before writing the fix — this confirms the test actually catches the problem, not just that it exists",
            ],
            code: {
              language: "python",
              code: "def test_divide_by_zero_raises():\n    with pytest.raises(ZeroDivisionError):\n        divide(10, 0)\n\ndef test_divide_normal_case():\n    assert divide(10, 2) == 5",
            },
          },
          {
            slug: "debugging-testing-glossary",
            title: "Debugging & Testing Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Breakpoint",
                back: "A marker that pauses program execution at a specific line, allowing inspection of variable state.",
              },
              {
                front: "Regression",
                back: "A previously working feature that breaks due to a later change.",
              },
              {
                front: "False confidence (testing)",
                back: "A misleading sense of safety from tests that only cover easy cases and miss real edge-case bugs.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "bug-fix-with-tests",
      title: "Fix a Bug and Add Regression Tests",
      deliverables: [
        "A documented debugging process for a real or provided bug, showing how the cause was isolated",
        "A test that fails before the fix and passes after, plus at least one additional edge-case test",
      ],
      rubric: [
        "The debugging process shows genuine isolation steps, not just 'I looked at it and found it'",
        "Tests are specific and would genuinely catch a regression if the fix were reverted",
      ],
    },
    resources: [
      {
        title: "pytest Documentation",
        type: "external-link",
        url: "https://docs.pytest.org",
        description: "Official documentation for the pytest testing framework.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the bug fix + regression tests"],
  },
  // ---------------------------------------------------------------
  // Cloud Engineer path (4 of 12 — remaining 8 continue in batch 3)
  // ---------------------------------------------------------------
  {
    slug: "cloud-computing-foundations",
    title: "Cloud Computing Foundations",
    subtitle:
      "What 'the cloud' actually is, the core service models, and the vocabulary you need before touching AWS or Azure specifically.",
    category: "cloud-computing",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["cloud"],
    skills: ["cloud-fundamentals"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Explain the difference between IaaS, PaaS, and SaaS with concrete examples",
      "Explain why elasticity and pay-as-you-go pricing changed infrastructure economics",
      "Describe the shared responsibility model for cloud security",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "cloud-service-models",
        title: "Cloud Service Models",
        description: "IaaS, PaaS, SaaS — what you're actually responsible for at each layer.",
        lessons: [
          {
            slug: "iaas-paas-saas",
            title: "IaaS, PaaS, and SaaS Explained with Real Examples",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "IaaS (Infrastructure as a Service, e.g. raw EC2 virtual machines) gives you the most control and the most responsibility — you manage the OS, runtime, and everything above it",
              "PaaS (Platform as a Service, e.g. a managed app-hosting platform) handles the OS and runtime for you — you focus on your application code, trading some control for less operational burden",
              "SaaS (Software as a Service, e.g. a hosted email or CRM product) is fully managed — you're a user of the software, not an operator of any layer beneath it",
              "Moving up this stack trades control for reduced operational responsibility — the right layer depends on how much of the underlying complexity you actually need to customize",
            ],
          },
          {
            slug: "elasticity-and-pricing",
            title: "Elasticity and Pay-As-You-Go Pricing",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Elasticity means resources scale up or down automatically with demand — this is what makes it economically viable to handle a traffic spike without permanently over-provisioning hardware",
              "Pay-as-you-go pricing shifts infrastructure from a large upfront capital cost to an ongoing operational cost proportional to actual usage",
              "This also introduces a new failure mode: unmonitored, unbounded usage can produce an unexpectedly large bill — cost monitoring is now an operational responsibility, not just a budgeting exercise",
            ],
          },
        ],
      },
      {
        slug: "shared-responsibility",
        title: "The Shared Responsibility Model",
        description:
          "The cloud provider secures some things; you secure others — knowing the line matters.",
        lessons: [
          {
            slug: "who-secures-what",
            title: "Who Secures What, and Where the Line Is",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "The provider is responsible for security 'of' the cloud — physical data centers, host infrastructure, network hardware",
              "You are responsible for security 'in' the cloud — how you configure access controls, encrypt your data, and secure your application code",
              "Most real cloud security incidents come from customer-side misconfiguration (an open storage bucket, an overly permissive access policy), not a failure on the provider's side",
            ],
          },
          {
            slug: "cloud-glossary",
            title: "Cloud Computing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "IaaS",
                back: "Infrastructure as a Service — renting raw compute, storage, and networking, managing the OS and above yourself.",
              },
              {
                front: "Elasticity",
                back: "The ability of a cloud system to automatically scale resources up or down to match demand.",
              },
              {
                front: "Shared responsibility model",
                back: "The division of security responsibilities between a cloud provider and its customers.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "cloud-migration-brief",
      title: "Write a Cloud Migration Brief for a Hypothetical App",
      deliverables: [
        "A short brief recommending IaaS, PaaS, or SaaS for 3 different hypothetical workloads, with reasoning",
        "A summary of which security responsibilities would fall to the team vs. the provider for the recommended approach",
      ],
      rubric: [
        "Each service-model recommendation is justified by the specific workload's actual needs, not a generic default",
        "The security responsibility summary correctly reflects the shared responsibility model",
      ],
    },
    resources: [
      {
        title: "AWS: What Is Cloud Computing?",
        type: "external-link",
        url: "https://aws.amazon.com/what-is-cloud-computing/",
        description: "A vendor-neutral-ish overview of cloud computing concepts.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cloud migration brief"],
  },
  {
    slug: "aws-core-services-fundamentals",
    title: "AWS Core Services Fundamentals",
    subtitle:
      "The handful of AWS services (EC2, S3, IAM, VPC) that underpin almost everything else, and how they fit together.",
    category: "aws",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: ["cloud", "aws"],
    skills: ["aws-core-services", "iam-and-security"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Launch and configure a basic EC2 instance with appropriate security settings",
      "Store and manage objects in S3 with correct access controls",
      "Apply least-privilege IAM policies instead of broad, risky permissions",
    ],
    prerequisites: [{ courseSlug: "cloud-computing-foundations" }],
    modules: [
      {
        slug: "compute-and-storage",
        title: "Compute and Storage",
        description: "EC2 and S3 — the two services almost every AWS account touches first.",
        lessons: [
          {
            slug: "ec2-basics",
            title: "EC2 Basics: Instances, Types, and Security Groups",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "An EC2 instance is a virtual server — instance type (e.g. t3.micro) determines its CPU, memory, and cost, and should match actual workload needs rather than defaulting to 'bigger is safer'",
              "A security group acts as a virtual firewall controlling inbound/outbound traffic to an instance — start with the minimum ports open (e.g. only 443 for HTTPS) and add more only as genuinely needed",
              "Never leave SSH (port 22) open to the entire internet (0.0.0.0/0) in a real environment — restrict it to known IP ranges or use a bastion host / Session Manager instead",
            ],
          },
          {
            slug: "s3-basics",
            title: "S3 Basics: Buckets, Objects, and Access Control",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "S3 stores objects (files) inside buckets (containers) — bucket names must be globally unique across all of AWS, not just your account",
              "By default, new S3 buckets block public access — this default exists because accidentally public buckets are one of the most common real-world cloud security incidents",
              "Use bucket policies or IAM policies to grant specific, scoped access rather than making a bucket broadly public just to solve an access problem quickly",
            ],
          },
        ],
      },
      {
        slug: "identity-and-access",
        title: "Identity and Access Management",
        description: "Controlling exactly who and what can do what, and nothing more.",
        lessons: [
          {
            slug: "iam-least-privilege",
            title: "IAM and the Principle of Least Privilege",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "IAM policies define what actions a user, role, or service can perform on which resources — grant only the specific permissions a task actually requires, not broad admin access for convenience",
              "Use IAM roles (not long-lived access keys) for services and applications wherever possible — roles provide temporary, automatically-rotated credentials, which is significantly safer",
              "Regularly review who has access to what — permissions granted for a one-off task are frequently forgotten and left in place indefinitely, quietly expanding the attack surface",
            ],
          },
          {
            slug: "aws-glossary",
            title: "AWS Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Security group",
                back: "A virtual firewall controlling inbound and outbound traffic to an AWS EC2 instance.",
              },
              {
                front: "IAM role",
                back: "An AWS identity with specific permissions, assumable by users or services, using temporary credentials.",
              },
              {
                front: "Least privilege",
                back: "The security principle of granting only the minimum permissions necessary to perform a task.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "secure-aws-environment-design",
      title: "Design a Secure Small AWS Environment",
      deliverables: [
        "A design for a small app's AWS setup: EC2 configuration with a scoped security group, an S3 bucket with correct access controls",
        "An IAM policy granting only the specific permissions the app's components actually need",
      ],
      rubric: [
        "The security group only opens the specific ports genuinely required",
        "The IAM policy follows least privilege, not a broad managed policy used for convenience",
      ],
    },
    resources: [
      {
        title: "AWS Well-Architected Framework",
        type: "external-link",
        url: "https://aws.amazon.com/architecture/well-architected/",
        description: "Official AWS best-practices framework.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the secure AWS environment design"],
  },
  {
    slug: "azure-core-services-fundamentals",
    title: "Azure Core Services Fundamentals",
    subtitle:
      "The core Azure building blocks — Virtual Machines, Storage, and Azure Active Directory — and how Microsoft's cloud maps to the concepts you already know.",
    category: "azure",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["cloud", "azure"],
    skills: ["azure-core-services", "iam-and-security"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Deploy and configure a basic Azure Virtual Machine with appropriate network security",
      "Use Azure Storage accounts and understand access tiers",
      "Apply role-based access control (RBAC) correctly",
    ],
    prerequisites: [{ courseSlug: "cloud-computing-foundations" }],
    modules: [
      {
        slug: "compute-and-storage-azure",
        title: "Compute and Storage in Azure",
        description:
          "Virtual Machines and Storage accounts — Azure's equivalents of the services most people learn first.",
        lessons: [
          {
            slug: "azure-vms",
            title: "Azure Virtual Machines and Network Security Groups",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "An Azure VM's size (e.g. B1s, D2s) determines CPU, memory, and cost — like AWS, matching size to actual workload avoids both under-provisioning and wasted spend",
              "A Network Security Group (NSG) is Azure's equivalent of an AWS security group — a firewall-like rule set controlling inbound/outbound traffic at the subnet or NIC level",
              "Azure VMs default to requiring explicit inbound rules for anything beyond basic connectivity — review the default NSG rules rather than assuming they match your intended exposure",
            ],
          },
          {
            slug: "azure-storage",
            title: "Azure Storage Accounts and Access Tiers",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A Storage account can hold Blob storage (unstructured files), File shares, Queues, and Tables — Blob storage is the closest equivalent to AWS S3",
              "Access tiers (Hot, Cool, Archive) trade storage cost against retrieval cost and latency — choosing the wrong tier for actual access patterns can quietly inflate costs",
              "Like S3, publicly accessible Blob containers are a common real-world misconfiguration — verify access level explicitly rather than assuming a safe default",
            ],
          },
        ],
      },
      {
        slug: "azure-identity",
        title: "Identity in Azure",
        description:
          "Role-based access control and the principle that carries over from every other cloud platform.",
        lessons: [
          {
            slug: "azure-rbac",
            title: "Role-Based Access Control (RBAC)",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "RBAC assigns roles (built-in or custom) to users, groups, or service principals, scoped to a specific resource, resource group, or subscription",
              "Use built-in roles like Reader or Contributor where they fit rather than defaulting to Owner — Owner grants far more than most tasks require",
              "Scope role assignments as narrowly as possible (to a resource group, not the whole subscription) unless a task genuinely needs broader access",
            ],
          },
          {
            slug: "azure-glossary",
            title: "Azure Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Network Security Group (NSG)",
                back: "Azure's firewall-like construct controlling inbound and outbound traffic to resources.",
              },
              {
                front: "Blob storage",
                back: "Azure's service for storing unstructured data like files and images, similar to AWS S3.",
              },
              {
                front: "RBAC",
                back: "Role-Based Access Control — assigning scoped permissions to identities based on defined roles.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "secure-azure-environment-design",
      title: "Design a Secure Small Azure Environment",
      deliverables: [
        "A design for a small app's Azure setup: a VM with an appropriately scoped NSG, and a Storage account with correct access tier and access level",
        "An RBAC role assignment scoped to only what the app's components need",
      ],
      rubric: [
        "NSG rules only allow the specific traffic genuinely required",
        "RBAC assignment uses least-privilege scoping, not subscription-wide Owner access",
      ],
    },
    resources: [
      {
        title: "Microsoft Azure Architecture Center",
        type: "external-link",
        url: "https://learn.microsoft.com/azure/architecture/",
        description: "Official Azure architecture guidance.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the secure Azure environment design"],
  },
  {
    slug: "devops-foundations",
    title: "DevOps Foundations",
    subtitle:
      "The culture and practices behind DevOps — not just tools, but why continuous integration and fast feedback loops actually reduce risk.",
    category: "devops",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["devops", "cloud"],
    skills: ["ci-cd-pipelines"],
    careerPaths: ["cloud-engineer", "devops-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Explain why small, frequent releases reduce risk compared to large, infrequent ones",
      "Describe the core stages of a CI/CD pipeline",
      "Distinguish continuous integration from continuous deployment",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "devops-culture",
        title: "DevOps as Culture, Not Just Tooling",
        description:
          "The practices exist because of what they actually reduce: risk and feedback delay.",
        lessons: [
          {
            slug: "why-small-releases-reduce-risk",
            title: "Why Small, Frequent Releases Reduce Risk",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "A small release changes little, so if something breaks, the cause is easy to isolate — a large, infrequent release bundles many changes together, making the cause of any failure much harder to pin down",
              "Frequent releases mean feedback (from monitoring, from users) arrives faster, so problems are caught and fixed sooner rather than compounding silently for weeks",
              "This is a genuine tradeoff of process overhead for reduced blast radius — the DevOps bet is that this tradeoff pays off, and in practice it usually does at any meaningful team size",
            ],
          },
          {
            slug: "breaking-down-silos",
            title: "Breaking Down the Dev/Ops Silo",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Historically, developers wrote code and a separate operations team deployed and ran it — this handoff created a gap where nobody felt fully responsible for production reliability",
              "DevOps culture shares that responsibility — the people writing code also carry some responsibility for how it behaves in production, closing the feedback loop",
              "This doesn't mean 'everyone does everything' — it means the boundary between building and running software is deliberately made less rigid",
            ],
          },
        ],
      },
      {
        slug: "ci-cd-basics",
        title: "CI/CD Basics",
        description: "The pipeline stages that turn a commit into a safely deployed change.",
        lessons: [
          {
            slug: "ci-vs-cd",
            title: "Continuous Integration vs. Continuous Deployment",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Continuous Integration (CI) means merging code changes frequently, with automated builds and tests running on every change to catch problems immediately",
              "Continuous Delivery means every change that passes CI is automatically prepared for release, but a human still triggers the actual deployment",
              "Continuous Deployment goes one step further — every change that passes all checks deploys to production automatically, with no manual gate",
            ],
          },
          {
            slug: "devops-glossary",
            title: "DevOps Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Continuous Integration (CI)",
                back: "The practice of frequently merging code changes with automated build and test verification on each change.",
              },
              {
                front: "Continuous Deployment (CD)",
                back: "Automatically deploying every change that passes all automated checks, with no manual approval gate.",
              },
              {
                front: "Blast radius",
                back: "The scope of impact if a given change or failure goes wrong — a core concept behind favoring small, incremental releases.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "ci-cd-pipeline-design",
      title: "Design a CI/CD Pipeline for a Small App",
      deliverables: [
        "A pipeline design (stages: build, test, deploy) for a realistic small application",
        "A written justification for where a manual approval gate belongs (or doesn't) in the pipeline",
      ],
      rubric: [
        "Pipeline stages are in a logical, safe order (tests before deploy, not after)",
        "The manual-gate decision is justified by the app's actual risk profile, not assumed by default",
      ],
    },
    resources: [
      {
        title: "Google Cloud: DevOps Culture",
        type: "external-link",
        url: "https://cloud.google.com/devops",
        description: "A reference on DevOps research, culture, and practices.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the CI/CD pipeline design"],
  },
];
