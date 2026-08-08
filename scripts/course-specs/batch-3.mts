import type { CourseSpec } from "../lib/course-spec-types.mts";

export const SPECS: CourseSpec[] = [
  // ---------------------------------------------------------------
  // Cloud Engineer path (remaining 8)
  // ---------------------------------------------------------------
  {
    slug: "aws-for-application-deployment",
    title: "AWS for Application Deployment",
    subtitle:
      "Getting a real application running on AWS — load balancing, auto-scaling, and deployment patterns beyond a single manually-managed instance.",
    category: "aws",
    difficulty: "intermediate",
    estimatedDurationMinutes: 130,
    tags: ["cloud", "aws"],
    skills: ["aws-core-services", "load-balancing"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Deploy an application behind a load balancer with auto-scaling",
      "Choose between EC2, ECS, and Elastic Beanstalk for a given workload",
      "Design a basic deployment pipeline that avoids downtime",
    ],
    prerequisites: [{ courseSlug: "aws-core-services-fundamentals" }],
    modules: [
      {
        slug: "scaling-and-availability",
        title: "Scaling and Availability",
        description: "Moving from one server to something that survives real traffic and failure.",
        lessons: [
          {
            slug: "load-balancing-and-auto-scaling",
            title: "Load Balancing and Auto Scaling",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "An Application Load Balancer distributes incoming traffic across multiple instances, and health checks automatically stop routing to instances that are failing",
              "Auto Scaling Groups add or remove instances based on demand (e.g. CPU utilization), so capacity roughly matches actual load instead of being fixed at a guessed peak",
              "Running behind a load balancer with 2+ instances across different availability zones is the baseline for avoiding a single point of failure",
            ],
          },
          {
            slug: "choosing-a-compute-option",
            title: "Choosing Between EC2, ECS, and Elastic Beanstalk",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "EC2 gives full control over the server — appropriate when you need OS-level customization or are running something that doesn't fit a container model well",
              "ECS (container orchestration) fits teams already using Docker who want more control over deployment than a fully managed PaaS, without managing raw servers directly",
              "Elastic Beanstalk is the most hands-off option — you provide code, AWS handles provisioning, load balancing, and scaling — good for getting started fast at the cost of less fine-grained control",
            ],
          },
        ],
      },
      {
        slug: "deployment-patterns",
        title: "Deployment Patterns",
        description: "Shipping a new version without taking the whole app down.",
        lessons: [
          {
            slug: "zero-downtime-deployment",
            title: "Zero-Downtime Deployment Patterns",
            kind: "code",
            durationMinutes: 18,
            points: [
              "A rolling deployment replaces instances gradually, keeping some old-version instances serving traffic until new ones pass health checks — avoids an all-at-once cutover risk",
              "Blue-green deployment runs two full environments and switches traffic at once, allowing a fast rollback by simply switching back if the new version has problems",
              "Whatever pattern you choose, an automated rollback trigger tied to health checks or error-rate thresholds matters more than the deployment strategy itself",
            ],
            code: {
              language: "text",
              code: "Rolling deployment (simplified):\n1. Deploy new version to 1 of 4 instances\n2. Wait for health check to pass\n3. Repeat for remaining instances, one at a time\n4. If any health check fails, halt and roll back the affected instance",
            },
          },
          {
            slug: "aws-deployment-glossary",
            title: "AWS Deployment Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Auto Scaling Group",
                back: "An AWS feature that automatically adds or removes EC2 instances based on demand.",
              },
              {
                front: "Blue-green deployment",
                back: "A deployment strategy running two full environments, switching traffic between them for near-instant rollback.",
              },
              {
                front: "Health check",
                back: "An automated check confirming an instance is functioning correctly before traffic is routed to it.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "scalable-deployment-design",
      title: "Design a Scalable Deployment for a Real App",
      deliverables: [
        "A deployment architecture using a load balancer and auto-scaling group across at least 2 availability zones",
        "A chosen deployment pattern (rolling or blue-green) with a rollback trigger defined",
      ],
      rubric: [
        "The architecture avoids a single point of failure",
        "The rollback trigger is specific and automatic, not a vague 'we'd notice and fix it'",
      ],
    },
    resources: [
      {
        title: "AWS Auto Scaling Documentation",
        type: "external-link",
        url: "https://docs.aws.amazon.com/autoscaling/",
        description: "Official AWS Auto Scaling documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the scalable deployment design"],
  },
  {
    slug: "azure-for-application-deployment",
    title: "Azure for Application Deployment",
    subtitle:
      "Deploying and scaling a real application on Azure using App Service and Azure's load-balancing and scaling primitives.",
    category: "azure",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["cloud", "azure"],
    skills: ["azure-core-services", "load-balancing"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Deploy an application to Azure App Service with autoscaling configured",
      "Use deployment slots for safer releases",
      "Choose between App Service, Azure Container Apps, and raw VMs for a given workload",
    ],
    prerequisites: [{ courseSlug: "azure-core-services-fundamentals" }],
    modules: [
      {
        slug: "app-service-and-scaling",
        title: "App Service and Scaling",
        description: "Azure's managed hosting option, and how it scales with demand.",
        lessons: [
          {
            slug: "app-service-basics",
            title: "Azure App Service Basics",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "App Service is a managed PaaS for hosting web apps and APIs — Azure handles the underlying OS and runtime patching, letting you focus on application code",
              "Autoscale rules can scale based on metrics (CPU, memory, request queue length) or a schedule (e.g. more instances during known business hours)",
              "App Service Plans determine the pricing tier and available features — the Free/Shared tiers are fine for testing but lack autoscaling, which only appears at Standard tier and above",
            ],
          },
          {
            slug: "deployment-slots",
            title: "Deployment Slots for Safer Releases",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A deployment slot is a separate, live environment (e.g. 'staging') sharing the same App Service — you can deploy and fully test a new version before it's live",
              "Slot swapping moves the staging version into production near-instantly, and can be reversed by swapping back if something's wrong",
              "Warm-up requests to a staging slot before swapping avoid a cold-start delay hitting real users right after a swap",
            ],
          },
        ],
      },
      {
        slug: "choosing-compute-options-azure",
        title: "Choosing the Right Compute Option",
        description: "App Service, Container Apps, or VMs — matching the option to the workload.",
        lessons: [
          {
            slug: "app-service-vs-containers-vs-vms",
            title: "App Service vs. Container Apps vs. VMs",
            kind: "code",
            durationMinutes: 18,
            points: [
              "App Service is the fastest path for a standard web app or API with no unusual OS-level requirements",
              "Azure Container Apps fits teams already using Docker who want managed container orchestration without the full complexity of Kubernetes",
              "Raw VMs are appropriate when you need full OS control or are running software that doesn't fit a managed platform's constraints",
            ],
            code: {
              language: "text",
              code: "Decision guide:\nStandard web app, no custom OS needs -> App Service\nAlready containerized, want managed scaling -> Container Apps\nNeed full OS control or unusual dependencies -> VMs",
            },
          },
          {
            slug: "azure-deployment-glossary",
            title: "Azure Deployment Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "App Service Plan",
                back: "The underlying compute resources and pricing tier that determine an Azure App Service's capabilities.",
              },
              {
                front: "Deployment slot",
                back: "A separate live environment sharing an App Service, used to stage and safely swap in new versions.",
              },
              {
                front: "Autoscale rule",
                back: "A configured condition (metric-based or scheduled) that triggers Azure to add or remove instances.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "azure-deployment-design",
      title: "Design a Safe Deployment Process on Azure",
      deliverables: [
        "An App Service deployment design using a staging slot and autoscale rules",
        "A written rollback plan using slot swapping if a deployment goes wrong",
      ],
      rubric: [
        "Autoscale rules are based on a specific, sensible metric for the workload",
        "The rollback plan is concrete and would actually work if executed",
      ],
    },
    resources: [
      {
        title: "Azure App Service Documentation",
        type: "external-link",
        url: "https://learn.microsoft.com/azure/app-service/",
        description: "Official Azure App Service documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the Azure deployment design"],
  },
  {
    slug: "ci-cd-pipelines-in-practice",
    title: "CI/CD Pipelines in Practice",
    subtitle:
      "Building a real CI/CD pipeline — automated tests, build artifacts, and deployment stages — not just the theory behind them.",
    category: "devops",
    difficulty: "intermediate",
    estimatedDurationMinutes: 125,
    tags: ["devops", "ci-cd"],
    skills: ["ci-cd-pipelines"],
    careerPaths: ["cloud-engineer", "devops-engineer", "software-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Configure a pipeline with build, test, and deploy stages",
      "Use pipeline caching to keep build times reasonable",
      "Gate a deployment behind passing tests and required approvals",
    ],
    prerequisites: [{ courseSlug: "devops-foundations" }],
    modules: [
      {
        slug: "pipeline-stages",
        title: "Pipeline Stages",
        description: "Build, test, deploy — and what belongs in each.",
        lessons: [
          {
            slug: "structuring-a-pipeline",
            title: "Structuring Build, Test, and Deploy Stages",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "The build stage compiles/packages the application into a deployable artifact — this artifact should be the exact same one promoted through every later stage, not rebuilt at each step",
              "The test stage runs automated tests against the build artifact — a pipeline that deploys before tests finish defeats the entire purpose of having them",
              "Fail fast — put the quickest, most likely-to-fail checks (linting, unit tests) before slower ones (integration tests, full builds) so a bad commit is caught with minimum wasted time",
            ],
            code: {
              language: "yaml",
              code: "stages:\n  - lint\n  - unit-test\n  - build\n  - integration-test\n  - deploy-staging\n  - deploy-production  # requires manual approval",
            },
          },
          {
            slug: "caching-and-speed",
            title: "Caching Dependencies to Keep Builds Fast",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Re-downloading and reinstalling dependencies on every single pipeline run wastes significant time — cache dependency directories keyed on a lockfile hash",
              "A slow pipeline directly discourages frequent commits and small changes, undermining the whole point of CI — pipeline speed is a real product decision, not just an engineering nicety",
              "Parallelize independent test suites where the pipeline tool supports it, rather than running everything sequentially",
            ],
          },
        ],
      },
      {
        slug: "deployment-gates",
        title: "Deployment Gates",
        description: "Making sure only verified, approved changes actually reach production.",
        lessons: [
          {
            slug: "gating-deployments",
            title: "Gating Deployments Behind Tests and Approval",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A deployment gate is a required condition (all tests pass, a specific person approves) that must be satisfied before a pipeline proceeds to the next stage",
              "Automate what can be automated (test pass/fail) and reserve human approval gates for genuinely judgment-requiring decisions, like a production deploy during a high-traffic period",
              "Log who approved each production deployment and when — this audit trail matters when investigating an incident after the fact",
            ],
          },
          {
            slug: "cicd-practice-glossary",
            title: "CI/CD Practice Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Build artifact",
                back: "The compiled/packaged output of the build stage, promoted unchanged through subsequent pipeline stages.",
              },
              {
                front: "Fail fast",
                back: "Ordering pipeline checks so the quickest, most likely to catch problems run first, minimizing wasted time on a doomed build.",
              },
              {
                front: "Deployment gate",
                back: "A required condition (automated or manual) that must be satisfied before a pipeline proceeds to the next stage.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "real-cicd-pipeline",
      title: "Configure a Real CI/CD Pipeline",
      deliverables: [
        "A working pipeline configuration with lint, test, build, and deploy stages",
        "Dependency caching configured, with before/after build time noted",
        "At least one deployment gate (automated test pass or manual approval) before production deploy",
      ],
      rubric: [
        "Stages are ordered to fail fast on cheap checks before expensive ones",
        "The deployment gate genuinely blocks an unapproved or failing change from deploying",
      ],
    },
    resources: [
      {
        title: "GitHub Actions Documentation",
        type: "external-link",
        url: "https://docs.github.com/actions",
        description: "Official documentation for GitHub Actions CI/CD.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the real CI/CD pipeline"],
  },
  {
    slug: "infrastructure-as-code-fundamentals",
    title: "Infrastructure as Code Fundamentals",
    subtitle:
      "Defining cloud infrastructure in version-controlled code instead of manual console clicks — reproducible, reviewable, and safe to change.",
    category: "devops",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["devops", "cloud"],
    skills: ["infrastructure-as-code"],
    careerPaths: ["cloud-engineer", "devops-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Explain why manual console changes cause configuration drift",
      "Write a basic infrastructure definition that's declarative, not imperative",
      "Review an infrastructure change plan before applying it",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "why-iac",
        title: "Why Infrastructure as Code",
        description: "The problem manual infrastructure management creates at any real scale.",
        lessons: [
          {
            slug: "configuration-drift",
            title: "Configuration Drift and Why It's Dangerous",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Configuration drift happens when the real infrastructure state diverges from what's documented — usually from manual console changes made 'just this once' during an incident and never recorded",
              "Drift makes environments unpredictable — 'it works in staging' stops being reliable evidence when staging and production have silently diverged in undocumented ways",
              "IaC treats infrastructure definitions as the source of truth in version control — the actual cloud resources are meant to always match what's declared in code",
            ],
          },
          {
            slug: "declarative-vs-imperative",
            title: "Declarative vs. Imperative Infrastructure Definitions",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A declarative approach states the desired end state ('there should be 3 web servers behind a load balancer') and lets the tool figure out how to get there",
              "An imperative approach specifies exact steps to run in order — this is more fragile, since running the same steps twice can produce a different or broken result",
              "Most modern IaC tools (Terraform, CloudFormation, Bicep) are declarative — this is a major reason they're preferred over ad hoc scripts for infrastructure management",
            ],
          },
        ],
      },
      {
        slug: "safe-infrastructure-changes",
        title: "Making Infrastructure Changes Safely",
        description: "Reviewing a change before it actually happens.",
        lessons: [
          {
            slug: "plan-before-apply",
            title: "Reviewing a Plan Before Applying It",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Most IaC tools separate 'plan' (show what would change) from 'apply' (actually make the change) — always review the plan output before applying, especially for anything touching production",
              "A plan showing an unexpected resource deletion or replacement is a signal to stop and investigate before proceeding, not to apply and hope",
              "Store infrastructure state remotely and lock it during changes — two people applying conflicting changes simultaneously without locking is a real, damaging failure mode",
            ],
            code: {
              language: "text",
              code: '$ terraform plan\n  # aws_instance.web will be updated in-place\n  ~ instance_type = "t3.micro" -> "t3.small"\n\n  # aws_security_group.web will be destroyed and recreated  <- investigate before applying!\n-/+ resource "aws_security_group" "web" { ... }',
            },
          },
          {
            slug: "iac-glossary",
            title: "Infrastructure as Code Terms",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Configuration drift",
                back: "Divergence between actual infrastructure state and its documented/declared definition, usually from manual changes.",
              },
              {
                front: "Declarative infrastructure",
                back: "Defining the desired end state of infrastructure, letting the tool determine the steps to achieve it.",
              },
              {
                front: "State locking",
                back: "Preventing concurrent infrastructure changes from conflicting by locking the shared state during an operation.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "iac-definition-review",
      title: "Write and Review an Infrastructure Definition",
      deliverables: [
        "A declarative infrastructure definition for a small environment (e.g. a VM, a storage resource, a network rule)",
        "A written review of a plan output identifying one change that would need extra scrutiny before applying",
      ],
      rubric: [
        "The definition is genuinely declarative (desired state), not a disguised list of imperative steps",
        "The plan review correctly identifies a risky change type (e.g. destroy-and-recreate) rather than an in-place update",
      ],
    },
    resources: [
      {
        title: "Terraform Documentation",
        type: "external-link",
        url: "https://developer.hashicorp.com/terraform/docs",
        description: "Official Terraform documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the IaC definition + plan review"],
  },
  {
    slug: "containers-and-docker-fundamentals",
    title: "Containers and Docker Fundamentals",
    subtitle:
      "Packaging an application with everything it needs to run consistently anywhere — the concept behind 'it works on my machine' finally being true everywhere.",
    category: "devops",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["devops", "containers"],
    skills: ["containerization"],
    careerPaths: ["cloud-engineer", "devops-engineer", "software-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Write a Dockerfile that builds a small, correct image",
      "Explain the difference between an image and a container",
      "Avoid the most common Docker image size and security mistakes",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "docker-basics",
        title: "Docker Basics",
        description: "Images, containers, and the file that defines how one is built.",
        lessons: [
          {
            slug: "images-vs-containers",
            title: "Images vs. Containers",
            kind: "reading",
            durationMinutes: 15,
            free: true,
            points: [
              "An image is a read-only template (application code, dependencies, runtime) — a container is a running instance of that image, with its own writable layer on top",
              "Multiple containers can run from the same image simultaneously, each isolated from the others — this is what makes containers useful for consistent, repeatable deployment",
              "Containers are not virtual machines — they share the host OS kernel, which makes them much lighter-weight and faster to start than a full VM",
            ],
          },
          {
            slug: "writing-a-dockerfile",
            title: "Writing a Dockerfile",
            kind: "code",
            durationMinutes: 18,
            points: [
              "Each instruction in a Dockerfile creates a new layer — ordering instructions from least-to-most-frequently-changing (dependencies before application code) lets Docker's build cache skip unchanged layers on rebuild",
              "Use a specific base image tag (e.g. `python:3.12-slim`), not `latest` — `latest` is a moving target that can silently change your build's behavior over time",
              "Multi-stage builds let you compile/build in one stage and copy only the final artifact into a smaller final image, avoiding shipping build tools you don't need at runtime",
            ],
            code: {
              language: "dockerfile",
              code: 'FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["python", "app.py"]',
            },
          },
        ],
      },
      {
        slug: "avoiding-common-mistakes",
        title: "Avoiding Common Docker Mistakes",
        description:
          "Image bloat and security issues that show up constantly in real-world Dockerfiles.",
        lessons: [
          {
            slug: "image-size-and-security",
            title: "Keeping Images Small and Secure",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A bloated image (unnecessary build tools, cached package files, unused dependencies) is slower to pull, slower to start, and has a larger attack surface — clean up in the same layer you install, not a later one",
              "Never run a container's main process as root unless there's a specific reason to — create and switch to a non-root user in the Dockerfile",
              "Don't bake secrets (API keys, passwords) directly into an image — they persist in image layers even if 'removed' in a later step; use environment variables or a secrets manager instead",
            ],
          },
          {
            slug: "docker-glossary",
            title: "Docker Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Image layer",
                back: "An immutable filesystem change created by each Dockerfile instruction, cached to speed up rebuilds.",
              },
              {
                front: "Multi-stage build",
                back: "A Dockerfile technique using multiple FROM stages to keep the final image small by excluding build-only tools.",
              },
              {
                front: "Container",
                back: "A running, isolated instance of a Docker image with its own writable layer.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "dockerized-application",
      title: "Containerize a Small Application",
      deliverables: [
        "A Dockerfile for a real small application, using a multi-stage build if applicable",
        "A written note on the final image size and one change made specifically to reduce it or improve security",
      ],
      rubric: [
        "The Dockerfile uses appropriate layer ordering for cache efficiency",
        "The container does not run as root, and no secrets are baked into the image",
      ],
    },
    resources: [
      {
        title: "Docker Documentation",
        type: "external-link",
        url: "https://docs.docker.com",
        description: "Official Docker documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the containerized application"],
  },
  {
    slug: "monitoring-and-observability-fundamentals",
    title: "Monitoring and Observability Fundamentals",
    subtitle:
      "Knowing what's actually happening in a running system — metrics, logs, and traces — before an outage forces you to find out the hard way.",
    category: "devops",
    difficulty: "advanced",
    estimatedDurationMinutes: 130,
    tags: ["devops", "cloud"],
    skills: ["monitoring-and-observability"],
    careerPaths: ["cloud-engineer", "devops-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Distinguish metrics, logs, and traces and know when each is the right tool",
      "Set alerts that reduce noise instead of causing alert fatigue",
      "Use a trace to diagnose latency in a multi-service request",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "the-three-pillars",
        title: "The Three Pillars: Metrics, Logs, Traces",
        description:
          "Three different lenses on the same running system, each answering a different question.",
        lessons: [
          {
            slug: "metrics-logs-traces",
            title: "Metrics, Logs, and Traces — What Each One Answers",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Metrics answer 'what is the overall state right now' — numeric, aggregatable, cheap to store (e.g. request rate, error rate, CPU utilization)",
              "Logs answer 'what exactly happened' for a specific event — detailed, but expensive to store and search at high volume without good structure",
              "Traces answer 'where did the time go' for a single request as it passes through multiple services — essential for diagnosing latency in a distributed system",
              "A healthy observability setup uses all three together — a metric alerts you something's wrong, logs and traces tell you why",
            ],
          },
          {
            slug: "structured-logging",
            title: "Structured Logging",
            kind: "code",
            durationMinutes: 16,
            points: [
              "Structured logs (JSON with consistent fields) are searchable and filterable in ways plain text log lines aren't — this matters enormously once log volume grows past what a human can scroll through",
              "Include a request/trace ID in every log line related to a single request — this is what lets you reconstruct the full story of one request across multiple services",
              "Log at the right level (debug/info/warn/error) consistently — logging everything at 'error' makes real errors impossible to find in the noise",
            ],
            code: {
              language: "json",
              code: '{"level": "error", "trace_id": "a1b2c3", "service": "checkout", "message": "Payment provider timeout", "latency_ms": 5012}',
            },
          },
        ],
      },
      {
        slug: "alerting-well",
        title: "Alerting Without Alert Fatigue",
        description:
          "An alert that fires constantly and means nothing gets ignored, which defeats the point.",
        lessons: [
          {
            slug: "alerting-on-symptoms-not-causes",
            title: "Alerting on Symptoms, Not Every Possible Cause",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Alert on user-facing symptoms (elevated error rate, high latency) rather than every possible internal cause — this reduces noise and keeps alerts meaningfully tied to actual impact",
              "Every alert should be actionable — if an alert fires and there's genuinely nothing to do about it, it shouldn't exist as a page-worthy alert",
              "Alert fatigue from too many low-value alerts is dangerous — it trains people to ignore or snooze alerts, including the ones that actually matter",
            ],
          },
          {
            slug: "observability-glossary",
            title: "Observability Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Trace",
                back: "A record of a single request's path through multiple services, showing where time was spent at each hop.",
              },
              {
                front: "Structured logging",
                back: "Logging in a consistent, machine-parseable format (like JSON) rather than freeform text.",
              },
              {
                front: "Alert fatigue",
                back: "Desensitization to alerts caused by too many low-value or non-actionable notifications.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "observability-setup-design",
      title: "Design an Observability Setup for a Real Service",
      deliverables: [
        "A plan defining which metrics, log fields, and trace points matter most for a realistic service",
        "3 alert definitions, each tied to a user-facing symptom with a clearly actionable response",
      ],
      rubric: [
        "Chosen metrics/logs/traces would genuinely help diagnose a real incident, not just look comprehensive",
        "Each alert is actionable and avoids alerting on noise",
      ],
    },
    resources: [
      {
        title: "Google SRE Book: Monitoring Distributed Systems",
        type: "external-link",
        url: "https://sre.google/sre-book/monitoring-distributed-systems/",
        description: "A widely referenced chapter on production monitoring practices.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the observability setup design"],
  },
  {
    slug: "cloud-cost-optimization",
    title: "Cloud Cost Optimization",
    subtitle:
      "Finding and fixing the most common sources of wasted cloud spend, without sacrificing the reliability you actually need.",
    category: "cloud-computing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 110,
    tags: ["cloud"],
    skills: ["cloud-fundamentals"],
    careerPaths: ["cloud-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Identify the most common sources of unnecessary cloud spend",
      "Right-size compute resources based on actual utilization data",
      "Use reserved/committed pricing appropriately without over-committing",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "finding-waste",
        title: "Finding Where the Money Actually Goes",
        description: "The usual suspects behind an unexpectedly large cloud bill.",
        lessons: [
          {
            slug: "common-sources-of-waste",
            title: "Common Sources of Cloud Waste",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Idle or forgotten resources (a test instance never shut down, an old snapshot nobody deleted) accumulate cost silently over months",
              "Over-provisioned instances (running a large instance type at 5% utilization) are extremely common when sizing was a guess rather than based on real usage data",
              "Data transfer costs between regions or out to the internet are often overlooked in initial architecture decisions but can become significant at scale",
            ],
          },
          {
            slug: "right-sizing",
            title: "Right-Sizing Based on Real Utilization",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Use actual CPU/memory utilization metrics over a representative time window (not a single snapshot) to decide if an instance is over- or under-provisioned",
              "Right-sizing down too aggressively risks performance problems during traffic spikes — leave reasonable headroom rather than optimizing purely for the average case",
              "Automated right-sizing recommendations from cloud providers are a good starting point, but verify against your own knowledge of actual traffic patterns before applying them",
            ],
          },
        ],
      },
      {
        slug: "pricing-models",
        title: "Using Pricing Models Deliberately",
        description: "Committing to a discount without over-committing to a risk.",
        lessons: [
          {
            slug: "reserved-vs-on-demand",
            title: "Reserved/Committed Pricing vs. On-Demand",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Reserved or committed-use pricing offers a significant discount in exchange for a 1-3 year commitment to a certain usage level — appropriate for stable, predictable baseline workloads",
              "On-demand pricing costs more per unit but has no commitment — appropriate for variable or unpredictable workloads where you can't confidently forecast usage",
              "A common cost-optimization pattern: reserve capacity for your predictable baseline load, and use on-demand (or spot/preemptible) capacity for burst above that baseline",
            ],
          },
          {
            slug: "cost-optimization-glossary",
            title: "Cost Optimization Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Right-sizing",
                back: "Adjusting resource allocation (instance type, size) to match actual utilization rather than an overestimated guess.",
              },
              {
                front: "Reserved/committed pricing",
                back: "A discounted cloud pricing model in exchange for committing to a usage level over a fixed term.",
              },
              {
                front: "Idle resource",
                back: "A provisioned cloud resource that's running but not being meaningfully used, quietly accumulating cost.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "cost-optimization-audit",
      title: "Audit a Cloud Environment for Cost Savings",
      deliverables: [
        "An audit identifying at least 3 realistic sources of waste in a hypothetical cloud environment",
        "A right-sizing and pricing-model recommendation for the environment's baseline vs. burst workload",
      ],
      rubric: [
        "Identified waste sources are specific and plausible, not generic",
        "The pricing-model recommendation correctly separates predictable baseline load from variable burst load",
      ],
    },
    resources: [
      {
        title: "AWS Cost Optimization Pillar",
        type: "external-link",
        url: "https://aws.amazon.com/architecture/cost-optimization/",
        description: "AWS's official guidance on cost optimization.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cost optimization audit"],
  },
  {
    slug: "serverless-computing-fundamentals",
    title: "Serverless Computing Fundamentals",
    subtitle:
      "Running code without managing servers — functions-as-a-service, when it genuinely helps, and where its limits show up in practice.",
    category: "cloud-computing",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["cloud"],
    skills: ["cloud-fundamentals"],
    careerPaths: ["cloud-engineer", "software-engineer"],
    instructor: {
      name: "Sam Reyes",
      title: "Cloud Solutions Architect, ex-AWS",
      avatarInitials: "SR",
    },
    objectives: [
      "Explain how functions-as-a-service billing and scaling actually work",
      "Identify workloads that fit serverless well versus poorly",
      "Design around cold starts and execution time limits",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "how-serverless-works",
        title: "How Serverless Actually Works",
        description: "'Serverless' doesn't mean no servers — it means you don't manage them.",
        lessons: [
          {
            slug: "faas-billing-and-scaling",
            title: "Functions-as-a-Service Billing and Scaling",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "You're billed per invocation and execution time, not for idle capacity — an idle serverless function costs nothing, unlike an idle always-on server",
              "Scaling is automatic and near-instant in response to invocation volume — the platform runs as many concurrent instances as needed, within account limits",
              "This billing model makes serverless economically excellent for spiky or infrequent workloads, and potentially more expensive than a traditional server for sustained high-volume workloads",
            ],
          },
          {
            slug: "when-serverless-fits",
            title: "When Serverless Fits, and When It Doesn't",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Good fit: event-driven, short-lived tasks — processing an uploaded file, responding to a webhook, a lightweight API endpoint",
              "Poor fit: long-running processes (most platforms cap execution time), workloads needing persistent in-memory state between requests, or extremely high-sustained-volume traffic where always-on compute is cheaper",
              "Serverless doesn't eliminate operational thinking — it shifts it from server management to concerns like cold starts, concurrency limits, and cost-per-invocation modeling",
            ],
          },
        ],
      },
      {
        slug: "designing-around-limits",
        title: "Designing Around Serverless Limits",
        description:
          "Cold starts and execution time — the two constraints that shape real serverless architecture.",
        lessons: [
          {
            slug: "cold-starts",
            title: "Cold Starts and How to Mitigate Them",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A cold start is the extra latency incurred when a new function instance has to initialize before handling its first request, especially noticeable in latency-sensitive user-facing paths",
              "Smaller deployment packages and fewer heavy dependencies loaded at startup reduce cold start time meaningfully",
              "Provisioned concurrency (keeping a set number of instances warm) trades some of the cost benefit for consistently low latency, appropriate for latency-critical endpoints",
            ],
            code: {
              language: "text",
              code: "Symptom: p99 latency spikes on a low-traffic endpoint\nLikely cause: cold starts on an infrequently-invoked function\nFix options: reduce package size, or configure provisioned concurrency for that specific function",
            },
          },
          {
            slug: "serverless-glossary",
            title: "Serverless Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Cold start",
                back: "The added latency when a serverless function instance must initialize before handling its first request.",
              },
              {
                front: "Provisioned concurrency",
                back: "Keeping a set number of serverless function instances pre-warmed to avoid cold starts, at extra cost.",
              },
              {
                front: "Event-driven",
                back: "An architecture pattern where code executes in response to specific triggering events, common in serverless design.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "serverless-architecture-design",
      title: "Design a Serverless Architecture for an Event-Driven Task",
      deliverables: [
        "An architecture for a realistic event-driven task (e.g. image processing on upload, a webhook handler)",
        "A written note on where cold starts could matter, and whether provisioned concurrency is worth the added cost for this specific case",
      ],
      rubric: [
        "The chosen task is genuinely event-driven and short-lived, a realistic serverless fit",
        "The cold-start analysis reflects an accurate understanding of when it would and wouldn't matter",
      ],
    },
    resources: [
      {
        title: "AWS Lambda Documentation",
        type: "external-link",
        url: "https://docs.aws.amazon.com/lambda/",
        description: "Official AWS Lambda documentation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the serverless architecture design"],
  },
  // ---------------------------------------------------------------
  // Cybersecurity path (8)
  // ---------------------------------------------------------------
  {
    slug: "cybersecurity-foundations",
    title: "Cybersecurity Foundations",
    subtitle:
      "The core concepts behind protecting systems and data — threats, the CIA triad, and how security thinking differs from feature thinking.",
    category: "cybersecurity",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["cybersecurity"],
    skills: ["security-fundamentals"],
    careerPaths: ["cybersecurity-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Explain the CIA triad and why it's the backbone of security thinking",
      "Distinguish common threat categories: malware, phishing, insider threats, and supply-chain attacks",
      "Apply the principle of least privilege to a basic access decision",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "core-security-concepts",
        title: "Core Security Concepts",
        description: "The framework security professionals use to reason about risk.",
        lessons: [
          {
            slug: "the-cia-triad",
            title: "The CIA Triad: Confidentiality, Integrity, Availability",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Confidentiality means only authorized people can access data — a leak is a confidentiality failure even if nothing was altered or destroyed",
              "Integrity means data can't be altered without detection — a security failure here is subtler than a leak, since the system may look fine while its data is quietly wrong",
              "Availability means authorized users can access the system when they need to — a denial-of-service attack is purely an availability failure, even though nothing was stolen or changed",
              "Most real security decisions involve trading off between these three — stricter access controls improve confidentiality but can hurt availability if they're too restrictive",
            ],
          },
          {
            slug: "common-threat-categories",
            title: "Common Threat Categories",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Malware (viruses, ransomware, spyware) is malicious software that infiltrates a system — ransomware specifically encrypts data and demands payment for the decryption key",
              "Phishing manipulates people rather than exploiting a technical flaw — it's consistently one of the most effective attack vectors precisely because it targets human trust, not code",
              "Insider threats come from people with legitimate access misusing it, whether maliciously or through carelessness — access controls and monitoring matter even for trusted employees",
              "Supply-chain attacks compromise a trusted third-party component (a library, a vendor) to reach the real target indirectly — this is why dependency provenance matters, not just your own code",
            ],
          },
        ],
      },
      {
        slug: "access-control-thinking",
        title: "Access Control Thinking",
        description: "The principle that shapes almost every real security decision.",
        lessons: [
          {
            slug: "principle-of-least-privilege",
            title: "The Principle of Least Privilege",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Grant only the access genuinely needed for a task, nothing more — 'just in case' access is exactly the kind of unused privilege attackers exploit when an account is compromised",
              "Review and revoke access regularly — access granted for a project that ended six months ago is a lingering, forgotten risk, not a harmless convenience",
              "Least privilege reduces blast radius — if one compromised account has minimal access, the damage from that compromise is naturally limited",
            ],
          },
          {
            slug: "cybersecurity-foundations-glossary",
            title: "Cybersecurity Foundations Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "CIA triad",
                back: "Confidentiality, Integrity, and Availability — the three core properties security aims to protect.",
              },
              {
                front: "Principle of least privilege",
                back: "Granting only the minimum access necessary for a task, nothing more.",
              },
              {
                front: "Supply-chain attack",
                back: "An attack that compromises a trusted third-party component to reach the real target indirectly.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "threat-and-access-review",
      title: "Threat Categorization and Access Review",
      deliverables: [
        "A written categorization of 5 realistic security incidents by threat type and which part of the CIA triad they violate",
        "A least-privilege review of a hypothetical team's access list, identifying at least 2 instances of excessive access",
      ],
      rubric: [
        "Each incident is correctly categorized with a clear justification",
        "The access review identifies genuinely excessive access, not just relabels normal access",
      ],
    },
    resources: [
      {
        title: "OWASP Top Ten",
        type: "external-link",
        url: "https://owasp.org/www-project-top-ten/",
        description: "The industry-standard list of top web application security risks.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the threat and access review"],
  },
  {
    slug: "network-security-fundamentals",
    title: "Network Security Fundamentals",
    subtitle:
      "How networks get attacked and defended — firewalls, segmentation, and the difference between securing a perimeter and securing what's inside it.",
    category: "cybersecurity",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["cybersecurity"],
    skills: ["network-security"],
    careerPaths: ["cybersecurity-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Explain what a firewall does and doesn't protect against",
      "Apply network segmentation to limit lateral movement after a breach",
      "Recognize common network-based attack patterns",
    ],
    prerequisites: [{ courseSlug: "cybersecurity-foundations" }],
    modules: [
      {
        slug: "perimeter-and-beyond",
        title: "Perimeter Defense and Its Limits",
        description: "Firewalls matter, but assuming the perimeter holds forever is a mistake.",
        lessons: [
          {
            slug: "firewalls-and-their-limits",
            title: "Firewalls and What They Don't Protect Against",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A firewall filters traffic based on rules (source/destination, port, protocol) — it's effective against unsolicited external connections but does nothing against an attacker who's already inside, or a legitimate-looking connection carrying malicious payload",
              "Assuming a strong perimeter means the inside is safe is the single most dangerous network security assumption — modern security assumes breach and defends in layers",
              "Web application firewalls (WAFs) inspect application-layer traffic specifically, catching attacks (like SQL injection attempts) that a basic network firewall wouldn't understand",
            ],
          },
          {
            slug: "network-segmentation",
            title: "Network Segmentation and Zero Trust",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "Segmentation divides a network into isolated zones, so a compromise in one zone doesn't automatically grant access to everything else — limiting lateral movement is often more valuable than trying to prevent all initial breaches",
              "Zero trust assumes no request should be automatically trusted based on network location alone — every request is authenticated and authorized regardless of whether it originates 'inside' the network",
              "A flat network (no segmentation) means one compromised device can potentially reach everything — this is a common and costly real-world security gap",
            ],
          },
        ],
      },
      {
        slug: "recognizing-attack-patterns",
        title: "Recognizing Network Attack Patterns",
        description: "Common patterns worth being able to name and recognize.",
        lessons: [
          {
            slug: "common-network-attacks",
            title: "Common Network Attack Patterns",
            kind: "code",
            durationMinutes: 18,
            points: [
              "A denial-of-service (DoS) attack floods a target with traffic or requests to exhaust its resources — a distributed version (DDoS) uses many sources at once, making it harder to block by simply blocking one IP",
              "Man-in-the-middle attacks intercept communication between two parties — TLS/HTTPS exists specifically to make this much harder by encrypting traffic and verifying identity",
              "Port scanning is reconnaissance — an attacker probing which ports are open to find an entry point — seeing scan attempts in logs is a signal worth monitoring, not necessarily an active breach yet",
            ],
            code: {
              language: "text",
              code: "Signal in logs: repeated connection attempts across a wide range of ports from one source IP\nLikely interpretation: port scanning / reconnaissance\nReasonable response: rate-limit or block the source, review for further suspicious activity",
            },
          },
          {
            slug: "network-security-glossary",
            title: "Network Security Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Network segmentation",
                back: "Dividing a network into isolated zones to limit lateral movement after a breach.",
              },
              {
                front: "Zero trust",
                back: "A security model where no request is automatically trusted based on network location alone.",
              },
              {
                front: "DDoS attack",
                back: "A distributed denial-of-service attack flooding a target with traffic from many sources at once.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "network-security-review",
      title: "Review a Network Architecture for Security Gaps",
      deliverables: [
        "A review of a flat (unsegmented) hypothetical network identifying where segmentation should be introduced",
        "A written explanation of one attack pattern relevant to the architecture and how the proposed segmentation would limit its impact",
      ],
      rubric: [
        "Proposed segmentation genuinely limits lateral movement for the identified risk",
        "The attack pattern explanation is accurate and specific to the architecture, not generic",
      ],
    },
    resources: [
      {
        title: "NIST Zero Trust Architecture (SP 800-207)",
        type: "external-link",
        url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
        description: "NIST's official zero trust architecture guidance.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the network security review"],
  },
  {
    slug: "threat-modeling-for-engineers",
    title: "Threat Modeling for Engineers",
    subtitle:
      "A structured way to ask 'how could this be attacked' before building something, using STRIDE and attack trees rather than vague worry.",
    category: "cybersecurity",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["cybersecurity"],
    skills: ["threat-modeling"],
    careerPaths: ["cybersecurity-analyst", "software-engineer"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Apply the STRIDE framework to identify threats in a system design",
      "Build a basic attack tree for a specific asset",
      "Prioritize identified threats by likelihood and impact",
    ],
    prerequisites: [{ courseSlug: "cybersecurity-foundations" }],
    modules: [
      {
        slug: "structured-threat-identification",
        title: "Structured Threat Identification",
        description: "Moving from 'something could go wrong' to a specific, actionable list.",
        lessons: [
          {
            slug: "stride-framework",
            title: "The STRIDE Framework",
            kind: "reading",
            durationMinutes: 18,
            free: true,
            points: [
              "STRIDE stands for Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege — six threat categories to systematically check against a system design",
              "Applying STRIDE to each component and data flow in a system (not just the system as a whole) surfaces threats that a single high-level review would miss",
              "The goal isn't to eliminate every theoretical threat — it's to make an informed, deliberate decision about which threats matter enough to address now versus accept as residual risk",
            ],
          },
          {
            slug: "building-an-attack-tree",
            title: "Building an Attack Tree",
            kind: "code",
            durationMinutes: 18,
            points: [
              "An attack tree starts from a specific goal (e.g. 'access customer payment data') and breaks it down into the different paths an attacker could take to achieve it",
              "Each path can be broken down further into sub-steps, revealing which specific weak points would need to hold for the attack to fail",
              "Attack trees make it obvious where a single control (e.g. one exposed endpoint) is a single point of failure for multiple attack paths, prioritizing where to invest defense effort",
            ],
            code: {
              language: "text",
              code: "Goal: Access customer payment data\n├── Compromise application server\n│   ├── Exploit unpatched vulnerability\n│   └── Steal admin credentials (phishing)\n├── Intercept data in transit\n│   └── Man-in-the-middle on unencrypted connection\n└── Compromise database directly\n    └── SQL injection via unvalidated input",
            },
          },
        ],
      },
      {
        slug: "prioritizing-threats",
        title: "Prioritizing Identified Threats",
        description: "Not every threat deserves the same amount of effort.",
        lessons: [
          {
            slug: "likelihood-and-impact",
            title: "Prioritizing by Likelihood and Impact",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A threat with low likelihood and low impact may reasonably be accepted rather than mitigated — treating every threat as equally urgent wastes effort that should go to the ones that matter",
              "A threat's impact should account for both direct damage and downstream consequences (regulatory penalties, reputational harm), not just the immediate technical effect",
              "Document accepted risks explicitly, with the reasoning — an unaddressed threat that was a deliberate, documented decision is very different from one nobody ever considered",
            ],
          },
          {
            slug: "threat-modeling-glossary",
            title: "Threat Modeling Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "STRIDE",
                back: "A threat modeling framework covering Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, and Elevation of privilege.",
              },
              {
                front: "Attack tree",
                back: "A diagram breaking down a specific attacker goal into the possible paths and sub-steps to achieve it.",
              },
              {
                front: "Residual risk",
                back: "A threat that is knowingly and deliberately accepted rather than mitigated, ideally with documented reasoning.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "threat-model-for-a-feature",
      title: "Threat Model a Real Feature",
      deliverables: [
        "A STRIDE analysis of a specific feature (e.g. a login flow, a file upload feature)",
        "An attack tree for the single highest-priority threat identified",
        "A prioritized list of the top 3 threats with likelihood/impact reasoning",
      ],
      rubric: [
        "STRIDE categories are applied specifically to the feature's actual components, not generically",
        "The prioritization reasoning is explicit and defensible, not just a gut-feel ranking",
      ],
    },
    resources: [
      {
        title: "OWASP Threat Modeling",
        type: "external-link",
        url: "https://owasp.org/www-community/Threat_Modeling",
        description: "OWASP's overview of threat modeling methodologies including STRIDE.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the feature threat model"],
  },
  {
    slug: "incident-response-fundamentals",
    title: "Incident Response Fundamentals",
    subtitle:
      "What actually happens during a security incident — detection, containment, eradication, and the post-incident review that determines if it happens again.",
    category: "cybersecurity",
    difficulty: "advanced",
    estimatedDurationMinutes: 125,
    tags: ["cybersecurity"],
    skills: ["incident-response"],
    careerPaths: ["cybersecurity-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Explain the standard incident response lifecycle",
      "Make sound containment decisions under time pressure",
      "Write a post-incident review that improves future response",
    ],
    prerequisites: [{ courseSlug: "cybersecurity-foundations" }],
    modules: [
      {
        slug: "the-incident-lifecycle",
        title: "The Incident Response Lifecycle",
        description: "From first alert to closed incident, and everything in between.",
        lessons: [
          {
            slug: "detection-and-containment",
            title: "Detection and Containment",
            kind: "reading",
            durationMinutes: 18,
            free: true,
            points: [
              "Detection is often the weakest link — many breaches go unnoticed for weeks or months, so investing in detection capability matters as much as prevention",
              "Containment decisions trade off speed against evidence preservation — immediately shutting down a compromised system stops the damage but can destroy forensic evidence needed to understand what happened",
              "A documented incident response plan, decided calmly in advance, prevents costly improvised decisions made under the pressure of an active incident",
            ],
          },
          {
            slug: "eradication-and-recovery",
            title: "Eradication and Recovery",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Eradication means removing the actual root cause, not just the symptom — restoring from backup without fixing the vulnerability that let the attacker in just invites a repeat incident",
              "Recovery should be gradual and monitored — bringing systems back online with heightened monitoring catches a returning attacker or an incomplete eradication before it becomes a second incident",
              "Communicate incident status to stakeholders throughout, at a level of detail appropriate to the audience — silence during an incident erodes trust even when the technical response is going well",
            ],
          },
        ],
      },
      {
        slug: "learning-from-incidents",
        title: "Learning From Incidents",
        description: "The step most teams skip, and the one that actually prevents repeats.",
        lessons: [
          {
            slug: "post-incident-review",
            title: "Writing a Blameless Post-Incident Review",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "A blameless post-incident review focuses on what happened and what conditions allowed it, not on assigning individual fault — blame discourages honest reporting in the next incident",
              "A good review includes a clear timeline, root cause, what worked well in the response, and specific, assigned follow-up actions with deadlines",
              "Follow-up actions without an owner and a deadline tend to never actually get done — a review is only as valuable as its follow-through",
            ],
          },
          {
            slug: "incident-response-glossary",
            title: "Incident Response Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Containment",
                back: "Actions taken to stop an active incident from spreading further, balanced against preserving forensic evidence.",
              },
              {
                front: "Eradication",
                back: "Removing the root cause of an incident, not just its visible symptoms.",
              },
              {
                front: "Blameless post-incident review",
                back: "A review process focused on conditions and root cause rather than assigning individual fault.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "incident-response-writeup",
      title: "Write an Incident Response Plan and Post-Incident Review",
      deliverables: [
        "A short incident response plan for a hypothetical company covering detection, containment, and communication steps",
        "A blameless post-incident review for a fictional but realistic incident scenario, including root cause and assigned follow-up actions",
      ],
      rubric: [
        "The response plan makes clear, specific containment decisions rather than vague guidance",
        "The post-incident review is genuinely blameless and includes owned, dated follow-up actions",
      ],
    },
    resources: [
      {
        title: "NIST Computer Security Incident Handling Guide (SP 800-61)",
        type: "external-link",
        url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
        description: "NIST's official incident handling guidance.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the incident response plan and review"],
  },
  {
    slug: "phishing-and-social-engineering-awareness",
    title: "Phishing and Social Engineering Awareness",
    subtitle:
      "Why humans, not firewalls, are the most commonly exploited part of any security system — and how to recognize manipulation before it works.",
    category: "cybersecurity",
    difficulty: "beginner",
    estimatedDurationMinutes: 90,
    tags: ["cybersecurity"],
    skills: ["security-fundamentals"],
    careerPaths: ["cybersecurity-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Recognize the common patterns used in phishing attempts",
      "Explain why urgency and authority are the two most common manipulation levers",
      "Apply a simple verification habit before acting on unexpected requests",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "how-social-engineering-works",
        title: "How Social Engineering Works",
        description: "The psychology behind why these attacks succeed so often.",
        lessons: [
          {
            slug: "manipulation-levers",
            title: "Urgency, Authority, and the Manipulation Levers Attackers Use",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Urgency ('your account will be suspended in 1 hour') pushes people to act before thinking carefully — legitimate organizations rarely create this kind of artificial time pressure",
              "Impersonating authority (a CEO, IT department, a bank) exploits the social instinct to comply with requests from perceived authority without questioning them",
              "Attackers research their targets (via social media, company websites) to make messages specific and credible — a phishing email referencing a real colleague's name is far more convincing than a generic one",
            ],
          },
          {
            slug: "recognizing-phishing-patterns",
            title: "Recognizing Common Phishing Patterns",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Mismatched sender domains, generic greetings, and requests to click a link or open an attachment unexpectedly are classic red flags worth pausing on",
              "A request to bypass normal process ('don't tell finance, just wire this now') is one of the strongest signals of a social engineering attempt, regardless of how the message otherwise looks",
              "Attackers increasingly use SMS (smishing) and phone calls (vishing), not just email — the same manipulation levers apply across every channel",
            ],
          },
        ],
      },
      {
        slug: "practical-verification-habits",
        title: "Practical Verification Habits",
        description: "One simple habit that defeats most social engineering attempts.",
        lessons: [
          {
            slug: "verify-through-a-separate-channel",
            title: "Verifying Requests Through a Separate Channel",
            kind: "reading",
            durationMinutes: 15,
            points: [
              "For any unexpected request involving money, credentials, or sensitive data, verify through a known, separate channel — call the person back on a known number, don't reply to the suspicious message itself",
              "This single habit defeats the overwhelming majority of social engineering attempts, because it breaks the attacker's control over the entire interaction",
              "Reporting a suspected phishing attempt, even if you didn't fall for it, helps the security team warn others and track patterns — silence about near-misses is a missed opportunity to improve",
            ],
          },
          {
            slug: "phishing-glossary",
            title: "Phishing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Phishing",
                back: "A social engineering attack using deceptive messages to trick someone into revealing information or taking a harmful action.",
              },
              {
                front: "Vishing",
                back: "Voice phishing — a social engineering attack conducted over a phone call.",
              },
              {
                front: "Verify through a separate channel",
                back: "Confirming an unexpected sensitive request via a known, independent communication path rather than replying directly.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "phishing-awareness-checklist",
      title: "Build a Phishing Recognition Checklist",
      deliverables: [
        "A checklist of at least 6 concrete red flags someone can use to evaluate a suspicious message",
        "A short analysis of 2 example phishing scenarios, applying the checklist to each",
      ],
      rubric: [
        "Checklist items are specific and actionable, not vague ('be careful')",
        "The scenario analysis correctly identifies the manipulation lever being used in each case",
      ],
    },
    resources: [
      {
        title: "CISA Phishing Guidance",
        type: "external-link",
        url: "https://www.cisa.gov/topics/cyber-threats-and-advisories/nation-state-cyber-actors/phishing",
        description: "US CISA's official phishing awareness guidance.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the phishing recognition checklist"],
  },
  {
    slug: "security-for-web-applications",
    title: "Security for Web Applications",
    subtitle:
      "The vulnerabilities that show up again and again in real web applications — injection, broken auth, XSS — and how to actually prevent them.",
    category: "cybersecurity",
    difficulty: "intermediate",
    estimatedDurationMinutes: 130,
    tags: ["cybersecurity", "web-development"],
    skills: ["application-security"],
    careerPaths: ["cybersecurity-analyst", "software-engineer"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Identify and prevent SQL injection and cross-site scripting (XSS)",
      "Explain common authentication and session management mistakes",
      "Apply the OWASP Top Ten as a review checklist",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "injection-and-xss",
        title: "Injection and Cross-Site Scripting",
        description: "Two of the longest-running, still-common web vulnerability classes.",
        lessons: [
          {
            slug: "sql-injection",
            title: "SQL Injection: Cause and Prevention",
            kind: "code",
            durationMinutes: 18,
            free: true,
            points: [
              "SQL injection happens when untrusted input is concatenated directly into a query string, letting an attacker inject their own SQL logic — this has been a known, preventable issue for decades and still appears constantly",
              "Parameterized queries (prepared statements) are the correct fix — the database treats input strictly as data, never as executable query logic, regardless of what the input contains",
              "Input validation is a useful additional layer but is not a substitute for parameterized queries — validation can be bypassed or have edge cases; parameterization structurally prevents the vulnerability",
            ],
            code: {
              language: "sql",
              code: '-- Vulnerable: input concatenated directly\nquery = "SELECT * FROM users WHERE email = \'" + userInput + "\'"\n\n-- Safe: parameterized query\nquery = "SELECT * FROM users WHERE email = ?"\ndb.execute(query, [userInput])',
            },
          },
          {
            slug: "cross-site-scripting",
            title: "Cross-Site Scripting (XSS)",
            kind: "code",
            durationMinutes: 18,
            points: [
              "XSS happens when untrusted input is rendered into a page without proper escaping, letting an attacker inject a script that runs in another user's browser session",
              "Stored XSS (malicious input saved and served to other users) is generally more dangerous than reflected XSS (requiring a crafted link to be clicked), since it affects any visitor without extra action",
              "Modern frameworks auto-escape rendered content by default — most real-world XSS bugs come from deliberately bypassing this default (e.g. `dangerouslySetInnerHTML`) without adequately sanitizing the input first",
            ],
            code: {
              language: "text",
              code: "Vulnerable pattern: rendering raw user input as HTML without escaping\nSafe pattern: rely on the framework's default text-escaping rendering; if raw HTML is genuinely needed, sanitize with a dedicated library first",
            },
          },
        ],
      },
      {
        slug: "auth-and-owasp-review",
        title: "Authentication Mistakes and the OWASP Top Ten",
        description:
          "Where session and auth logic commonly goes wrong, and a checklist for the rest.",
        lessons: [
          {
            slug: "auth-and-session-mistakes",
            title: "Common Authentication and Session Mistakes",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Storing passwords in plaintext or with a weak/unsalted hash is a critical, still-too-common mistake — use a purpose-built password hashing algorithm (bcrypt, Argon2), never a general-purpose hash like MD5 or SHA-1 alone",
              "Session tokens should be regenerated after login (to prevent session fixation) and invalidated on logout — a token that persists as valid after logout is a real, exploitable gap",
              "Rate-limit login attempts — without it, an attacker can brute-force credentials at effectively unlimited speed",
            ],
          },
          {
            slug: "web-security-glossary",
            title: "Web Application Security Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "Parameterized query",
                back: "A query where input is passed as data, not concatenated into the query string, preventing SQL injection.",
              },
              {
                front: "Stored XSS",
                back: "Cross-site scripting where malicious input is saved and served to other users, affecting any visitor.",
              },
              {
                front: "Session fixation",
                back: "An attack exploiting a session token that isn't regenerated after login, letting an attacker pre-set a victim's session.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "web-app-security-review",
      title: "Security Review of a Web Application's Code",
      deliverables: [
        "A review identifying at least one SQL injection risk, one XSS risk, and one authentication weakness in sample code",
        "A corrected version of each identified issue",
      ],
      rubric: [
        "Each vulnerability is correctly identified and explained in terms of root cause",
        "Corrections structurally fix the issue (e.g. genuine parameterization), not just superficially patch the symptom",
      ],
    },
    resources: [
      {
        title: "OWASP Top Ten",
        type: "external-link",
        url: "https://owasp.org/www-project-top-ten/",
        description: "The industry-standard list of top web application security risks.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the web app security review"],
  },
  {
    slug: "cloud-security-fundamentals",
    title: "Cloud Security Fundamentals",
    subtitle:
      "Security in the cloud is a shared responsibility — knowing exactly which parts are yours to secure is the difference between a real defense and a false sense of safety.",
    category: "cybersecurity",
    difficulty: "intermediate",
    estimatedDurationMinutes: 115,
    tags: ["cybersecurity", "cloud"],
    skills: ["cloud-security"],
    careerPaths: ["cybersecurity-analyst", "cloud-engineer"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Explain the shared responsibility model and where it applies",
      "Identify common cloud misconfigurations that lead to breaches",
      "Apply IAM best practices in a cloud environment",
    ],
    prerequisites: [{ courseSlug: "cybersecurity-foundations" }],
    modules: [
      {
        slug: "shared-responsibility",
        title: "The Shared Responsibility Model",
        description:
          "The cloud provider secures some things; you're still responsible for the rest.",
        lessons: [
          {
            slug: "what-the-provider-secures-vs-you",
            title: "What the Provider Secures vs. What You Secure",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "Cloud providers secure the underlying infrastructure (physical data centers, host hardware, network backbone) — this is 'security of the cloud'",
              "You remain responsible for 'security in the cloud' — your data, access configuration, application code, and how you configure the services you use",
              "Misunderstanding this split is one of the most common root causes of cloud breaches — an exposed storage bucket is a customer misconfiguration, not a provider failure",
            ],
          },
          {
            slug: "common-cloud-misconfigurations",
            title: "Common Cloud Misconfigurations",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Publicly accessible storage buckets containing sensitive data are one of the most common and damaging cloud misconfigurations, often the result of a default or a copy-pasted permissive policy",
              "Overly permissive IAM policies (wildcard permissions granted 'to make it work') accumulate over time and rarely get cleaned up — audit them regularly",
              "Unencrypted data at rest and unrestricted network access rules (0.0.0.0/0 allowed) are both common findings in cloud security audits that are entirely preventable",
            ],
          },
        ],
      },
      {
        slug: "iam-best-practices",
        title: "IAM Best Practices in the Cloud",
        description:
          "Identity and access management done well — the single highest-leverage cloud security control.",
        lessons: [
          {
            slug: "iam-in-practice",
            title: "IAM Best Practices",
            kind: "code",
            durationMinutes: 17,
            points: [
              "Use roles with narrowly scoped permissions instead of broad admin access wherever possible — grant exactly what a specific task needs",
              "Enable multi-factor authentication for all accounts, especially privileged ones — this single control blocks a huge share of credential-based attacks even when a password is compromised",
              "Avoid long-lived static credentials where a service supports short-lived, automatically rotated credentials instead — a leaked long-lived key is a standing risk until manually noticed and revoked",
            ],
            code: {
              language: "json",
              code: '// Overly broad (avoid):\n{ "Effect": "Allow", "Action": "*", "Resource": "*" }\n\n// Scoped appropriately:\n{ "Effect": "Allow", "Action": ["s3:GetObject"], "Resource": "arn:aws:s3:::app-uploads/*" }',
            },
          },
          {
            slug: "cloud-security-glossary",
            title: "Cloud Security Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Shared responsibility model",
                back: "The division of security duties between a cloud provider (infrastructure) and the customer (data, configuration, access).",
              },
              {
                front: "Overly permissive IAM policy",
                back: "An access policy granting more permissions than genuinely needed, increasing risk if compromised.",
              },
              {
                front: "Multi-factor authentication (MFA)",
                back: "Requiring a second independent verification factor beyond a password, blocking most credential-based attacks.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "cloud-security-audit",
      title: "Audit a Cloud Environment for Misconfigurations",
      deliverables: [
        "An audit of a hypothetical cloud environment identifying at least 3 realistic misconfigurations",
        "IAM policy corrections for at least 2 overly permissive policies found in the audit",
      ],
      rubric: [
        "Identified misconfigurations are specific and would represent a genuine real-world risk",
        "Corrected IAM policies are properly scoped, not just relabeled versions of the original",
      ],
    },
    resources: [
      {
        title: "AWS Shared Responsibility Model",
        type: "external-link",
        url: "https://aws.amazon.com/compliance/shared-responsibility-model/",
        description: "AWS's official explanation of the shared responsibility model.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the cloud security audit"],
  },
  {
    slug: "security-compliance-basics",
    title: "Security Compliance Basics",
    subtitle:
      "What SOC 2, ISO 27001, and GDPR actually require in practice — and why compliance and security are related but not the same thing.",
    category: "cybersecurity",
    difficulty: "beginner",
    estimatedDurationMinutes: 100,
    tags: ["cybersecurity"],
    skills: ["security-fundamentals"],
    careerPaths: ["cybersecurity-analyst"],
    instructor: {
      name: "Priya Nair",
      title: "Security Engineer, ex-Cloudflare",
      avatarInitials: "PN",
    },
    objectives: [
      "Explain the purpose and scope of SOC 2, ISO 27001, and GDPR at a working level",
      "Distinguish compliance from actual security",
      "Identify common evidence needed for a compliance audit",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "major-frameworks",
        title: "Major Compliance Frameworks",
        description: "What these frameworks are actually asking for, in plain terms.",
        lessons: [
          {
            slug: "soc2-and-iso27001",
            title: "SOC 2 and ISO 27001",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "SOC 2 evaluates a service organization's controls against five trust principles (security, availability, processing integrity, confidentiality, privacy) — it's an attestation, not a pass/fail certificate, produced by an independent auditor",
              "ISO 27001 is an international standard for an information security management system — it certifies that a company has a systematic process for managing security risk, not that every possible vulnerability is fixed",
              "Both frameworks care as much about documented, followed processes as about technical controls — having a policy that nobody actually follows fails an audit just as much as having no policy",
            ],
          },
          {
            slug: "gdpr-basics",
            title: "GDPR Basics",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "GDPR governs how organizations handling EU residents' personal data must collect, process, store, and protect it — it applies based on whose data you handle, not where your company is based",
              "Data subjects have specific rights under GDPR — access to their data, correction, deletion ('right to be forgotten'), and data portability — a compliant system needs to actually support fulfilling these requests",
              "Data breach notification requirements under GDPR have strict timelines (typically 72 hours) — this is a major reason incident response planning and compliance are closely linked in practice",
            ],
          },
        ],
      },
      {
        slug: "compliance-vs-security",
        title: "Compliance vs. Actual Security",
        description: "Passing an audit and being secure are related but not identical.",
        lessons: [
          {
            slug: "compliance-is-not-security",
            title: "Why Compliance Isn't the Same as Security",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "A company can pass a compliance audit and still be genuinely insecure — compliance frameworks set a baseline of documented, auditable controls, not a guarantee against every possible attack",
              "Treating compliance as the end goal instead of a byproduct of good security practice leads to checkbox-driven controls that satisfy an auditor without meaningfully reducing risk",
              "Audit evidence (logs, policy documents, access review records) needs to be collected continuously, not assembled retroactively right before an audit — retroactive evidence is often unreliable or incomplete",
            ],
          },
          {
            slug: "compliance-glossary",
            title: "Security Compliance Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "SOC 2",
                back: "An attestation evaluating a service organization's controls against five trust principles, produced by an independent auditor.",
              },
              {
                front: "ISO 27001",
                back: "An international standard certifying a systematic information security management process.",
              },
              {
                front: "Right to be forgotten",
                back: "A GDPR data subject right requiring an organization to delete personal data upon a valid request.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "compliance-readiness-checklist",
      title: "Build a Compliance Readiness Checklist",
      deliverables: [
        "A checklist of evidence a hypothetical company would need to gather for a SOC 2 audit",
        "A short written explanation of one gap between passing this checklist and being genuinely secure",
      ],
      rubric: [
        "Checklist items reflect real evidence categories (access reviews, policy documents, logs), not vague statements",
        "The compliance-vs-security gap explanation is specific and well-reasoned",
      ],
    },
    resources: [
      {
        title: "GDPR Official Text",
        type: "external-link",
        url: "https://gdpr-info.eu/",
        description: "The full text of the EU General Data Protection Regulation.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the compliance readiness checklist"],
  },
  // ---------------------------------------------------------------
  // UX Designer path (first 4 of 8; remaining 4 in batch 4)
  // ---------------------------------------------------------------
  {
    slug: "ui-ux-design-foundations",
    title: "UI/UX Design Foundations",
    subtitle:
      "The core difference between UI and UX, and the design principles that separate an interface that works from one that just looks nice.",
    category: "ui-ux-design",
    difficulty: "beginner",
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
      "Distinguish UI design from UX design and explain how they relate",
      "Apply core visual design principles: hierarchy, contrast, alignment, proximity",
      "Critique an interface using established usability heuristics",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "ui-vs-ux",
        title: "UI vs. UX",
        description: "Two related but genuinely different disciplines, often confused.",
        lessons: [
          {
            slug: "what-ui-and-ux-actually-mean",
            title: "What UI and UX Actually Mean",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "UX (user experience) is about whether the product actually solves the user's problem well — the flow, the logic, whether it makes sense; UI (user interface) is the specific visual and interactive layer the user touches",
              "A product can have beautiful UI and terrible UX (a gorgeous form that asks for information in a confusing order) — visual polish doesn't fix a broken flow",
              "UX work happens before UI work in a healthy process — understanding the problem and flow first, then designing the visual interface to express that flow clearly",
            ],
          },
          {
            slug: "core-visual-principles",
            title: "Core Visual Design Principles",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Hierarchy guides the eye to what matters most first — achieved through size, weight, color, and position, not just making everything important look loud",
              "Contrast makes distinct elements clearly distinct, and similar elements clearly similar — insufficient contrast is one of the most common reasons an interface feels confusing without users being able to say exactly why",
              "Proximity groups related elements together and separates unrelated ones — items placed close together are perceived as related, whether or not that's intended",
              "Alignment creates order and a sense of intentionality — unaligned elements read as sloppy even when each individual element is well designed",
            ],
          },
        ],
      },
      {
        slug: "usability-heuristics",
        title: "Usability Heuristics",
        description: "A structured way to evaluate whether an interface is actually usable.",
        lessons: [
          {
            slug: "nielsens-heuristics",
            title: "Nielsen's 10 Usability Heuristics",
            kind: "reading",
            durationMinutes: 18,
            points: [
              "Visibility of system status — the interface should always keep users informed about what's happening, through appropriate feedback within reasonable time",
              "Match between system and the real world — use language and concepts familiar to users, not internal jargon or system-centric terminology",
              "User control and freedom — support undo and redo; users need a clearly marked 'emergency exit' to leave an unwanted state without a lengthy process",
              "Error prevention beats good error messages — a well-designed interface prevents problems from occurring in the first place, rather than just explaining an error after it happens",
            ],
          },
          {
            slug: "ui-ux-foundations-glossary",
            title: "UI/UX Foundations Flip Deck",
            kind: "flashcards",
            durationMinutes: 8,
            points: [],
            cards: [
              {
                front: "UX design",
                back: "Designing the overall experience and flow of a product to solve a user's problem effectively.",
              },
              {
                front: "Visual hierarchy",
                back: "Guiding the eye to what matters most through size, weight, color, and position.",
              },
              {
                front: "Usability heuristic",
                back: "A general, research-based rule of thumb used to evaluate an interface's usability.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "heuristic-evaluation",
      title: "Heuristic Evaluation of a Real Interface",
      deliverables: [
        "A heuristic evaluation of a real app or website, identifying at least 5 violations of Nielsen's heuristics",
        "A specific, actionable fix proposed for each violation",
      ],
      rubric: [
        "Each violation correctly cites the specific heuristic it breaks",
        "Proposed fixes are concrete design changes, not vague suggestions",
      ],
    },
    resources: [
      {
        title: "Nielsen Norman Group: 10 Usability Heuristics",
        type: "external-link",
        url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
        description: "The original, widely referenced usability heuristics.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the heuristic evaluation"],
  },
  {
    slug: "user-research-fundamentals",
    title: "User Research Fundamentals",
    subtitle:
      "Finding out what users actually need instead of guessing — interviews, usability testing, and turning messy qualitative data into real design decisions.",
    category: "ui-ux-design",
    difficulty: "beginner",
    estimatedDurationMinutes: 115,
    tags: ["ui-design"],
    skills: ["user-research"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Write unbiased interview questions that avoid leading the participant",
      "Plan and run a basic usability test",
      "Synthesize research notes into actionable insights",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "talking-to-users",
        title: "Talking to Users Without Leading Them",
        description:
          "The interview questions you write shape the answers you get — for better or worse.",
        lessons: [
          {
            slug: "writing-unbiased-questions",
            title: "Writing Unbiased Interview Questions",
            kind: "reading",
            durationMinutes: 17,
            free: true,
            points: [
              "A leading question ('don't you find this feature frustrating?') primes a specific answer — ask neutrally instead ('how do you feel about this feature?') and let the participant's own words reveal the sentiment",
              "Ask about past behavior, not hypothetical future behavior — 'what did you do the last time you needed to do X' produces far more reliable data than 'would you use a feature that does X'",
              "Open-ended questions ('tell me about...') surface information you didn't know to ask for — closed yes/no questions confirm what you already suspected but rarely reveal anything new",
            ],
          },
          {
            slug: "running-interviews",
            title: "Running a User Interview",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Silence after a question is uncomfortable but productive — resist the urge to fill it; participants often add their most valuable insight in the extra few seconds after they seem to have finished answering",
              "Follow up on specific, concrete details the participant mentions ('you said it took a while — how long, roughly?') rather than staying at a vague, general level",
              "Take notes on direct quotes and observed behavior, separate from your own interpretation — conflating the two makes it hard to revisit raw data later without your own bias baked in",
            ],
          },
        ],
      },
      {
        slug: "usability-testing-and-synthesis",
        title: "Usability Testing and Synthesis",
        description: "Watching someone actually use the thing, then turning that into decisions.",
        lessons: [
          {
            slug: "running-a-usability-test",
            title: "Planning and Running a Usability Test",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Give participants realistic tasks to complete ('find and book a flight to Chicago'), not instructions on how to use the interface — the goal is observing natural struggle, not confirming they can follow steps",
              "Watch for hesitation, backtracking, and confused facial expressions, not just whether the task was eventually completed — 'they got there eventually after 3 wrong turns' is still a usability problem worth fixing",
              "5 participants typically surface the majority of major usability issues in a single round of testing — you don't need a huge sample to find real, actionable problems",
            ],
          },
          {
            slug: "synthesizing-research-notes",
            title: "Synthesizing Research Into Actionable Insights",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Affinity mapping — grouping similar observations across multiple sessions into clusters — turns scattered notes into visible patterns worth acting on",
              "An insight is only actionable if it points toward a specific design implication — 'users found the checkout confusing' is an observation; 'users didn't notice the shipping cost until the final step, causing cart abandonment' is an actionable insight",
              "Prioritize insights by how many participants experienced the issue and how severe its impact was — not every observed friction point deserves equal design attention",
            ],
          },
        ],
      },
    ],
    project: {
      slug: "research-plan-and-synthesis",
      title: "Plan a Research Study and Synthesize Findings",
      deliverables: [
        "An unbiased interview guide of 6-8 questions for a realistic research goal",
        "A synthesis of 3 hypothetical research sessions into 3 prioritized, actionable insights",
      ],
      rubric: [
        "Interview questions are genuinely open-ended and free of leading language",
        "Insights are specific and actionable, not restated observations",
      ],
    },
    resources: [
      {
        title: "Nielsen Norman Group: User Interviews",
        type: "external-link",
        url: "https://www.nngroup.com/articles/user-interviews/",
        description: "A practical guide to conducting effective user interviews.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the research plan and synthesis"],
  },
  {
    slug: "wireframing-and-prototyping",
    title: "Wireframing and Prototyping",
    subtitle:
      "Going from a rough idea to a clickable prototype — low-fidelity wireframes, information architecture, and testing a flow before investing in visual polish.",
    category: "ui-ux-design",
    difficulty: "intermediate",
    estimatedDurationMinutes: 120,
    tags: ["ui-design"],
    skills: ["wireframing"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Build a low-fidelity wireframe that communicates structure without visual distraction",
      "Design a clear information architecture for a multi-screen flow",
      "Build a clickable prototype to test a flow before visual design",
    ],
    prerequisites: [{ courseSlug: "ui-ux-design-foundations" }],
    modules: [
      {
        slug: "low-fidelity-wireframing",
        title: "Low-Fidelity Wireframing",
        description: "Working in gray boxes on purpose — the case for staying rough early.",
        lessons: [
          {
            slug: "why-start-low-fidelity",
            title: "Why Start Low-Fidelity",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "Low-fidelity wireframes (boxes, gray tones, placeholder text) deliberately avoid visual polish so feedback stays focused on structure and flow, not color choices or font preferences",
              "Stakeholders give more honest, structural feedback on a rough wireframe than a polished mockup — a polished screen unconsciously signals 'this is final,' discouraging people from raising fundamental concerns",
              "Wireframes are fast to produce and fast to throw away — this matters, because early ideas should be cheap to discard when research or feedback shows they're wrong",
            ],
          },
          {
            slug: "information-architecture",
            title: "Information Architecture for Multi-Screen Flows",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "Information architecture is the structure and labeling of content and navigation — a card sort (asking users to group and label content themselves) reveals how they naturally expect information to be organized",
              "A flow diagram mapping every screen and the transitions between them catches missing states (empty states, error states, loading states) before they become a problem during actual design",
              "Navigation should reflect the user's mental model of the content, not the internal organizational structure of the company building it",
            ],
          },
        ],
      },
      {
        slug: "clickable-prototypes",
        title: "Building Clickable Prototypes",
        description: "Testing a flow feels differently before it's real code — get there fast.",
        lessons: [
          {
            slug: "prototyping-for-testing",
            title: "Prototyping to Test a Flow",
            kind: "reading",
            durationMinutes: 17,
            points: [
              "A clickable prototype linking wireframes together lets you test whether a flow actually makes sense before any code is written — catching a confusing flow here is vastly cheaper than catching it after development",
              "Prototype fidelity should match what you're testing — testing a flow's logic needs only linked low-fidelity screens; testing visual perception needs higher fidelity",
              "Test the prototype with real (or realistic) tasks, the same way you'd run a usability test on a finished product — a prototype that only the designer can navigate isn't validated yet",
            ],
          },
          {
            slug: "wireframing-glossary",
            title: "Wireframing Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Low-fidelity wireframe",
                back: "A rough, unstyled layout used to communicate structure and flow without visual distraction.",
              },
              {
                front: "Information architecture",
                back: "The structure and labeling of content and navigation within a product.",
              },
              {
                front: "Card sort",
                back: "A research method where users group and label content themselves to reveal their natural mental model.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "wireframed-flow-prototype",
      title: "Wireframe and Prototype a Multi-Screen Flow",
      deliverables: [
        "Low-fidelity wireframes for a 4-6 screen flow, including at least one empty state and one error state",
        "A clickable prototype connecting the screens for a realistic task",
      ],
      rubric: [
        "The flow accounts for edge-case states, not just the ideal happy path",
        "The prototype is genuinely testable by someone unfamiliar with the design",
      ],
    },
    resources: [
      {
        title: "Figma: Prototyping Basics",
        type: "external-link",
        url: "https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma",
        description: "Figma's official guide to building clickable prototypes.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the wireframed flow prototype"],
  },
  {
    slug: "figma-fundamentals",
    title: "Figma Fundamentals",
    subtitle:
      "The actual tool most designers use daily — frames, components, auto layout, and the habits that keep a growing file organized instead of chaotic.",
    category: "ui-ux-design",
    difficulty: "beginner",
    estimatedDurationMinutes: 110,
    tags: ["ui-design", "figma"],
    skills: ["figma-fundamentals"],
    careerPaths: ["ux-designer"],
    instructor: {
      name: "Elena Cho",
      title: "Senior Product Designer, ex-Airbnb",
      avatarInitials: "EC",
    },
    objectives: [
      "Use frames, auto layout, and constraints to build responsive-feeling layouts",
      "Build and use reusable components with variants",
      "Organize a Figma file so it stays navigable as it grows",
    ],
    prerequisites: [],
    modules: [
      {
        slug: "layout-fundamentals",
        title: "Layout Fundamentals",
        description:
          "Frames, auto layout, and constraints — the building blocks of every Figma screen.",
        lessons: [
          {
            slug: "frames-and-auto-layout",
            title: "Frames and Auto Layout",
            kind: "reading",
            durationMinutes: 16,
            free: true,
            points: [
              "A frame is Figma's container for a screen or section — unlike a plain group, frames support clipping, constraints, and auto layout",
              "Auto layout makes elements reflow automatically as content changes (like flexbox in CSS) — this is essential for anything with variable-length content, like a button whose label might change",
              "Padding, gap, and alignment settings in auto layout should be deliberate design decisions, not left at Figma's defaults — inconsistent spacing is one of the most common giveaways of an unpolished file",
            ],
          },
          {
            slug: "constraints-and-responsiveness",
            title: "Constraints and Responsive Behavior",
            kind: "reading",
            durationMinutes: 16,
            points: [
              "Constraints define how an element behaves when its parent frame is resized — pinned to a side, scaled proportionally, or centered",
              "Testing a design at multiple frame sizes early catches responsive problems before they surface in actual development handoff",
              "Combining auto layout (for flow) with constraints (for positioning within a fixed container) covers most real responsive design needs inside Figma",
            ],
          },
        ],
      },
      {
        slug: "components-and-organization",
        title: "Components and File Organization",
        description: "Building things once and reusing them, and keeping a large file navigable.",
        lessons: [
          {
            slug: "components-and-variants",
            title: "Components and Variants",
            kind: "code",
            durationMinutes: 17,
            points: [
              "A component is a reusable, master element — instances of it update automatically when the master component changes, keeping a design system consistent without manually editing every copy",
              "Variants group related versions of a component (e.g. a button's primary/secondary/disabled states) into one switchable component, rather than scattering separate unrelated components",
              "Overrides let an instance differ slightly from its master (like a specific button's label text) while still inheriting future structural updates from the master component",
            ],
            code: {
              language: "text",
              code: "Component: Button\nVariants: state=[default, hover, disabled], size=[small, large]\nAn instance placed on a screen can override just its text label while still inheriting future style updates from the master.",
            },
          },
          {
            slug: "figma-glossary",
            title: "Figma Terms Flip Deck",
            kind: "flashcards",
            durationMinutes: 7,
            points: [],
            cards: [
              {
                front: "Auto layout",
                back: "A Figma feature that makes elements reflow automatically based on content, similar to flexbox in CSS.",
              },
              {
                front: "Component variant",
                back: "A grouped, switchable version of a component representing a different state or configuration.",
              },
              {
                front: "Constraint",
                back: "A setting defining how an element behaves when its parent frame is resized.",
              },
            ],
          },
        ],
      },
    ],
    project: {
      slug: "figma-component-library",
      title: "Build a Small Component Library in Figma",
      deliverables: [
        "A set of at least 3 reusable components (e.g. button, input field, card) using auto layout",
        "At least one component with multiple variants (e.g. button states)",
      ],
      rubric: [
        "Components use auto layout correctly and reflow sensibly with different content lengths",
        "The file is organized with clear naming, not a flat unlabeled mess of layers",
      ],
    },
    resources: [
      {
        title: "Figma Learn: Auto Layout",
        type: "external-link",
        url: "https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties",
        description: "Figma's official documentation on auto layout.",
      },
    ],
    certificateCriteria: ["Complete both modules", "Submit the Figma component library"],
  },
];
