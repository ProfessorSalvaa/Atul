import type { CourseSpec } from "../lib/course-spec-types.mts";

export const SPECS: CourseSpec[] = [
  // ---------------------------------------------------------------
  // AI Practitioner path (12 courses)
  // ---------------------------------------------------------------
  {
    slug: "generative-ai-foundations",
    title: "Generative AI Foundations",
    subtitle:
      "What generative AI actually is, how large language models work at a level you can reason about, and where they genuinely help versus where they don't.",
    category: "generative-ai",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: ["ai", "generative-ai", "llm"],
    skills: ["prompt-engineering"],
    careerPaths: ["ai-practitioner"],
    instructor: {
      name: "Dr. Maya Chen",
      title: "AI Research Lead, ex-DeepMind",
      avatarInitials: "MC",
    },
    objectives: [
      "Explain how large language models generate text without treating them as magic",
      "Distinguish tasks LLMs are genuinely good at from tasks where they fail predictably",
      "Recognize hallucination, bias, and context-window limits as they show up in practice",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "how-llms-work",
        title: "How Large Language Models Actually Work",
        description: "Enough of the mechanism to build accurate intuitions, without the math.",
        lessons: [
          {
            slug: "next-token-prediction",
            title: "It's All Next-Token Prediction",
            kind: "reading",
            durationMinutes: 14,
            free: true,
            points: [
              "An LLM is trained to predict the most statistically likely next word (token) given everything before it — that's the entire mechanism underneath every clever-seeming reply",
              "Training happens on massive text corpora; the model never 'looks things up' at answer time unless it's explicitly connected to a search or retrieval tool",
              "Fluency is not the same as correctness — a model can produce grammatically perfect, confident-sounding text that is factually wrong",
              "Temperature and sampling settings control how 'creative' vs. deterministic the next-token choice is, which is why the same prompt can give different answers twice",
            ],
          },
          {
            slug: "what-llms-are-good-and-bad-at",
            title: "What LLMs Are Good At — and What They Aren't",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Strong at: rephrasing, summarizing, drafting from a clear brief, translating between formats (bullet points to email, code to plain English)",
              "Weak at: precise arithmetic, up-to-the-minute facts, anything requiring a reliable external memory or ground truth it wasn't trained on",
              "Hallucination is most common on niche facts, exact citations, and version-specific technical details — verify anything you'd be embarrassed to get wrong",
              "The context window (how much text the model can 'see' at once) is a hard limit — beyond it, earlier parts of a long conversation are effectively forgotten",
            ],
          },
        ],
      },
      {
        slug: "using-ai-responsibly",
        title: "Using AI Responsibly",
        description: "The judgment layer that separates competent AI use from careless AI use.",
        lessons: [
          {
            slug: "bias-and-verification",
            title: "Bias, Verification, and Knowing When to Trust It",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Models inherit biases present in their training data — this shows up subtly, in tone, assumed defaults, and whose perspective gets centered",
              "A simple verification habit: treat any factual claim, statistic, or quote from an LLM as 'unverified' until you've checked it against a real source",
              "For high-stakes output (legal, medical, financial, anything published under your name), AI output is a draft, not a deliverable",
              "The safest default is 'trust but verify' — use AI to go faster, not to skip the step where you actually check the work",
            ],
          },
          {
            slug: "genai-glossary",
            title: "Generative AI Glossary",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Hallucination",
                back: "A confident, fluent, but factually incorrect model output.",
              },
              {
                front: "Context window",
                back: "The maximum amount of text (prompt + reply history) a model can process at once.",
              },
              {
                front: "Fine-tuning",
                back: "Further training a pre-trained model on a narrower, task-specific dataset.",
              },
              {
                front: "Temperature",
                back: "A setting controlling output randomness — low temperature is more deterministic, high is more varied.",
              },
              {
                front: "Grounding",
                back: "Connecting a model's output to a verified external source of truth, reducing hallucination risk.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "ai-use-case-audit",
      title: "AI Use-Case Audit for Your Own Work",
      deliverables: [
        "A list of 5 tasks in your current job/studies, each scored as 'good fit' or 'poor fit' for AI assistance, with a one-line reason",
        "One worked example of a good-fit task, including the prompt used and the verification step you'd apply",
      ],
      rubric: [
        "Each task's good-fit/poor-fit call is justified by the strengths/weaknesses covered in this course, not just intuition",
        "The worked example includes an explicit verification step, not just the AI's raw output",
      ],
    },
    resources: [
      {
        title: "OpenAI Usage Policies",
        type: "external-link",
        url: "https://openai.com/policies/usage-policies",
        description: "Official policy on acceptable AI use.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the AI use-case audit project"],
  },
  {
    slug: "prompt-engineering-fundamentals",
    title: "Prompt Engineering Fundamentals",
    subtitle:
      "A repeatable process for writing prompts that get useful output on the first or second try, instead of guessing.",
    category: "prompt-engineering",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["prompting", "ai", "generative-ai"],
    skills: ["prompt-engineering"],
    careerPaths: ["ai-practitioner"],
    instructor: { name: "Theo Marsh", title: "Staff Engineer, ex-Vercel", avatarInitials: "TM" },
    objectives: [
      "Structure a prompt with role, task, context, and format",
      "Use examples (few-shot prompting) to steer output style reliably",
      "Debug a bad output by identifying which part of the prompt caused it",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "anatomy-of-a-prompt",
        title: "The Anatomy of a Good Prompt",
        description: "The four ingredients that separate vague prompts from precise ones.",
        lessons: [
          {
            slug: "role-task-context-format",
            title: "Role, Task, Context, Format",
            kind: "reading",
            durationMinutes: 14,
            free: true,
            points: [
              "Role: tell the model who it's acting as ('You are a senior copyeditor') — this shifts vocabulary, tone, and priorities appropriately",
              "Task: state the specific action verb — 'summarize', 'critique', 'rewrite', 'compare' — vague verbs like 'help with' produce vague output",
              "Context: give the background the model can't infer — audience, prior decisions, constraints, what's already been tried",
              "Format: specify length, structure, and output shape explicitly (bullet points vs. prose, word count, whether you want code or explanation)",
              "Missing any one of these four is the most common reason a prompt underperforms",
            ],
          },
          {
            slug: "few-shot-prompting",
            title: "Few-Shot Prompting: Show, Don't Just Tell",
            kind: "code",
            durationMinutes: 16,
            points: [
              "A zero-shot prompt asks directly with no example; a few-shot prompt includes 1-3 examples of the input/output pattern you want",
              "Few-shot prompting is the single highest-leverage technique for controlling tone and structure — models imitate the pattern you show far more reliably than a text description of the pattern",
              "Keep examples short and representative rather than exhaustive — 2-3 tight examples usually outperform one long one",
            ],
            code: {
              language: "text",
              code: 'Turn this into 3 examples of a few-shot prompt for writing product update emails:\n\nExample 1:\nInput: Fixed a bug where exports timed out on large files.\nOutput: "Exports are now reliable, even for your biggest files — no more timeouts."\n\nExample 2:\nInput: Added dark mode.\nOutput: "Dark mode has arrived. Toggle it in Settings > Appearance."\n\nNow write one for: Added CSV import for contacts.',
            },
          },
        ],
      },
      {
        slug: "iterating-on-prompts",
        title: "Iterating When the First Answer Isn't Right",
        description: "Prompting as a debugging loop, not a one-shot guess.",
        lessons: [
          {
            slug: "diagnosing-bad-output",
            title: "Diagnosing Why an Output Went Wrong",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Wrong tone → the role or audience wasn't specified clearly enough",
              "Too vague or generic → missing context, or the task verb was too broad",
              "Wrong format or length → format constraints weren't stated explicitly, or weren't stated first",
              "Factually wrong → this isn't a prompting problem — verify externally, don't just re-prompt and hope",
              "Ask the model to critique its own output against your original ask — this often surfaces the gap faster than guessing",
            ],
          },
          {
            slug: "prompting-terms",
            title: "Prompting Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Zero-shot prompting",
                back: "Asking the model to perform a task with no examples given.",
              },
              {
                front: "Few-shot prompting",
                back: "Including 1-3 examples of the desired input/output pattern in the prompt.",
              },
              {
                front: "System prompt",
                back: "Instructions set before the conversation begins that persist across the whole session.",
              },
              {
                front: "Chain-of-thought prompting",
                back: "Asking the model to reason step-by-step before giving a final answer, often improving accuracy on multi-step tasks.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "prompt-template-pack",
      title: "Build a 5-Prompt Template Pack",
      deliverables: [
        "5 reusable prompt templates for tasks you do regularly, each using role/task/context/format",
        "One before/after pair showing a vague prompt vs. your improved version, with the output difference explained",
      ],
      rubric: [
        "Every template includes all four ingredients (role, task, context, format)",
        "The before/after pair clearly demonstrates what changed and why it mattered",
      ],
    },
    resources: [
      {
        title: "Anthropic Prompt Engineering Guide",
        type: "external-link",
        url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview",
        description: "Official prompting documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the prompt template pack"],
  },
  {
    slug: "prompt-chaining-and-multi-step-workflows",
    title: "Prompt Chaining and Multi-Step Workflows",
    subtitle:
      "Breaking a complex task into a chain of smaller prompts, each doing one job well, instead of asking one giant prompt to do everything at once.",
    category: "prompt-engineering",
    difficulty: "advanced",
    estimatedDurationMinutes: 130,
    tags: ["prompting", "ai", "workflow"],
    skills: ["prompt-engineering", "llm-integration"],
    careerPaths: ["ai-practitioner", "software-engineer"],
    instructor: { name: "Theo Marsh", title: "Staff Engineer, ex-Vercel", avatarInitials: "TM" },
    objectives: [
      "Decompose a complex task into a sequence of single-purpose prompt steps",
      "Decide when chaining helps versus when it just adds latency and cost for no benefit",
      "Handle a failure at one step of a chain without corrupting the whole pipeline",
    ],
    prerequisites: [{ courseSlug: "prompt-engineering-fundamentals" }],
    modules: [
      {
        slug: "why-chain-prompts",
        title: "Why Chain Prompts At All",
        description: "The specific situations where breaking a task apart genuinely helps.",
        lessons: [
          {
            slug: "one-job-per-step",
            title: "One Job Per Step",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "A single giant prompt asking a model to research, analyze, and format all at once tends to do all three worse than three focused prompts done in sequence",
              "Chaining works well when a later step genuinely depends on a structured, verifiable output from an earlier step — not just as a way to 'organize' an otherwise simple task",
              "Each step in a chain should have its own clear success condition, so a bad output can be caught before it poisons every step downstream",
              "The cost of chaining is real: more latency, more API calls, more places for something to go subtly wrong — don't chain a task that a single well-written prompt already handles reliably",
            ],
          },
          {
            slug: "designing-a-chain",
            title: "Designing a Chain: Research → Draft → Critique",
            kind: "code",
            durationMinutes: 18,
            points: [
              "A common effective pattern: one step extracts/structures raw information, a second step drafts from that structured input, a third step critiques the draft against explicit criteria",
              "Pass structured data (JSON) between steps rather than freeform prose whenever a later step needs to reliably parse the earlier output",
              "Keep the critique step's criteria explicit and specific — a vague 'is this good?' critique step rarely catches anything a first pass didn't already catch",
            ],
            code: {
              language: "text",
              code: "Step 1 (extract): 'Extract every claim and its source from this article as JSON: [{claim, source}]'\nStep 2 (draft): 'Using this JSON of claims, draft a 200-word summary citing each source inline.'\nStep 3 (critique): 'Check the draft against the original claims JSON — flag any claim that is missing, altered, or unattributed.'",
            },
          },
        ],
      },
      {
        slug: "handling-chain-failures",
        title: "Handling Failures Mid-Chain",
        description:
          "What happens when step 2 of 4 goes wrong — and how to keep it from silently corrupting the rest.",
        lessons: [
          {
            slug: "validating-between-steps",
            title: "Validating Output Between Steps",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Validate each step's output programmatically before passing it to the next step — a malformed JSON or an empty result should halt the chain, not be silently passed forward",
              "Decide per-step whether a failure should halt the whole chain, retry that step, or fall back to a simpler default — this is a design decision, not an afterthought",
              "Log the input and output of every step during development — debugging a 4-step chain without visibility into each intermediate result is close to impossible",
            ],
          },
          {
            slug: "chaining-case-study",
            title: "Case Study: A Silent Failure Three Steps Into a Chain",
            kind: "case-study",
            durationMinutes: 17,
            points: [
              "A content-generation pipeline chained outline → draft → fact-check → publish, with no validation between steps",
              "The outline step occasionally returned an empty list for obscure topics, which the draft step then 'handled' by inventing a plausible-sounding outline of its own",
              "The fact-check step evaluated the invented content against itself, of course passing, and several factually thin articles were published before anyone noticed",
              "Root cause: no check that the outline step's output was non-empty and well-formed before letting the chain proceed",
              "Fix: added an explicit non-empty validation after the outline step, with the chain halting and alerting a human rather than silently continuing with a downstream model's improvisation",
            ],
          },
          {
            slug: "chaining-glossary",
            title: "Prompt Chaining Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Prompt chaining",
                back: "Breaking a task into a sequence of smaller prompts, where each step's output feeds the next.",
              },
              {
                front: "Step validation",
                back: "Programmatically checking a chain step's output before passing it downstream, to prevent silent failure propagation.",
              },
              {
                front: "Fallback strategy",
                back: "A predefined simpler action taken when a chain step fails, instead of halting entirely or guessing.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "three-step-content-pipeline",
      title: "Build a 3-Step Prompt Chain",
      deliverables: [
        "A 3-step prompt chain for a real task (e.g. research → draft → critique) with structured data passed between steps",
        "Explicit validation logic between at least 2 of the steps",
        "One deliberately-triggered failure case, showing the chain handles it without silently corrupting downstream output",
      ],
      rubric: [
        "Each step has a single, clear job rather than overlapping responsibilities",
        "The failure case is genuinely tested, not just described hypothetically",
      ],
    },
    resources: [
      {
        title: "Anthropic: Chain Complex Prompts",
        type: "external-link",
        url: "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/chain-prompts",
        description: "Official guidance on chaining prompts for complex tasks.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the 3-step prompt chain project"],
  },
  {
    slug: "chatgpt-for-everyday-productivity",
    title: "ChatGPT for Everyday Productivity",
    subtitle:
      "A practical, no-hype introduction to using ChatGPT for real work — writing, planning, and research — without the trivia.",
    category: "chatgpt",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["chatgpt", "ai", "prompting"],
    skills: ["prompt-engineering", "chatgpt-workflows"],
    careerPaths: ["ai-practitioner"],
    instructor: {
      name: "Priya Nair",
      title: "Head of AI Enablement, Fieldstone",
      avatarInitials: "PN",
    },
    objectives: [
      "Use ChatGPT effectively for drafting, editing, and summarizing",
      "Use custom instructions and memory features to reduce repeated setup",
      "Know when ChatGPT's answer needs independent verification",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "core-workflows",
        title: "Core Workflows",
        description:
          "The handful of use cases that cover most of what people actually need day to day.",
        lessons: [
          {
            slug: "drafting-and-editing",
            title: "Drafting and Editing Faster",
            kind: "reading",
            durationMinutes: 13,
            free: true,
            points: [
              "For drafting, give ChatGPT the point you're trying to make and the audience — let it produce the first pass, then you edit, rather than staring at a blank page",
              "For editing existing text, ask for specific passes: 'tighten for length', 'flag anything that could be misread', 'match this to a more formal tone' — one pass at a time beats one vague 'make this better'",
              "Paste in a style example (an email you like the tone of) and ask ChatGPT to match it — this works better than describing tone in the abstract",
            ],
          },
          {
            slug: "summarizing-and-research",
            title: "Summarizing Long Content and Early-Stage Research",
            kind: "reading",
            durationMinutes: 14,
            points: [
              "Summarization is one of the most reliable use cases — paste the source text directly rather than a link when possible, since the model can't reliably browse unless that feature is explicitly enabled",
              "Ask for a summary structured by what you'll actually use it for: 'summarize as 3 action items' vs. 'summarize as an executive overview' produce very different, both useful, results",
              "For research, treat ChatGPT as a starting-point generator (what angles exist, what questions to ask) rather than a source of specific facts or citations to quote directly",
            ],
          },
        ],
      },
      {
        slug: "personalizing-chatgpt",
        title: "Personalizing ChatGPT for Less Repeated Setup",
        description:
          "Making ChatGPT remember your context so you're not re-explaining yourself every conversation.",
        lessons: [
          {
            slug: "custom-instructions",
            title: "Custom Instructions and Memory",
            kind: "reading",
            durationMinutes: 13,
            points: [
              "Custom instructions let you set persistent context (your role, your preferred tone, formatting preferences) that applies to every new conversation automatically",
              "Memory (where available) lets ChatGPT retain specific facts across sessions — useful for ongoing projects, but worth periodically reviewing what's been remembered",
              "Both features reduce the 're-explain who I am and what I need' tax at the start of every chat — set them up once, benefit every session after",
            ],
          },
          {
            slug: "chatgpt-glossary",
            title: "ChatGPT Feature Glossary",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Custom instructions",
                back: "Persistent settings that apply your preferred context/tone to every new ChatGPT conversation.",
              },
              {
                front: "Memory",
                back: "A feature where ChatGPT retains specific facts about you across separate conversations.",
              },
              {
                front: "Context window",
                back: "How much of the current conversation the model can 'see' at once before older parts drop off.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "personal-workflow-setup",
      title: "Set Up Your Personal ChatGPT Workflow",
      deliverables: [
        "A custom-instructions configuration written for your actual role",
        "3 example prompts you'll reuse regularly, each with the output you got",
      ],
      rubric: [
        "Custom instructions reflect real, specific context (not generic placeholders)",
        "Each reused prompt has a clear, stated purpose tied to an actual recurring task",
      ],
    },
    resources: [
      {
        title: "OpenAI Help Center",
        type: "external-link",
        url: "https://help.openai.com",
        description: "Official ChatGPT documentation and feature guides.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit your personal workflow setup"],
  },
  {
    slug: "chatgpt-for-data-analysis",
    title: "ChatGPT for Data Analysis",
    subtitle:
      "Using ChatGPT's code interpreter and file analysis to explore datasets, generate charts, and sanity-check findings faster.",
    category: "chatgpt",
    difficulty: "intermediate",
    estimatedDurationMinutes: 110,
    tags: ["chatgpt", "ai", "analytics", "data"],
    skills: ["chatgpt-workflows", "data-cleaning"],
    careerPaths: ["ai-practitioner", "data-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Head of AI Enablement, Fieldstone",
      avatarInitials: "PN",
    },
    objectives: [
      "Use ChatGPT's data-analysis features to explore a CSV without writing code by hand",
      "Ask questions that produce genuinely checkable analysis rather than vague summaries",
      "Verify AI-generated numbers against the source data before trusting them",
    ],
    prerequisites: [{ courseSlug: "chatgpt-for-everyday-productivity" }],
    modules: [
      {
        slug: "exploring-data",
        title: "Exploring a Dataset with ChatGPT",
        description: "From raw file upload to a first honest look at what's in the data.",
        lessons: [
          {
            slug: "uploading-and-profiling",
            title: "Uploading a File and Getting an Honest First Look",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Start by asking for a data profile: row/column counts, data types, missing values per column — this catches obvious data-quality issues before any analysis happens",
              "Ask ChatGPT to show you the actual code it ran, not just the result — this lets you verify the logic, not just trust the number",
              "If a column's meaning is ambiguous, tell the model explicitly what it represents — guessing wrong here silently poisons every downstream analysis",
            ],
          },
          {
            slug: "asking-good-analysis-questions",
            title: "Asking Questions That Produce Checkable Answers",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Vague: 'what's interesting in this data?' — Specific: 'what are the top 5 categories by total revenue, and what percent of total revenue does each represent?'",
              "Ask for the answer AND the method — 'show me the groupby/aggregation you used' — so you can spot a wrong assumption before it becomes a wrong conclusion",
              "For anything you'll present or publish, re-run the key numbers yourself (or ask for the underlying calculation spelled out) rather than trusting a single generated chart caption",
            ],
            code: {
              language: "text",
              code: "Using the uploaded CSV, calculate total revenue by product category for Q1 only. Show the pandas code you used, and list the top 5 categories with revenue and percent-of-total. Flag any rows with missing or negative revenue values before calculating.",
            },
          },
        ],
      },
      {
        slug: "verifying-ai-analysis",
        title: "Verifying AI-Generated Analysis",
        description:
          "The habits that keep AI-assisted analysis from quietly becoming wrong analysis.",
        lessons: [
          {
            slug: "spotting-analysis-errors",
            title: "Common Ways AI Analysis Goes Wrong",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Silent filtering: the model drops nulls or outliers without telling you, changing your denominator without your knowledge",
              "Wrong join or aggregation grain: double-counting or under-counting because a groupby was done at the wrong level of detail",
              "Chart mismatches the data: axis scales or labels that don't actually match the underlying numbers — always spot-check one or two data points by hand",
              "The fix for all three: ask to see the code, and re-run the calculation on a small known subset where you already know the right answer",
            ],
          },
          {
            slug: "chatgpt-analysis-terms",
            title: "ChatGPT Data Analysis Terms",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Data profiling",
                back: "A first-pass summary of a dataset's shape: row/column counts, types, and missing values.",
              },
              {
                front: "Aggregation grain",
                back: "The level of detail a summary is calculated at (e.g. per-order vs. per-customer) — getting this wrong causes silent double-counting.",
              },
              {
                front: "Code interpreter",
                back: "A ChatGPT feature that lets the model write and run code (e.g. Python/pandas) against uploaded files.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "dataset-analysis-writeup",
      title: "Analyze a Real Dataset and Write Up Findings",
      deliverables: [
        "A short analysis of a dataset of your choice (3-5 findings) produced with ChatGPT's data tools",
        "For each finding, the underlying code/method shown and one number independently spot-checked",
      ],
      rubric: [
        "Findings are specific and checkable, not vague observations",
        "At least one finding shows evidence of a verification step catching or confirming a number",
      ],
    },
    resources: [
      {
        title: "OpenAI Help Center — Data Analysis",
        type: "external-link",
        url: "https://help.openai.com",
        description: "Documentation for ChatGPT's file and data-analysis features.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the dataset analysis write-up"],
  },
  {
    slug: "claude-for-writers-and-researchers",
    title: "Claude for Writers and Researchers",
    subtitle:
      "Using Claude's long-context reasoning for careful writing, document analysis, and research synthesis.",
    category: "claude-ai",
    difficulty: "beginner",
    estimatedDurationMinutes: 105,
    tags: ["claude", "ai", "writing"],
    skills: ["claude-workflows", "prompt-engineering"],
    careerPaths: ["ai-practitioner"],
    instructor: {
      name: "Renata Silva",
      title: "Principal Engineer, ex-Datadog",
      avatarInitials: "RS",
    },
    objectives: [
      "Use Claude's long context window to work with entire documents at once",
      "Get more careful, nuanced writing feedback by asking for structured critique",
      "Use Claude for synthesizing multiple sources into a coherent summary",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "long-context-workflows",
        title: "Working with Long Documents",
        description: "What changes when you can hand over an entire document instead of a snippet.",
        lessons: [
          {
            slug: "why-long-context-matters",
            title: "Why a Large Context Window Changes What's Possible",
            kind: "reading",
            durationMinutes: 14,
            free: true,
            points: [
              "A large context window means you can paste an entire report, contract, or paper in at once — the model reasons over the whole thing rather than a fragment",
              "This makes cross-referencing possible: 'does section 4 contradict what was said in section 1?' is a genuinely useful question only when the model can see both at once",
              "Long-context tasks still benefit from a clear ask at the end — dumping a huge document with no specific question produces a vague, unfocused reply",
            ],
          },
          {
            slug: "structured-writing-feedback",
            title: "Getting Structured Writing Feedback",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Ask for feedback in specific categories — clarity, structure, tone, and factual claims to double-check — rather than an open-ended 'what do you think?'",
              "Ask Claude to quote the specific sentence it's commenting on, so feedback is traceable back to the actual text, not a vague paraphrase",
              "For a second pass, ask it to argue the opposite position on your strongest claim — this surfaces weak spots in your reasoning before a real reader does",
            ],
          },
        ],
      },
      {
        slug: "research-synthesis",
        title: "Research Synthesis",
        description: "Turning several sources into one coherent, honest summary.",
        lessons: [
          {
            slug: "synthesizing-sources",
            title: "Synthesizing Multiple Sources Without Losing Nuance",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Paste in each source clearly labeled, and explicitly ask Claude to note where sources agree, disagree, or one contradicts another — don't let it flatten disagreement into a false consensus",
              "Ask for the synthesis to cite which source each claim came from — this keeps you able to trace back and verify, and stops confident-sounding claims from becoming unattributed 'facts'",
              "Treat the synthesis as a first draft of your understanding, not a finished citation-ready document — always verify quotes against the original text",
            ],
          },
          {
            slug: "claude-glossary",
            title: "Claude Workflow Glossary",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Context window",
                back: "The total amount of text (input plus generated output) a model can process in one exchange.",
              },
              {
                front: "Source attribution",
                back: "Explicitly tracing which claim in a summary came from which original source.",
              },
              {
                front: "Steelmanning",
                back: "Asking a model to argue the strongest possible version of an opposing view, to pressure-test your own reasoning.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "research-synthesis-brief",
      title: "Synthesize 3 Sources into a One-Page Brief",
      deliverables: [
        "A one-page brief synthesizing 3 real sources on a topic of your choice, with claims attributed to sources",
        "One paragraph noting where the sources disagreed, and how you resolved or flagged it",
      ],
      rubric: [
        "Every non-obvious claim in the brief is traceable to a specific source",
        "Disagreement between sources is surfaced honestly, not smoothed over",
      ],
    },
    resources: [
      {
        title: "Claude Docs",
        type: "external-link",
        url: "https://docs.claude.com",
        description: "Official documentation for Claude.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the research synthesis brief"],
  },
  {
    slug: "building-with-claude-tool-use-and-agents",
    title: "Building with Claude: Tool Use and Agents",
    subtitle:
      "How to give Claude access to tools and build simple agentic workflows that take real actions, not just generate text.",
    category: "claude-ai",
    difficulty: "advanced",
    estimatedDurationMinutes: 140,
    tags: ["claude", "ai", "developer-tools"],
    skills: ["ai-agents", "llm-integration"],
    careerPaths: ["ai-practitioner", "software-engineer"],
    instructor: {
      name: "Renata Silva",
      title: "Principal Engineer, ex-Datadog",
      avatarInitials: "RS",
    },
    objectives: [
      "Explain how tool use (function calling) lets a model take real actions",
      "Design a tool interface a model can use reliably",
      "Recognize the failure modes specific to agentic loops (looping, over-calling, silent tool errors)",
    ],
    prerequisites: [{ courseSlug: "claude-for-writers-and-researchers" }],
    modules: [
      {
        slug: "tool-use-fundamentals",
        title: "Tool Use Fundamentals",
        description: "How a model goes from 'generating text' to 'taking an action'.",
        lessons: [
          {
            slug: "how-tool-use-works",
            title: "How Tool Use Actually Works",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "You describe available tools (name, description, input schema) to the model; the model decides when to call one and with what arguments, based on the conversation",
              "The model doesn't execute the tool itself — your code receives the tool call request, runs it, and sends the result back for the model to continue reasoning with",
              "Good tool descriptions matter as much as good prompts — an ambiguous tool description leads to the model calling the wrong tool or passing malformed arguments",
              "Tool use turns a chat model into the reasoning layer of a larger system — the reliability of the whole system depends on the tools around it, not just the model",
            ],
          },
          {
            slug: "designing-a-tool-interface",
            title: "Designing a Tool Interface a Model Can Use Reliably",
            kind: "code",
            durationMinutes: 19,
            points: [
              "Keep each tool narrowly scoped to one clear job — a tool that does 'search OR create OR delete' based on a flag is far more error-prone than three separate tools",
              "Write the tool's description the way you'd explain it to a new engineer who's never seen your codebase — assume no shared context",
              "Return clear, structured error messages from tools on failure, not silent nulls — the model can only recover gracefully if it knows something went wrong",
            ],
            code: {
              language: "json",
              code: '{\n  "name": "search_orders",\n  "description": "Search customer orders by email or order ID. Returns up to 10 matching orders with status and total.",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "query": { "type": "string", "description": "Customer email or order ID" }\n    },\n    "required": ["query"]\n  }\n}',
            },
          },
        ],
      },
      {
        slug: "agentic-workflows",
        title: "Agentic Workflows and Their Failure Modes",
        description:
          "Chaining tool calls into a loop — and knowing exactly how that loop can go wrong.",
        lessons: [
          {
            slug: "agent-loops",
            title: "The Agent Loop and Where It Breaks",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "An agentic loop repeats: model reasons → calls a tool → gets a result → reasons again → calls another tool, until it decides the task is done",
              "Failure mode 1: infinite or excessive looping — the model keeps calling tools without converging, usually from an underspecified 'done' condition",
              "Failure mode 2: over-calling — using a tool when reasoning alone would've sufficed, wasting time and cost",
              "Failure mode 3: silently ignoring a tool error and proceeding with a hallucinated result instead of surfacing the failure",
              "Mitigation: set explicit step limits, require the model to state its plan before executing, and always surface tool errors back into the model's context rather than swallowing them",
            ],
          },
          {
            slug: "agent-case-study",
            title: "Case Study: An Agent That Wouldn't Stop Calling a Tool",
            kind: "case-study",
            durationMinutes: 17,
            points: [
              "A support-automation agent was given a 'search_knowledge_base' tool with no limit on how many times it could call it per conversation",
              "On ambiguous questions, the agent would search, get a mediocre result, then search again with a slightly reworded query — sometimes 20+ times in a row",
              "This inflated API costs significantly and made response times unacceptable for a chat interface",
              "Root cause: no step budget and no instruction for what to do when search results were 'good enough but not perfect'",
              "Fix: added a hard 3-call limit per turn, and an explicit instruction to answer with the best available result after the limit rather than looping indefinitely",
            ],
          },
          {
            slug: "agent-terms",
            title: "Agent & Tool-Use Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Tool use / function calling",
                back: "A model feature where the model can request that your code execute a defined function and return the result.",
              },
              {
                front: "Agent loop",
                back: "A cycle of the model reasoning, calling a tool, receiving a result, and reasoning again until a task is complete.",
              },
              {
                front: "Step budget",
                back: "A hard limit on how many tool calls or reasoning steps an agent can take before being forced to conclude.",
              },
              {
                front: "Tool schema",
                back: "The formal description (name, purpose, input parameters) of a tool that a model uses to decide when and how to call it.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "simple-tool-using-agent",
      title: "Build a Simple Tool-Using Agent",
      deliverables: [
        "One working tool (e.g. a calculator, a mock lookup function) with a clear schema and description",
        "An agent loop that uses the tool to answer at least 3 different sample questions",
        "A step-budget and error-handling strategy, documented and demonstrated",
      ],
      rubric: [
        "The tool schema is unambiguous and the agent calls it correctly across all 3 sample questions",
        "The step budget and error handling are actually exercised (e.g. by a deliberately failing test case), not just described",
      ],
    },
    resources: [
      {
        title: "Claude Tool Use Documentation",
        type: "external-link",
        url: "https://docs.claude.com/en/docs/build-with-claude/tool-use",
        description: "Official documentation for building tool-using agents with Claude.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit a working tool-using agent"],
  },
  {
    slug: "microsoft-copilot-in-excel-and-word",
    title: "Microsoft Copilot in Excel and Word",
    subtitle:
      "Using Copilot inside the Microsoft 365 apps you already use daily to draft faster and analyze spreadsheets without writing formulas from scratch.",
    category: "microsoft-copilot",
    difficulty: "beginner",
    estimatedDurationMinutes: 95,
    tags: ["copilot", "ai", "spreadsheets", "excel"],
    skills: ["copilot-workflows", "excel-formulas"],
    careerPaths: ["ai-practitioner"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Use Copilot in Word to draft and revise documents faster",
      "Use Copilot in Excel to generate formulas and summarize data in plain English",
      "Know which Copilot suggestions to trust directly and which to double-check",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "copilot-in-word",
        title: "Copilot in Word",
        description: "From blank page to first draft, faster.",
        lessons: [
          {
            slug: "drafting-in-word",
            title: "Drafting and Rewriting in Word",
            kind: "reading",
            durationMinutes: 13,
            free: true,
            points: [
              "Copilot can draft from a short prompt referencing other documents in your organization (when connected) — this is different from a standalone chat tool since it can pull real context",
              "Use the rewrite feature on a paragraph at a time rather than the whole document — targeted rewrites are easier to evaluate and keep",
              "Always review Copilot's draft for your organization's actual facts and numbers — it will write fluently even when it's guessing at specifics",
            ],
          },
          {
            slug: "copilot-review-features",
            title: "Using Copilot for Review and Feedback",
            kind: "reading",
            durationMinutes: 12,
            points: [
              "Ask Copilot to summarize a long document's key points before a meeting — faster than skimming, but verify against the source for anything you'll act on",
              "Use it to check tone consistency across a long document written over multiple sittings",
              "It can flag missing sections against a template, which is a genuinely reliable, low-risk use case",
            ],
          },
        ],
      },
      {
        slug: "copilot-in-excel",
        title: "Copilot in Excel",
        description: "Getting formula help and plain-English data summaries.",
        lessons: [
          {
            slug: "formula-generation",
            title: "Generating Formulas from Plain English",
            kind: "code",
            durationMinutes: 16,
            points: [
              "Describe what you want in plain language ('sum column C where column A is 2024 and column B is Marketing') and Copilot generates the formula",
              "Always check the generated formula's cell references match your actual layout before applying it broadly — a wrong reference can silently propagate",
              "For anything unfamiliar the formula uses, ask Copilot to explain it in plain English — this builds your own formula literacy over time instead of creating a black box",
            ],
            code: {
              language: "text",
              code: 'Prompt: "Write a formula that sums Column D where Column A = \'Q1\' and Column B = \'Marketing\', ignoring blank rows."\nGenerated: =SUMIFS(D:D, A:A, "Q1", B:B, "Marketing")',
            },
          },
          {
            slug: "copilot-excel-glossary",
            title: "Copilot in Excel Glossary",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "SUMIFS",
                back: "An Excel function that sums values matching multiple criteria across different columns.",
              },
              {
                front: "Copilot grounding",
                back: "When Copilot draws on your organization's actual documents/data rather than general knowledge alone.",
              },
              {
                front: "Cell reference",
                back: "The address (e.g. A1, D:D) that tells a formula which cells to use — a common source of silent errors when copied incorrectly.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "copilot-productivity-pack",
      title: "Build a Copilot-Assisted Document + Spreadsheet Pair",
      deliverables: [
        "One Word document drafted and revised with Copilot, with a note on what you changed after review",
        "One Excel formula generated via Copilot, verified against a manually calculated check value",
      ],
      rubric: [
        "The document shows evidence of a real review pass, not an unedited AI draft",
        "The formula's output is confirmed correct against an independent manual check",
      ],
    },
    resources: [
      {
        title: "Microsoft Copilot Documentation",
        type: "external-link",
        url: "https://support.microsoft.com/copilot",
        description: "Official Microsoft Copilot help and documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the Copilot productivity pack"],
  },
  {
    slug: "microsoft-copilot-for-developers",
    title: "Microsoft Copilot for Developers",
    subtitle:
      "Using GitHub Copilot effectively in your editor — for real code, not just autocomplete you have to fight with.",
    category: "microsoft-copilot",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["copilot", "ai", "developer-tools"],
    skills: ["copilot-workflows", "code-review", "ai-assisted-development"],
    careerPaths: ["ai-practitioner", "software-engineer"],
    instructor: { name: "Theo Marsh", title: "Staff Engineer, ex-Vercel", avatarInitials: "TM" },
    objectives: [
      "Write comments and function signatures that steer Copilot toward correct completions",
      "Review Copilot-generated code with the same rigor as a human PR",
      "Use Copilot Chat for explaining unfamiliar code and generating tests",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "steering-completions",
        title: "Steering Copilot's Completions",
        description: "Getting useful suggestions instead of fighting autocomplete.",
        lessons: [
          {
            slug: "writing-steerable-code",
            title: "Writing Code That Steers Copilot Well",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "A specific function name and a one-line comment describing intent produces far better completions than an empty function body",
              "Existing code in the file is context — Copilot pattern-matches on your project's existing style, so a messy file produces messier suggestions",
              "If the first suggestion is close but not right, keep typing your own correction rather than cycling endlessly through alternates — this often steers the next suggestion better than re-rolling",
            ],
          },
          {
            slug: "reviewing-generated-code",
            title: "Reviewing Copilot-Generated Code Like a Real PR",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Accepted-but-unread code is the single biggest risk of AI pair programming — read every suggestion before accepting, especially for logic you didn't already have in mind",
              "Check edge cases explicitly: empty inputs, off-by-one boundaries, and error handling are the most common gaps in generated code",
              "Run the actual test suite, don't just eyeball it — generated code that 'looks right' fails at the same rate as human code that 'looks right' without tests",
            ],
            code: {
              language: "javascript",
              code: "// Copilot suggestion — looks reasonable, but check the edge case:\nfunction average(nums) {\n  return nums.reduce((a, b) => a + b, 0) / nums.length;\n}\n// What happens when nums is an empty array? NaN, silently — worth an explicit guard.",
            },
          },
        ],
      },
      {
        slug: "copilot-chat-workflows",
        title: "Copilot Chat Workflows",
        description: "Beyond autocomplete: explaining, refactoring, and testing.",
        lessons: [
          {
            slug: "explaining-and-testing",
            title: "Explaining Unfamiliar Code and Generating Tests",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Ask Copilot Chat to explain an unfamiliar function before you modify it — faster than tracing through it manually, especially in an unfamiliar codebase",
              "Ask for tests covering edge cases explicitly, not just the happy path — a generic 'write tests for this' prompt tends to skip the interesting failure cases",
              "Treat generated tests as a starting draft — verify they actually fail when the code is broken, not just that they pass once against working code",
            ],
          },
          {
            slug: "copilot-dev-glossary",
            title: "Copilot for Developers Glossary",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Ghost text",
                back: "Copilot's inline gray-text suggestion shown before you accept it.",
              },
              {
                front: "Copilot Chat",
                back: "A conversational interface for asking questions about code, distinct from inline autocomplete.",
              },
              {
                front: "Happy path",
                back: "The expected, error-free flow through a piece of code — tests that only cover this miss real bugs.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "copilot-reviewed-feature",
      title: "Ship a Small Feature Using Copilot, With a Real Review Pass",
      deliverables: [
        "A small function or feature written with Copilot's help",
        "A written review noting at least 2 things you changed or rejected from its first suggestion, and why",
        "A test suite (Copilot-assisted is fine) covering at least one edge case",
      ],
      rubric: [
        "The review notes show genuine critical evaluation, not rubber-stamping",
        "At least one test actually exercises an edge case, not just the happy path",
      ],
    },
    resources: [
      {
        title: "GitHub Copilot Documentation",
        type: "external-link",
        url: "https://docs.github.com/copilot",
        description: "Official GitHub Copilot documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the reviewed feature + tests"],
  },
  {
    slug: "retrieval-augmented-generation-fundamentals",
    title: "Retrieval-Augmented Generation Fundamentals",
    subtitle:
      "How RAG grounds LLM output in your own documents, and the design decisions that determine whether it actually works.",
    category: "generative-ai",
    difficulty: "advanced",
    estimatedDurationMinutes: 140,
    tags: ["ai", "generative-ai", "llm"],
    skills: ["retrieval-augmented-generation", "llm-integration"],
    careerPaths: ["ai-practitioner", "ai-engineer"],
    instructor: {
      name: "Dr. Maya Chen",
      title: "AI Research Lead, ex-DeepMind",
      avatarInitials: "MC",
    },
    objectives: [
      "Explain why RAG reduces hallucination for domain-specific questions",
      "Design a chunking and retrieval strategy for a real document set",
      "Diagnose the most common causes of poor RAG answer quality",
    ],
    prerequisites: [{ courseSlug: "generative-ai-foundations" }],
    modules: [
      {
        slug: "rag-fundamentals",
        title: "Why and How RAG Works",
        description: "Grounding generation in retrieved, verifiable source text.",
        lessons: [
          {
            slug: "why-rag",
            title: "Why Retrieval Beats Relying on Model Memory Alone",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A base LLM's 'knowledge' is frozen at training time and has no access to your private documents — RAG retrieves relevant passages at query time and includes them in the prompt as grounding",
              "This directly reduces hallucination on domain-specific questions, because the model is answering from text it can literally see, not from a fuzzy memory of similar-sounding training data",
              "RAG also makes answers auditable — you can show which source passage a claim came from, which a base model alone cannot do",
              "RAG doesn't eliminate hallucination entirely — the model can still misread or overgeneralize from the retrieved passages, especially if retrieval returns weak or irrelevant matches",
            ],
          },
          {
            slug: "the-rag-pipeline",
            title: "The RAG Pipeline: Chunk, Embed, Retrieve, Generate",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "Chunking: documents are split into smaller passages — chunk size is a real design decision; too small loses context, too large dilutes relevance and wastes context window",
              "Embedding: each chunk is converted into a vector representation capturing its semantic meaning, stored in a vector database for similarity search",
              "Retrieval: the user's query is embedded the same way, and the most similar chunks (by vector distance) are pulled back",
              "Generation: retrieved chunks are inserted into the prompt as context, and the model generates an answer grounded in them",
            ],
          },
        ],
      },
      {
        slug: "designing-good-rag",
        title: "Designing RAG That Actually Works Well",
        description: "The decisions that separate a demo from something reliable in production.",
        lessons: [
          {
            slug: "chunking-strategy",
            title: "Chunking Strategy in Practice",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Chunk by semantic boundary (paragraph, section) rather than a fixed character count when possible — arbitrary cuts mid-sentence hurt retrieval quality",
              "Overlapping chunks (e.g. 10-20% overlap between consecutive chunks) reduce the risk of splitting a key fact exactly at a chunk boundary",
              "Store metadata with each chunk (source document, section title, date) so retrieved answers can cite exactly where they came from",
            ],
            code: {
              language: "text",
              code: 'Example chunking config for a policy-document RAG system:\nchunk_size: 500 tokens\nchunk_overlap: 75 tokens\nsplit_on: ["\\n\\n", ". "]  # prefer paragraph, fall back to sentence\nmetadata: { source_doc, section_title, last_updated }',
            },
          },
          {
            slug: "diagnosing-poor-rag",
            title: "Case Study: Diagnosing Why a RAG System Gave Wrong Answers",
            kind: "case-study",
            durationMinutes: 17,
            points: [
              "A team's internal-docs assistant gave confidently wrong answers to a small but noticeable percentage of questions about their refund policy",
              "Investigation showed retrieval was returning the correct document but the wrong section — the policy document had multiple similarly-worded sections (domestic vs. international refunds) and retrieval couldn't distinguish them well",
              "Root cause: chunks lacked section-title metadata in the embedded text itself, so semantically similar-but-wrong chunks scored almost as high as the right one",
              "Fix: prepending section titles to each chunk before embedding sharpened retrieval significantly, and adding a 'cite your source section' instruction let the team catch remaining errors faster",
            ],
          },
          {
            slug: "rag-terms",
            title: "RAG Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Chunking",
                back: "Splitting source documents into smaller passages for embedding and retrieval.",
              },
              {
                front: "Embedding",
                back: "A numeric vector representation of text capturing its semantic meaning, used for similarity search.",
              },
              {
                front: "Vector database",
                back: "A database optimized for storing embeddings and performing fast similarity search.",
              },
              {
                front: "Grounding",
                back: "Constraining a model's answer to information present in retrieved source text, reducing hallucination.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "rag-design-doc",
      title: "Design a RAG System for a Real Document Set",
      deliverables: [
        "A design doc for a RAG system over a document set of your choice: chunking strategy, metadata plan, and retrieval approach",
        "3 example queries with the chunks you'd expect to be retrieved for each, and why",
      ],
      rubric: [
        "The chunking strategy is justified by the actual structure of the chosen documents, not a generic default",
        "Example queries show realistic reasoning about what would and wouldn't retrieve well",
      ],
    },
    resources: [
      {
        title: "Anthropic: Contextual Retrieval",
        type: "external-link",
        url: "https://www.anthropic.com/news/contextual-retrieval",
        description: "A technique for improving RAG retrieval accuracy.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the RAG design doc"],
  },
  {
    slug: "ai-agents-and-automation-fundamentals",
    title: "AI Agents and Automation Fundamentals",
    subtitle:
      "Designing multi-step AI-driven automations that are reliable enough to run unattended, and knowing where human review still belongs.",
    category: "generative-ai",
    difficulty: "advanced",
    estimatedDurationMinutes: 135,
    tags: ["ai", "generative-ai", "workflow"],
    skills: ["ai-agents", "llm-integration"],
    careerPaths: ["ai-practitioner", "ai-engineer"],
    instructor: {
      name: "Dr. Maya Chen",
      title: "AI Research Lead, ex-DeepMind",
      avatarInitials: "MC",
    },
    objectives: [
      "Distinguish a simple automation from a genuine agent with autonomous decision-making",
      "Design checkpoints where human review is required before an agent takes an irreversible action",
      "Build a basic multi-step automation with explicit success/failure conditions",
    ],
    prerequisites: [{ courseSlug: "retrieval-augmented-generation-fundamentals" }],
    modules: [
      {
        slug: "agents-vs-automation",
        title: "Agents vs. Simple Automation",
        description:
          "Not every AI-driven workflow is an 'agent' — knowing the difference shapes how much autonomy is safe to grant.",
        lessons: [
          {
            slug: "what-makes-something-an-agent",
            title: "What Actually Makes Something an Agent",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "A fixed pipeline (step 1 always leads to step 2) is automation, not an agent — no decision-making happens about what to do next",
              "An agent makes decisions: given the current state, it chooses which tool to use next, and can adapt its plan based on intermediate results",
              "More autonomy means more ways to fail unpredictably — the right amount of agency is task-dependent, not 'as much as possible'",
              "A good default: start with the least autonomous version that solves the problem, and only add agentic decision-making where a fixed pipeline genuinely can't handle the variability",
            ],
          },
          {
            slug: "human-in-the-loop-checkpoints",
            title: "Designing Human-in-the-Loop Checkpoints",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Any irreversible action (sending an email, charging a card, deleting data) should have a human-approval checkpoint before execution, at least until the system has a long track record",
              "Design the checkpoint to show the human exactly what will happen and why, not just an approve/reject button with no context",
              "Log every agent decision and the reasoning behind it — this is what makes debugging a bad outcome possible after the fact",
            ],
          },
        ],
      },
      {
        slug: "building-reliable-automations",
        title: "Building Reliable Automations",
        description: "From a working demo to something you'd trust running unattended.",
        lessons: [
          {
            slug: "success-failure-conditions",
            title: "Defining Explicit Success and Failure Conditions",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Every automated step needs an explicit definition of 'done correctly' that can be checked programmatically, not just 'the model said it worked'",
              "Build in a timeout and a maximum-retry count for every step — an automation with no limits can silently hang or loop indefinitely",
              "On failure, fail loudly (alert, log, halt) rather than silently continuing with a partial or wrong result",
            ],
            code: {
              language: "text",
              code: 'Step: "Categorize and route incoming support ticket"\nSuccess condition: category is one of the 5 valid enum values AND confidence score >= 0.7\nFailure condition: anything else\nOn failure: route to human queue with a flag, do not auto-close the ticket',
            },
          },
          {
            slug: "automation-terms",
            title: "Agents & Automation Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Human-in-the-loop",
                back: "A design pattern where a human must approve an action before an automated system executes it.",
              },
              {
                front: "Idempotency",
                back: "A property where running an action multiple times has the same effect as running it once — critical for safe retries.",
              },
              {
                front: "Failure mode",
                back: "A specific, predictable way a system can go wrong, ideally identified and designed against in advance.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "multi-step-automation-design",
      title: "Design a Multi-Step Automation with Safety Checkpoints",
      deliverables: [
        "A design for a 3-4 step automation for a real task, with explicit success/failure conditions per step",
        "At least one human-approval checkpoint identified and justified",
        "A failure-handling plan: what happens when a step fails, times out, or hits its retry limit",
      ],
      rubric: [
        "Success/failure conditions are concrete and checkable, not vague",
        "The chosen checkpoint is genuinely the highest-risk step, not an arbitrary one",
      ],
    },
    resources: [
      {
        title: "Anthropic: Building Effective Agents",
        type: "external-link",
        url: "https://www.anthropic.com/research/building-effective-agents",
        description: "Guidance on agent design patterns and when to use them.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the automation design"],
  },
  {
    slug: "prompt-engineering-for-data-teams",
    title: "Prompt Engineering for Data Teams",
    subtitle:
      "Using LLMs inside analytics workflows — generating SQL, cleaning messy data descriptions, and documenting datasets faster.",
    category: "prompt-engineering",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["prompting", "ai", "data", "sql"],
    skills: ["prompt-engineering", "sql-fundamentals"],
    careerPaths: ["ai-practitioner", "data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Generate and verify SQL queries from natural-language questions",
      "Use LLMs to draft data dictionary entries and documentation from schemas",
      "Recognize when a generated query's logic is subtly wrong even if it runs without error",
    ],
    prerequisites: [{ courseSlug: "prompt-engineering-fundamentals" }],
    modules: [
      {
        slug: "generating-sql",
        title: "Generating and Verifying SQL",
        description: "Faster query drafting without trusting output blindly.",
        lessons: [
          {
            slug: "prompting-for-sql",
            title: "Prompting for Correct SQL, Not Just Runnable SQL",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Always include the actual table/column names and types in your prompt — a model guessing at your schema will produce plausible-looking but wrong SQL",
              "State the exact business logic explicitly ('active' means status = 'active' AND deleted_at IS NULL) — models will guess at undefined terms, often incorrectly",
              "Ask for the query to be explained back to you in plain English as a check — if the explanation doesn't match your intent, the query is wrong even if it runs",
            ],
          },
          {
            slug: "verifying-generated-queries",
            title: "Verifying a Generated Query's Logic",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A query that runs without error can still be logically wrong — wrong JOIN type, wrong aggregation grain, or an off-by-one date filter are the most common silent errors",
              "Test against a known small subset where you can manually verify the expected result before trusting it on the full dataset",
              "Watch specifically for accidental row duplication from JOINs — a common failure mode where a generated query looks right but silently inflates counts",
            ],
            code: {
              language: "sql",
              code: "-- Generated query — looks reasonable, but check the JOIN:\nSELECT c.customer_id, SUM(o.total)\nFROM customers c\nJOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id;\n-- If a customer has a refund row AND an order row with the same order_id\n-- due to a data quality issue, this could double-count. Verify against a known customer.",
            },
          },
        ],
      },
      {
        slug: "documenting-data",
        title: "Documenting Data Faster",
        description:
          "Turning tribal knowledge into written documentation without starting from a blank page.",
        lessons: [
          {
            slug: "generating-documentation",
            title: "Generating Data Dictionaries and Docs from a Schema",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Paste in a table schema and ask for a first-draft data dictionary (column name, inferred purpose, likely data quality caveats) — this is a strong starting point, not a finished artifact",
              "Have a human with real domain knowledge review and correct the inferred purposes — the model is guessing from naming conventions, not from ground truth",
              "Ask explicitly for the model to flag any column names it's unsure about, rather than confidently describing every column with equal certainty",
            ],
          },
          {
            slug: "data-prompting-terms",
            title: "Data Prompting Terms",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Aggregation grain",
                back: "The level of detail at which data is summarized — mismatched grain causes silent double-counting in JOINs.",
              },
              {
                front: "Data dictionary",
                back: "Documentation describing each column in a dataset: meaning, type, and known caveats.",
              },
              {
                front: "Schema grounding",
                back: "Providing a model with the actual table/column definitions so it doesn't guess at your data structure.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "sql-generation-verification-pack",
      title: "Generate and Verify 3 SQL Queries for a Real Question",
      deliverables: [
        "3 business questions translated into SQL with AI assistance, using an explicitly provided schema",
        "For each, a verification step showing the result checked against a manually calculated small subset",
      ],
      rubric: [
        "Each query's business logic matches the stated question exactly, not an approximation",
        "Verification is genuine — a real subset check, not just 'it ran without error'",
      ],
    },
    resources: [
      {
        title: "SQL Style Guide",
        type: "external-link",
        url: "https://www.sqlstyle.guide",
        description: "A widely used reference for writing clear, maintainable SQL.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the SQL generation + verification pack"],
  },
  // ---------------------------------------------------------------
  // Data Analyst path (8 of 12 — remaining 4 continue in batch 2)
  // ---------------------------------------------------------------
  {
    slug: "data-analytics-foundations",
    title: "Data Analytics Foundations",
    subtitle:
      "How to think like an analyst: framing questions, choosing the right metric, and telling honest stories with data before touching any tool.",
    category: "data-analytics",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["data", "analytics"],
    skills: ["data-cleaning", "data-storytelling"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Frame a business question as an answerable analytical question",
      "Distinguish correlation from causation in a real dataset",
      "Choose metrics that actually match the decision being made",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "thinking-like-an-analyst",
        title: "Thinking Like an Analyst",
        description: "The mental habits that matter more than any specific tool.",
        lessons: [
          {
            slug: "framing-the-question",
            title: "Framing a Vague Ask as an Answerable Question",
            kind: "reading",
            durationMinutes: 14,
            free: true,
            points: [
              '"Why are sales down?" isn\'t answerable directly — break it into checkable sub-questions: down vs. what baseline, for which segment, over what time window',
              "Ask what decision the answer will actually inform — this determines what level of precision and what timeframe actually matters",
              "Write down your assumptions before you start pulling data — this makes it possible to notice later when the data contradicts an assumption you didn't realize you'd made",
            ],
          },
          {
            slug: "correlation-vs-causation",
            title: "Correlation vs. Causation, in Practice",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Two metrics moving together doesn't mean one causes the other — both could be driven by a third factor (seasonality is the classic culprit)",
              "A simple check: does the proposed cause happen consistently before the effect, and does removing/changing it change the effect? If you can't check this, treat the relationship as a hypothesis, not a conclusion",
              "Watch for reverse causation — 'customers who contact support churn more' could mean support fails them, or it could mean unhappy customers who were already going to churn contact support more",
            ],
          },
        ],
      },
      {
        slug: "choosing-good-metrics",
        title: "Choosing Metrics That Match the Decision",
        description: "A well-chosen metric prevents more bad decisions than any dashboard.",
        lessons: [
          {
            slug: "metric-pitfalls",
            title: "Common Metric Pitfalls",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Vanity metrics (total signups) can rise while the metric that actually matters (active, paying users) falls — always ask what decision a metric is meant to drive",
              "Averages hide distribution — a rising average order value can mask a shrinking number of orders; check the underlying counts, not just the summary stat",
              "A metric that can be gamed will eventually be gamed, even unintentionally — pair headline metrics with a guardrail metric that would catch the obvious workaround",
            ],
          },
          {
            slug: "analytics-glossary",
            title: "Analytics Glossary",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Vanity metric",
                back: "A metric that looks good and is easy to move, but doesn't reliably indicate real business health.",
              },
              {
                front: "Guardrail metric",
                back: "A secondary metric tracked alongside a primary one to catch unintended negative side effects.",
              },
              {
                front: "Confounding variable",
                back: "A third factor that influences both variables in an observed correlation, creating a misleading appearance of causation.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "metric-framing-brief",
      title: "Frame and Answer a Real Analytical Question",
      deliverables: [
        "A vague business question reframed into 2-3 specific, answerable sub-questions",
        "A chosen primary metric and guardrail metric, with reasoning for each",
      ],
      rubric: [
        "The reframed sub-questions are genuinely more specific and checkable than the original",
        "The guardrail metric would plausibly catch a real unintended consequence of optimizing the primary metric",
      ],
    },
    resources: [
      {
        title: "Google's Data Analytics Certificate Overview",
        type: "external-link",
        url: "https://grow.google/certificates/data-analytics/",
        description: "A broader reference on the data analytics field.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the metric framing brief"],
  },
  {
    slug: "excel-for-data-analysis",
    title: "Excel for Data Analysis",
    subtitle:
      "Core Excel skills for real analysis work — cleaning messy data, pivot tables, and formulas that don't silently break when the data changes.",
    category: "excel",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: ["spreadsheets", "excel", "data"],
    skills: ["excel-formulas", "pivot-tables"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Clean and structure messy spreadsheet data for analysis",
      "Build pivot tables that answer real questions, not just show totals",
      "Use lookup formulas (VLOOKUP/XLOOKUP) reliably",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "cleaning-data-in-excel",
        title: "Cleaning Data in Excel",
        description: "Most analysis time goes here — worth doing properly.",
        lessons: [
          {
            slug: "structuring-for-analysis",
            title: "Structuring a Spreadsheet for Analysis, Not Just Display",
            kind: "reading",
            durationMinutes: 14,
            free: true,
            points: [
              "One row per record, one column per variable — merged cells and multi-row headers look nice but break every formula and pivot table built on top of them",
              "Keep raw data and calculated/summary views in separate sheets — editing raw data directly under a formula is how analyses silently corrupt over time",
              "Use consistent data types per column (all dates as dates, not some as text) — Excel treats a text '01/15/2024' very differently from an actual date value",
            ],
          },
          {
            slug: "common-cleaning-tasks",
            title: "Common Cleaning Tasks: Duplicates, Blanks, and Inconsistent Text",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Use TRIM and CLEAN to strip stray whitespace and non-printing characters that make 'identical-looking' text values fail to match",
              "Use Remove Duplicates carefully — first sort and eyeball a sample, since 'duplicate' by all columns can miss near-duplicates from formatting differences",
              "Use Data Validation to catch inconsistent category text at entry time, rather than cleaning it up after the fact repeatedly",
            ],
            code: {
              language: "text",
              code: '=TRIM(CLEAN(A2))   // strips leading/trailing spaces and non-printing characters\n=IF(COUNTIF($A$2:A2,A2)>1,"duplicate","unique")   // flags duplicates as you scan down',
            },
          },
        ],
      },
      {
        slug: "pivot-tables-and-lookups",
        title: "Pivot Tables and Lookup Formulas",
        description: "The two skills that unlock most real analysis work in Excel.",
        lessons: [
          {
            slug: "pivot-tables-that-answer-questions",
            title: "Building Pivot Tables That Answer a Specific Question",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Start from the question, not the data — decide what you're grouping by (rows) and what you're measuring (values) before opening the Pivot Table dialog",
              "Use Value Field Settings to switch from Sum to Average or Count as appropriate — the default Sum is wrong more often than people assume",
              "Add a second row-grouping level (e.g. region within category) to check whether an aggregate trend holds across every subgroup, or is driven by just one",
            ],
            code: {
              language: "text",
              code: 'Question: "Which region had the highest average order value in Q1?"\nPivot setup: Rows = Region, Values = Order Value (set to Average), Filter = Quarter = Q1',
            },
          },
          {
            slug: "vlookup-and-xlookup",
            title: "VLOOKUP and XLOOKUP",
            kind: "code",
            durationMinutes: 17,
            points: [
              "VLOOKUP only searches left-to-right and breaks if columns are inserted — XLOOKUP is more flexible and is the better default in modern Excel",
              "Always use an exact match (the 4th argument FALSE in VLOOKUP, or XLOOKUP's default) unless you specifically intend an approximate match — approximate match is the most common silent-wrong-answer bug",
              "Wrap lookups in IFERROR to handle 'not found' cases explicitly instead of showing a raw #N/A error to end users",
            ],
            code: {
              language: "text",
              code: '=XLOOKUP(A2, ProductTable[SKU], ProductTable[Price], "Not found")\n// Exact match by default, clear fallback if the SKU isn\'t found',
            },
          },
          {
            slug: "excel-glossary",
            title: "Excel Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Pivot table",
                back: "An Excel tool that summarizes and aggregates data by grouping rows and columns interactively.",
              },
              {
                front: "XLOOKUP",
                back: "A modern Excel lookup function that searches a range and returns a matching value, replacing most VLOOKUP use cases.",
              },
              {
                front: "Data validation",
                back: "An Excel feature restricting what values can be entered into a cell, reducing inconsistent data entry.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "messy-data-cleanup",
      title: "Clean and Analyze a Messy Spreadsheet",
      deliverables: [
        "A messy dataset of your choice, cleaned (deduplicated, consistent types, validated) with the before/after documented",
        "One pivot table and one XLOOKUP-based formula answering a real question about the cleaned data",
      ],
      rubric: [
        "Cleaning steps are documented clearly enough that someone else could repeat them",
        "The pivot table and lookup genuinely answer a stated question, not just demonstrate the feature",
      ],
    },
    resources: [
      {
        title: "Microsoft Excel Function Reference",
        type: "external-link",
        url: "https://support.microsoft.com/en-us/office/excel-functions-by-category-5f91f4e9-7b42-46d2-9bd1-63f26a86c0eb",
        description: "Official reference for all Excel functions.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cleaned dataset + analysis"],
  },
  {
    slug: "advanced-excel-formulas-and-automation",
    title: "Advanced Excel Formulas and Automation",
    subtitle:
      "Array formulas, dynamic ranges, and basic macro automation for analysts who've outgrown simple spreadsheets.",
    category: "excel",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["spreadsheets", "excel", "data"],
    skills: ["excel-formulas", "excel-automation"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Use dynamic array formulas (FILTER, SORT, UNIQUE) to build self-updating analyses",
      "Combine multiple functions to solve multi-step logic problems in one formula",
      "Record and adapt a basic macro to automate a repeated task",
    ],
    prerequisites: [{ courseSlug: "excel-for-data-analysis" }],
    modules: [
      {
        slug: "dynamic-array-formulas",
        title: "Dynamic Array Formulas",
        description: "Formulas that spill and update automatically as data changes.",
        lessons: [
          {
            slug: "filter-sort-unique",
            title: "FILTER, SORT, and UNIQUE",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "FILTER returns only rows matching a condition, and 'spills' into as many cells as needed — no more manually copying formulas down as data grows",
              "Combine FILTER with SORT to get, for example, the top 10 by revenue, automatically updating as the source data changes",
              "UNIQUE extracts distinct values from a range — useful for building a clean list of categories without manual deduplication",
            ],
            code: {
              language: "text",
              code: "=SORT(FILTER(A2:C1000, C2:C1000>1000), 3, -1)\n// Returns all rows where column C > 1000, sorted descending by that same column",
            },
          },
          {
            slug: "nested-logic-formulas",
            title: "Combining Functions for Multi-Step Logic",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Break a complex requirement into steps first, then combine — trying to write a 5-condition nested formula in one pass is how errors creep in",
              "IFS is cleaner than nested IF statements for multiple conditions, and easier for someone else to read and debug later",
              "Name your ranges (Formulas > Define Name) for formulas that will be read by others — SUM(Revenue) is far more maintainable than SUM(C2:C847)",
            ],
            code: {
              language: "text",
              code: '=IFS(D2>=90,"A", D2>=80,"B", D2>=70,"C", TRUE,"F")\n// Cleaner than nested IF() for grading-style multi-tier logic',
            },
          },
        ],
      },
      {
        slug: "automating-with-macros",
        title: "Automating Repeated Tasks",
        description: "When a task repeats weekly, it's worth automating once.",
        lessons: [
          {
            slug: "recording-a-macro",
            title: "Recording and Adapting a Basic Macro",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "The macro recorder captures your exact clicks as VBA code — record a repeated cleanup/formatting task once, then reuse it with one click",
              "Recorded macros are often brittle (hardcoded cell ranges) — open the recorded code and generalize obvious hardcoded ranges before relying on it long-term",
              "Always test a new macro on a copy of your data first — an automated action that goes wrong can go wrong very fast across an entire sheet",
            ],
          },
          {
            slug: "automation-glossary",
            title: "Excel Automation Terms",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Dynamic array formula",
                back: "A formula (like FILTER or SORT) that automatically 'spills' results into multiple cells and updates as source data changes.",
              },
              {
                front: "Named range",
                back: "A human-readable name assigned to a cell range, used in formulas instead of raw cell references.",
              },
              {
                front: "VBA",
                back: "Visual Basic for Applications — the programming language behind Excel macros.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "self-updating-report",
      title: "Build a Self-Updating Report with Dynamic Formulas",
      deliverables: [
        "A report using at least one dynamic array formula (FILTER/SORT/UNIQUE) that updates automatically as source data changes",
        "One recorded and generalized macro automating a repeated formatting or cleanup step",
      ],
      rubric: [
        "The dynamic formula genuinely updates correctly when test data is added or changed",
        "The macro runs successfully on a fresh copy of the data, not just the original recording session",
      ],
    },
    resources: [
      {
        title: "Microsoft: Dynamic Array Formulas",
        type: "external-link",
        url: "https://support.microsoft.com/en-us/office/dynamic-array-formulas-and-spilled-array-behavior-205c6b06-03ba-4151-89a1-87a7eb36e531",
        description: "Official reference on dynamic arrays in Excel.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the self-updating report"],
  },
  {
    slug: "power-bi-fundamentals",
    title: "Power BI Fundamentals",
    subtitle:
      "Connecting to real data sources and building your first genuinely useful dashboard in Power BI, not just a chart gallery.",
    category: "power-bi",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["dashboards", "data", "analytics"],
    skills: ["dashboard-design", "power-bi-modeling"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Connect Power BI to a data source and shape it with Power Query",
      "Build visuals that answer a specific question, not just display data",
      "Structure a dashboard around a clear narrative, not a wall of charts",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "getting-data-in",
        title: "Getting Data In and Shaped Correctly",
        description:
          "Good dashboards start with good data preparation, not with picking a chart type.",
        lessons: [
          {
            slug: "connecting-and-shaping-data",
            title: "Connecting to Data and Shaping It with Power Query",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "Power Query is where you clean and reshape data before it hits the report — fixing types, removing unneeded columns, and unpivoting wide tables into long format",
              "Every transformation step is recorded and re-runs automatically on refresh — this is what makes Power BI reports stay correct as new data arrives, unlike a one-off manual cleanup",
              "Unpivoting is the most common fix needed for real-world exported data — wide tables (one column per month) need to become long tables (one row per month) for most visuals and calculations to work correctly",
            ],
          },
          {
            slug: "data-model-basics",
            title: "Data Model Basics: Relationships Between Tables",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Power BI works best with multiple related tables (a star schema) rather than one giant flat table — this keeps the model efficient and calculations correct",
              "Relationships connect tables via a shared key column (e.g. product ID) — get the relationship direction and cardinality (one-to-many vs. many-to-many) right, or totals will silently miscalculate",
              "A dedicated date table, related to your fact table, is the standard foundation for any time-based analysis (month-over-month, year-over-year)",
            ],
          },
        ],
      },
      {
        slug: "building-useful-visuals",
        title: "Building Visuals That Answer Questions",
        description:
          "Choosing the right chart for the question, and arranging a dashboard that tells a story.",
        lessons: [
          {
            slug: "choosing-the-right-visual",
            title: "Choosing the Right Visual for the Question",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Trend over time → line chart. Comparison across categories → bar chart. Part-to-whole → stacked bar or a small number of slices, rarely a pie chart with more than 4-5 categories",
              "Every visual should have a one-sentence answer it's designed to give at a glance — if you can't state that sentence, the visual probably needs rethinking",
              "Use consistent color coding for the same category across every visual on a dashboard — inconsistent colors are one of the most common things that make dashboards feel unpolished",
            ],
          },
          {
            slug: "dashboard-narrative",
            title: "Structuring a Dashboard Around a Narrative",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "Put the most important number top-left — that's where the eye lands first, and it should be the headline metric, not a minor detail",
              "Group related visuals together and use clear section titles — a dashboard someone has to hunt through to find related numbers has failed at its job",
              "Add a filter/slicer for the dimension people will actually want to drill into (region, time period, product) rather than every possible dimension",
            ],
          },
          {
            slug: "power-bi-glossary",
            title: "Power BI Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Power Query",
                back: "Power BI's data transformation tool, used to clean and reshape data before it enters the report.",
              },
              {
                front: "Star schema",
                back: "A data model design with a central fact table connected to multiple dimension tables via relationships.",
              },
              {
                front: "Slicer",
                back: "An interactive filter control on a Power BI dashboard that lets users narrow down the displayed data.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "first-power-bi-dashboard",
      title: "Build a One-Page Dashboard from Real Data",
      deliverables: [
        "A Power BI report connected to a real or realistic dataset, shaped via Power Query",
        "A one-page dashboard with 3-5 visuals, each answering a specific stated question",
      ],
      rubric: [
        "The data model uses at least one relationship between two tables, not a single flat table",
        "Each visual's purpose can be stated in one sentence, and the chart type matches that purpose",
      ],
    },
    resources: [
      {
        title: "Microsoft Power BI Documentation",
        type: "external-link",
        url: "https://learn.microsoft.com/power-bi/",
        description: "Official Power BI documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the one-page dashboard"],
  },
  {
    slug: "power-bi-data-modeling-with-dax",
    title: "Power BI Data Modeling with DAX",
    subtitle:
      "Writing DAX measures that calculate correctly across filters, and building a data model that scales past a single flat table.",
    category: "power-bi",
    difficulty: "intermediate",
    estimatedDurationMinutes: 130,
    tags: ["dashboards", "data", "analytics"],
    skills: ["dax", "power-bi-modeling"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Write DAX measures (not just calculated columns) for correct dynamic aggregation",
      "Use CALCULATE to modify filter context deliberately",
      "Build time-intelligence calculations like year-over-year growth correctly",
    ],
    prerequisites: [{ courseSlug: "power-bi-fundamentals" }],
    modules: [
      {
        slug: "dax-fundamentals",
        title: "DAX Fundamentals",
        description: "Measures vs. calculated columns, and why the distinction matters.",
        lessons: [
          {
            slug: "measures-vs-columns",
            title: "Measures vs. Calculated Columns",
            kind: "code",
            durationMinutes: 17,
            free: true,
            points: [
              "A calculated column is computed once per row and stored — a measure is computed dynamically based on whatever filter context (slicers, visual groupings) is currently applied",
              "Default to measures for anything that should aggregate correctly no matter how the report is sliced — a calculated column summed in a visual can silently give a wrong total",
              "Measures are more memory-efficient too, since they're calculated on demand rather than stored per row",
            ],
            code: {
              language: "text",
              code: "Total Revenue = SUM(Sales[Amount])\n// A measure — recalculates correctly whether you're viewing by region, by month, or unfiltered",
            },
          },
          {
            slug: "calculate-and-filter-context",
            title: "CALCULATE and Filter Context",
            kind: "code",
            durationMinutes: 18,
            points: [
              "CALCULATE is the most important DAX function — it lets you evaluate an expression under a modified filter context, e.g. 'total sales, but only for last year'",
              "Filter context is everything currently 'filtering' the calculation — slicers, row/column groupings, and any filters inside the visual itself, all combined",
              "A common mistake: forgetting that CALCULATE's filter arguments replace, not add to, existing filters on that same column — leading to unexpectedly broad or narrow results",
            ],
            code: {
              language: "text",
              code: "Last Year Revenue = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Date'[Date]))\nYoY Growth % = DIVIDE([Total Revenue] - [Last Year Revenue], [Last Year Revenue])",
            },
          },
        ],
      },
      {
        slug: "time-intelligence",
        title: "Time Intelligence Calculations",
        description: "Year-over-year, running totals, and the pitfalls that trip people up.",
        lessons: [
          {
            slug: "common-time-intelligence-patterns",
            title: "Common Time-Intelligence Patterns",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Time-intelligence functions (SAMEPERIODLASTYEAR, DATEADD, TOTALYTD) require a proper, continuous date table marked as the model's official date table — without this, results silently misbehave",
              "Running totals use a filter that includes 'everything up to and including the current date' rather than an exact-match filter",
              "Always sanity-check time-intelligence measures against a manually calculated value for one known period before trusting them across the whole report",
            ],
          },
          {
            slug: "dax-glossary",
            title: "DAX Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Measure",
                back: "A DAX calculation evaluated dynamically based on the current filter context, rather than stored per row.",
              },
              {
                front: "Filter context",
                back: "The combination of all active filters (slicers, groupings, visual filters) affecting a DAX calculation.",
              },
              {
                front: "CALCULATE",
                back: "The core DAX function used to evaluate an expression under a modified filter context.",
              },
              {
                front: "Date table",
                back: "A dedicated, continuous table of dates used to enable correct time-intelligence calculations.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "dax-measures-pack",
      title: "Build a Measures Pack for a Sales Dataset",
      deliverables: [
        "5 DAX measures for a sales-style dataset: total revenue, YoY growth, running total, average order value, and one measure of your choice",
        "A short write-up verifying one measure's output against a manual calculation for one known period",
      ],
      rubric: [
        "All measures use CALCULATE/filter context correctly where relevant, not calculated columns misused as measures",
        "The verification write-up shows an actual matching manual calculation, not just an assertion that it's correct",
      ],
    },
    resources: [
      {
        title: "DAX Guide",
        type: "external-link",
        url: "https://dax.guide",
        description: "A comprehensive community reference for DAX functions.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the DAX measures pack"],
  },
  {
    slug: "sql-fundamentals-for-analysts",
    title: "SQL Fundamentals for Analysts",
    subtitle:
      "Writing SQL to answer real business questions, starting from SELECT and building up to your first genuinely useful queries.",
    category: "sql",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["sql", "data", "analytics"],
    skills: ["sql-fundamentals"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Write SELECT queries with filtering, sorting, and aggregation",
      "Understand how GROUP BY changes what a query returns",
      "Avoid the most common beginner SQL mistakes",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "select-filter-sort",
        title: "SELECT, Filter, and Sort",
        description: "The core building blocks every other query is built from.",
        lessons: [
          {
            slug: "your-first-select",
            title: "Your First SELECT Statement",
            kind: "code",
            durationMinutes: 14,
            free: true,
            points: [
              "SELECT chooses which columns to return, FROM specifies the table, WHERE filters rows before any aggregation happens",
              "Use SELECT * only for quick exploration — in real queries, name your columns explicitly so the query stays predictable if the table's structure changes",
              "String and date comparisons in WHERE need quotes; numeric comparisons don't — a very common early mistake is quoting a number or forgetting to quote a string",
            ],
            code: {
              language: "sql",
              code: "SELECT order_id, customer_id, order_date, total\nFROM orders\nWHERE order_date >= '2024-01-01'\nORDER BY total DESC;",
            },
          },
          {
            slug: "grouping-and-aggregating",
            title: "GROUP BY and Aggregate Functions",
            kind: "code",
            durationMinutes: 17,
            points: [
              "GROUP BY collapses rows sharing the same value in a column into one summary row per group — used together with aggregate functions like SUM, COUNT, AVG",
              "Every column in the SELECT list that isn't inside an aggregate function must appear in the GROUP BY clause, or the query is ambiguous about what to show",
              "HAVING filters groups after aggregation (e.g. 'only categories with total revenue over $10,000') — WHERE can't do this, since WHERE filters rows before grouping happens",
            ],
            code: {
              language: "sql",
              code: "SELECT category, SUM(total) AS revenue\nFROM orders\nGROUP BY category\nHAVING SUM(total) > 10000\nORDER BY revenue DESC;",
            },
          },
        ],
      },
      {
        slug: "avoiding-common-mistakes",
        title: "Avoiding Common Beginner Mistakes",
        description: "The handful of errors that trip up almost everyone at first.",
        lessons: [
          {
            slug: "null-handling",
            title: "NULL Handling and Off-By-Default Mistakes",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "NULL means 'unknown', not zero or empty string — comparisons like `= NULL` never match anything; use `IS NULL` / `IS NOT NULL` instead",
              "COUNT(*) counts all rows including NULLs; COUNT(column_name) only counts non-null values in that column — mixing these up silently changes your denominator",
              "Aggregate functions (SUM, AVG) ignore NULLs by default, which can be exactly right or exactly wrong depending on what the NULL represents in your data — always ask what a NULL means before aggregating over it",
            ],
          },
          {
            slug: "sql-glossary",
            title: "SQL Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "GROUP BY",
                back: "A SQL clause that collapses rows sharing the same value into summary groups for aggregation.",
              },
              {
                front: "HAVING",
                back: "A clause that filters aggregated groups after GROUP BY, unlike WHERE which filters individual rows before grouping.",
              },
              {
                front: "NULL",
                back: "A special SQL value representing 'unknown' or 'missing' — not the same as zero or an empty string.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "first-analytical-queries",
      title: "Answer 3 Business Questions with SQL",
      deliverables: [
        "3 SQL queries answering realistic business questions (e.g. top customers by revenue, monthly order counts, average order value by category)",
        "For each, a one-line explanation of what the query does and why it's correct",
      ],
      rubric: [
        "Queries use GROUP BY/aggregation correctly and handle NULLs appropriately where relevant",
        "Explanations correctly describe what the query does, showing real understanding rather than a memorized pattern",
      ],
    },
    resources: [
      {
        title: "PostgreSQL Tutorial",
        type: "external-link",
        url: "https://www.postgresqltutorial.com",
        description: "A widely used free SQL tutorial and reference.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the 3 analytical queries"],
  },
  {
    slug: "intermediate-sql-joins-and-aggregation",
    title: "Intermediate SQL: Joins and Aggregation",
    subtitle:
      "Combining data across multiple tables correctly — the single most common source of wrong numbers in real-world SQL.",
    category: "sql",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["sql", "data", "analytics"],
    skills: ["sql-joins", "database-design"],
    careerPaths: ["data-analyst"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Choose the correct JOIN type for a given question",
      "Diagnose and fix row-duplication bugs caused by incorrect joins",
      "Combine joins with aggregation correctly at the right grain",
    ],
    prerequisites: [{ courseSlug: "sql-fundamentals-for-analysts" }],
    modules: [
      {
        slug: "join-types",
        title: "JOIN Types and When to Use Each",
        description: "INNER, LEFT, and the question each one actually answers.",
        lessons: [
          {
            slug: "inner-vs-left-join",
            title: "INNER JOIN vs. LEFT JOIN",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "INNER JOIN returns only rows with a match in both tables — rows that don't match on either side are silently dropped",
              "LEFT JOIN keeps every row from the left table, filling in NULLs for unmatched right-table columns — use this when you need 'all customers, even those with zero orders'",
              "A common bug: using INNER JOIN when you actually needed LEFT JOIN, silently excluding exactly the rows (e.g. customers with no orders) that mattered most to the analysis",
            ],
            code: {
              language: "sql",
              code: "-- All customers, including those with zero orders:\nSELECT c.customer_id, COUNT(o.order_id) AS order_count\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nGROUP BY c.customer_id;",
            },
          },
          {
            slug: "diagnosing-duplication",
            title: "Diagnosing Row-Duplication from Joins",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "If a join matches on a column that isn't unique on one side (e.g. joining orders to a table with multiple rows per order), each match multiplies the original rows — a classic silent double-count",
              "Before trusting a joined query's totals, check the row count before and after the join against what you'd expect — an unexpected jump signals a one-to-many join fanning out",
              "Aggregate before joining when possible (pre-summarize the many-side table) — this avoids fan-out entirely rather than trying to de-duplicate after the fact",
            ],
          },
        ],
      },
      {
        slug: "joins-with-aggregation",
        title: "Combining Joins with Aggregation",
        description: "Getting the grain right when both joining and summarizing.",
        lessons: [
          {
            slug: "correct-grain-with-joins",
            title: "Getting the Aggregation Grain Right",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Decide the grain (one row per what?) before writing the query — customer-level, order-level, and order-line-level questions need structurally different queries",
              "When joining a one-to-many relationship (customer to orders) and then aggregating, be explicit about whether you're summing at the order-line grain or the order grain — mixing these up double-counts",
              "Use a subquery or CTE to pre-aggregate the many-side table to the grain you need before joining, rather than joining raw and hoping GROUP BY sorts it out",
            ],
            code: {
              language: "sql",
              code: "-- Pre-aggregate order lines to order-level before joining, to avoid fan-out:\nWITH order_totals AS (\n  SELECT order_id, SUM(line_total) AS order_total\n  FROM order_lines\n  GROUP BY order_id\n)\nSELECT c.customer_id, SUM(ot.order_total) AS lifetime_value\nFROM customers c\nJOIN order_totals ot ON c.customer_id = ot.customer_id\nGROUP BY c.customer_id;",
            },
          },
          {
            slug: "join-glossary",
            title: "Joins & Aggregation Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Fan-out",
                back: "Unintended row duplication caused by joining on a non-unique column, inflating aggregated totals.",
              },
              {
                front: "CTE (Common Table Expression)",
                back: "A named temporary result set (WITH ... AS) used to break a complex query into readable steps.",
              },
              {
                front: "Grain",
                back: "The level of detail one row in a result set represents — e.g. per-order vs. per-order-line.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "multi-table-analysis",
      title: "Answer a Question Requiring 3+ Joined Tables",
      deliverables: [
        "A query joining at least 3 tables to answer a realistic question (e.g. revenue by customer segment and product category)",
        "A written note on how you verified the join didn't cause row duplication",
      ],
      rubric: [
        "The correct JOIN type is used for the question being asked",
        "The duplication-check note shows genuine verification, not just an assumption",
      ],
    },
    resources: [
      {
        title: "Use the Index, Luke — SQL Joins",
        type: "external-link",
        url: "https://use-the-index-luke.com/sql/join",
        description: "A deep, practical reference on how SQL joins actually work.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the multi-table analysis"],
  },
  {
    slug: "advanced-sql-window-functions-and-optimization",
    title: "Advanced SQL: Window Functions and Optimization",
    subtitle:
      "Ranking, running totals, and cohort-style calculations with window functions, plus the basics of why a slow query is slow.",
    category: "sql",
    difficulty: "advanced",
    estimatedDurationMinutes: 130,
    tags: ["sql", "data", "analytics"],
    skills: ["sql-window-functions", "database-design"],
    careerPaths: ["data-analyst", "data-scientist"],
    instructor: {
      name: "Dana Okafor",
      title: "Ex-Head of Analytics, Fieldstone",
      avatarInitials: "DO",
    },
    objectives: [
      "Use window functions for ranking, running totals, and period-over-period comparisons",
      "Explain the difference between window functions and GROUP BY aggregation",
      "Read a query's execution plan to identify an obvious performance problem",
    ],
    prerequisites: [{ courseSlug: "intermediate-sql-joins-and-aggregation" }],
    modules: [
      {
        slug: "window-functions",
        title: "Window Functions",
        description: "Calculations that see other rows without collapsing them away.",
        lessons: [
          {
            slug: "ranking-with-window-functions",
            title: "Ranking with ROW_NUMBER, RANK, and DENSE_RANK",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "Unlike GROUP BY, window functions calculate a value across a set of related rows without collapsing them into one row — you keep the full detail and add a calculated column",
              "ROW_NUMBER gives strictly sequential numbers even for ties; RANK leaves gaps after ties; DENSE_RANK doesn't — picking the wrong one silently changes what 'top 3' actually means when there are ties",
              "PARTITION BY resets the ranking within each group (e.g. rank customers within each region separately) — forgetting it ranks across the entire result set instead",
            ],
            code: {
              language: "sql",
              code: "SELECT customer_id, region, revenue,\n  RANK() OVER (PARTITION BY region ORDER BY revenue DESC) AS rank_in_region\nFROM customer_revenue;",
            },
          },
          {
            slug: "running-totals-and-lag-lead",
            title: "Running Totals with SUM() OVER, and LAG/LEAD",
            kind: "code",
            durationMinutes: 18,
            points: [
              "SUM(...) OVER (ORDER BY date) with no explicit frame defaults to a running total up to the current row — a very common way to build cumulative charts directly in SQL",
              "LAG and LEAD let you reference a previous or next row's value directly (e.g. this month's revenue vs. last month's) without a self-join",
              "Always specify ORDER BY inside the OVER() clause explicitly for running totals — without it, the running order is undefined and results can be inconsistent",
            ],
            code: {
              language: "sql",
              code: "SELECT month, revenue,\n  SUM(revenue) OVER (ORDER BY month) AS running_total,\n  revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change\nFROM monthly_revenue;",
            },
          },
        ],
      },
      {
        slug: "query-performance",
        title: "Query Performance Basics",
        description: "Enough to diagnose an obviously slow query without being a DBA.",
        lessons: [
          {
            slug: "reading-an-execution-plan",
            title: "Reading a Query Execution Plan",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "An execution plan (EXPLAIN in most databases) shows how the database will actually run your query — which tables it scans, in what order, and whether it uses an index",
              "A 'sequential scan' on a large table where you're filtering on a specific column is the most common red flag — it usually means a missing index",
              "Filtering as early as possible (in WHERE, before a join) and only selecting needed columns both reduce the amount of data the database has to move around",
            ],
          },
          {
            slug: "advanced-sql-glossary",
            title: "Advanced SQL Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Window function",
                back: "A calculation performed across a set of related rows without collapsing them into a single summary row.",
              },
              {
                front: "PARTITION BY",
                back: "Divides rows into groups within a window function, resetting the calculation for each group.",
              },
              {
                front: "Execution plan",
                back: "A database's explanation of how it will physically execute a query, useful for diagnosing performance issues.",
              },
              {
                front: "Index",
                back: "A database structure that speeds up lookups on a specific column, at the cost of extra storage and write overhead.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "cohort-style-analysis",
      title: "Build a Cohort-Style Analysis with Window Functions",
      deliverables: [
        "A query using at least one ranking function and one running-total or LAG/LEAD calculation on a realistic dataset",
        "A short note on one query you checked the execution plan for, and what you found",
      ],
      rubric: [
        "Window function partitioning and ordering are used correctly for the stated question",
        "The execution-plan note shows genuine inspection, not a generic statement",
      ],
    },
    resources: [
      {
        title: "Mode SQL Tutorial — Window Functions",
        type: "external-link",
        url: "https://mode.com/sql-tutorial/sql-window-functions/",
        description: "A practical tutorial on SQL window functions.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cohort-style analysis"],
  },
];
