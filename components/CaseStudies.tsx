import React, { useState, useRef, useEffect } from 'react';

interface CaseStudy {
  id: number;
  title: string;
  category: string;
  color: string;
  colorClass: string;
  image: string;
  stat: string;
  statLabel: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  techStackDetailed: string;
}

const cases: CaseStudy[] = [
  // Vision 2030 Priority: Banking & Fintech (Case 1)
  {
    id: 1,
    title: "Banking Fraud Detection in Real-Time",
    category: "Banking & Financial Services",
    color: "primary",
    colorClass: "text-primary",
    image: "/images/use_cases/fraud_detection_security.png",
    stat: "<10s",
    statLabel: "Detection Time (was 1 day)",
    description: "Automated AI pipeline for real-time log analysis",
    fullDescription: "Built a production-grade real-time anomaly detection platform for a national financial institution, replacing manual log analysis processes with intelligent automation.",
    challenge: "The bank's security team was manually reviewing system logs, taking up to 1 day to identify anomalies. Rule-based monitoring systems missed unknown threats and generated excessive false positives.",
    solution: "Deployed a Kafka-powered streaming pipeline with custom ML models trained on historical patterns. The system processes logs in real-time, automatically identifies both known and unknown anomalies, and alerts the security team within seconds.",
    results: [
      "Reduced detection time from ~1 day to under 10 seconds (8,640x improvement)",
      "Identified unknown anomalies that rule-based systems completely missed",
      "Eliminated manual log review, freeing up 40+ hours per week for security team",
      "Decreased false positive rate by 75% through ML-based pattern recognition"
    ],
    tech: ["Kafka", "AWS Kinesis", "Databricks"],
    techStackDetailed: "Apache Kafka for event streaming, AWS Kinesis for data ingestion, Databricks (Spark) for distributed ML processing, Python (scikit-learn, TensorFlow) for anomaly detection models, AWS S3 for data lake storage, Amazon RDS (PostgreSQL) for metadata management, Grafana for monitoring dashboards, AWS Lambda for serverless alerting."
  },
  // Vision 2030 Priority: Real Estate & Giga-Projects (Case 2)
  {
    id: 2,
    title: "Smart Lead Scoring for Property Sales",
    category: "Real Estate & PropTech",
    color: "accent-green",
    colorClass: "text-accent-green",
    image: "/images/use_cases/real_estate.png",
    stat: "5x",
    statLabel: "Lead Conversion Rate",
    description: "Predictive models for high-intent buyer targeting",
    fullDescription: "Developed a predictive market intelligence platform for a national real estate company, transforming their sales and marketing approach with AI-driven lead scoring and customer targeting.",
    challenge: "The real estate platform was experiencing a baseline conversion rate of 1 in 20 leads (5%), resulting in high customer acquisition costs and inefficient sales team allocation. They had massive amounts of customer data but no way to identify high-intent buyers.",
    solution: "Built predictive ML models analyzing historical transaction patterns, browsing behavior, property preferences, and market signals. The system scores leads in real-time and provides hyper-targeted property recommendations, enabling sales teams to focus on high-probability conversions.",
    results: [
      "Increased lead conversion rate to 1 in 4 (25%) - a 5x improvement",
      "Reduced customer acquisition costs by over 50%",
      "Enabled hyper-targeted sales and marketing campaigns",
      "Accelerated average sales cycle by 30% through better qualification"
    ],
    tech: ["Azure ML", "Power BI", "Snowflake"],
    techStackDetailed: "Azure Machine Learning for model training and deployment, Snowflake for cloud data warehouse, Azure Synapse Analytics for data integration, Python (XGBoost, LightGBM) for gradient boosting models, Power BI for business intelligence dashboards, Azure Data Factory for ETL orchestration, Azure Cosmos DB for real-time user activity tracking, REST APIs for CRM integration."
  },
  // Vision 2030 Priority: Logistics & Supply Chain (Case 3)
  {
    id: 3,
    title: "Route Optimization for Last-Mile Delivery",
    category: "Logistics & Delivery",
    color: "purple",
    colorClass: "text-purple-400",
    image: "/images/use_cases/route_optimization.png",
    stat: "-32%",
    statLabel: "Operational Costs",
    description: "Simulation-based route and courier pay optimization",
    fullDescription: "Engineered a comprehensive logistics optimization system for a regional delivery network, combining route optimization with dynamic courier compensation modeling to balance efficiency with satisfaction.",
    challenge: "The logistics company faced rising operational costs, inconsistent courier satisfaction, and inefficient route planning. Traditional optimization tools didn't account for real-world factors like traffic patterns, courier preferences, and dynamic pricing needs.",
    solution: "Developed a simulation-based optimization engine that models various courier pay strategies and route configurations before deployment. The system uses historical data, traffic patterns, and courier feedback to generate optimal routes while ensuring fair compensation that improves retention.",
    results: [
      "Reduced operational costs by 32% through intelligent route optimization",
      "Increased courier satisfaction scores by 20%",
      "Decreased average delivery time by 18%",
      "Validated all changes through simulation before rollout, eliminating costly mistakes"
    ],
    tech: ["Google OR-Tools", "GCP BigQuery", "Vertex AI"],
    techStackDetailed: "Google OR-Tools for vehicle routing optimization, GCP BigQuery for data warehousing and analytics, Vertex AI for predictive demand forecasting, Python (SimPy, NumPy) for discrete event simulation, Google Maps API for real-time traffic data, Cloud Run for containerized microservices, Firestore for real-time courier tracking, Looker for operational dashboards."
  },
  // Vision 2030 Priority: Banking & Digital Payments (Case 4)
  {
    id: 4,
    title: "Credit Risk Scoring with Machine Learning",
    category: "Banking & Financial Services",
    color: "primary",
    colorClass: "text-primary",
    image: "/images/use_cases/credit_risk3.png",
    stat: "70%",
    statLabel: "Automated Decisions",
    description: "Automated credit decisions and customer value prediction",
    fullDescription: "Developed automated credit risk assessment and customer lifetime value (CLV) modeling systems for a digital lending platform, enabling data-driven underwriting and retention strategies.",
    challenge: "Manual credit assessment was slow, inconsistent, and couldn't scale with growing loan applications. No systematic approach to predicting customer lifetime value meant missed upsell opportunities and reactive retention efforts.",
    solution: "Built ML models analyzing credit history, transaction patterns, employment data, and behavioral signals to predict default risk and early repayment probability. Developed CLV models identifying high-value customers for targeted retention and product recommendations.",
    results: [
      "Automated 70% of credit decisions with ML-based underwriting",
      "Reduced loan approval time from days to minutes",
      "Improved default prediction accuracy by 40%",
      "Increased customer retention by 25% through targeted CLV-based interventions"
    ],
    tech: ["Snowflake", "AWS SageMaker", "Tableau"],
    techStackDetailed: "Snowflake for cloud data warehouse, AWS SageMaker for ML model training and deployment, Python (XGBoost, CatBoost) for gradient boosting classifiers, AWS Lambda for serverless scoring APIs, Amazon S3 for feature storage, Tableau for risk analytics dashboards, AWS Step Functions for workflow orchestration, Amazon RDS (PostgreSQL) for application database."
  },
  // Vision 2030 Priority: Retail & E-commerce (Case 5)
  {
    id: 5,
    title: "Demand Forecasting for Retail Inventory",
    category: "Retail & E-commerce",
    color: "accent-green",
    colorClass: "text-accent-green",
    image: "/images/use_cases/sales_forecasting.png",
    stat: "87%",
    statLabel: "Forecast Accuracy",
    description: "AI-powered inventory optimization and purchasing",
    fullDescription: "Built an intelligent demand forecasting and inventory optimization system for a multi-million dollar retail operation, transforming reactive inventory management into predictive, data-driven decision-making.",
    challenge: "The retail chain struggled with inventory waste from overstocking and lost revenue from stockouts. Manual forecasting methods couldn't handle seasonal patterns, promotional impacts, and complex product interdependencies.",
    solution: "Deployed time-series ML models analyzing historical sales, seasonal trends, promotional calendars, weather patterns, and external market signals. The system provides automated daily forecasts with confidence intervals, enabling optimized ordering decisions and dynamic inventory allocation across locations.",
    results: [
      "Achieved 87% forecast accuracy across all SKUs",
      "Reduced inventory waste by 40% through precise demand prediction",
      "Decreased stockout incidents by 65%",
      "Accelerated sourcing decisions and improved supplier negotiations"
    ],
    tech: ["BigQuery", "Prophet", "Looker"],
    techStackDetailed: "Google BigQuery for cloud data warehouse, Prophet (Facebook) for time-series forecasting, Python (Pandas, Statsmodels) for statistical analysis, Looker for BI dashboards, GCP Cloud Functions for automated forecasting runs, Cloud Scheduler for daily batch jobs, BigQuery ML for in-warehouse model training, Pub/Sub for event-driven alerts."
  },
  // Vision 2030 Priority: Tourism & Hospitality (Case 6)
  {
    id: 6,
    title: "Travel Booking Data Transformation",
    category: "Travel & Tourism",
    color: "purple",
    colorClass: "text-purple-400",
    image: "/images/use_cases/travel_booking.png",
    stat: "70%",
    statLabel: "Complexity Reduction",
    description: "Simplifying legacy PNR data for AI models",
    fullDescription: "Transformed complex Passenger Name Record (PNR) data into clean, analytics-ready formats for a major travel booking platform, enabling AI-driven personalization and customer insights.",
    challenge: "PNR data was stored in legacy formats with extreme complexity, making analysis time-consuming (weeks per insight). The data team couldn't quickly answer business questions or build customer profiling models due to data accessibility barriers.",
    solution: "Engineered automated ETL pipelines that parse, normalize, and structure PNR data into dimensional models optimized for analytics. Built data quality checks, lineage tracking, and self-service query interfaces that make the data accessible to business analysts.",
    results: [
      "Reduced PNR data complexity by 70-80% through intelligent modeling",
      "Accelerated insight generation from weeks to days",
      "Enabled AI-ready customer profiling for personalization",
      "Unlocked hyper-personalized booking recommendations"
    ],
    tech: ["Databricks", "Delta Lake", "dbt"],
    techStackDetailed: "Databricks for unified analytics platform, Delta Lake for ACID transactions on data lake, dbt (data build tool) for SQL-based transformation workflows, Apache Spark for distributed data processing, Python (PySpark) for ETL logic, AWS S3 for raw data storage, AWS Glue for metadata catalog, Tableau for self-service analytics, Great Expectations for data quality validation."
  },
  // Vision 2030 Priority: Banking Digital Transformation (Case 7)
  {
    id: 7,
    title: "Real-Time Feature Store for Banking AI",
    category: "Banking & Financial Services",
    color: "primary",
    colorClass: "text-primary",
    image: "/images/use_cases/feature_store.png",
    stat: "45%",
    statLabel: "Productivity Gain",
    description: "Centralized ML features for instant model deployment",
    fullDescription: "Architected a production-grade real-time feature store and streaming data platform for a national financial institution, enabling near real-time ML model serving and eliminating redundant feature engineering work.",
    challenge: "Data scientists were spending 60% of their time on repetitive feature engineering tasks. Models couldn't leverage real-time data, limiting their effectiveness. No centralized feature repository meant duplicate work and inconsistent definitions across teams.",
    solution: "Built a Kafka-based streaming platform with a centralized feature store enabling feature reuse, versioning, and real-time serving. The system ingests transaction streams, computes features on-the-fly, and serves them to ML models with sub-second latency.",
    results: [
      "40-50% productivity gain for data science teams through feature reuse",
      "Enabled near real-time ML predictions (from batch to streaming)",
      "Scaled AI-driven digital banking products to millions of users",
      "Reduced time-to-production for new models by 60%"
    ],
    tech: ["Kafka", "Redis", "Feast"],
    techStackDetailed: "Apache Kafka for event streaming, Feast (feature store framework) for feature management, Redis for low-latency feature serving, Apache Flink for stream processing, Kubernetes for container orchestration, PostgreSQL for feature metadata, AWS S3 for offline feature storage, MLflow for model versioning, Python (PySpark, Pandas) for feature engineering."
  },
  // Vision 2030 Priority: Tourism Infrastructure (Case 8)
  {
    id: 8,
    title: "Real-Time Analytics for Travel Bookings",
    category: "Travel & Tourism",
    color: "accent-green",
    colorClass: "text-accent-green",
    image: "/images/use_cases/travel_analytics.png",
    stat: "65%",
    statLabel: "Faster Insights",
    description: "Modern cloud data warehouse with streaming",
    fullDescription: "Built a modern data warehouse and streaming platform for a travel booking company, transforming their analytics capability from slow batch processing to near real-time insights with enterprise governance.",
    challenge: "Analytics queries took hours to run on legacy systems. Business teams couldn't access timely data for decision-making. No governance framework meant data quality issues and compliance risks.",
    solution: "Architected a modern cloud data warehouse with streaming ingestion pipelines. Implemented role-based access control, data lineage tracking, and automated quality checks. Built self-service BI layer enabling business users to explore data safely.",
    results: [
      "Improved analytics availability by 60-70%",
      "Enabled near real-time reporting (from 4-hour batch delays)",
      "Implemented enterprise-grade governance and compliance",
      "Reduced query response times from hours to seconds"
    ],
    tech: ["Snowflake", "Fivetran", "Sigma"],
    techStackDetailed: "Snowflake for cloud data warehouse, Fivetran for automated data integration, Sigma Computing for self-service BI, dbt for transformation logic, Apache Airflow for workflow orchestration, AWS Kinesis for real-time streaming ingestion, Monte Carlo for data observability, Atlan for data catalog and governance, Snowpipe for continuous data loading."
  },
  // Vision 2030 Priority: Retail Sector Growth (Case 9)
  {
    id: 9,
    title: "Enterprise Data Foundation for Retail",
    category: "Retail & E-commerce",
    color: "purple",
    colorClass: "text-purple-400",
    image: "/images/use_cases/infrastructure.png",
    stat: ">1TB",
    statLabel: "Data Activated",
    description: "AI-ready data warehouse from scattered sources",
    fullDescription: "Established a complete enterprise data warehouse and analytics foundation for a retail chain, transforming over 1TB of siloed, underutilized data into a strategic business asset enabling AI and advanced analytics.",
    challenge: "Data was scattered across 20+ legacy systems with no integration. Business teams couldn't answer basic questions without IT support. No foundation existed for advanced analytics or AI initiatives.",
    solution: "Built a modern cloud data warehouse with automated ETL pipelines integrating all data sources. Implemented dimensional modeling, historical tracking, and data quality frameworks. Created self-service BI tools and established data governance processes.",
    results: [
      "Enabled analytics on over 1TB of previously underutilized data",
      "Reduced time-to-insight by 50-60% through self-service access",
      "Established scalable AI-ready data foundations",
      "Empowered 100+ business users with self-service analytics"
    ],
    tech: ["Azure Synapse", "ADF", "Power BI"],
    techStackDetailed: "Azure Synapse Analytics for unified analytics platform, Azure Data Factory (ADF) for ETL orchestration, Power BI for business intelligence, Azure Data Lake Gen2 for data lake storage, Azure Databricks for advanced analytics, Python (PySpark) for data transformations, Azure DevOps for CI/CD pipelines, Microsoft Purview for data governance and cataloging."
  },
  // Vision 2030 Priority: Healthcare Quality & AI (Case 10)
  {
    id: 10,
    title: "Clinical AI Safety & Validation",
    category: "Healthcare & Clinical AI",
    color: "primary",
    colorClass: "text-primary",
    image: "/images/use_cases/ai_healthcare4.png",
    stat: "NHS-Scale",
    statLabel: "Governance Ready",
    description: "Multi-layer LLM validation for patient safety",
    fullDescription: "Engineered a comprehensive AI quality and validation framework for healthcare applications, ensuring clinical safety, transparency, and regulatory compliance for LLM-powered clinical decision support systems.",
    challenge: "Healthcare AI faces unique challenges: patient safety is paramount, regulatory requirements are strict, and AI model failures can have life-threatening consequences. Traditional ML validation approaches weren't sufficient for LLM-based clinical tools.",
    solution: "Built a multi-layered evaluation framework combining automated testing (accuracy, safety, bias), human expert review, and continuous monitoring. Implemented full audit trails, explainability features, and NHS-aligned governance processes ensuring transparency and accountability.",
    results: [
      "Established NHS-scale governance framework for clinical AI",
      "Improved transparency and auditability for regulatory compliance",
      "Reduced AI safety incidents to near-zero through multi-layer validation",
      "Enabled confident deployment of AI in clinical workflows"
    ],
    tech: ["OpenAI API", "LangChain", "MLflow"],
    techStackDetailed: "OpenAI GPT-4 API for LLM capabilities, LangChain for LLM orchestration and chaining, MLflow for experiment tracking and model registry, PostgreSQL for audit logs and versioning, FastAPI for REST APIs, Docker for containerization, Kubernetes for orchestration, Prometheus + Grafana for monitoring, Python (NLTK, spaCy) for NLP evaluation, Weights & Biases for model performance tracking."
  },
  // Vision 2030 Priority: Customer Service AI (Case 11)
  {
    id: 11,
    title: "AI Agents for Customer Negotiations",
    category: "Customer Service & AI Agents",
    color: "accent-green",
    colorClass: "text-accent-green",
    image: "/images/use_cases/ai_negotiation3.png",
    stat: "60%",
    statLabel: "Workload Reduction",
    description: "Autonomous agents for pricing and workflows",
    fullDescription: "Deployed GenAI-powered agentic systems handling complex customer negotiations, price quoting, and multi-step workflows autonomously, transforming customer service operations from reactive to intelligent automation.",
    challenge: "Sales and customer service teams spent hours on routine negotiations and price quotes. Manual workflows were inconsistent, slow, and couldn't scale. Customers expected instant responses 24/7.",
    solution: "Built agentic AI systems powered by large language models (LLMs) that understand context, negotiate pricing within approved parameters, handle objections, and complete multi-step workflows autonomously. The agents integrate with CRM, pricing engines, and inventory systems to provide accurate, real-time responses.",
    results: [
      "Automated end-to-end customer negotiation workflows",
      "Reduced sales workload by 60% through intelligent automation",
      "Improved pricing consistency and margin protection",
      "Enabled 24/7 customer service with instant response times"
    ],
    tech: ["LangGraph", "ChromaDB", "Azure OpenAI"],
    techStackDetailed: "LangGraph for agentic workflow orchestration, Azure OpenAI Service (GPT-4) for conversational AI, ChromaDB for vector database and semantic search, LangChain for LLM chaining, Redis for session management, FastAPI for backend APIs, PostgreSQL for transaction logs, Twilio for omnichannel communication, Salesforce API for CRM integration, Stripe API for payment processing."
  }
];

