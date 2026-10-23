import { SERVICE_IMAGES, HUB_CITY_IMAGES, ABOUT_IMAGES } from './imageAssets';

export const COMPANY = {
  name: "Elicit Research & Insights Inc.",
  shortName: "Elicit Research",
  tagline: "Global Market Research & Information Technology Solutions",
  subtitle: "Empowering global enterprise brands and strategic leaders with verified high-fidelity data, proprietary panel access, and predictive market intelligence.",
  description: "Elicit Research & Insights Inc. is a global market research and information technology solutions company. We specialize in precision online/offline sampling, quantitative survey programming, and advanced consumer and B2B strategic intelligence.",
  emails: {
    general: "info@elicitresearch.com",
    rfq: "RFQ@elicitresearch.com",
    sales: "RFQ@elicitresearch.com",
    support: "info@elicitresearch.com",
    careers: "careers@elicitresearch.com"
  },
  phone: "+1 (800) 518-ELICIT",
  headquarters: {
    us: {
      city: "New York",
      address: "One World Trade Center, Suite 8500",
      region: "New York, NY 10007, USA",
      image: HUB_CITY_IMAGES.us
    },
    uk: {
      city: "London",
      address: "30 St Mary Axe, City of London",
      region: "London EC3A 8EP, United Kingdom",
      image: HUB_CITY_IMAGES.uk
    },
    asia: {
      city: "Singapore",
      address: "Marina Bay Financial Centre, Tower 1",
      region: "Singapore 018981",
      image: HUB_CITY_IMAGES.asia
    },
    india: {
      city: "Bengaluru",
      address: "Prestige Tech Park, Outer Ring Road",
      region: "Bengaluru, KA 560103, India",
      image: HUB_CITY_IMAGES.india
    }
  },
  stats: [
    {
      id: "panel-members",
      value: "5M+",
      label: "Panel Members",
      sublabel: "Verified B2B & B2C panelists globally across 45+ target markets",
      highlight: "Electric Cyan",
      color: "#00F0FF"
    },
    {
      id: "surveys-done",
      value: "10K+",
      label: "Survey Done",
      sublabel: "Completed rigorous quantitative & qualitative research studies",
      highlight: "Electric Teal",
      color: "#10B981"
    },
    {
      id: "rewarded-so-far",
      value: "30M+",
      label: "Rewarded So Far",
      sublabel: "In respondent incentives paid directly ensuring retention & honesty",
      highlight: "Lumina Violet",
      color: "#8B5CF6"
    },
    {
      id: "countries-covered",
      value: "45+",
      label: "Global Reach",
      sublabel: "Active market coverage across North America, EMEA, APAC & LATAM",
      highlight: "Amber Glow",
      color: "#F59E0B"
    }
  ],
  panelPlatformUrl: "https://portal.elicitresearch.com", // Verified panelist portal access
  socials: {
    linkedin: "https://www.linkedin.com/company/elicit-research",
    facebook: "https://www.facebook.com/elicitresearch",
    instagram: "https://www.instagram.com/elicitresearch",
    twitter: "https://x.com/elicitresearch"
  }
};

