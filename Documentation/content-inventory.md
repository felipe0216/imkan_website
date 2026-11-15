# Content inventory (original wording)

Purpose: the exact, original wording of the current Imkan.ai website, kept as the reference for the static HTML redesign. The rule is "design first, keep the wording as much as possible". Any wording change made during the redesign must be logged against this file in `Documentation/wording-changes.md`.

- Date: 2026-11-16
- Source: taken from the React site on the `claude/skills-review-bc3974` branch.
- Strings are copied exactly as written in the source (spelling, capitalization, punctuation, numbers). Typos are not fixed.
- Where CSS changes how text looks (for example `uppercase`), the source text is given and the visual effect is noted, e.g. `(shown uppercase via CSS)`.
- Where a string is split across JSX elements, the full sentence is given, with the styled part in brackets, e.g. `[highlight: "Future?"]`.
- `{...}` marks a value filled in at runtime.
- Not inventoried: `components/Team_full.tsx` (dead file, not imported) and the text inside `components/HeroBackground.tsx` (see Home: Hero).

---

## Site meta (index.html)

Source: `index.html` lines 6-12

| Field | Text |
|---|---|
| `<title>` | Imkan.ai - Engineering Excellence |
| meta description | Saudi Arabia's premier AI and data engineering consultancy. We deliver production-grade data platforms, agentic AI, and intelligent automation aligned with Vision 2030. Elite engineering in weeks, not quarters. |
| html lang | en |
| favicon | /favicon.svg (alternate and apple-touch icon: /favicon-512.svg) |

Routes (from `App.tsx`): `/careers` renders the Careers page; any other path renders the home page (Hero, Services, Methodology, Why Us, Case studies, Team). The Navbar, Footer and Contact form appear on both.

---

## Navigation

Source: `components/Navbar.tsx` lines 85-330

### Logo
- Image: `/images/logos/imkan-logo-horizontal.png`, alt: `imkan.ai`, links to `#home`

### Desktop nav (pill), in order
| Label | Target |
|---|---|
| Home | #home |
| Services | #services |
| Methodology | #methodology |
| Why Us | #why-us |
| Cases | #cases |
| About | #about |
| Careers | /careers |

### Desktop right side
- Link: Portal (with outward arrow icon), opens in new tab. href: `https://imkandotai.sharepoint.com/sites/imkan/Shared%20Documents/Forms/AllItems.aspx?viewid=6a263fc2%2Dbe1d%2D4abb%2Dbbea%2D47dd4893d73e` (shown from `lg` up only)
- Button: Get in Touch (opens contact form)

### Mobile menu
- Toggle button: icon only (menu / close), no aria-label
- Same links as desktop, in the same order: Home, Services, Methodology, Why Us, Cases, About, Careers
- Button: Get in Touch
- Link: Portal (same SharePoint href as above, new tab)

---

## Home: Hero

Source: `components/Hero.tsx` lines 30-77

