/**
 * Edit this file to personalize the portfolio.
 * Edit src/styles/design-tokens.css to restyle it.
 *
 * One portfolio = one target role. Make a copy of this file per role you apply for.
 * Dates are ISO YYYY-MM. Use end: null for current roles.
 * Skill levels are optional: "expert" | "advanced" | "working" — never percentages.
 */

export const splashScreen = {
  enabled: true,
  duration: 1600, // ms for the 20 cells to fill, before the 600ms lift
};

export const site = {
  footerText: "Kumbirai Muhwati",
};

export const profile = {
  displayHero: true,
  givenName: "Kumbirai",
  familyName: "Muhwati",
  displayName: "Kumbirai Muhwati",
  role: "Data Scientist, Security Data Science", // the one role this portfolio is for; also the page title
  headline: "Machine learning for fraud, threat and privacy problems, and the data engineering that makes it trustworthy.",
  summary:
    "I am a data scientist and Ph.D. student in Computational Sciences and Engineering at Harrisburg University, with an M.S. in Cybersecurity from Yeshiva University. I build fraud and threat detection models, privacy-preserving and federated learning systems, and auditable data pipelines for AI.",
  location: { city: "New York", region: "NY", country: "USA" },
  timeZone: "America/New_York", // IANA zone for the live clock in the hero
  email: "kmuhwati@mail.yu.edu",
  phone: "",
  phoneDisplay: "",
  availability: "open",
  resumeUrl: "resume.pdf", // public/resume.pdf, built from cv/ in the projects folder
  siteUrl: "https://kmuhwati.github.io/", // public address: canonical URL, sitemap and JSON-LD
  googleSiteVerification: "", // the content="..." value from Google Search Console's HTML-tag method
  photo: "profile.jpg", // in public/; used in search structured data (public/og-image.jpg is the share card)
  contactLead:
    "E-mail is the quickest way to reach me. I am open to data science roles in security, fraud, privacy and AI safety, in New York or remote.",
};

export const socials = {
  display: true,
  links: [
    { id: "github", label: "GitHub", url: "https://github.com/kmuhwati" },
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/kumbirai-muhwati",
    },
    { id: "email", label: "Email", url: "mailto:kmuhwati@mail.yu.edu" },
  ],
};

export const skills = {
  display: true,
  title: "Skills",
  lead: "Machine learning and statistics for security problems, on top of solid data engineering.",
  // Each category is a card. Keep 5–8 items per card so it reads at a glance.
  // Items can be plain strings, or { name, level } to show a quiet level label.
  categories: [
    {
      name: "Languages & frameworks",
      items: ["Python", "SQL", "Rust", "C#", "FastAPI", "Django / Flask"],
    },
    {
      name: "Machine learning",
      items: [
        "LightGBM & gradient boosting", "scikit-learn", "Anomaly & fraud detection", "Explainable AI (SHAP)",
        "Causal inference & A/B testing", "Forecasting",
      ],
    },
    {
      name: "AI & LLMs",
      items: ["LLM fine-tuning", "RAG & hybrid retrieval", "Embeddings & vector search", "LLM training data", "MCP", "Deepfake detection"],
    },
    {
      name: "Security data science",
      items: [
        "Federated learning", "Differential privacy", "Trusted Execution Environments", "Threat detection",
        "Zero Trust", "NIST 800-53/171 · HIPAA",
      ],
    },
    {
      name: "Data engineering & MLOps",
      items: ["pandas & Polars", "DuckDB & dbt", "Apache Iceberg", "Dagster", "Streaming & CDC", "Docker & Kubernetes", "CI/CD"],
    },
    {
      name: "Cloud & cyber operations",
      items: ["AWS", "Google Cloud", "NVIDIA GPUs (H100, A100)", "Vast.ai", "Offensive security", "Cryptography"],
    },
  ],
};