const RAW_SERVICES = [
  {
    id: "survey-programming",
    title: "Survey Programming",
    category: "Quantitative Technology",
    icon: "Code2",
    badge: "Core Capability",
    shortDesc: "End-to-end multi-platform scripting with complex logic, multimedia piping, conjoint designs, and real-time fraud mitigation.",
    fullDesc: "We engineer robust, responsive, and engaging survey instruments compatible with Confirmit, Decipher, Qualtrics, and proprietary platforms. Our programming incorporates algorithmic trap questions, device fingerprinting, keystroke velocity validation, and responsive mobile-first UI.",
    capabilities: [
      "Dynamic conjoint & MaxDiff analysis scripting",
      "Real-time fraud & digital fingerprinting checks",
      "Interactive audio/video stimulus piping",
      "Multi-language localization (40+ dialects)",
      "Automated API quota management & redirects"
    ],
    deliverables: "Validated survey link, simulator test matrix, real-time quota dashboard, raw data feeds."
  },
  {
    id: "performance-tracking",
    title: "Performance Tracking",
    category: "Longitudinal Analytics",
    icon: "TrendingUp",
    badge: "Continuous Intelligence",
    shortDesc: "Longitudinal brand health, campaign uplift, and market share tracking to measure shifting market dynamics in real time.",
    fullDesc: "Continuous wave and pulse tracking architectures engineered to monitor consumer sentiment, brand salience, net promoter score (NPS), and share of voice across volatile market cycles.",
    capabilities: [
      "Brand equity & health indices",
      "Pre/post advertising campaign uplift metrics",
      "Competitive benchmarking pulse studies",
      "Automated automated KPI reporting portals",
      "Statistical significance & trending analysis"
    ],
    deliverables: "Live telemetry dashboard, automated executive summaries, SPSS/CSV cleaned datasets."
  },
  {
    id: "research-design",
    title: "Research Design",
    category: "Methodology Architecture",
    icon: "Compass",
    badge: "Strategic Advisory",
    shortDesc: "Rigorous scientific research methodologies tailored to address high-stakes business questions with statistical confidence.",
    fullDesc: "From exploratory framework development to probability sampling schemas, our PhD-led methodology team designs customized research frameworks that eliminate bias, maximize statistical confidence, and pinpoint actionable insights.",
    capabilities: [
      "Probability & stratified sampling design",
      "Hypothesis development & questionnaire engineering",
      "Mixed-methodology synthesis (Quant + Qual)",
      "Power analysis & margin of error modeling",
      "Trade-off & behavioral game theory modeling"
    ],
    deliverables: "Methodology blueprint, sample design specification, statistical power justification report."
  },
  {
    id: "qualitative-research",
    title: "Qualitative Research",
    category: "Human Centered Insights",
    icon: "Users",
    badge: "Deep Empathy",
    shortDesc: "In-depth consumer exploration via digital focus groups, ethnographic immersions, and executive IDIs across global hubs.",
    fullDesc: "Uncover the emotional drivers, subconscious motivations, and latent desires behind consumer behaviors. We manage digital diaries, video asynchronous focus groups, and executive C-suite interviews worldwide.",
    capabilities: [
      "C-Suite & Key Opinion Leader (KOL) in-depth interviews",
      "Digital bulletin boards & asynchronous video diaries",
      "Synchronous virtual focus groups with live translation",
      "Mobile ethnography & shop-alongs",
      "Thematic coding & sentiment extraction"
    ],
    deliverables: "Video highlight reels, thematic verbatim reports, strategic customer persona maps."
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation",
    category: "Targeting & Positioning",
    icon: "PieChart",
    badge: "Predictive Analytics",
    shortDesc: "Advanced latent class clustering and psychographic profiling to identify your highest-value customer archetypes.",
    fullDesc: "Move beyond standard demographic buckets. Our segmentation combines behavioral telemetry, psychographic values, transactional history, and unmet needs into clear, actionable segment typologies.",
    capabilities: [
      "Latent class analysis & K-means clustering",
      "Typology typing tools for CRM scoring integration",
      "Segment financial valuation & opportunity sizing",
      "Psychographic, attitudinal, and behavioral profiling",
      "Target persona playbook creation"
    ],
    deliverables: "Interactive typing tool, segment persona dossiers, CRM scoring algorithms."
  },
  {
    id: "customer-journey",
    title: "Customer Journey",
    category: "Experience Engineering",
    icon: "GitFork",
    badge: "CX Optimization",
    shortDesc: "Holistic omni-channel mapping of user touchpoints, emotional friction, conversion bottlenecks, and advocacy moments.",
    fullDesc: "Map the complete lifecycle from initial discovery and research to purchase, onboarding, and retention. We identify pivotal 'make-or-break' moments that influence retention and customer lifetime value (LTV).",
    capabilities: [
      "Omni-channel touchpoint friction audits",
      "Emotional heatmaps across key decision gates",
      "Post-purchase attribution & drop-off analysis",
      "Omni-channel CX pathway simulation",
      "Voice of Customer (VoC) feedback loops"
    ],
    deliverables: "Comprehensive Journey Blueprint, friction priority matrix, CX optimization roadmap."
  },
  {
    id: "communication-strategy",
    title: "Communication Strategy",
    category: "Brand & Narrative",
    icon: "MessageSquare",
    badge: "Message Optimization",
    shortDesc: "Empirically validated message testing, value proposition refinement, and narrative framing that drives conversions.",
    fullDesc: "Ensure your messaging cuts through the noise. We empirically test messaging concepts, brand positioning statements, and advertising copy before expensive media execution.",
    capabilities: [
      "Concept, claim & message package testing",
      "Emotional resonance & attention heatmapping",
      "Distinctive brand asset (DBA) measurement",
      "Cross-channel narrative coherence evaluations",
      "Crisis communication resilience simulation"
    ],
    deliverables: "Message performance scorecard, creative optimization brief, hierarchy recommendations."
  },
  {
    id: "cultural-insights",
    title: "Cultural Insights",
    category: "Global Localization",
    icon: "Globe",
    badge: "Macro Context",
    shortDesc: "Contextual cultural intelligence decoding regional social codes, demographic shifts, and emerging subculture trends.",
    fullDesc: "Successful global expansion requires acute cultural literacy. Our cultural anthropology experts translate subtle nuances, taboos, and emergent lifestyle rituals into brand growth opportunities across emerging and mature markets.",
    capabilities: [
      "Macro trend & socio-cultural forecasting",
      "Cross-border brand positioning translation",
      "Subcultural movement & diaspora mapping",
      "Semiotic & visual culture audits",
      "Generational shift profiling (Gen Z, Millennials, Boomers)"
    ],
    deliverables: "Cultural intelligence dossier, semiotic audit report, local adaptation playbook."
  },
  {
    id: "b2b-strategies",
    title: "B2B Strategies",
    category: "Enterprise Research",
    icon: "Briefcase",
    badge: "High-Value Sampling",
    shortDesc: "Targeted research across hard-to-reach enterprise buyers, IT decision-makers, supply chain leads, and C-level executives.",
    fullDesc: "Navigating complex B2B buying committees requires verified authority. We access verified decision-makers (CIOs, CTOs, CFOs, Procurement heads) across Fortune 500 enterprises and SMBs globally.",
    capabilities: [
      "B2B buying committee role & influence mapping",
      "Enterprise software & cloud procurement evaluations",
      "Supplier & vendor relationship scorecards",
      "Pricing sensitivity (Van Westendorp & Gabor-Granger)",
      "Product-Market fit validation for enterprise SaaS"
    ],
    deliverables: "Executive decision hierarchy map, B2B procurement playbook, pricing elasticity curve."
  },
  {
    id: "growth-strategy",
    title: "Growth Strategy",
    category: "Corporate Evolution",
    icon: "Rocket",
    badge: "Market Expansion",
    shortDesc: "Data-driven market entry, total addressable market (TAM) sizing, whitespace discovery, and M&A commercial due diligence.",
    fullDesc: "Transform raw data into decisive competitive moats. We partner with executive boards, private equity firms, and corporate strategy teams to model market expansion and de-risk strategic pivots.",
    capabilities: [
      "TAM / SAM / SOM market opportunity sizing",
      "Commercial due diligence & customer retention audits",
      "Whitespace & unserved consumer needs discovery",
      "Competitive war-gaming & disruption forecasting",
      "Go-to-market (GTM) route-to-market optimization"
    ],
    deliverables: "Strategic Board Deck, market model financial projections, GTM action roadmap."
  }
];