// Helper function to get hover color classes
const getHoverColorClass = (colorClass: string): string => {
  const hoverMap: Record<string, string> = {
    'text-primary': 'group-hover:text-primary',
    'text-accent-green': 'group-hover:text-accent-green',
    'text-purple-400': 'group-hover:text-purple-400',
  };
  return hoverMap[colorClass] || 'group-hover:text-white';
};

// Helper function to get gradient styles for dynamic colors
const getGradientStyle = (color: string) => {
  const gradientMap: Record<string, string> = {
    'primary': 'linear-gradient(to right, #25e2f4, transparent)',
    'accent-green': 'linear-gradient(to right, #a3e635, transparent)',
    'purple': 'linear-gradient(to right, rgb(168, 85, 247), transparent)',
  };
  return { backgroundImage: gradientMap[color] || gradientMap['primary'] };
};

const CaseStudies: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCaseClick = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Smooth scroll function
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 420 : 340; // md breakpoint
      const gap = window.innerWidth >= 768 ? 32 : 16; // gap-8 (32px) on desktop, gap-4 (16px) on mobile
      const scrollAmount = cardWidth + gap;
      
      const targetScroll = scrollContainerRef.current.scrollLeft + 
        (direction === 'right' ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll position on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Recheck scroll position when showAll changes
  useEffect(() => {
    checkScrollPosition();
  }, [showAll]);

  // Recheck scroll position on window resize (mobile ↔ desktop transitions)
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="cases" className="w-full py-24 bg-background-dark relative overflow-hidden border-t border-white/5">
       {/* Background Stream Lines */}
       <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
       <div className="absolute top-1/2 left-0 w-full h-[200px] -translate-y-1/2 bg-primary/5 blur-[100px] opacity-20"></div>

       <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col items-start">
          <h2 className="text-primary font-mono text-xs font-bold uppercase tracking-wider mb-2">Production Systems</h2>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-3">
             Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Impact</span>
          </h1>
          <p className="text-gray-400 text-base max-w-xl">15+ production-grade AI and data solutions delivering measurable results across banking, logistics, healthcare, and beyond.</p>
        </div>
      </div>

      {/* Horizontal Scroll Area - Contained within max-w-7xl */}
      <div className="max-w-7xl mx-auto px-6 md:px-6 relative z-10">
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto pb-6 no-scrollbar relative snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 md:gap-8 w-max px-4 md:px-0">
            {/* First 5 cards - always visible */}
            {cases.slice(0, 5).map((item) => (
             <div 
               key={item.id} 
               className="group relative w-[340px] md:w-[420px] h-[500px] perspective-1000 cursor-pointer snap-center flex-shrink-0"
               onClick={() => handleCaseClick(item)}
             >
                {/* Connecting Line (Decorative) */}
                <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-white/20 hidden md:block group-first:hidden"></div>

                <div className="w-full h-full bg-surface-dark border border-white/10 rounded-xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group-hover:border-white/20">
                   
                   {/* Holographic Top Bar */}
                   <div className="absolute top-0 left-0 right-0 h-1 z-20" style={getGradientStyle(item.color)}></div>

                   {/* Image Container */}
                   <div className="h-3/5 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-surface-dark"></div>
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 border border-white/10 px-3 py-1 rounded text-xs font-mono text-white/80 uppercase tracking-widest">
                         {item.category}
                      </div>

                      {/* Stat Overlay (Hidden until hover) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                         <div className={`text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-tighter`}>
                            {item.stat}
                         </div>
                         <div className={`text-xs font-bold uppercase tracking-widest mt-1 ${item.colorClass}`}>
                            {item.statLabel}
                         </div>
                      </div>
                   </div>

                   {/* Content Body */}
                   <div className="absolute bottom-0 left-0 right-0 p-6 h-2/5 flex flex-col justify-between bg-surface-dark/95 backdrop-blur-xl border-t border-white/5">
                      <div>
                         <h3 className={`text-xl font-bold mb-2 text-white transition-all duration-300 ${getHoverColorClass(item.colorClass)}`}>
                           {item.title}
                         </h3>
                         <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {item.description}
                         </p>
                      </div>
                      
                      {/* Technology Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                         {item.tech.map((tech, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-400 font-mono uppercase tracking-wider">
                               {tech}
                            </span>
                         ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex gap-2">
                            {/* Removed status indicator */}
                         </div>
                         <button className={`text-white transition-all duration-300 flex items-center gap-2 text-sm font-bold ${getHoverColorClass(item.colorClass)}`}>
                            Read More <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                         </button>
                      </div>
                   </div>
                   
                   {/* Scanline Effect */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                </div>
             </div>
          ))}

            {/* "See All Solutions" CTA Card - Appears after card 5 when collapsed */}
            {!showAll && (
              <div className="relative w-[340px] md:w-[420px] h-[500px] flex items-center justify-center snap-center flex-shrink-0">
                <div className="absolute inset-0 glass-card rounded-xl border border-white/20 flex items-center justify-center backdrop-blur-md">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-transparent opacity-50 rounded-xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center px-8">
                    <div className="size-16 mx-auto mb-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">5 More Solutions</h3>
                    <p className="text-gray-400 text-sm mb-6">Explore our full portfolio of production AI systems</p>
                    <button 
                      onClick={() => setShowAll(true)}
                      className="bg-primary text-background-dark font-bold text-sm px-8 py-3 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(37,226,244,0.3)] hover:shadow-[0_0_25px_rgba(37,226,244,0.5)] hover:scale-105 group"
                    >
                      <span className="flex items-center gap-2">
                        See All Solutions
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Cards 6-11 - Only visible when expanded */}
            {showAll && cases.slice(5).map((item) => (
             <div
               key={item.id}
               className="group relative w-[340px] md:w-[420px] h-[500px] perspective-1000 animate-fadeIn cursor-pointer snap-center flex-shrink-0"
               style={{ animationDelay: `${(item.id - 6) * 50}ms` }}
               onClick={() => handleCaseClick(item)}
             >
                {/* Connecting Line (Decorative) */}
                <div className="absolute top-1/2 -left-8 w-8 h-[1px] bg-white/20 hidden md:block"></div>

                <div className="w-full h-full bg-surface-dark border border-white/10 rounded-xl overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] group-hover:border-white/20">
                   
                   {/* Holographic Top Bar */}
                   <div className="absolute top-0 left-0 right-0 h-1 z-20" style={getGradientStyle(item.color)}></div>

                   {/* Image Container */}
                   <div className="h-3/5 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${item.image})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-dark/50 to-surface-dark"></div>
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-6 left-6 backdrop-blur-md bg-black/30 border border-white/10 px-3 py-1 rounded text-xs font-mono text-white/80 uppercase tracking-widest">
                         {item.category}
                      </div>

                      {/* Stat Overlay (Hidden until hover) */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                         <div className={`text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] tracking-tighter`}>
                            {item.stat}
                         </div>
                         <div className={`text-xs font-bold uppercase tracking-widest mt-1 ${item.colorClass}`}>
                            {item.statLabel}
                         </div>
                      </div>
                   </div>

                   {/* Content Body */}
                   <div className="absolute bottom-0 left-0 right-0 p-6 h-2/5 flex flex-col justify-between bg-surface-dark/95 backdrop-blur-xl border-t border-white/5">
                      <div>
                         <h3 className={`text-xl font-bold mb-2 text-white transition-all duration-300 ${getHoverColorClass(item.colorClass)}`}>
                           {item.title}
                         </h3>
                         <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                            {item.description}
                         </p>
                      </div>
                      
                      {/* Technology Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2 mb-2">
                         {item.tech.map((tech, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] text-gray-400 font-mono uppercase tracking-wider">
                               {tech}
                            </span>
                         ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <div className="flex gap-2">
                            {/* Removed status indicator */}
                         </div>
                         <button className={`text-white transition-all duration-300 flex items-center gap-2 text-sm font-bold ${getHoverColorClass(item.colorClass)}`}>
                            Read More <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                         </button>
                      </div>
                   </div>
                   
                   {/* Scanline Effect */}
                   <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20"></div>
                </div>
             </div>
          ))}
          </div>
        </div>

        {/* Navigation Arrows - Responsive for Mobile & Desktop */}
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="flex absolute left-1 md:left-0 top-1/2 -translate-y-1/2 z-20 
                       size-10 md:size-12 
                       items-center justify-center rounded-full 
                       bg-primary/90 hover:bg-primary active:bg-primary 
                       text-background-dark backdrop-blur-md 
                       shadow-[0_0_15px_rgba(37,226,244,0.3)] md:shadow-[0_0_20px_rgba(37,226,244,0.4)] 
                       hover:shadow-[0_0_25px_rgba(37,226,244,0.5)] md:hover:shadow-[0_0_30px_rgba(37,226,244,0.6)] 
                       transition-all duration-300 
                       hover:scale-105 md:hover:scale-110 
                       active:scale-95
                       group"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl group-hover:-translate-x-0.5 transition-transform duration-300">chevron_left</span>
          </button>
        )}

        {/* Right Arrow - Automatically hidden when reaching the end (including "See All Solutions" button) */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="flex absolute right-1 md:right-0 top-1/2 -translate-y-1/2 z-20 
                       size-10 md:size-12 
                       items-center justify-center rounded-full 
                       bg-primary/90 hover:bg-primary active:bg-primary 
                       text-background-dark backdrop-blur-md 
                       shadow-[0_0_15px_rgba(37,226,244,0.3)] md:shadow-[0_0_20px_rgba(37,226,244,0.4)] 
                       hover:shadow-[0_0_25px_rgba(37,226,244,0.5)] md:hover:shadow-[0_0_30px_rgba(37,226,244,0.6)] 
                       transition-all duration-300 
                       hover:scale-105 md:hover:scale-110 
                       active:scale-95
                       group"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl group-hover:translate-x-0.5 transition-transform duration-300">chevron_right</span>
          </button>
        )}

        {/* "Show Less" Button (when expanded) - Inside max-w-7xl boundary */}
        {showAll && (
          <div className="flex justify-center mt-8 animate-fadeIn">
            <button 
              onClick={() => setShowAll(false)}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl transition-all duration-300"
            >
              <span className="material-symbols-outlined">expand_less</span>
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background-dark/90 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header with Image */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedCase.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-background-dark/80 to-background-card"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded text-xs font-mono text-white/90 uppercase tracking-widest">
                      {selectedCase.category}
                    </span>
                    <div className="flex gap-2">
                      {selectedCase.tech.map((tech, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] text-gray-300 font-mono uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${selectedCase.colorClass} mb-2`}>
                    {selectedCase.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-4xl font-black text-white">{selectedCase.stat}</span>
                      <span className="text-sm text-gray-400">{selectedCase.statLabel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 md:p-10 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className={`material-symbols-outlined ${selectedCase.colorClass}`}>info</span>
                    Overview
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedCase.fullDescription}
                  </p>
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className={`material-symbols-outlined ${selectedCase.colorClass}`}>problem</span>
                    The Challenge
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className={`material-symbols-outlined ${selectedCase.colorClass}`}>lightbulb</span>
                    Our Solution
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className={`material-symbols-outlined ${selectedCase.colorClass}`}>trending_up</span>
                    Impact & Results
                  </h3>
                  <ul className="space-y-3">
                    {selectedCase.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className={`material-symbols-outlined text-lg mt-0.5 ${selectedCase.colorClass}`}>check_circle</span>
                        <span className="leading-relaxed">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                    <span className={`material-symbols-outlined ${selectedCase.colorClass}`}>construction</span>
                    Technology Stack
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCase.techStackDetailed}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                  <button className={`flex-1 bg-primary hover:bg-white text-background-dark font-bold py-4 px-6 rounded-xl transition-colors shadow-[0_0_20px_rgba(37,226,244,0.2)]`}>
                    Start Similar Project
                  </button>
                  <button 
                    onClick={closeModal}
                    className="flex-1 border border-white/20 hover:bg-white/5 text-white font-bold py-4 px-6 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;