export const experience = {
  display: true,
  title: "Experience",
  items: [
    {
      id: "ushealthcloud",
      role: "AI Lead Researcher",
      organization: "UsHealthCloud",
      organizationUrl: "https://ushealthcloud.com/",
      logo: "",
      location: { city: "New York", region: "NY", country: "USA" },
      metric: { value: "$500M", label: "projected cut in breach costs" },
      start: "2025-01",
      end: null,
      summary:
        "Leads privacy-preserving ML research: fine-tuning LLMs on sensitive oncology data inside Trusted Execution Environments.",
      impact: [
        "Privacy-preserving ML research: leads the program “Artificial Intelligence-Driven Cybersecurity Framework for In-Enclave Large Language Model Fine-Tuning”, keeping oncology research data protected from state-sponsored espionage while it fine-tunes LLMs.",
        "Secure ML architecture: designed a privacy-preserving machine learning architecture combining Trusted Execution Environments with the Model Context Protocol (MCP), so healthcare institutions can collaborate on AI models without exposing patient data.",
        "ML infrastructure: scales model training on NVIDIA H100/A100 GPUs with Docker and Vast.ai, secured through the NVIDIA Inception Program, the Google for Startups Cloud Program and $7,500 in Lambda GPU Cloud credits.",
        "Quantified impact: developed a framework projecting $500M in reduced data-breach costs and a 30% reduction in clinical downtime for partner hospitals.",
      ],
      skills: ["LLM fine-tuning", "TEEs", "MCP", "Privacy-preserving ML", "Docker", "Vast.ai"],
    },
    {
      id: "hsoc-cyber",
      role: "Cyber Security Intern",
      organization: "HSOC Cyber",
      organizationUrl: "https://www.hsoc-cyber.com/",
      logo: "",
      location: { city: "New York", region: "NY", country: "USA" },
      employmentType: "internship",
      start: "2025-09",
      end: null,
      summary: "Security analytics in a security operations team: alert triage, incident data and vulnerability assessment.",
      impact: [
        "Security analytics & alert triage: analyzes security alerts and event data to separate genuine threats from false positives, escalating potential incidents to senior analysts.",
        "Incident data & reporting: creates structured incident documentation covering findings, evidence and remediation steps.",
        "Vulnerability & risk assessment: supports vulnerability assessments by gathering system data and verifying security-patch status to inform risk prioritization.",
      ],
      skills: ["Security analytics", "Threat detection", "Incident response", "Vulnerability assessment"],
    },
    {
      id: "skicc-tech",
      role: "Technical Lead, GridBox Innovation",
      organization: "Skicc Tech",
      organizationUrl: "",
      logo: "",
      location: { country: "Zimbabwe" },
      metric: { value: "$20k", label: "competitive funding won" },
      start: "2022-02",
      end: "2023-10",
      summary: "Technical lead on GridBox, an AI-powered solar mini-grid system.",
      impact: [
        "Applied AI development: played a pivotal role in developing GridBox, an AI-powered solar mini-grid system.",
        "Data & system performance: reduced data latency and improved overall system uptime by approximately 20%.",
        "Funding: helped secure $20,000 in competitive funding from the Milken-Motsepe Foundation.",
      ],
      skills: ["Applied AI", "System performance", "Technical leadership"],
    },
    {
      id: "nmb-bank",
      role: "Digital Banking Systems Engineer",
      organization: "NMB Bank",
      organizationUrl: "",
      logo: "",
      location: { country: "Zimbabwe" },
      metric: { value: "35%", label: "fewer reporting errors" },
      start: "2021-02",
      end: "2023-12",
      summary: "Risk and customer analytics, data quality automation and audit reporting for digital banking.",
      impact: [
        "Risk & customer analytics: analyzed banking data to support credit-risk assessment, customer segmentation and operational insights.",
        "Data quality automation: reduced regulatory-reporting errors by 35% by automating and standardizing data-validation checks.",
        "Risk monitoring & audit analytics: built dashboards and automated data checks to monitor key risk indicators (KRIs) and data quality; led internal audits and supported external regulatory audits.",
      ],
      skills: ["Risk analytics", "Data quality", "SQL", "Dashboards", "Audit"],
    },
  ],
};