export const SERVICES = RAW_SERVICES.map(s => ({
  ...s,
  image: SERVICE_IMAGES[s.id]
}));

export const PANEL_REGIONS = [
  {
    region: "North America",
    members: "1.8M+",
    countries: "United States, Canada, Mexico",
    focus: "Enterprise B2B, Tech buyers, Healthcare, High-income consumers",
    coverage: "88% B2B C-Suite reach in US/CA",
    pinCoord: { x: "22%", y: "32%" }
  },
  {
    region: "Europe & UK (EMEA)",
    members: "1.4M+",
    countries: "United Kingdom, Germany, France, Nordics, Benelux, UAE, KSA",
    focus: "Financial services, Sustainability, Industrial, Pan-EU consumer panels",
    coverage: "GDPR/UK-DPA strictly audited",
    pinCoord: { x: "49%", y: "28%" }
  },
  {
    region: "Asia-Pacific (APAC)",
    members: "1.3M+",
    countries: "Japan, Australia, Singapore, India, South Korea, Indonesia",
    focus: "Digital natives, Fintech adopters, Manufacturing, Mobile-first consumers",
    coverage: "Native language translation & localized incentives",
    pinCoord: { x: "78%", y: "48%" }
  },
  {
    region: "Latin America (LATAM)",
    members: "500K+",
    countries: "Brazil, Mexico, Colombia, Chile, Argentina",
    focus: "Emerging middle class, E-commerce, FMCG, B2B agribusiness",
    coverage: "Hyper-localized regional dialing & online access",
    pinCoord: { x: "32%", y: "65%" }
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: "01",
    name: "Architectural Scoping",
    desc: "Rigorous definition of core research hypotheses, sample parameters, feasibility thresholds, and statistical power metrics."
  },
  {
    step: "02",
    name: "Precision Instrument Engineering",
    desc: "Mobile-first survey programming with embedded behavioral traps, attention checks, dynamic logic, and randomized stimulus testing."
  },
  {
    step: "03",
    name: "Algorithmic Quota & Sampling",
    desc: "Dynamic quota balancing across demographic, geographic, and behavioral cells utilizing multi-source panel deduplication."
  },
  {
    step: "04",
    name: "Triple-Layer Data Scrubbing",
    desc: "Automated machine learning filtration detecting speeders, straight-liners, open-end gibberish, and cross-panel duplicate IPs."
  },
  {
    step: "05",
    name: "Executive Synthesis & Telemetry",
    desc: "Delivery of clean SPSS/CSV feeds, interactive Tableau/PowerBI dashboards, and board-ready executive strategy presentations."
  }
];

