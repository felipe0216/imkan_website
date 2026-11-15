# Wording changes

Every place where the new site's text differs from the original in `Documentation/content-inventory.md` (ADR 0007). Felipe reviews this log before cut-over (AC-402).

Columns: **Page** where it appears, **Original** text, **New** text, **Why**, and **Approved** (who and when, or "pending").

| # | Page | Original | New | Why | Approved |
|---|---|---|---|---|---|
| 1 | `/careers/` (application form error) | Failed to submit your application. Please try again or email us at felipe@imkan.ai | Failed to submit your application. Please try again or email us at info@imkan.ai | Use the site's public address everywhere, not a personal mailbox | Felipe, 2026-11-16 |
| 2 | `/work/travel-booking-data-transformation/` (case 6, headline stat) | 70% | 70-80% | Match the case's own result, "Reduced PNR data complexity by 70-80%" | Felipe, 2026-11-16 |
| 3 | `/work/real-time-feature-store-for-banking-ai/` (case 7, headline stat) | 45% | 40-50% | Match the case's own result, "40-50% productivity gain for data science teams" | Felipe, 2026-11-16 |
| 4 | `/work/real-time-analytics-for-travel-bookings/` (case 8, headline stat) | 65% | 60-70% | Match the case's own result, "Improved analytics availability by 60-70%" | Felipe, 2026-11-16 |
| 5 | Home (case studies) | Heading: 5 More Solutions | Removed | Every case now has its own page and `/work/` lists all 11; the label also miscounted (6 cases were behind it) | Felipe, 2026-11-16 |
| 6 | Navigation | Link: Portal (to the internal SharePoint document library) | Removed | Internal staff link does not belong on the public site | Felipe, 2026-11-16 |

## Home page build (2026-11-16), pending Felipe's review

| # | Page | Original | New | Why | Approved |
|---|---|---|---|---|---|
| 7 | Home (contact form) | Banner: "Do you like this website? It was made with AI in one week" | Removed | Works against the redesign's goal of not reading as AI-made | pending |
| 8 | Home (contact form) | Labels "First Name *", "Last Name *", "Mobile Phone *", "Email Address *" | "First Name", "Last Name", "Mobile Phone", "Email Address" | The kit marks required fields itself and shows each error under its field | pending |
| 9 | Home (contact form) | Browser-native error messages | New field errors: "Write your first name.", "Write your last name.", "Write a mobile number we can call, with the country code.", "Write an email address with an @, like name@company.com." | The kit's form recipe puts a written reason under each field | pending |
| 10 | Home (contact form) | "Message Sent!" (title) + "Thank you for reaching out. We'll get back to you shortly." | One status line: "Message Sent! Thank you for reaching out. We'll get back to you shortly." | The kit shows one status line, never a pop-up | pending |
| 11 | Home (methodology, Think) | "The most expensive mistake in data and AI is building the wrong thing. Before we touch any technology, we get clear on the decision you actually want to improve." | "Before we touch any technology, we get clear on the decision you actually want to improve." | Card text kept to two lines | pending |
| 12 | Home (methodology, Build) | "You should not have to rip out your systems and start over. We build on the tools and infrastructure you already pay for, so your team adopts it naturally." | "We build on the tools and infrastructure you already pay for, so your team adopts it naturally." | Card text kept to two lines | pending |
| 13 | Home (methodology, Evolve) | "We do not disappear once the project ships. We stay on to support and improve well after delivery, so your investment keeps paying off long after go-live." | "We stay on to support and improve well after delivery, so your investment keeps paying off long after go-live." | Card text kept to two lines | pending |
| 14 | Home (methodology) | Titles "THINK", "BUILD", "EVOLVE" (capitals) with subtitles in capitals | Labels "Think", "Build", "Evolve"; the subtitles as card titles in sentence case | The design uses sentence case only, no tracked capitals | pending |
| 15 | Home (team, Felipe) | "Leads AI innovation from research to production. Deep expertise in advanced machine learning, generative AI, autonomous agent systems, MLOps pipelines, model deployment, and intelligent monitoring systems that drive business value." | "Leads AI innovation from research to production: generative AI, autonomous agent systems, MLOps and model monitoring." | Portrait cards keep one short line | pending |
| 16 | Home (team, Syed) | "Expert in building enterprise data foundations from the ground up. Specializes in data strategy, modern data warehousing, ETL/ELT pipelines, data quality frameworks, and scalable cloud infrastructure that enables AI at scale." | "Builds enterprise data foundations from the ground up: data strategy, modern warehousing, ETL/ELT pipelines and data quality." | Portrait cards keep one short line | pending |
| 17 | Home (contact) | Address: "8392 Prince Turki Bin Abdulaziz Al Awwal, 5246 King Saud University district, Riyadh, 12371, Saudi Arabia" | "Prince Turki Bin Abdulaziz Al Awwal, King Saud University district, Riyadh" | The skill's contact rule: street and district only, no house number or postcode. Revert if you want the full address shown | pending |
| 18 | Navigation | Words: Home, Services, Methodology, Why Us, Cases, About, Careers | Services, Methodology, Cases, About, Careers (the logo goes home; Why Us is reached from the hero button and the footer) | The nav holds four to six words that never wrap | pending |
| 19 | Home (hero) | Pill: none | "Prove Before You Pay" / "6-8 weeks free" above the h1 | Existing words, moved up so the first screen carries one hard fact | pending |
| 20 | Home (cases) | Section shows 5 cases plus "See All Solutions" | Shows 6 cases (2, 3, 4, 5, 10, 11) as tiles, plus "See All Solutions"; case 1 leads the page as the app frame | Two screens of three tiles each | pending |

### New illustrative UI text (pending approval)

These are the words inside the drawn product windows. They describe what the real, anonymised cases do; they make no new claims about Imkan.

- **Hero window (case 11, AI negotiation agent):** "Pricing agent", "Online", "Today, 21:40", the customer's "Can you do better on 500 units for next month?", the agent's "Yes. At 500 units I can offer 6% off, within your approved pricing, and all 500 are in stock for delivery on the 14th.", sources "Pricing engine" and "Inventory".
- **App frame (case 1, fraud detection):** the alert queue ("Security / Anomalies", nine sources such as "Core banking: Login burst from a new device", statuses "New", "Reviewing", "Cleared") and the detection run (Ingest with Kafka, Stream with Spark, Score with Databricks, Alert with Python, Board with Grafana; 8 s in total, in line with "under 10 seconds").
- **Services panels:** "Data strategy roadmap" (the four "How to get there" steps, shortened), six joined sources (PostgreSQL, Snowflake, Redis, Databricks, spreadsheets, Grafana), three automation notices ("Invoice fields extracted", "Request routed to finance", "Contract clauses found"), and "Weekly sales review" switches (alerts, trends, next step, weekly email).
- **Methodology panels:** a discovery search ("decisions to improve"), "Your existing stack" (Snowflake, PostgreSQL, Databricks, Grafana) and an "after-go-live" health check (freshness, drift, usage, alert routing).
- **Why us panels:** a voice agent call ("Voice agent", "Arabic and English, 24/7", "Your invoice is received and logged. Anything else I can check?") and "Proof of value, 6-8 weeks" (four items shortened from "What this means for you").

## Not wording changes, noted for completeness

- **Careers:** all six roles are past their 30-day window. The new page shows them as closed under the existing "Past roles" grouping, and the open application stays available (Felipe, 2026-11-16). Text unchanged.
- **Logo:** the new wordmark keeps the name "IMKAN" in capitals with the Arabic "إمكان" (Felipe, 2026-11-16; ADR 0008).