export const education = {
  display: true,
  title: "Education",
  items: [
    {
      id: "harrisburg-phd",
      institution: "Harrisburg University of Science and Technology",
      logo: "",
      degree: "Doctor of Philosophy (Ph.D.)",
      field: "Computational Sciences and Engineering",
      start: "2026-10",
      end: null, // expected completion October 2031
      location: { city: "Harrisburg", region: "PA", country: "USA" },
      honors: ["Expected completion: October 2031"],
      coursework: ["CISC 701", "CISC 727-50"],
    },
    {
      id: "yeshiva-ms",
      institution: "Yeshiva University, Katz School of Science and Health",
      logo: "",
      degree: "Master of Science",
      field: "Cybersecurity",
      start: null,
      end: "2025-08",
      location: { city: "New York", region: "NY", country: "USA" },
      gpa: { value: 3.966, scale: 4.0 },
      honors: ["Science and Technology Fellows Scholarship ($14,390)"],
      coursework: [
        "Architecture of Secure Operating Systems",
        "Network/Data Security",
        "Cybersecurity Audit",
        "Digital Forensics",
        "Capstone Project",
      ],
    },
    {
      id: "africa-university-bsc",
      institution: "Africa University",
      logo: "",
      degree: "Bachelor of Science Honours",
      field: "Computer Information Systems",
      start: null,
      end: "2021-06",
      location: { city: "Mutare", country: "Zimbabwe" },
      gpa: { value: 3.6, scale: 4.0 },
      honors: [],
      coursework: [],
    },
  ],
};