export const LEADERSHIP_TEAM = [
  {
    name: "Senior Leadership Team",
    role: "Executive Governance",
    note: "Official executive bios and individual profiles are currently undergoing periodic corporate review. Inquire with our legal/press desk for specific bio requests.",
    isCorporateGroup: true,
    image: ABOUT_IMAGES.leadershipGovernance
  },
  {
    name: "Global Methodology & Science Board",
    role: "Research Rigor & Standards",
    note: "Comprising PhD psychometricians, econometricians, and survey methodology scholars overseeing sample fidelity and ESOMAR compliance.",
    isCorporateGroup: true,
    image: ABOUT_IMAGES.scienceBoard
  },
  {
    name: "Technology & Data Security Committee",
    role: "Information Systems & Compliance",
    note: "Overseeing proprietary sampling infrastructure, anti-fraud AI engines, and SOC-2 / GDPR compliance protocols.",
    isCorporateGroup: true,
    image: ABOUT_IMAGES.securityCommittee
  }
];

export const CAREER_OPENINGS = [
  {
    id: "lead-survey-programmer",
    title: "Lead Quantitative Survey Programmer",
    department: "Survey Engineering",
    location: "New York / Remote",
    type: "Full-Time",
    experience: "4-7 years",
    desc: "Architect complex multi-country quantitative studies on Decipher/Confirmit, implementing custom JavaScript widgets and API integrations."
  },
  {
    id: "senior-research-manager",
    title: "Senior Research Manager - B2B Technology",
    department: "Insights & Strategy",
    location: "London / Hybrid",
    type: "Full-Time",
    experience: "5-8 years",
    desc: "Lead strategic research delivery for Fortune 100 enterprise clients, translating complex empirical datasets into C-suite recommendations."
  },
  {
    id: "data-scientist-fraud",
    title: "Data Scientist (Sampling & Anti-Fraud Algorithms)",
    department: "Data Platform",
    location: "Bengaluru / Hybrid",
    type: "Full-Time",
    experience: "3-6 years",
    desc: "Build real-time machine learning models to detect synthetic respondents, bot nets, and unauthentic behavior across our 5M+ panel network."
  },
  {
    id: "global-panel-operations",
    title: "Global Panel Community Manager",
    department: "Community Operations",
    location: "Singapore / Remote",
    type: "Full-Time",
    experience: "3-5 years",
    desc: "Oversee panelist engagement, retention campaigns, and incentive logistics across our 45+ international market panels."
  }
];