- H1: Possibility? Engineered! [line break after "Possibility?"; highlight (animated gradient): "Engineered!"; the "!" is separately colored primary and pulses]
- Paragraph: Empowering the future with elite Data Engineering, Agentic AI solutions, and Autonomous Intelligence. [line break after "Data Engineering," on md and up]
- Button: Get in Touch (opens contact form, arrow icon)
- Button: Why Us? (scrolls to #why-us)
- Scroll indicator: icon only (keyboard_arrow_down), no text

Background: `components/HeroBackground.tsx` renders an animated, decorative fictional product mock (SQL/dashboard scenes) behind the hero. Its text is not inventoried because it will be dropped in the redesign.

---

## Home: Services

Source: `components/Services.tsx` (data lines 18-95, section lines 126-283, modal lines 286-380)

### Section header
- Eyebrow (h2): Our Services (shown uppercase via CSS)
- Heading (h1): We work with leaders ready to act on Data & AI
- Intro: Not sure where to start? Stuck after strategy? We meet you where you are and move you forward.

### Card labels (repeated on every card)
- Stage number: 01, 02, 03, 04
- Label above the pain quote: Sound familiar? (shown uppercase via CSS)
- The pain quote is wrapped in curly quotes: “{pain}”
- Card link text: the service `cta` (see each service)

### Modal labels (repeated for every service)
- Label above pain quote: What we hear from leaders (shown uppercase via CSS)
- Heading: What it is (shown uppercase via CSS)
- Label: The goal (shown uppercase via CSS)
- Heading: How to get there (followed by a numbered list 1-4)
- Button: Book Consultation (opens contact form)
- Close button: icon only, no aria-label

### Service 1 (id: strategy)
| Field | Text |
|---|---|
| subtitle (tag, uppercase via CSS; modal sidebar heading) | Data Strategy & Architecture |
| title | Build a strategy worth executing |
| pain | We don't know where to start our data journey |
| teaser (card) | Everyone says to "become data-driven", but no one shows you the first move. Here is how a real data strategy actually begins, and where it should take you. |
| cta | Find out how |
| description (modal, "What it is") | A clear, plain-English plan for turning the data you already collect into faster, better business decisions. It starts with the decisions you want to improve, not with technology. |
| goal (modal, "The goal") | A prioritized roadmap where every data investment is tied to a real business outcome. |
| image | /images/services/strategy.jpg (alt = title) |

How to get there:
1. Start with the decisions that matter, not the data you happen to have
2. Map each decision to the questions and data that answer it
3. Assess your current data, tools, and gaps honestly
4. Prioritize a roadmap where every step has a clear business payoff

### Service 2 (id: engineering)
| Field | Text |
|---|---|
| subtitle | Engineering & Data Preparation |
| title | Make your data work for you |
| pain | Our data is a mess: scattered, unreliable, siloed |
| teaser | Spreadsheets here, systems there, numbers that never match. Here is how scattered data becomes one source of truth your whole team can rely on. |
| cta | How to fix it |
| description | The work of pulling all your scattered data into one clean, reliable place, so everyone works from the same trustworthy numbers instead of arguing over whose spreadsheet is right. |
| goal | A single source of truth that is accurate, always up to date, and ready for reporting or AI. |
| image | /images/services/data-platform.png (alt = title) |

How to get there:
1. Connect your scattered sources into one place
2. Clean and standardize until the numbers finally agree
3. Automate the flow so data stays fresh on its own
4. Add quality checks that catch errors before you do

### Service 3 (id: agentic)
| Field | Text |
|---|---|
| subtitle | AI & Automation |
| title | Deploy AI that saves you time |
| pain | We're still doing manually what machines should handle |
| teaser | If your team spends hours copying, checking, and chasing information, that is work software can do. Here is how to spot it and hand it off. |
| cta | See the possibilities |
| description | Letting software handle the repetitive, rules-based work your team does by hand today, like reading documents, sorting requests, or moving data between systems, so people focus on judgment instead of busywork. |
| goal | Measurable time and cost saved, with your people in control of the decisions that matter. |
| image | /images/services/agentic-ai.png (alt = title) |

How to get there:
1. Spot the repetitive, high-volume tasks that drain your team
2. Automate the predictable steps first for fast wins
3. Add AI where reading, sorting, or answering is needed
4. Keep people in control of the decisions that matter

### Service 4 (id: decision)
| Field | Text |
|---|---|
| subtitle | Insights & Action |
| title | Turn insights into decisions |
| pain | We have dashboards, but still cannot make fast decisions |
| teaser | More charts do not mean more clarity. Here is how to turn the data you already have into decisions your team can act on today. |
| cta | Learn how |
| description | Turning the dashboards you already have into clear answers and next steps. Most companies do not have a data problem, they have a decision problem, and this closes that gap. |
| goal | Faster, more confident decisions, made every single day. |
| image | /images/services/data-visu.png (alt = title) |

How to get there:
1. Start from the decisions your teams make every week
2. Design each view to answer one clear question
3. Add targets, trends, and alerts so the "so what" is obvious
4. Put answers in front of people the moment they decide

---

## Home: Methodology

Source: `components/Methodology.tsx` (data lines 16-68, cards lines 116-267, modal lines 270-334)

### Section header
- Eyebrow (h2): Our Framework (shown uppercase via CSS)
- Heading (h1): Context First [highlight: "First"]
- Intro: We don't just write code. We deconstruct problems to align engineering goals with business reality through a rigorous three-stage process.

### Timeline cards (text is hardcoded in the JSX, not read from the data)

Step 1, THINK (lines 162-171)
- Title: THINK
- Subtitle (hardcoded uppercase): START WITH THE RIGHT PROBLEM
- Text: The most expensive mistake in data and AI is building the wrong thing. Before we touch any technology, we get clear on the decision you actually want to improve.
- Tagline (straight quotes in source): "Clarity before code."
- Tags: Discovery / Planning

Step 2, BUILD (lines 212-221)
- Title: BUILD
- Subtitle (hardcoded uppercase): BUILD ON WHAT YOU ALREADY OWN
- Text: You should not have to rip out your systems and start over. We build on the tools and infrastructure you already pay for, so your team adopts it naturally.
- Tagline: "No rip-and-replace. High adoption, low pressure."
- Tags: Low disruption / High adoption

Step 3, EVOLVE (lines 244-253)
- Title: EVOLVE
- Subtitle (hardcoded uppercase): A PARTNER, NOT A VENDOR
- Text: We do not disappear once the project ships. We stay on to support and improve well after delivery, so your investment keeps paying off long after go-live.
- Tagline: "You don't get a vendor. You get a partner."
- Tags: Long-term support / Partnership

### Modal labels (repeated for every step)
- Sidebar heading: the step title (THINK / BUILD / EVOLVE)
- Subtitle (shown uppercase via CSS), then tagline in curly quotes: “{tagline}”
- Heading: What this looks like in practice
- Button: Close
- Top-right close button: icon only, no aria-label

### Step data: THINK (id: think)
| Field | Text |
|---|---|
| title | THINK |
| subtitle | Start with the right problem |
| description | The most expensive mistake in data and AI is building the wrong thing. Before we touch any technology, we get clear on the decision you actually want to improve. (not rendered from data; the card repeats it as hardcoded text) |
| tagline | Clarity before code. |
| longDescription | The biggest risk in any data or AI project is not the technology, it is spending months and budget building something nobody needed. So we start with your business, not our tools. We pin down the decisions that matter, agree on what success looks like in plain numbers, and check your data and what is realistic today. You walk away with a clear plan and honest expectations, confident you are solving the right problem before a single line of code is written. |
| image | /images/methodology/think.png (alt: THINK) |

What this looks like in practice:
- Understand the decisions you want to improve
- Define what success looks like, in plain numbers
- Check your data and what is realistic today
- Agree on a clear plan before any building starts

### Step data: BUILD (id: build)
| Field | Text |
|---|---|
| title | BUILD |
| subtitle | Build on what you already own |
| description | You should not have to rip out your systems and start over. We build on the tools and infrastructure you already pay for, so your team adopts it naturally. (not rendered from data; duplicated as hardcoded card text) |
| tagline | No rip-and-replace. High adoption, low pressure. |
| longDescription | This is where most consultancies push you toward expensive new platforms. We do the opposite. Wherever possible, we build on the infrastructure and tools you already own, which keeps costs down, speeds up delivery, and makes adoption far easier because your team is not learning everything from scratch. You still get production-grade systems that are secure, reliable, and built to scale, delivered in small working steps with as little disruption to your day-to-day as possible. |
| image | /images/methodology/build.png (alt: BUILD) |

What this looks like in practice:
- Reuse the infrastructure and tools you already have
- Deliver in small, working steps, not a big-bang launch
- Build to production standards: secure and reliable
- Make adoption easy so your team actually uses it

### Step data: EVOLVE (id: evolve)
| Field | Text |
|---|---|
| title | EVOLVE |
| subtitle | A partner, not a vendor |
| description | We do not disappear once the project ships. We stay on to support and improve well after delivery, so your investment keeps paying off long after go-live. (not rendered from data; duplicated as hardcoded card text) |
| tagline | You don't get a vendor. You get a partner. |
| longDescription | Most projects are handed over and forgotten. We see go-live as the beginning, not the end. We stay on well beyond delivery to monitor performance, fix issues early, train your team so they become self-sufficient, and keep improving the solution as your needs change. Data and AI are not "set and forget", and we make sure yours keep delivering value for the long run. With us, you do not get a vendor who vanishes after the invoice, you get a partner invested in your success. |
| image | /images/methodology/evolve.png (alt: EVOLVE) |

What this looks like in practice:
- Ongoing support well beyond project delivery
- Monitor performance and catch issues early
- Train your team so they become self-sufficient
- Keep improving as your business evolves

---

## Home: Why Us

Source: `components/WhyUs.tsx` (data lines 15-124, section lines 140-222, modal lines 224-285)

### Section header
- Eyebrow: The imkan.ai Advantage (shown uppercase via CSS, except "imkan.ai" which stays lowercase)
- Heading (h2): Engineering Without Friction. [line break after "Engineering"; gradient: "Without Friction."]
- Intro: No account managers. No junior-only teams. No endless discovery phases. Just senior engineers building production-grade systems aligned with Vision 2030.

### Card and modal labels (repeated)
- Card link: Learn more
- Highlight chip (with bolt icon): the item `highlight`
- Modal heading: What this means for you
- Modal button: Close
- Modal top-right close button: aria-label `Close`

### 1. Prove Before You Pay
| Field | Text |
|---|---|
| title | Prove Before You Pay |
| subtitle (uppercase via CSS) | Zero-risk proof of value |
| description | We spend 6-8 weeks on one of your real use cases, completely free, and hand you a working solution. You only commit once you have seen measurable results. |
| highlight | 6-8 weeks free |

What this means for you:
- 6-8 weeks of dedicated senior engineering on a real business use case
- A functional, working solution that operates well, not a slide deck
- Zero financial commitment until you see measurable results
- Work with the same founder-led team you would engage ongoing
- Complete IP ownership. Everything we build is yours to keep
- Smooth transition to a full engagement after proof of value

### 2. We Meet You Where You Are
| Field | Text |
|---|---|
| title | We Meet You Where You Are |
| subtitle | Your stack, your pace |
| description | No dedicated tech team or complex infrastructure? No problem. We build smart solutions on top of the tools you already know, then train your team to own them. |
| highlight | Zero disruption |

What this means for you:
- We build on your familiar tools and technologies, not ours
- No new platforms unless truly needed, so your team stays comfortable
- A progressive Tier 0 to 3 journey at a pace that fits your organization
- We train your team to own, maintain, and extend what we build
- Upskilling so your people can create new solutions themselves
- Seamless adoption with zero disruption to your daily operations

### 3. Founders at the Front
| Field | Text |
|---|---|
| title | Founders at the Front |
| subtitle | Direct senior leadership |
| description | Every project is led directly by our founders and senior engineers, from strategy through production. No account managers, no junior-only teams, no hand-offs. |
| highlight | 100% founder oversight |

What this means for you:
- Founders actively leading architecture and delivery decisions throughout
- Curated team of mid and senior engineers under direct founder oversight
- No delegation to junior consultants or account managers
- Active code reviews, sprint planning, and technical governance
- Full accountability from strategy through production deployment
- Tight alignment between business objectives and technical execution

### 4. Agentic AI Pioneers
| Field | Text |
|---|---|
| title | Agentic AI Pioneers |
| subtitle | AI that takes action |
| description | We go beyond dashboards. We build AI that reads documents, answers questions in plain language, and handles real work in Arabic and English, around the clock. |
| highlight | 24/7 · Arabic & English |

What this means for you:
- Document processing that extracts key information from invoices, contracts, and forms
- Talk to your database in plain language and get instant answers without writing queries
- Chat with your files and folders to find information across thousands of documents
- Entity recognition that pulls names, dates, amounts, and clauses from any text
- Voice assistants in Arabic and English handling customer inquiries 24/7
- Smart classification and routing of emails, tickets, and incoming requests

### 5. Built for the Kingdom
| Field | Text |
|---|---|
| title | Built for the Kingdom |
| subtitle | Engineered around Vision 2030 |
| description | Saudi-ready from day one. Your data stays in the Kingdom, PDPL, NCA, and CITC compliance is built in, and every solution advances your Vision 2030 goals. |
| highlight | 100% data in KSA |

What this means for you:
- Built to qualify for Vision 2030 funding programs and government RFPs from day one
- Your data never crosses borders, eliminating cross-jurisdiction legal exposure
- One engagement covers cloud, compliance, audits, and integrations instead of juggling vendors
- PDPL, NCA, and CITC requirements baked into every system from the start, not bolted on later
- Skip months of audit preparation and the cost of full-time compliance specialists
- Native Arabic and Gulf dialect handling where international AI models consistently fall short

### 6. Proven Accelerators
| Field | Text |
|---|---|
| title | Proven Accelerators |
| subtitle | Start 50% ahead |
| description | Reusable components refined across 15+ production deployments mean no greenfield. Your first working version ships in weeks, and budget goes to what sets you apart. |
| highlight | 15+ deployments |

What this means for you:
- Skip 3 to 6 months of greenfield work reinventing pipelines, dashboards, and integrations
- Inherit production lessons from 15+ live deployments instead of discovering them yourself
- First working version live in weeks instead of waiting a full quarter for a prototype
- Your budget goes to what makes you different, not the plumbing every project needs
- 10+ proven accelerators across data pipelines, AI agents, dashboards, and integrations
- Avoid the cost overruns and surprises that sink most greenfield enterprise projects

---

## Home: Case studies

Source: `components/CaseStudies.tsx` (data lines 21-275, section lines 366-623, modal lines 625-764)

### Section header
- Eyebrow (h2): Production Systems (shown uppercase via CSS)
- Heading (h1): Proven Impact [highlight: "Impact"]
- Intro: 15+ production-grade AI and data solutions delivering measurable results across banking, logistics, healthcare, and beyond.

### Carousel labels
- Card: category tag (uppercase via CSS), stat + statLabel (shown on hover; statLabel uppercase via CSS), title, description, tech badges (uppercase via CSS), button "Read More"
- The first 5 cases show by default. After case 5, a CTA card:
  - Heading: 5 More Solutions
  - Text: Explore our full portfolio of production AI systems
  - Button: See All Solutions
- When expanded (cases 6-11 shown), button below: Show Less
- Arrow buttons: aria-label `Scroll left` / `Scroll right`

### Modal labels (repeated for every case)
- Header: category tag, tech badges, title, stat, statLabel
- Headings, in order: Overview / The Challenge / Our Solution / Impact & Results / Technology Stack
- Buttons: Start Similar Project (opens contact form) / Close
- Top-right close button: icon only, no aria-label

### 1. Banking Fraud Detection in Real-Time
Suggested slug: `banking-fraud-detection-in-real-time`

| Field | Text |
|---|---|
| title | Banking Fraud Detection in Real-Time |
| category | Banking & Financial Services |
| stat | <10s |
| statLabel | Detection Time (was 1 day) |
| description (card) | Automated AI pipeline for real-time log analysis |
| fullDescription (Overview) | Built a production-grade real-time anomaly detection platform for a national financial institution, replacing manual log analysis processes with intelligent automation. |
| challenge | The bank's security team was manually reviewing system logs, taking up to 1 day to identify anomalies. Rule-based monitoring systems missed unknown threats and generated excessive false positives. |
| solution | Deployed a Kafka-powered streaming pipeline with custom ML models trained on historical patterns. The system processes logs in real-time, automatically identifies both known and unknown anomalies, and alerts the security team within seconds. |
| tech (badges) | Kafka / AWS Kinesis / Databricks |
| techStackDetailed | Apache Kafka for event streaming, AWS Kinesis for data ingestion, Databricks (Spark) for distributed ML processing, Python (scikit-learn, TensorFlow) for anomaly detection models, AWS S3 for data lake storage, Amazon RDS (PostgreSQL) for metadata management, Grafana for monitoring dashboards, AWS Lambda for serverless alerting. |
| image | /images/use_cases/fraud_detection_security.png |

Impact & Results:
- Reduced detection time from ~1 day to under 10 seconds (8,640x improvement)
- Identified unknown anomalies that rule-based systems completely missed
- Eliminated manual log review, freeing up 40+ hours per week for security team
- Decreased false positive rate by 75% through ML-based pattern recognition

### 2. Smart Lead Scoring for Property Sales
Suggested slug: `smart-lead-scoring-for-property-sales`

| Field | Text |
|---|---|
| title | Smart Lead Scoring for Property Sales |
| category | Real Estate & PropTech |
| stat | 5x |
| statLabel | Lead Conversion Rate |
| description | Predictive models for high-intent buyer targeting |
| fullDescription | Developed a predictive market intelligence platform for a national real estate company, transforming their sales and marketing approach with AI-driven lead scoring and customer targeting. |
| challenge | The real estate platform was experiencing a baseline conversion rate of 1 in 20 leads (5%), resulting in high customer acquisition costs and inefficient sales team allocation. They had massive amounts of customer data but no way to identify high-intent buyers. |
| solution | Built predictive ML models analyzing historical transaction patterns, browsing behavior, property preferences, and market signals. The system scores leads in real-time and provides hyper-targeted property recommendations, enabling sales teams to focus on high-probability conversions. |
| tech | Azure ML / Power BI / Snowflake |
| techStackDetailed | Azure Machine Learning for model training and deployment, Snowflake for cloud data warehouse, Azure Synapse Analytics for data integration, Python (XGBoost, LightGBM) for gradient boosting models, Power BI for business intelligence dashboards, Azure Data Factory for ETL orchestration, Azure Cosmos DB for real-time user activity tracking, REST APIs for CRM integration. |
| image | /images/use_cases/real_estate.png |

Impact & Results:
- Increased lead conversion rate to 1 in 4 (25%) - a 5x improvement
- Reduced customer acquisition costs by over 50%
- Enabled hyper-targeted sales and marketing campaigns
- Accelerated average sales cycle by 30% through better qualification

### 3. Route Optimization for Last-Mile Delivery
Suggested slug: `route-optimization-for-last-mile-delivery`

| Field | Text |
|---|---|
| title | Route Optimization for Last-Mile Delivery |
| category | Logistics & Delivery |
| stat | -32% |
| statLabel | Operational Costs |
| description | Simulation-based route and courier pay optimization |
| fullDescription | Engineered a comprehensive logistics optimization system for a regional delivery network, combining route optimization with dynamic courier compensation modeling to balance efficiency with satisfaction. |
| challenge | The logistics company faced rising operational costs, inconsistent courier satisfaction, and inefficient route planning. Traditional optimization tools didn't account for real-world factors like traffic patterns, courier preferences, and dynamic pricing needs. |
| solution | Developed a simulation-based optimization engine that models various courier pay strategies and route configurations before deployment. The system uses historical data, traffic patterns, and courier feedback to generate optimal routes while ensuring fair compensation that improves retention. |
| tech | Google OR-Tools / GCP BigQuery / Vertex AI |
| techStackDetailed | Google OR-Tools for vehicle routing optimization, GCP BigQuery for data warehousing and analytics, Vertex AI for predictive demand forecasting, Python (SimPy, NumPy) for discrete event simulation, Google Maps API for real-time traffic data, Cloud Run for containerized microservices, Firestore for real-time courier tracking, Looker for operational dashboards. |
| image | /images/use_cases/route_optimization.png |

Impact & Results:
- Reduced operational costs by 32% through intelligent route optimization
- Increased courier satisfaction scores by 20%
- Decreased average delivery time by 18%
- Validated all changes through simulation before rollout, eliminating costly mistakes

### 4. Credit Risk Scoring with Machine Learning
Suggested slug: `credit-risk-scoring-with-machine-learning`

| Field | Text |
|---|---|
| title | Credit Risk Scoring with Machine Learning |
| category | Banking & Financial Services |
| stat | 70% |
| statLabel | Automated Decisions |
| description | Automated credit decisions and customer value prediction |
| fullDescription | Developed automated credit risk assessment and customer lifetime value (CLV) modeling systems for a digital lending platform, enabling data-driven underwriting and retention strategies. |
| challenge | Manual credit assessment was slow, inconsistent, and couldn't scale with growing loan applications. No systematic approach to predicting customer lifetime value meant missed upsell opportunities and reactive retention efforts. |
| solution | Built ML models analyzing credit history, transaction patterns, employment data, and behavioral signals to predict default risk and early repayment probability. Developed CLV models identifying high-value customers for targeted retention and product recommendations. |
| tech | Snowflake / AWS SageMaker / Tableau |
| techStackDetailed | Snowflake for cloud data warehouse, AWS SageMaker for ML model training and deployment, Python (XGBoost, CatBoost) for gradient boosting classifiers, AWS Lambda for serverless scoring APIs, Amazon S3 for feature storage, Tableau for risk analytics dashboards, AWS Step Functions for workflow orchestration, Amazon RDS (PostgreSQL) for application database. |
| image | /images/use_cases/credit_risk3.png |

Impact & Results:
- Automated 70% of credit decisions with ML-based underwriting
- Reduced loan approval time from days to minutes
- Improved default prediction accuracy by 40%
- Increased customer retention by 25% through targeted CLV-based interventions

### 5. Demand Forecasting for Retail Inventory
Suggested slug: `demand-forecasting-for-retail-inventory`

| Field | Text |
|---|---|
| title | Demand Forecasting for Retail Inventory |
| category | Retail & E-commerce |
| stat | 87% |
| statLabel | Forecast Accuracy |
| description | AI-powered inventory optimization and purchasing |
| fullDescription | Built an intelligent demand forecasting and inventory optimization system for a multi-million dollar retail operation, transforming reactive inventory management into predictive, data-driven decision-making. |
| challenge | The retail chain struggled with inventory waste from overstocking and lost revenue from stockouts. Manual forecasting methods couldn't handle seasonal patterns, promotional impacts, and complex product interdependencies. |
| solution | Deployed time-series ML models analyzing historical sales, seasonal trends, promotional calendars, weather patterns, and external market signals. The system provides automated daily forecasts with confidence intervals, enabling optimized ordering decisions and dynamic inventory allocation across locations. |
| tech | BigQuery / Prophet / Looker |
| techStackDetailed | Google BigQuery for cloud data warehouse, Prophet (Facebook) for time-series forecasting, Python (Pandas, Statsmodels) for statistical analysis, Looker for BI dashboards, GCP Cloud Functions for automated forecasting runs, Cloud Scheduler for daily batch jobs, BigQuery ML for in-warehouse model training, Pub/Sub for event-driven alerts. |
| image | /images/use_cases/sales_forecasting.png |

Impact & Results:
- Achieved 87% forecast accuracy across all SKUs
- Reduced inventory waste by 40% through precise demand prediction
- Decreased stockout incidents by 65%
- Accelerated sourcing decisions and improved supplier negotiations

### 6. Travel Booking Data Transformation
Suggested slug: `travel-booking-data-transformation`

| Field | Text |
|---|---|
| title | Travel Booking Data Transformation |
| category | Travel & Tourism |
| stat | 70% |
| statLabel | Complexity Reduction |
| description | Simplifying legacy PNR data for AI models |
| fullDescription | Transformed complex Passenger Name Record (PNR) data into clean, analytics-ready formats for a major travel booking platform, enabling AI-driven personalization and customer insights. |
| challenge | PNR data was stored in legacy formats with extreme complexity, making analysis time-consuming (weeks per insight). The data team couldn't quickly answer business questions or build customer profiling models due to data accessibility barriers. |
| solution | Engineered automated ETL pipelines that parse, normalize, and structure PNR data into dimensional models optimized for analytics. Built data quality checks, lineage tracking, and self-service query interfaces that make the data accessible to business analysts. |
| tech | Databricks / Delta Lake / dbt |
| techStackDetailed | Databricks for unified analytics platform, Delta Lake for ACID transactions on data lake, dbt (data build tool) for SQL-based transformation workflows, Apache Spark for distributed data processing, Python (PySpark) for ETL logic, AWS S3 for raw data storage, AWS Glue for metadata catalog, Tableau for self-service analytics, Great Expectations for data quality validation. |
| image | /images/use_cases/travel_booking.png |

Impact & Results:
- Reduced PNR data complexity by 70-80% through intelligent modeling
- Accelerated insight generation from weeks to days
- Enabled AI-ready customer profiling for personalization
- Unlocked hyper-personalized booking recommendations

### 7. Real-Time Feature Store for Banking AI
Suggested slug: `real-time-feature-store-for-banking-ai`

| Field | Text |
|---|---|
| title | Real-Time Feature Store for Banking AI |
| category | Banking & Financial Services |
| stat | 45% |
| statLabel | Productivity Gain |
| description | Centralized ML features for instant model deployment |
| fullDescription | Architected a production-grade real-time feature store and streaming data platform for a national financial institution, enabling near real-time ML model serving and eliminating redundant feature engineering work. |
| challenge | Data scientists were spending 60% of their time on repetitive feature engineering tasks. Models couldn't leverage real-time data, limiting their effectiveness. No centralized feature repository meant duplicate work and inconsistent definitions across teams. |
| solution | Built a Kafka-based streaming platform with a centralized feature store enabling feature reuse, versioning, and real-time serving. The system ingests transaction streams, computes features on-the-fly, and serves them to ML models with sub-second latency. |
| tech | Kafka / Redis / Feast |
| techStackDetailed | Apache Kafka for event streaming, Feast (feature store framework) for feature management, Redis for low-latency feature serving, Apache Flink for stream processing, Kubernetes for container orchestration, PostgreSQL for feature metadata, AWS S3 for offline feature storage, MLflow for model versioning, Python (PySpark, Pandas) for feature engineering. |
| image | /images/use_cases/feature_store.png |

Impact & Results:
- 40-50% productivity gain for data science teams through feature reuse
- Enabled near real-time ML predictions (from batch to streaming)
- Scaled AI-driven digital banking products to millions of users
- Reduced time-to-production for new models by 60%

### 8. Real-Time Analytics for Travel Bookings
Suggested slug: `real-time-analytics-for-travel-bookings`

| Field | Text |
|---|---|
| title | Real-Time Analytics for Travel Bookings |
| category | Travel & Tourism |
| stat | 65% |
| statLabel | Faster Insights |
| description | Modern cloud data warehouse with streaming |
| fullDescription | Built a modern data warehouse and streaming platform for a travel booking company, transforming their analytics capability from slow batch processing to near real-time insights with enterprise governance. |
| challenge | Analytics queries took hours to run on legacy systems. Business teams couldn't access timely data for decision-making. No governance framework meant data quality issues and compliance risks. |
| solution | Architected a modern cloud data warehouse with streaming ingestion pipelines. Implemented role-based access control, data lineage tracking, and automated quality checks. Built self-service BI layer enabling business users to explore data safely. |
| tech | Snowflake / Fivetran / Sigma |
| techStackDetailed | Snowflake for cloud data warehouse, Fivetran for automated data integration, Sigma Computing for self-service BI, dbt for transformation logic, Apache Airflow for workflow orchestration, AWS Kinesis for real-time streaming ingestion, Monte Carlo for data observability, Atlan for data catalog and governance, Snowpipe for continuous data loading. |
| image | /images/use_cases/travel_analytics.png |

Impact & Results:
- Improved analytics availability by 60-70%
- Enabled near real-time reporting (from 4-hour batch delays)
- Implemented enterprise-grade governance and compliance
- Reduced query response times from hours to seconds

### 9. Enterprise Data Foundation for Retail
Suggested slug: `enterprise-data-foundation-for-retail`

| Field | Text |
|---|---|
| title | Enterprise Data Foundation for Retail |
| category | Retail & E-commerce |
| stat | >1TB |
| statLabel | Data Activated |
| description | AI-ready data warehouse from scattered sources |
| fullDescription | Established a complete enterprise data warehouse and analytics foundation for a retail chain, transforming over 1TB of siloed, underutilized data into a strategic business asset enabling AI and advanced analytics. |
| challenge | Data was scattered across 20+ legacy systems with no integration. Business teams couldn't answer basic questions without IT support. No foundation existed for advanced analytics or AI initiatives. |
| solution | Built a modern cloud data warehouse with automated ETL pipelines integrating all data sources. Implemented dimensional modeling, historical tracking, and data quality frameworks. Created self-service BI tools and established data governance processes. |
| tech | Azure Synapse / ADF / Power BI |
| techStackDetailed | Azure Synapse Analytics for unified analytics platform, Azure Data Factory (ADF) for ETL orchestration, Power BI for business intelligence, Azure Data Lake Gen2 for data lake storage, Azure Databricks for advanced analytics, Python (PySpark) for data transformations, Azure DevOps for CI/CD pipelines, Microsoft Purview for data governance and cataloging. |
| image | /images/use_cases/infrastructure.png |

Impact & Results:
- Enabled analytics on over 1TB of previously underutilized data
- Reduced time-to-insight by 50-60% through self-service access
- Established scalable AI-ready data foundations
- Empowered 100+ business users with self-service analytics

### 10. Clinical AI Safety & Validation
Suggested slug: `clinical-ai-safety-and-validation`

| Field | Text |
|---|---|
| title | Clinical AI Safety & Validation |
| category | Healthcare & Clinical AI |
| stat | NHS-Scale |
| statLabel | Governance Ready |
| description | Multi-layer LLM validation for patient safety |
| fullDescription | Engineered a comprehensive AI quality and validation framework for healthcare applications, ensuring clinical safety, transparency, and regulatory compliance for LLM-powered clinical decision support systems. |
| challenge | Healthcare AI faces unique challenges: patient safety is paramount, regulatory requirements are strict, and AI model failures can have life-threatening consequences. Traditional ML validation approaches weren't sufficient for LLM-based clinical tools. |
| solution | Built a multi-layered evaluation framework combining automated testing (accuracy, safety, bias), human expert review, and continuous monitoring. Implemented full audit trails, explainability features, and NHS-aligned governance processes ensuring transparency and accountability. |
| tech | OpenAI API / LangChain / MLflow |
| techStackDetailed | OpenAI GPT-4 API for LLM capabilities, LangChain for LLM orchestration and chaining, MLflow for experiment tracking and model registry, PostgreSQL for audit logs and versioning, FastAPI for REST APIs, Docker for containerization, Kubernetes for orchestration, Prometheus + Grafana for monitoring, Python (NLTK, spaCy) for NLP evaluation, Weights & Biases for model performance tracking. |
| image | /images/use_cases/ai_healthcare4.png |

Impact & Results:
- Established NHS-scale governance framework for clinical AI
- Improved transparency and auditability for regulatory compliance
- Reduced AI safety incidents to near-zero through multi-layer validation
- Enabled confident deployment of AI in clinical workflows

### 11. AI Agents for Customer Negotiations
Suggested slug: `ai-agents-for-customer-negotiations`

| Field | Text |
|---|---|
| title | AI Agents for Customer Negotiations |
| category | Customer Service & AI Agents |
| stat | 60% |
| statLabel | Workload Reduction |
| description | Autonomous agents for pricing and workflows |
| fullDescription | Deployed GenAI-powered agentic systems handling complex customer negotiations, price quoting, and multi-step workflows autonomously, transforming customer service operations from reactive to intelligent automation. |
| challenge | Sales and customer service teams spent hours on routine negotiations and price quotes. Manual workflows were inconsistent, slow, and couldn't scale. Customers expected instant responses 24/7. |
| solution | Built agentic AI systems powered by large language models (LLMs) that understand context, negotiate pricing within approved parameters, handle objections, and complete multi-step workflows autonomously. The agents integrate with CRM, pricing engines, and inventory systems to provide accurate, real-time responses. |
| tech | LangGraph / ChromaDB / Azure OpenAI |
| techStackDetailed | LangGraph for agentic workflow orchestration, Azure OpenAI Service (GPT-4) for conversational AI, ChromaDB for vector database and semantic search, LangChain for LLM chaining, Redis for session management, FastAPI for backend APIs, PostgreSQL for transaction logs, Twilio for omnichannel communication, Salesforce API for CRM integration, Stripe API for payment processing. |
| image | /images/use_cases/ai_negotiation3.png |

Impact & Results:
- Automated end-to-end customer negotiation workflows
- Reduced sales workload by 60% through intelligent automation
- Improved pricing consistency and margin protection
- Enabled 24/7 customer service with instant response times

Data fields not shown as text: `color` and `colorClass` (styling only). Source comments above each case (e.g. "Vision 2030 Priority: Banking & Fintech (Case 1)") are code comments, not visible.

---

## Home: Team

Source: `components/Team.tsx` (data lines 15-50, section lines 73-138, modal lines 140-231)

### Section header
- Eyebrow (h2): Our People (shown uppercase via CSS)
- Heading (h1): Architects of Intelligence
- Intro: World-class talent bridging the gap between academic research and industrial application.

### Card and modal labels (repeated)
- Card: name, role, tags (on hover), description (on hover)
- Modal: name, role, tags, heading "About" (uppercase via CSS), full bio, heading "Key Expertise & Achievements", achievements list, button "Close Profile"
- Top-right close button: icon only, no aria-label

### Felipe Araya (shown first)
| Field | Text |
|---|---|
| name | Felipe Araya |
| role | Lead AI Scientist |
| tags | Agentic AI / MLOps / Production Deployments |
| description (card) | Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value. |
| fullBio (modal) | Felipe leads AI innovation at Imkan, bridging cutting-edge research with practical business applications. With extensive experience in advanced machine learning, generative AI, and autonomous agent systems, he architects intelligent solutions that deliver measurable business impact. His expertise spans the full AI lifecycle and Machine Learning lifecycle; from initial research and experimentation to production-grade deployment and continuous optimization. Felipe specializes in building Data Science solutions, agentic AI systems, implementing robust MLOps frameworks, and creating intelligent monitoring solutions that ensure AI systems operate reliably at scale. |
| image | /images/profile_pictures/real_felipe.png (card: CSS background, no alt; modal img alt: Felipe Araya) |

Key Expertise & Achievements:
- Architected multi-agent AI systems for enterprise automation
- Deployed production LLM solutions serving millions of users
- Built end-to-end MLOps pipelines for multi-national companies
- Expert in RAG systems and vector database optimization
- Pioneered real-time model monitoring and observability frameworks
- Led AI strategy workshops for Vision 2030 aligned organizations

### Dr. Syed Fawad Ali (shown second)
| Field | Text |
|---|---|
| name | Dr. Syed Fawad Ali |
| role | Lead Data Engineer |
| tags | Data Architecture / ETL Pipelines / Governance |
| description | Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale. |
| fullBio | Dr. Syed is a leading expert in enterprise data engineering and architecture. He specializes in transforming complex, scattered data landscapes into unified, intelligent data platforms that power AI and analytics at scale. With deep expertise in data strategy, governance, and modern cloud architectures, Syed designs and implements robust data foundations that enable organizations to extract maximum value from their data assets. His work focuses on building automated ETL/ELT pipelines, implementing comprehensive data quality frameworks, and establishing scalable infrastructure that supports real-time analytics and machine learning workloads. |
| image | /images/profile_pictures/real_syed.png (card: CSS background, no alt; modal img alt: Dr. Syed Fawad Ali) |

Key Expertise & Achievements:
- Architected cloud data platforms processing billions of records daily
- Designed data governance frameworks for regulated industries
- Built real-time streaming pipelines with sub-second latency
- Implemented enterprise-wide data quality and observability systems
- Led digital transformation initiatives for Saudi Vision 2030 projects
- Expert in modern data stack (Snowflake, Databricks, Azure Synapse)

---

## Contact form

Source: `components/ContactFormModal.tsx` lines 85-245 (opened by every "Get in Touch" / "Get in touch" / "Book Consultation" / "Start Similar Project" button)

- Modal title (h2): Get in Touch
- Banner (with robot icon): Do you like this website? It was made with AI in one week
- Intro: Fill out the form below and we'll get back to you shortly.

| Field | Label | Placeholder | Required |
|---|---|---|---|
| firstName | First Name * | Enter your first name | yes |
| lastName | Last Name * | Enter your last name | yes |
| phone | Mobile Phone * | +966 XX XXX XXXX | yes |
| email | Email Address * | your.email@company.com | yes |
| message | Message (optional) | Tell us a bit about what you're looking for... | no |

- Submit button: Send Message (send icon); while sending: Sending...
- Success title: Message Sent!
- Success text: Thank you for reaching out. We'll get back to you shortly.
- Error (browser alert): Failed to submit form. Please try again or contact us directly at info@imkan.ai
- Internal error text `Failed to submit form` (line 53) is thrown but never shown; the alert above is shown instead (not rendered).
- Close button (top right): icon only, no aria-label
- Browser-native validation messages for `required` and `type="email"` come from the browser, not the site.

---

## Footer

Source: `components/Footer.tsx` lines 38-212

### Top CTA
- Heading (h2): Ready to Engineer the Future? [highlight: "Future?"]
- Text: Join the architects of intelligence. Let's build systems that scale beyond tomorrow.
- Button: Get in Touch (opens contact form)

### Brand column
- Wordmark (text, not image): imkan•ai (the dot is a decorative colored circle, aria-hidden, not a character)
- Tagline: We bridge the gap between academic research and industrial application, delivering sovereign AI solutions for the Kingdom.
- Address (with location icon): 8392 Prince Turki Bin Abdulaziz Al Awwal, 5246 King Saud University district, Riyadh, 12371, Saudi Arabia

### Column "Company"
| Label | Target |
|---|---|
| Services | #services |
| Why Us | #why-us |
| About | #about |
| Careers | /careers |
| Privacy | opens Privacy Policy modal |
| Terms | opens Terms & Conditions modal |

### Column "Solutions"
| Label | Target |
|---|---|
| Methodology | #methodology |
| Cases | #cases |
| Get in Touch | opens contact form |

### Column "Stay Connected"
- Email icon link: `mailto:info@imkan.ai` (icon only, no aria-label, no visible text)
- LinkedIn icon link: `https://www.linkedin.com/company/imkan-ai` (new tab; SVG icon only, no aria-label, no visible text)

### Bottom bar
- © {current year} Imkan.ai. Building the future of KSA.

### Watermark
- Large faded background text: imkan•ai (decorative; the dot is a colored circle)

---

## Privacy Policy

Source: `components/Footer.tsx` lines 214-529 (modal opened from footer "Privacy" and from Terms section 11)

Privacy Policy

Last updated: January 2026

This Privacy Policy explains how imkan.ai ("imkan.ai", "we", "our", "us") collects, uses, discloses, and protects personal data when you visit our website or interact with us. [highlight: first "imkan.ai"]

We are committed to protecting personal data in accordance with applicable laws and regulations, including the Saudi Personal Data Protection Law (PDPL).

### 1. Who We Are
- Legal Entity: imkan.ai
- Location: Riyadh, Saudi Arabia
- Contact Email: info@imkan.ai (link: mailto:info@imkan.ai)

If you have any questions about this Privacy Policy or how we handle personal data, you may contact us using the details above.

### 2. Information We Collect

#### 2.1 Personal Data You Provide
We may collect personal data when you voluntarily provide it to us, including through:
- Contact forms on our website
- Booking or calendar scheduling links
- Direct communications (email or messaging)

This may include:
- Name
- Email address
- Company or organization name
- Job title
- Message content or inquiry details

Providing this information is voluntary, but necessary for us to respond to your request. (italic)

#### 2.2 Automatically Collected Information
At this time, we do not intentionally collect personal data through analytics tools, advertising pixels, or tracking technologies. If this changes in the future, this Privacy Policy will be updated accordingly.

### 3. How We Use Your Information
We use personal data only for legitimate business purposes, including to:
- Respond to inquiries and contact requests
- Schedule and manage meetings or consultations
- Communicate about our services
- Improve our service quality and client interactions
- Comply with legal or regulatory obligations

We do not sell, rent, or trade personal data. (medium weight)

### 4. Client Data & Consulting Engagements
Outside of this website, we may receive access to client-provided data as part of consulting or advisory engagements.
- Client data is processed only with explicit approval
- Client data is handled strictly in accordance with contractual terms
- Client data remains the property of the client
- We act as a service provider / processor unless otherwise agreed
- We do not use client data for training AI models or third-party systems without explicit consent

### 5. Use of AI and Third-Party Tools
Where AI or advanced analytics tools are used:
- They are used only with explicit client approval
- Appropriate safeguards are applied
- No client data is shared beyond agreed-upon purposes

### 6. Data Retention
We retain personal data only for as long as necessary:
- Contact form and inquiry data: up to 24 months
- Scheduling and communication records: up to 24 months
- Client data: as defined in contractual agreements

Data may be retained longer if required by law or for legitimate legal purposes.

### 7. Data Deletion & Your Rights
You have the right to:
- Request access to your personal data
- Request correction of inaccurate data
- Request deletion of your personal data
- Withdraw consent where applicable

To exercise any of these rights, please contact us at info@imkan.ai. We will respond in accordance with applicable legal requirements. (link: mailto:info@imkan.ai)

### 8. Data Security
We take reasonable and appropriate measures to protect personal data, including:
- Secure systems and access controls
- Limiting access to authorized personnel only
- Organizational and technical safeguards

While no system can be guaranteed 100% secure, we continuously work to protect the confidentiality and integrity of data.

### 9. Cookies and Tracking
Currently:
- We do not use cookies for analytics or advertising
- We do not deploy tracking pixels
- We do not run behavioral profiling

If cookies or tracking technologies are introduced in the future, this Privacy Policy will be updated accordingly.

### 10. International Data Transfers
Personal data may be processed or accessed outside Saudi Arabia if required for service delivery. In such cases, appropriate safeguards will be applied in line with applicable laws.

### 11. Children's Privacy
Our website and services are not intended for children under the age of 16. We do not knowingly collect personal data from children.

### 12. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.

### 13. Responsible AI Statement
(Shown in a highlighted box.)

At imkan.ai, we believe that Artificial Intelligence should enhance human decision-making, not replace accountability or judgment. Our approach to AI is grounded in responsibility, transparency, and trust — particularly when working with sensitive, high-impact data environments.

#### Human-Centric by Design
We design AI systems with human oversight at their core. AI-driven insights, recommendations, or automations are always subject to human review and governance, especially in strategic, operational, or policy-relevant contexts.

#### Purpose-Bound Use
AI technologies are used only for clearly defined, legitimate purposes aligned with client objectives. We do not deploy AI in ways that introduce hidden surveillance, automated decision-making without oversight, or unintended secondary uses of data.

#### Data Responsibility & Privacy
AI solutions developed by imkan.ai respect data ownership and confidentiality. Client data is:
- Used only with explicit authorization
- Processed strictly within agreed scopes
- Never reused or repurposed without consent
- Never used to train third-party or general AI models unless explicitly approved

#### Fairness, Bias & Transparency
We actively assess AI solutions for bias, unintended outcomes, and data limitations. Where risks are identified, we work with clients to mitigate them through improved data practices, model design, or governance controls. We aim to make AI outputs understandable and explainable to stakeholders.

#### Security & Integrity
AI systems are implemented within secure architectures that follow established data protection and access control practices. Safeguards are applied to protect data integrity, prevent misuse, and reduce exposure to unauthorized access.

#### Compliance & Ethical Alignment
Our AI practices are aligned with applicable laws and regulations, including the Saudi Personal Data Protection Law (PDPL), and informed by emerging global best practices in responsible and ethical AI.

#### Continuous Review
Responsible AI is not a one-time decision. We continuously review AI implementations as technologies, regulations, and societal expectations evolve, ensuring that solutions remain aligned with ethical standards and business responsibility.

### 14. Contact Us
For questions, concerns, or data requests, please contact:
- Email: info@imkan.ai (link: mailto:info@imkan.ai)
- Location: Riyadh, Saudi Arabia

Button: Close (plus a top-right icon-only close button, no aria-label)

---

## Terms

Source: `components/Footer.tsx` lines 531-807 (modal opened from footer "Terms")

Terms & Conditions

Last updated: January 2026

These Terms & Conditions ("Terms") govern your access to and use of the imkan.ai website and any related content or services provided by imkan.ai ("imkan.ai", "we", "our", "us"). [highlight: the second "imkan.ai", after "provided by"]

By accessing or using this website, you agree to be bound by these Terms. If you do not agree, you should not use this website. (medium weight)

### 1. About Us
- Legal Entity: imkan.ai
- Location: Riyadh, Saudi Arabia
- Contact Email: info@imkan.ai (link: mailto:info@imkan.ai)

### 2. Scope of These Terms
These Terms apply to:
- Use of the imkan.ai website
- Website content, materials, and communications
- Contact forms and booking or scheduling links
- General information about our services

Specific consulting engagements are governed by separate written agreements (e.g., proposals, statements of work, contracts), which shall prevail in case of conflict.

### 3. Description of Services
imkan.ai provides professional services including, but not limited to:
- Data & AI strategy and advisory
- Data engineering and platform design
- AI, analytics, and decision-intelligence solutions
- Related consulting, workshops, and accelerators

All information on this website is provided for general informational purposes only and does not constitute legal, financial, or regulatory advice. (italic)

### 4. Use of the Website
You agree to use this website lawfully and responsibly. You must not:
- Misuse or attempt to disrupt the website
- Access systems or data without authorization
- Copy, scrape, or reuse content without permission
- Introduce malicious code or security threats
- Use the website for unlawful or harmful purposes

We reserve the right to restrict or terminate access for misuse. (medium weight)

### 5. Intellectual Property
All content on this website, including but not limited to:
- Text, graphics, visuals, and branding
- Logos, trademarks, and design elements
- Methodologies, frameworks, and materials

is the intellectual property of imkan.ai, unless otherwise stated.

You may not reproduce, distribute, or use any content without prior written consent. (medium weight)

#### Client Work & Deliverables
- Clients retain ownership of their data
- Ownership of deliverables is governed by contractual agreements
- Nothing on this website transfers intellectual property rights

### 6. Confidentiality
Information shared with us through this website or during discussions is treated as confidential. Formal confidentiality obligations are governed by Non-Disclosure Agreements (NDAs) where applicable.

### 7. Responsible Use of AI
Where Artificial Intelligence or advanced analytics are used:
- AI is applied with human oversight
- Client data is used only with explicit approval
- AI outputs are advisory and not autonomous decisions
- Data ownership and confidentiality are respected

Our approach to AI aligns with our Responsible AI Statement and applicable regulations, including the Saudi PDPL.

### 8. Third-Party Links
This website may contain links to third-party websites for convenience or reference. We do not control or endorse third-party content and are not responsible for their practices or policies.

### 9. Disclaimer
This website and its content are provided "as is" and "as available."

We make no warranties, express or implied, regarding:
- Accuracy or completeness of content
- Availability or uninterrupted access
- Suitability for specific purposes

Use of the website is at your own risk. (medium weight)

### 10. Limitation of Liability
To the maximum extent permitted by law:
- imkan.ai shall not be liable for indirect, incidental, or consequential damages
- Liability related to services is limited as defined in applicable contracts
- Nothing in these Terms limits liability where such limitation is prohibited by law

### 11. Privacy
Your use of this website is also governed by our Privacy Policy, which explains how we collect and process personal data. By using this website, you consent to such processing. ["Privacy Policy" is a button that closes Terms and opens the Privacy Policy modal]

### 12. Termination
We may suspend or terminate access to the website at any time, without notice, if these Terms are violated or if required for security or legal reasons.

### 13. Governing Law & Jurisdiction
These Terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia, without regard to conflict-of-law principles. [emphasis: "Kingdom of Saudi Arabia"]

### 14. Changes to These Terms
We may update these Terms from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the website constitutes acceptance of the updated Terms.

### 15. Contact Us
For questions regarding these Terms, please contact:
- Email: info@imkan.ai (link: mailto:info@imkan.ai)
- Location: Riyadh, Saudi Arabia

Button: Close (plus a top-right icon-only close button, no aria-label)

---

## Careers page

Source: `components/Careers.tsx` (data lines 37-203, page lines 272-551, job modal lines 553-681). Route: `/careers`.

### Hero
- Heading (h1): Join the Team [highlight: "Team"]
- Intro: We're a small, elite team building sovereign AI and data platforms for Saudi Arabia's most ambitious organizations. If you want your work to matter, you'll fit right in.
- Link button: View open roles (href `#open-roles`, down arrow icon)
- Button: Get in touch (opens contact form; note lowercase "touch" here)

### Perks (6 cards, title then text)
| Title | Text |
|---|---|
| High-impact work | Ship AI and data systems for national-scale, Vision 2030 clients. |
| Real ownership | Own meaningful problems end-to-end and see your work ship fast. |
| Elite, small team | Work shoulder-to-shoulder with a hand-picked group of specialists. |
| Flexible & hybrid | Outcomes over hours, with hybrid and remote-friendly options. |
| Competitive package | Compensation that reflects your impact, plus performance upside. |
| Build the Kingdom | Be part of building sovereign AI capability in Saudi Arabia. |

### Open Roles section
- Heading (h2): Open Roles
- Intro: Search and filter to find where you fit.
- Search input placeholder: Search by role, skill, or keyword... (aria-label: `Search open roles`)
- Department select: first option "All departments", then each department of open roles (aria-label: `Filter by department`)
- Location select: first option "All locations", then each location of open roles (aria-label: `Filter by location`)
- Result count: {n} role found / {n} roles found (singular "role" when n = 1)
- Button (only when a filter is active): Clear filters
- Job card: department chip, level, title, summary, location, type, then either "Closing soon · {n}d left" (7 days or fewer left) or "Closes in {n} days"; link text "View role"

Empty state (no matching open roles):
- Heading: No roles match your search
- Text: Try adjusting your filters, or reach out — we're always keen to meet great people.
- Buttons: Clear filters / Get in touch

Open application box:
- Heading: Don't see the right role?
- Text: We're always looking for exceptional data and AI talent. Send us your CV and tell us how you'd like to make an impact.
- Button (mail icon): Send an open application

Past roles (roles posted more than 30 days ago):
- Heading: Past roles
- Badge: Applications closed
- Each card: department chip, chip "Closed", title, location, link text "View details"

### Job detail modal labels (repeated)
- Header: department chip, level, title, location, type
- Then: description paragraph
- Heading: What you'll do (responsibilities)
- Heading: What we're looking for (requirements)
- Heading: Nice to have (niceToHave)
- Tag chips
- Footer: button "Apply for this role" (open roles) or box "Applications for this role are closed" (past roles); button "Close"
- Top-right close button: aria-label `Close`

### Role 1: Senior Data Engineer (id: senior-data-engineer)
| Field | Text |
|---|---|
| title | Senior Data Engineer |
| department | Engineering |
| location | Riyadh, KSA |
| type | Full-time |
| level | Senior |
| postedAt | 2026-06-20 (not rendered as text; drives open/closed status and days left) |
| summary (card) | Design and build the production-grade data platforms that power AI for national-scale clients. |
| description (modal) | You will own the design and delivery of modern data platforms — from ingestion to serving — that our AI and analytics products are built on. You will work directly with clients across the Kingdom to turn messy, siloed data into reliable, governed, high-performance foundations. |
| tags | Spark / Python / SQL / Databricks / Airflow / Cloud |

What you'll do:
- Architect and build batch and streaming pipelines (Spark, Kafka, dbt) on cloud data platforms.
- Model data for analytics and ML use cases with strong governance and lineage.
- Own reliability: monitoring, testing, and CI/CD for data workflows.
- Mentor junior engineers and set engineering standards across the team.

What we're looking for:
- 5+ years building production data platforms.
- Expert SQL and Python; deep experience with Spark and a cloud warehouse (Databricks, Snowflake, BigQuery, or Fabric).
- Strong grasp of data modeling, orchestration (Airflow/Dagster), and infrastructure-as-code.
- Track record of shipping reliable systems in ambiguous environments.

Nice to have:
- Experience in consulting or client-facing delivery.
- Arabic language proficiency.

### Role 2: Machine Learning Engineer (id: machine-learning-engineer)
| Field | Text |
|---|---|
| title | Machine Learning Engineer |
| department | AI & Machine Learning |
| location | Riyadh, KSA |
| type | Full-time |
| level | Mid–Senior |
| postedAt | 2026-06-25 (not rendered as text) |
| summary | Take models from notebook to production and keep them reliable, observable, and fast. |
| description | You will bridge data science and engineering — productionizing models, building ML pipelines, and standing up the MLOps tooling that keeps them healthy in the real world. |
| tags | Python / PyTorch / MLOps / Docker / Kubernetes |

What you'll do:
- Build and deploy ML pipelines for training, evaluation, and inference.
- Implement MLOps: experiment tracking, model registry, monitoring, and drift detection.
- Optimize models and serving for latency, cost, and scale.
- Collaborate with data scientists to harden prototypes into products.

What we're looking for:
- 3+ years deploying ML systems in production.
- Strong Python and experience with PyTorch or TensorFlow.
- Familiarity with MLOps tooling (MLflow, Kubeflow, SageMaker, or Vertex).
- Solid software engineering fundamentals (testing, APIs, containers).

Nice to have:
- Experience serving LLMs or RAG systems.
- Kubernetes experience.

### Role 3: AI Solutions Architect (id: ai-solutions-architect)
| Field | Text |
|---|---|
| title | AI Solutions Architect |
| department | AI & Machine Learning |
| location | Riyadh, KSA / Hybrid |
| type | Full-time |
| level | Senior |
| postedAt | 2026-06-15 (not rendered as text) |
| summary | Translate client ambitions into pragmatic, high-impact AI architectures. |
| description | You will sit at the intersection of business and technology — scoping opportunities, designing agentic AI and data solutions, and guiding delivery teams to build them the right way. |
| tags | Architecture / LLMs / Agentic AI / Cloud / Strategy |

What you'll do:
- Lead technical discovery and solution design with enterprise and government clients.
- Design end-to-end architectures spanning data, ML, and application layers.
- Own technical proposals, estimates, and delivery roadmaps.
- Advise clients on responsible AI, governance, and Vision 2030 alignment.

What we're looking for:
- 6+ years in data/AI, with 2+ in solution architecture or tech leadership.
- Breadth across data engineering, ML, and cloud platforms.
- Excellent communication and stakeholder management.
- Ability to simplify complex ideas for non-technical audiences.

Nice to have:
- Experience with agentic AI / LLM orchestration.
- Public-sector delivery experience in KSA.

### Role 4: Data Scientist (id: data-scientist)
| Field | Text |
|---|---|
| title | Data Scientist |
| department | Data Science |
| location | Riyadh, KSA |
| type | Full-time |
| level | Mid |
| postedAt | 2026-06-28 (not rendered as text) |
| summary | Turn data into decisions with rigorous modeling and clear storytelling. |
| description | You will frame business problems as data problems, build models that hold up under scrutiny, and communicate insights that drive real decisions for our clients. |
| tags | Python / Statistics / ML / SQL / Visualization |

What you'll do:
- Explore data, engineer features, and build predictive and statistical models.
- Design experiments and measure impact rigorously.
- Communicate findings through clear visuals and narratives.
- Partner with ML engineers to productionize high-value models.

What we're looking for:
- 3+ years in applied data science.
- Strong statistics, Python (pandas, scikit-learn), and SQL.
- Experience communicating results to business stakeholders.
- Curiosity and a bias toward measurable impact.

Nice to have:
- Experience with forecasting or optimization.
- Domain experience in energy, finance, or public sector.

### Role 5: Full-Stack Engineer (id: fullstack-engineer)
| Field | Text |
|---|---|
| title | Full-Stack Engineer |
| department | Engineering |
| location | Remote (KSA time zone) |
| type | Full-time |
| level | Mid–Senior |
| postedAt | 2026-06-12 (not rendered as text) |
| summary | Build the applications and interfaces that make AI usable and delightful. |
| description | You will craft the products around our data and AI — dashboards, internal tools, and client-facing apps — with a strong eye for UX and performance. |
| tags | React / TypeScript / Node / APIs / UI/UX |

What you'll do:
- Build responsive front-ends (React/TypeScript) and robust APIs.
- Integrate ML and data services into polished product experiences.
- Own features end-to-end, from design to deployment.
- Contribute to a clean, well-tested, maintainable codebase.

What we're looking for:
- 4+ years full-stack development.
- Expert React + TypeScript; solid backend experience (Node, Python, or similar).
- Strong product sense and attention to detail.
- Comfortable with cloud deployment and CI/CD.

Nice to have:
- Experience with data-heavy or real-time UIs.
- Design sensibility / Figma fluency.

### Role 6: Analytics & Strategy Consultant (id: analytics-consultant)
| Field | Text |
|---|---|
| title | Analytics & Strategy Consultant |
| department | Consulting |
| location | Riyadh, KSA / Hybrid |
| type | Full-time |
| level | Mid–Senior |
| postedAt | 2026-05-15 (not rendered as text) |
| summary | Help clients build a data & AI strategy worth executing — then help them execute it. |
| description | You will lead engagements that shape how organizations use data and AI: assessing maturity, defining roadmaps, and driving adoption alongside our technical teams. |
| tags | Strategy / Consulting / Analytics / Stakeholders |

What you'll do:
- Run discovery, maturity assessments, and opportunity mapping.
- Build business cases and data/AI strategy roadmaps.
- Drive stakeholder alignment and change management.
- Partner with engineering to ensure strategy turns into delivery.

What we're looking for:
- 4+ years in consulting, analytics, or strategy roles.
- Strong analytical and structured-thinking skills.
- Excellent written and verbal communication.
- Comfort operating in fast-moving, ambiguous settings.

Nice to have:
- Experience with Vision 2030 initiatives.
- Arabic language proficiency.

---

## Job application form

Source: `components/JobApplicationModal.tsx` lines 82-344 (opened by "Apply for this role" and "Send an open application")

- Eyebrow: Apply for
- Title (h2): {job title}, or for the open application: Open application
- Location line: {job location} (hidden for the open application, whose location is "—")

| Field | Label | Placeholder | Required |
|---|---|---|---|
| cv (file: .pdf, .doc, .docx) | CV / Resume * | (none) | yes |
| firstName | First Name (optional) | Enter your first name | no |
| lastName | Last Name (optional) | Enter your last name | no |
| email | Email Address (optional) | your.email@example.com | no |
| phone | Mobile Phone (optional) | +966 XX XXX XXXX | no |
| linkedin | LinkedIn or Portfolio (optional) | https://linkedin.com/in/you | no |
| message | Why you? (optional) | Tell us a bit about yourself and why you're a great fit... | no |

- CV helper text: PDF or Word, up to 5 MB.
- Selected file line: {file name} ({size} KB)
- CV errors (shown under the field):
  - Please upload a PDF or Word document (.pdf, .doc, .docx).
  - CV must be 5 MB or smaller.
  - Please upload your CV to apply.
- Submit button: Submit application (send icon); while sending: Submitting...
- Success title: Application Received!
- Success text: Thanks for applying for {job title}. Our team will review your application and get back to you if there's a fit. [emphasis: {job title}]
- Close button (top right): aria-label `Close`

Error alerts (browser alert). The alert shows the error message if there is one, otherwise the fallback:
- Fallback: Failed to submit your application. Please try again or email us at felipe@imkan.ai
- Client-side read errors that can reach the alert: Failed to read CV file / Failed to encode CV file
- If the server gives no `error` field: Failed to submit application
- Server messages from `api/function_app.py` (`/api/apply`) that can reach the alert: Method not allowed / Missing required fields / CV file is required / CV must be a PDF or Word document (.pdf, .doc, .docx) / Invalid CV file encoding / CV file is empty / CV file must be 5 MB or smaller / Invalid email format / Server configuration error / Invalid request body / Failed to process application

---

## Images

| Section | Path | Alt text / how used |
|---|---|---|
| Site meta | /favicon.svg | favicon (no alt) |
| Site meta | /favicon-512.svg | alternate icon, apple-touch-icon (no alt) |
| Navigation | /images/logos/imkan-logo-horizontal.png | img, alt: `imkan.ai` |
| Hero | (none) | background is the animated `HeroBackground` component, decorative |
| Services | /images/services/strategy.jpg | modal img, alt: `Build a strategy worth executing` (md and up only) |
| Services | /images/services/data-platform.png | modal img, alt: `Make your data work for you` |
| Services | /images/services/agentic-ai.png | modal img, alt: `Deploy AI that saves you time` |
| Services | /images/services/data-visu.png | modal img, alt: `Turn insights into decisions` |
| Methodology | /images/methodology/think.png | modal img, alt: `THINK` |
| Methodology | /images/methodology/build.png | modal img, alt: `BUILD` |
| Methodology | /images/methodology/evolve.png | modal img, alt: `EVOLVE` |
| Case 1 | /images/use_cases/fraud_detection_security.png | CSS background on card and modal header, no alt |
| Case 2 | /images/use_cases/real_estate.png | CSS background, no alt |
| Case 3 | /images/use_cases/route_optimization.png | CSS background, no alt |
| Case 4 | /images/use_cases/credit_risk3.png | CSS background, no alt |
| Case 5 | /images/use_cases/sales_forecasting.png | CSS background, no alt |
| Case 6 | /images/use_cases/travel_booking.png | CSS background, no alt |
| Case 7 | /images/use_cases/feature_store.png | CSS background, no alt |
| Case 8 | /images/use_cases/travel_analytics.png | CSS background, no alt |
| Case 9 | /images/use_cases/infrastructure.png | CSS background, no alt |
| Case 10 | /images/use_cases/ai_healthcare4.png | CSS background, no alt |
| Case 11 | /images/use_cases/ai_negotiation3.png | CSS background, no alt |
| Team | /images/profile_pictures/real_felipe.png | card: CSS background, no alt; modal img alt: `Felipe Araya` |
| Team | /images/profile_pictures/real_syed.png | card: CSS background, no alt; modal img alt: `Dr. Syed Fawad Ali` |
| Footer | (none) | wordmark and watermark are styled text; LinkedIn icon is inline SVG |
| Careers | (none) | icons only |

Files in `public/images/` not referenced by the live components: `logos/imkan-logo-full.png`, `logos/imkan-logo.png`.

---

## Notes

### Counts
- Case studies: 11 (5 shown by default, 6 more behind "See All Solutions")
- Job roles: 6 (plus the "Open application" option)
- Services: 4
- Methodology steps: 3
- Why Us items: 6
- Careers perks: 6
- Founders shown in Team: 2
- Privacy Policy sections: 14; Terms sections: 15

### Duplicated strings
- "Get in Touch": Navbar (desktop and mobile), Hero button, Footer CTA button, Footer "Solutions" link, Contact form title. Careers uses "Get in touch" (lowercase "touch") twice.
- "Close": modal button in Methodology, Why Us, Case studies, Privacy, Terms, job detail modal.
- "Clear filters": Careers result row and empty state.
- Methodology card texts duplicate the data `description` fields word for word (cards are hardcoded, the data field is not used). Card subtitles are hardcoded in capitals ("START WITH THE RIGHT PROBLEM") while the data subtitles are sentence case and shown uppercase via CSS in the modal.
- Methodology taglines appear twice: in straight quotes on the cards, in curly quotes in the modal.
- Services `title` and `pain` appear on both the card and the modal; `subtitle` appears on the card and as the modal sidebar heading.
- "Bridging the gap between academic research and industrial application": Team intro ("World-class talent bridging the gap...") and Footer tagline ("We bridge the gap...").
- "Join the architects of intelligence" (Footer) echoes the Team heading "Architects of Intelligence".
- "a strategy worth executing": Services 1 title and the Analytics & Strategy Consultant summary.
- "15+": Case studies intro ("15+ production-grade AI and data solutions"), Why Us item 6 ("15+ production deployments", "15+ deployments", "15+ live deployments").
- Categories "Banking & Financial Services" (cases 1, 4, 7), "Retail & E-commerce" (cases 5, 9), "Travel & Tourism" (cases 6, 8).
- Field placeholders "Enter your first name", "Enter your last name", "+966 XX XXX XXXX" are in both forms; the email placeholder differs (your.email@company.com vs your.email@example.com).
- Privacy and Terms share the same "Legal Entity / Location / Contact Email" block and the "Email / Location" contact block.
- Navigation labels repeat in the footer (Services, Why Us, About, Careers, Methodology, Cases).

### Placeholders, TODOs and things that look wrong
- No TODO markers in visible text.
- "5 More Solutions" CTA: there are actually 6 cases behind it (cases 6-11).
- Case 7 stat is "45%" but its result says "40-50%"; case 6 stat "70%" vs result "70-80%"; case 8 stat "65%" vs result "60-70%". Reproduced as is.
- Contact banner "Do you like this website? It was made with AI in one week" reads like a temporary/joke line.
- Contact form placeholder "+966 XX XXX XXXX" and email placeholders are format examples, not content.
- Contact form makes phone required; the Privacy Policy list of collected data does not mention phone numbers, and mentions "Booking or calendar scheduling links" which the site does not show.
- Job application error fallback names a personal mailbox, "felipe@imkan.ai", unlike every other place, which uses info@imkan.ai.
- Felipe's bio has "lifecycle; from initial research" (semicolon where a colon or comma reads better). Kept as is.
- Footer copyright year is generated at runtime (`new Date().getFullYear()`).
- Careers roles auto-close 30 days after `postedAt`. All six roles were posted between 2026-05-15 and 2026-06-28, so as of 2026-11-16 every role shows under "Past roles", the open list shows "0 roles found" and the "No roles match your search" empty state, and the filter dropdowns contain only "All departments" / "All locations".
- Several icon-only buttons and links have no aria-label: mobile menu toggle, Services, Methodology, Case study, Team, Contact, Privacy and Terms modal close buttons, footer email and LinkedIn links. Labels for these would be new text (to be proposed as TODOs).
- "Portal" in the navbar links to an internal SharePoint document library.

### Em dashes (—) found in visible text
1. Privacy Policy, Responsible AI Statement: "grounded in responsibility, transparency, and trust — particularly when working with sensitive, high-impact data environments."
2. Senior Data Engineer description: "modern data platforms — from ingestion to serving — that our AI"
3. Machine Learning Engineer description: "bridge data science and engineering — productionizing models"
4. AI Solutions Architect description: "intersection of business and technology — scoping opportunities"
5. Full-Stack Engineer description: "around our data and AI — dashboards, internal tools, and client-facing apps — with a strong eye"
6. Analytics & Strategy Consultant summary: "a data & AI strategy worth executing — then help them execute it."
7. Careers empty state: "Try adjusting your filters, or reach out — we're always keen to meet great people."
8. Open application location value "—" (internal; it hides the location line, not shown).

Related dashes: en dash (–) in the level "Mid–Senior" (Machine Learning Engineer, Full-Stack Engineer, Analytics & Strategy Consultant). A spaced hyphen used as a dash in case 2 results: "1 in 4 (25%) - a 5x improvement". Site title uses a spaced hyphen: "Imkan.ai - Engineering Excellence".