export const projects = {
  display: true,
  title: "Projects",
  lead: "Seven end-to-end projects on public and live data, from raw files to a decision. Every figure comes from the project's own reproducible results.",
  initialCount: 3, // projects shown before "View all"
  items: [
    {
      id: "financebench-rag",
      name: "Evidence retrieval for financial QA over SEC filings",
      summary:
        "A CPU-only retrieval pipeline that finds the pages an LLM needs to answer analyst questions about 84 real 10-K, 10-Q, 8-K and earnings filings (FinanceBench).",
      outcome:
        "Raised the share of questions whose gold evidence page reaches the model from 7% to 58%.",
      metric: { value: "58%", label: "evidence recall@5, up from 7%" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "LLMs answer questions about financial filings badly when they get the wrong pages: the FinanceBench authors found GPT-4-Turbo with a shared vector store got 81% of questions wrong or refused them. Every filing talks about revenue and margins, so plain similarity search over 12,013 pages pulls evidence from the wrong company or year.",
      approach:
        "Treated retrieval as the problem and measured it page by page against analyst-annotated evidence. Parsed the PDFs into page-bounded chunks, routed each question to the right company and fiscal period with a rule-based parser, retrieved candidates with BM25 plus embeddings fused by reciprocal rank, and reranked them with a LambdaMART model on 16 finance-aware features, validated with company-grouped cross-validation.",
      results: [
        "Recall@5 rose from 7.3% (embeddings over all filings) to 58.0%; recall@1 from 5.3% to 48.7%.",
        "Beat plain hybrid search even when that search was told the correct filing (32.7%).",
        "96% recall@5 on financial-statement metric questions; the router identifies the company for 98% of questions.",
        "About 3 ms retrieval per query on a laptop CPU, with no GPU or paid embedding API.",
      ],
      impact:
        "Shows where RAG quality is won: routing on metadata the question already contains, and learning what an evidence page looks like, matter more than the choice of embedding model.",
      skills: ["Python", "RAG", "Information retrieval", "Learning to rank", "LightGBM", "BM25", "Embeddings", "PyMuPDF"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/financebench-rag-retrieval" }],
    },
    {
      id: "mobile-money-fraud",
      name: "Mobile-money fraud detection with a real-time scoring API",
      summary:
        "A fraud model and FastAPI service for 6.36 million simulated mobile-money transactions (PaySim), built around a leakage audit.",
      outcome:
        "Caught 99.7% of fraud (98.5% of fraud value) at 64% alert precision on the final eight days, through a 15× rise in fraud prevalence.",
      metric: { value: "99.7%", label: "fraud caught at 64% precision" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "Most published PaySim models score close to 100%, which no real fraud team would believe. A model that looks perfect offline and fails in production is worse than none, so the first job was to find out which signals are real.",
      approach:
        "Audited every column: post-transaction balances encode the label because fraudulent transfers were cancelled, and 97.6% of frauds move the exact full balance while 0.000% of legitimate transactions do, a simulator artefact. Trained models on three feature tiers with a time-based split, then deployed a behaviour-only LightGBM model plus the drain pattern as an explicit business rule. Served it through FastAPI with an online feature store, SHAP reason codes and a schema that rejects leaky fields, and added a PSI drift report.",
      results: [
        "Behaviour-only model: 0.54 average precision and 0.93 ROC-AUC, the estimate most likely to carry over to real data.",
        "Deployed rule + model caught 99.7% of test-period fraud at a fixed threshold; precision rose from 50% to 64% as prevalence grew.",
        "Batch and online features match row for row (parity test); 13 automated tests, a Docker image and a CI smoke test.",
        "7 ms median scoring latency per transaction, including reason codes.",
      ],
      impact:
        "Separates leakage and simulator artefacts from real signal, and ships the result the way a fraud team would run it: an auditable rule, a model, reason codes and drift monitoring.",
      skills: ["Python", "LightGBM", "FastAPI", "Docker", "Polars", "SHAP", "MLOps", "GitHub Actions"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/mobile-money-fraud-detection" }],
    },
    {
      id: "wikipedia-streaming-lakehouse",
      name: "A live Wikipedia lakehouse that keeps a RAG index fresh",
      summary:
        "A streaming pipeline from Wikipedia's live edit feed into Apache Iceberg bronze, silver and gold tables, with change data capture that keeps a LanceDB retrieval index in step with every article edit.",
      outcome:
        "Made Wikipedia edits searchable 17 seconds after they were saved, while re-embedding 96.5% fewer chunks than a full re-index.",
      metric: { value: "17 s", label: "edit saved to searchable (median)" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "A RAG system answers from whatever its index held at the last rebuild. When the source keeps changing, answers go stale between rebuilds, and re-embedding everything on every change wastes almost all of the work.",
      approach:
        "Consumed the Wikimedia EventStreams feed (about 40 events a second from 230 wikis) with a resumable consumer and an at-least-once landing zone. Built bronze, silver and gold Iceberg tables incrementally with PyIceberg and DuckDB, storing each step's offset inside its own Iceberg commit for exactly-once processing, plus an SCD2 history of every English Wikipedia article. For each new revision, fetched the exact text by revision ID, split it into paragraph chunks with content hashes, and diffed them against the live index: only changed paragraphs are embedded, and old versions are closed rather than deleted, so the same table answers as-of queries.",
      results: [
        "157,412 live events through 29 micro-batches; integrity checks pass on every layer, with one current row for each of 3,385 articles and no interval gaps.",
        "Crash-and-resume test on real data: 3,359 duplicate rows with a separate offset file, 0 with the offset in the Iceberg commit.",
        "Re-embedded 1,455 chunks where a full re-index needed 41,087; 54% of edits changed no prose at all, and the index matched a fresh chunking of all 1,001 tracked articles.",
        "For 300 paragraphs rewritten during the window, the live index returned the current text every time; an index frozen at the start returned the outdated paragraph 66% of the time.",
      ],
      impact:
        "Shows how to keep an LLM's retrieval layer current at a fraction of the embedding cost, with lakehouse guarantees (exactly-once, history, time travel) a data platform team would expect.",
      skills: ["Python", "Apache Iceberg", "Streaming", "Change data capture", "DuckDB", "LanceDB", "RAG", "SQL"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/wikipedia-streaming-lakehouse" }],
    },
    {
      id: "llm-data-refinery",
      name: "Pretraining data refinery: from raw web crawl to LLM training tokens",
      summary:
        "A Dagster pipeline that turns 339,259 raw Common Crawl web pages into a deduplicated, decontaminated, PII-redacted English corpus and tokenised training shards.",
      outcome:
        "Refined 2.26 GB of raw crawl into 46,552 documents and 62.1M tokens in about 6 minutes on a laptop CPU, with every rejection traceable to a rule.",
      metric: { value: "62.1M", label: "training tokens from 339k raw pages" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "Language models are mostly trained on filtered web crawl, and the filtering decides much of their quality. Raw crawl is mostly non-English, boilerplate or duplicated, and it can contain personal data and benchmark test questions.",
      approach:
        "Reproduced published filtering recipes (C4, Gopher, FineWeb) as Dagster assets over 16 files from the September 2026 Common Crawl: fastText language ID, exact and MinHash-LSH near-duplicate removal with vectorised NumPy signatures, 13-gram decontamination against five benchmarks, PII redaction, and a fastText quality classifier. The output is a Parquet corpus and tiktoken o200k_base shards with checksums. Per-file stages with drop logs keep memory flat and make every run idempotent.",
      results: [
        "339,259 raw pages to 46,552 documents (13.7%); 63% removed by language ID, and only 41% of English pages pass the quality rules.",
        "790 near-duplicates in 374 clusters, the largest a spare-parts catalogue copied 49 times.",
        "Five pages overlapped MMLU or HumanEval test sets, traced to primary sources the benchmarks quote, not answer sites.",
        "A 21.9M-token high-quality subset chosen by a Wikipedia-vs-web classifier (0.997 ROC AUC on held-out documents).",
      ],
      impact:
        "Shows the data work behind LLM training: auditable filtering, deduplication, decontamination and tokenisation, at a scale that runs on a laptop and code that scales out file by file.",
      skills: ["Python", "Dagster", "LLM data", "MinHash LSH", "fastText", "tiktoken", "Parquet", "NumPy"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/llm-pretraining-data-refinery" }],
    },
    {
      id: "m5-forecasting-inventory",
      name: "Probabilistic demand forecasting and inventory decisions (Walmart M5)",
      summary:
        "Daily demand forecasts with full predictive distributions for 8,230 Walmart item-store series, replayed against real sales to measure the profit each forecast earns.",
      outcome:
        "Beat per-series exponential smoothing by 19% on M5's official metric; ordering to the critical-ratio quantile earned 3.7% more profit than an AutoETS-based process.",
      metric: { value: "−19%", label: "forecast error vs AutoETS" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "A point forecast says how many will sell. A store manager needs to know how many to stock when running out loses a sale and leftovers cost money, which takes the whole demand distribution, checked against what actually sold.",
      approach:
        "Rolling-origin backtest over three 28-day windows. Compared four baselines, including AutoETS, with one global LightGBM model across all series, made horizon-aware with a scale-free target after diagnosing a 10% under-forecast in the first version. Produced quantiles by direct quantile regression and by a negative binomial around the mean, then replayed a daily order-up-to policy with lost sales and holding costs.",
      results: [
        "WRMSSE 0.559 vs 0.687 for AutoETS, better on every fold, at every hierarchy level and in every intermittency class.",
        "Ordering to the 75th percentile (the newsvendor critical ratio) earned 60.7% of perfect-foresight profit, vs 59.4% for the same model's mean and 48.0% for last week's sales.",
        "Profit across order quantiles peaks exactly at the critical ratio, and the quantiles are well calibrated (74.6% coverage at q = 0.75).",
        "Leak-proof features: a test overwrites the future and asserts that nothing changes.",
      ],
      impact:
        "Worth about $113k a year over an AutoETS-based process for one department across ten stores, under the stated margin and holding-cost assumptions.",
      skills: ["Python", "LightGBM", "Quantile regression", "statsforecast", "NumPy", "Forecasting", "Inventory optimisation"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/m5-demand-forecasting-inventory" }],
    },
    {
      id: "uplift-targeting",
      name: "Uplift modelling and profit-based targeting on a randomised experiment",
      summary:
        "A readout of a 64,000-customer, three-arm e-mail experiment, six uplift learners, and a profit-based send policy valued with off-policy evaluation.",
      outcome:
        "Showed that no targeting model beats sending the men's e-mail to everyone at current contact costs, and found the break-even above which targeting pays.",
      metric: { value: "$0.27", label: "break-even cost per e-mail" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "Marketing wanted to know which e-mail worked and whether a model could save money by e-mailing only the customers the e-mail actually changes. The usual answer, a response model that ranks likely buyers, targets people who would have bought anyway.",
      approach:
        "Validated the experiment with sample-ratio and balance checks, estimated effects with covariate adjustment and Holm correction, then compared S-, T-, X- and DR-learners, a causal forest and a response model using 5-fold cross-fitting and Qini curves. Chose policy models with nested cross-validation and valued every policy with doubly robust off-policy evaluation, paired against the current blanket send, across a sweep of contact costs.",
      results: [
        "The men's e-mail lifted spend by $0.77 per customer (+118%); the women's e-mail by $0.43 (+65%).",
        "Uplift models beat the response model where the effect is concentrated (women's e-mail visits: Qini 0.0034 vs 0.0020).",
        "At $0.15 per contact the best targeting policy was −$21 per 1,000 customers vs blanket sending (95% CI −$110 to +$62); at $0.60 it was +$268 (CI +$171 to +$366).",
        "Proving a $30-per-1,000 targeting gain would take about 1.07 million customers.",
      ],
      impact:
        "An evidence-based recommendation not to ship a targeting model yet, with the exact conditions under which targeting starts to pay and the test size needed to prove it.",
      skills: ["Python", "Causal inference", "A/B testing", "EconML", "LightGBM", "statsmodels", "Off-policy evaluation"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/uplift-targeting-hillstrom" }],
    },
    {
      id: "olist-analytics",
      name: "Analytics engineering for a 99k-order marketplace (Olist)",
      summary:
        "A tested dbt + DuckDB warehouse built from nine raw tables, and an analysis of what late deliveries cost a Brazilian marketplace.",
      outcome:
        "Found that a late order is 46 points more likely to get a 1-star review, and that 63 sellers cause 13% of late deliveries on 5% of volume.",
      metric: { value: "+46 pp", label: "1-star risk when an order is late" },
      role: "Independent project",
      start: "2026-10",
      end: "2026-10",
      problem:
        "The raw exports had integer-typed zip codes, a new customer ID on every order, duplicate reviews and off-map coordinates. The business questions (what lateness costs, where it comes from, whether delivery promises could be shorter) needed a trustworthy warehouse first.",
      approach:
        "Built 18 dbt models (staging, intermediate, marts) on DuckDB with 43 data tests, including tolerance-based contracts. Estimated the late-delivery effect with fixed effects and seller-clustered errors, ranked sellers by late-delivery rate, and built a quantile ETA model with nowcast features, retrained monthly without label leakage or censoring bias.",
      results: [
        "Late orders: +46 pp chance of a 1-star review after controls (95% CI 45 to 47 pp); the damage is a cliff after three days late.",
        "63 sellers (5% of orders) cause 13% of late deliveries; bringing them to the median would avoid about 8.5% of late orders.",
        "Olist's delivery promise sits close to the model's frontier: the model matches its 92% on-time rate with promises about 1.1 days shorter.",
        "All 61 dbt nodes (18 models and 43 tests) pass on every build.",
      ],
      impact:
        "Points operations at the cheapest lever, a small group of sellers, and turns the delivery-promise question into an A/B test with a known review cost.",
      skills: ["SQL", "dbt", "DuckDB", "Python", "statsmodels", "LightGBM", "Data quality"],
      links: [{ kind: "repo", label: "Source", url: "https://github.com/kmuhwati/olist-analytics-engineering" }],
    },
  ],
};

export const openSource = {
  display: false,
  showGithubProfile: false,
};

// Wording and links below are copied from the CV unchanged.
export const credentials = {
  display: true,
  title: "Credentials",
  lead: "Certifications, recognition and volunteering, listed separately because they are not the same kind of evidence.",
  initialCount: 4, // rows shown before "View all"
  items: [
    { id: "ccsk-v5", kind: "certification", name: "Certificate of Cloud Security Knowledge v5", image: "",
      credentialUrl: "https://www.credly.com/badges/beccb060-0866-435c-b868-45d3a301586f" },
    { id: "ncl", kind: "certification", name: "National Cyber League", image: "",
      credentialUrl: "https://cyberskyline.com/verify/AMAV89NVB3RG" },
    { id: "isc2-cyber-pathway", kind: "certification", name: "ISC2 Cyber Pathway", image: "",
      credentialUrl: "https://drive.google.com/file/d/1gdRz4uN7GSk6Mx5y8GkjGRXImg_DZW4G/view?usp=drive_link" },
    { id: "isc2-ctf", kind: "certification", name: "ISC2 Capture The Flag", image: "",
      credentialUrl: "https://drive.google.com/file/d/138r6OR1wcjQaIbaG1WkqPdesd_X7phE7/view?usp=sharing" },
    { id: "ai-in-healthcare", kind: "certification", name: "AI in Healthcare Specialization", image: "" },
    { id: "nvidia-associate", kind: "certification", name: "Nvidia Certified Associate", image: "" },
    { id: "zero-trust", kind: "certification", name: "Certificate of Competence in Zero Trust", image: "",
      credentialUrl: "https://www.credly.com/badges/2bdbb977-2b3b-4974-a534-a822e8411730" },
    { id: "red-hat-sysadmin", kind: "certification", name: "Red Hat System Administration", image: "",
      credentialUrl: "https://rha.ole.redhat.com/rha/api/certificates/attendance/uuid/851d8f42-13ce-4ca5-87f2-23911fa42f6e" },
    { id: "cyberbit-soc", kind: "certification", name: "Cyberbit-SOC Lab Program", image: "",
      credentialUrl: "https://www.credential.net/896ef21b-e806-49f4-a910-119342779b0f" },
    { id: "isaca-membership", kind: "membership", name: "ISACA Membership", image: "",
      credentialUrl: "https://drive.google.com/file/d/1FjpTg1j8YUBJdlHES37gMHqA3eyvIqfI/view?usp=drive_link" },

    { id: "innovator-nominee", kind: "award", image: "",
      name: "Cybersecurity Innovator of the Year Nominee: 2026 Cybersecurity Excellence Awards." },
    { id: "judge-2025", kind: "award", image: "",
      name: "Judge: 2025 Global Recognition Awards (Evaluated 20 shortlisted nominees) & 2025 Globee® Awards." },
    { id: "isc2-li-ctf", kind: "award", image: "",
      name: "Participant: (ISC)² Long Island 4th Annual Capture the Flag Competition (March 2025)." },
    { id: "ncl-fall-2025", kind: "award", image: "",
      name: "94th Percentile (Rank 38th/620): National Cyber League (NCL) Fall 2025 Individual Game.",
      summary:
        "Perfect Scores (300/300): Web Application Exploitation, Scanning & Reconnaissance. High Proficiency: Cryptography (90.5%), Password Cracking (80%).",
      links: [{ label: "Report", url: "https://drive.google.com/file/d/1LpfZOQ7xK4P3lkx22iR9WwwiCKfyh3Up/view?usp=drive_link" }] },

    { id: "vol-isaca", kind: "volunteering", image: "", name: "Member: ISACA (Since March 2025)." },
    { id: "vol-isc2-nj", kind: "volunteering", image: "",
      name: "Facilitator: ISC2 New Jersey Chapter Spring 2025 Cyber Pathways Event." },
    { id: "vol-cyberforce", kind: "volunteering", image: "", name: "Support: 2025 CyberForce Competition." },
    { id: "vol-st-pauls", kind: "volunteering", image: "",
      name: "IT Support: St. Paul’s Memorial Church (Digital literacy training for senior parishioners)." },
  ],
};

export const publications = {
  display: true,
  title: "Research",
  lead: "Research on secure and privacy-preserving machine learning in healthcare, finance and critical infrastructure.",
  initialCount: 3, // citations shown before "View all"
  items: [
    {
      title: "Mitigating Deepfake-based Impersonation and Synthetic Data Risks in Remote Healthcare Systems",
      authors: ["Muhwati, K."],
      status: "published",
      date: "2025-09",
      venue: null,
      url: null,
      keyFinding: ">95% detection accuracy for deepfakes; eliminated session compromise in <2 seconds.",
    },
    {
      title: "A Federated Learning Approach to Secure AI-Based Patient Outcome Prediction Across Hospitals",
      authors: ["Muhwati, K."],
      status: "accepted",
      date: "2025-08",
      venue: null,
      url: null,
      keyFinding: "Achieved <3% performance degradation compared to centralized training while preserving privacy.",
    },
    {
      title: "Machine learning and Blockchain approaches for enhancing fraud prevention in financial transactions",
      authors: ["Muhwati, K."],
      status: "published",
      date: "2025-07",
      venue: null,
      url: null,
      keyFinding: "Random Forest model achieved 99.9% accuracy/precision.",
    },
    {
      title: "Mitigating Ransomware in the Energy and Healthcare Sectors through Layered Defense Strategies",
      authors: ["Muhwati, K."],
      status: "accepted",
      date: "2025-06",
      venue: null,
      url: null,
      keyFinding: "Layered defense delayed lateral movement by >20 mins and postponed encryption by 45 mins.",
    },
    {
      title: "The Role of AI in Strengthening Privacy and Security in the Era of Cyber Crime",
      authors: ["Muhwati, K."],
      status: "accepted",
      date: "2025-05",
      venue: null,
      url: null,
      keyFinding: "Gradient Boosting Classifier achieved 91.3% accuracy in identifying attack traffic with an AUC score of 1.00.",
    },
  ],
};

export const blogs = {
  display: false,
  title: "Writing",
  lead: "",
  useMedium: false,
  items: [],
};

export const talks = {
  display: false,
  title: "Talks",
  items: [],
};

export const podcast = {
  display: false,
  title: "Podcast",
  items: [],
};

export const twitter = {
  display: false,
  userName: "",
};