export const FAQ_DATA = [
  {
    category: "Sampling & Panel Quality",
    questions: [
      {
        q: "How does Elicit Research verify panelist authenticity and prevent fraud?",
        a: "We implement a proprietary multi-layer security matrix including digital device fingerprinting, GeoIP geolocation verification, ISP anomaly detection, and automated behavioral pattern recognition. Every panelist undergoes rigorous double opt-in verification and continuous honeypot screening."
      },
      {
        q: "What types of B2B respondents can Elicit Research sample?",
        a: "Our B2B sampling capabilities span verified C-suite executives (CEOs, CFOs, CIOs, CMOs), IT architects, procurement directors, healthcare professionals, and specialized small business owners across 45+ countries."
      },
      {
        q: "Can you provide offline and hard-to-reach qualitative recruits?",
        a: "Yes. Alongside our 5M+ digital panel network, we maintain dedicated offline recruitment teams for executive in-depth interviews (IDIs), qualitative focus groups, and specialized consumer ethnography."
      }
    ]
  },
  {
    category: "Methodology & Operations",
    questions: [
      {
        q: "What is your typical turnaround time for a standard quantitative project?",
        a: "For standard consumer studies (n=1,000, incidence > 50%), survey programming and field launch typically occur within 24 to 48 hours, with fieldwork completing within 3 to 5 business days. Rapid overnight pulse studies are also available."
      },
      {
        q: "Which survey scripting platforms do your teams support?",
        a: "Our engineering team is fluent across Forsta (Confirmit), FocusVision Decipher, Qualtrics, Sawtooth Software (conjoint), and proprietary web-hook survey systems."
      },
      {
        q: "How can I submit an RFQ or get a feasibility quote?",
        a: "You can submit your project parameters directly via our online RFQ portal, or email our bidding desk directly at RFQ@elicitresearch.com with your target audience, sample size (n), incidence rate (IR), and questionnaire length (LOI). Our team responds within 2 business hours."
      }
    ]
  },
  {
    category: "Data Privacy & Compliance",
    questions: [
      {
        q: "Is Elicit Research compliant with global data privacy regulations?",
        a: "Yes. We maintain strict compliance with EU GDPR, UK Data Protection Act, California CCPA/CPRA, and follow the rigorous ethical code of conduct outlined by ESOMAR and the Insights Association."
      },
      {
        q: "How are survey incentives disbursed to respondents?",
        a: "Incentives are distributed securely via our dedicated panel management platform in localized gift cards, direct bank wire, PayPal, and charity donations, having paid out over $30M+ to date."
      }
    ]
  }
];
