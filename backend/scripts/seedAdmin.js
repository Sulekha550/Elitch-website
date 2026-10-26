import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Lead from '../models/Lead.js';
import GalleryItem from '../models/GalleryItem.js';
import FloorPlan from '../models/FloorPlan.js';
import WebsiteContent from '../models/WebsiteContent.js';
import AuditLog from '../models/AuditLog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vardha_builders';

const SAMPLE_PROJECTS = [
  {
    title: 'Vardha Sovereign Sky Suites',
    slug: 'vardha-sovereign-sky-suites',
    category: 'Ultra-Luxury Villa',
    status: 'Ongoing',
    location: 'Worli Sea Face, Mumbai',
    year: 2026,
    shortDescription: 'Monolithic towers offering 360-degree Arabian Sea panoramas with private elevator lobbies and double-height sky gardens.',
    description: 'Vardha Sovereign Sky Suites redefines prime waterfront architecture. Designed with acoustic glass curtain walls, sustainable rainwater capture, cantilevered infinity sky decks, and bespoke marble interiors imported from Carrara, Italy. Each residence is curated for discerning high-net-worth investors seeking unmatched architectural exclusivity.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', caption: 'Private Infinity Terrace at Dusk', displayOrder: 1 },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', caption: 'Double-Height Living Salon', displayOrder: 2 },
      { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80', caption: 'Master Suite with Sea Horizons', displayOrder: 3 }
    ],
    amenities: [
      'Private Helipad Access',
      'Temperature-Controlled Horizon Pool',
      'Automated Biometric Valet',
      'Sommelier Wine Cellar',
      'Acoustic Private Cinema (24 Seats)',
      '24/7 Diplomatic-Grade Security'
    ],
    statistics: {
      bedrooms: '4 & 5 BHK',
      bathrooms: '5 - 6',
      areaSqFt: '4,800 - 8,200 sq.ft.',
      totalUnits: '32 Exclusive Suites',
      floors: 'G + 42 Floors',
      possessionDate: 'Q4 2026'
    },
    tags: ['Sea Facing', 'Ultra Luxury', 'Worli', 'Penthouses'],
    priceRange: '₹14.50 Cr - ₹28.00 Cr',
    featured: true,
    displayOrder: 1
  },
  {
    title: 'Vardha Lumina Waterfront',
    slug: 'vardha-lumina-waterfront',
    category: 'Luxury Residential',
    status: 'Upcoming',
    location: 'Bandra West, Mumbai',
    year: 2027,
    shortDescription: 'Contemporary sculptural high-rise capturing natural maritime light with wrap-around balconies and bio-climatic facade design.',
    description: 'Conceived by world-renowned architectural masters, Vardha Lumina Waterfront stands as a beacon of sustainable luxury along the golden coast. Engineered with low-emission carbon-cured concrete and smart home environmental sensors, it offers an idyllic sanctuary where nature and progressive design converge seamlessly.',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', caption: 'Waterfront Elevation View', displayOrder: 1 },
      { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80', caption: 'Sunlit Atrium and Lounge', displayOrder: 2 }
    ],
    amenities: [
      'Olympic-Length Saltwater Lap Pool',
      'Holistic Wellness Spa & Sauna',
      'Automated EV Supercharging Hub',
      'Skyline Observation Deck',
      'Childrens Creative Atelier'
    ],
    statistics: {
      bedrooms: '3 & 4 BHK',
      bathrooms: '3 - 4',
      areaSqFt: '2,650 - 4,100 sq.ft.',
      totalUnits: '56 Residences',
      floors: 'G + 30 Floors',
      possessionDate: 'Q2 2027'
    },
    tags: ['Waterfront', 'Bandra', 'Sustainable', 'Green Building'],
    priceRange: '₹8.75 Cr - ₹16.20 Cr',
    featured: true,
    displayOrder: 2
  },
  {
    title: 'The Vardha Sanctuary Estate',
    slug: 'the-vardha-sanctuary-estate',
    category: 'Ultra-Luxury Villa',
    status: 'Completed',
    location: 'Alibaug Seaside Sanctuary',
    year: 2025,
    shortDescription: 'Gated enclave of 18 private tropical modernist villas nestled within century-old banyan groves and serene coastal breezes.',
    description: 'An architectural tribute to barefoot luxury and organic minimalism. The Sanctuary Estate blends exposed raw volcanic basalt, teak louvers, and expansive reflection pools. Each villa features an individual lap pool, private organic kitchen garden, and dedicated butler quarters.',
    coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80', caption: 'Villa Courtyard and Water Feature', displayOrder: 1 },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80', caption: 'Open Pavilion Lounge', displayOrder: 2 }
    ],
    amenities: [
      'Private 25m Pool per Villa',
      'Speedboat Jetty Access',
      'Organic Farm-to-Table Orchard',
      'In-Villa Ayurvedic Treatment Suite',
      'Full Solar Grid Independence'
    ],
    statistics: {
      bedrooms: '5 & 6 Bed Estate',
      bathrooms: '6 - 7',
      areaSqFt: '9,500 - 14,000 sq.ft.',
      totalUnits: '18 Signature Estates',
      floors: 'G + 1 Independent',
      possessionDate: 'Ready for Possession'
    },
    tags: ['Estate', 'Alibaug', 'Private Villa', 'Ready Possession'],
    priceRange: '₹22.00 Cr - ₹35.00 Cr',
    featured: true,
    displayOrder: 3
  },
  {
    title: 'Vardha Apex Horizon Tower',
    slug: 'vardha-apex-horizon-tower',
    category: 'Commercial Complex',
    status: 'Ongoing',
    location: 'BKC Central Business District, Mumbai',
    year: 2026,
    shortDescription: 'LEED Platinum Grade-A commercial enterprise headquarters with column-free floor plates and high-speed destination dispatch elevators.',
    description: 'Engineered for visionary multinational corporations, global asset managers, and high-growth technology titans. Features triple-glazed acoustic facades, solar-responsive dynamic louvers, advanced HEPA-14 indoor air scrubbing, and rooftop executive helipad facilities.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', caption: 'Double Height Marble Grand Lobby', displayOrder: 1 }
    ],
    amenities: [
      'LEED Platinum Certified Architecture',
      'High-Speed Destination Dispatch Elevators',
      'Rooftop Executive Helipad',
      'Multi-Tier Subterranean Automated Parking',
      'Central Business Club & Fine Dining'
    ],
    statistics: {
      bedrooms: 'Commercial Office Floors',
      bathrooms: 'Executive Restrooms',
      areaSqFt: '15,000 - 45,000 sq.ft./floor',
      totalUnits: '24 Office Suites',
      floors: 'G + 38 Floors',
      possessionDate: 'Q3 2026'
    },
    tags: ['Commercial', 'BKC', 'Corporate HQ', 'LEED Platinum'],
    priceRange: 'Starting from ₹25,000 / sq.ft.',
    featured: false,
    displayOrder: 4
  }
];

const SAMPLE_LEADS = [
  {
    name: 'Rajesh Singhania',
    email: 'rajesh.singhania@apexholding.com',
    phone: '+91 98201 44521',
    inquiryCategory: 'Ultra-Luxury Villa',
    message: 'Interested in acquiring a top-floor duplex penthouse in Vardha Sovereign Sky Suites. Please arrange a private physical walkthrough with your principal architect this weekend.',
    status: 'New',
    priority: 'High',
    preferredContactMethod: 'WhatsApp',
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    internalNotes: [
      { note: 'High net-worth client referred by Mumbai Luxury Real Estate Forum. Schedule executive site visit.', author: 'Admin', createdAt: new Date() }
    ]
  },
  {
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@horizoncapital.in',
    phone: '+91 98112 87654',
    inquiryCategory: 'Residential Investment',
    message: 'Requesting the detailed architectural brochure and floor plan specification sheet for Vardha Lumina Waterfront 4 BHK layouts.',
    status: 'Follow-up',
    priority: 'High',
    preferredContactMethod: 'Email',
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 28), // 28 hours ago
    followUpDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    internalNotes: [
      { note: 'Sent initial digital portfolio. Client requested follow-up call on Tuesday regarding payment milestones.', author: 'Admin', createdAt: new Date() }
    ]
  },
  {
    name: 'Vikramaditya Oberoi',
    email: 'v.oberoi@oberoienterprises.com',
    phone: '+91 99300 12890',
    inquiryCategory: 'Ultra-Luxury Villa',
    message: 'Looking for a seaside villa in The Sanctuary Estate Alibaug. We require immediate possession with full furniture styling.',
    status: 'Qualified',
    priority: 'High',
    preferredContactMethod: 'Phone',
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 72),
    internalNotes: [
      { note: 'Client has verified budget. Legal agreement draft shared with client counsel.', author: 'Admin', createdAt: new Date() }
    ]
  },
  {
    name: 'Pooja Mehta',
    email: 'pooja.mehta@studioarch.com',
    phone: '+91 97654 32109',
    inquiryCategory: 'Floor Plan Consultation',
    message: 'Inquiring if structural customization is possible for merging two 3 BHK units on the 18th floor of Sovereign Suites.',
    status: 'Contacted',
    priority: 'Medium',
    preferredContactMethod: 'WhatsApp',
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 96),
    internalNotes: [
      { note: 'Consulted structural engineering team. Shared combined schematic drawing.', author: 'Admin', createdAt: new Date() }
    ]
  },
  {
    name: 'Sunil Kothari',
    email: 'skothari@kotharifinance.org',
    phone: '+91 98450 99887',
    inquiryCategory: 'Commercial Space',
    message: 'Need 20,000 sq.ft. corporate office floor in BKC Apex Horizon Tower for our wealth management headquarters.',
    status: 'Closed',
    priority: 'High',
    preferredContactMethod: 'Phone',
    submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 240),
    internalNotes: [
      { note: 'Deal successfully negotiated and closed. Letter of Intent signed.', author: 'Admin', createdAt: new Date() }
    ]
  }
];

const SAMPLE_GALLERY = [
  {
    title: 'Cantilevered Sky Terrace at Twilight',
    category: 'Exterior Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
    description: 'Precision engineered glass balustrades framing sunset reflections across the western bay.',
    projectName: 'Vardha Sovereign Sky Suites',
    displayOrder: 1,
    isPublished: true,
    tags: ['Terrace', 'Sunset', 'High-Rise']
  },
  {
    title: 'Double-Volume Italian Calacatta Living Atrium',
    category: 'Interior Living',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    description: 'Bespoke bronzed architectural trims, fluted oak paneling, and curated sculptural chandeliers.',
    projectName: 'Vardha Sovereign Sky Suites',
    displayOrder: 2,
    isPublished: true,
    tags: ['Living Room', 'Interior', 'Marble']
  },
  {
    title: 'Biophilic Water Court and Ancient Groves',
    category: 'Landscape & Grounds',
    imageUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80',
    description: 'Sculpted granite water channels reflecting native flora and ambient subterranean illumination.',
    projectName: 'The Vardha Sanctuary Estate',
    displayOrder: 3,
    isPublished: true,
    tags: ['Landscape', 'Water Feature', 'Alibaug']
  },
  {
    title: 'Master Skyline Penthouse Suite',
    category: 'Penthouses & Terraces',
    imageUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
    description: 'Unobstructed 180-degree ocean views with acoustic automated motorized privacy drapes.',
    projectName: 'Vardha Lumina Waterfront',
    displayOrder: 4,
    isPublished: true,
    tags: ['Penthouse', 'Master Bedroom', 'Ocean View']
  }
];

const SAMPLE_FLOOR_PLANS = [
  {
    title: 'The Sovereign Horizon Suite (4 BHK)',
    type: '4 BHK Presidential Suite',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    areaSqFt: 5450,
    carpetAreaSqFt: 4620,
    priceRange: '₹18.50 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    projectName: 'Vardha Sovereign Sky Suites',
    features: [
      'Private High-Speed Elevator Vestibule',
      'Dual Master Suites with Walk-in Dressing Rooms',
      'Enclosed Wet Kitchen & Show Kitchen Island',
      'Staff Quarters with Independent Service Entry',
      'Wraparound 12ft Deep Sunset Deck'
    ],
    displayOrder: 1,
    isPublished: true
  },
  {
    title: 'The Lumina Waterfront Residence (3 BHK)',
    type: '3 BHK Luxury Residence',
    bedrooms: 3,
    bathrooms: 4,
    balconies: 2,
    areaSqFt: 3200,
    carpetAreaSqFt: 2750,
    priceRange: '₹9.80 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
    projectName: 'Vardha Lumina Waterfront',
    features: [
      'Expansive Corner Living & Dining Hall',
      'East-Facing Morning Sunrise Balcony',
      'Integrated Smart Home Control Hub',
      'Spacious Dry Pantry & Utility Yard'
    ],
    displayOrder: 2,
    isPublished: true
  },
  {
    title: 'The Sanctuary Pavilion Villa (5 BHK)',
    type: 'Signature Sky Villa',
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    areaSqFt: 11200,
    carpetAreaSqFt: 9800,
    priceRange: '₹26.50 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
    projectName: 'The Vardha Sanctuary Estate',
    features: [
      'Independent Private 25-Meter Lap Pool',
      'Teak Louvered Outdoor Dining Pavilion',
      'Separate Two-Story Guest Cottage',
      'Dedicated Spa & Wellness Sanctuary',
      'Subterranean 4-Car Climate Controlled Garage'
    ],
    displayOrder: 3,
    isPublished: true
  }
];

const DEFAULT_CONTENT = [
  {
    key: 'hero',
    title: 'ARCHITECTURAL MAJESTY. UNCOMPROMISING LUXURY.',
    subtitle: 'Crafting landmark residences and generational estates across prime urban and coastal horizons.',
    data: {
      headline: 'Architectural Majesty. Uncompromising Luxury.',
      tagline: 'VARDHA BUILDERS & DEVELOPERS',
      heroStat1: { value: '₹4,500+ Cr', label: 'Portfolio Delivered' },
      heroStat2: { value: '2.8M Sq.Ft.', label: 'Prime Space Constructed' },
      heroStat3: { value: '100%', label: 'On-Time Handover Record' },
      ctaText: 'Explore Signature Portfolio',
      ctaLink: '/portfolio'
    }
  },
  {
    key: 'about',
    title: 'THE ART OF PERMANENCE',
    subtitle: 'Over three decades of pioneering structural distinction, precision engineering, and timeless modernist aesthetics.',
    data: {
      vision: 'To forge architectural landmarks that withstand the test of generations through uncompromising structural engineering and poetic aesthetic balance.',
      founderName: 'Vardha Group Board of Directors',
      establishedYear: '1996',
      totalProjectsCompleted: '48+',
      awardsCount: '19 International Architecture Citations'
    }
  },
  {
    key: 'contact',
    title: 'SCHEDULE AN ARCHITECTURAL CONSULTATION',
    subtitle: 'Connect with our senior partners and acquisition specialists for confidential discussions.',
    data: {
      corporateOffice: 'Vardha Tower, Level 28, BKC Avenue, Bandra Kurla Complex, Mumbai 400051',
      directPhone: '+91 (022) 8800-VARDHA',
      mobilePhone: '+91 98200 91827',
      inquiryEmail: 'acquisitions@vardhabuilders.com',
      pressEmail: 'media@vardhabuilders.com',
      whatsAppNumber: '+919820091827',
      officeHours: 'Monday - Saturday: 09:30 AM - 07:30 PM'
    }
  }
];

async function seedDatabase() {
  console.log(`[Seed Script] Connecting to database at: ${MONGO_URI}`);
  try {
    await mongoose.connect(MONGO_URI);
    console.log('[Seed Script] Connected successfully.');

    // 1. Seed or Verify Superadmin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@vardhabuilders.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'VardhaAdmin@2026';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = await Admin.create({
        name: 'Vardha Master Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
        phone: '+91 98200 91827',
        isActive: true
      });
      console.log(`[Seed Script] Created primary Superadmin: ${adminEmail}`);
    } else {
      console.log(`[Seed Script] Superadmin already exists: ${adminEmail}`);
    }

    // 2. Seed Projects if collection is empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(SAMPLE_PROJECTS);
      console.log(`[Seed Script] Seeded ${SAMPLE_PROJECTS.length} landmark architectural projects.`);
    } else {
      console.log(`[Seed Script] Projects collection already contains ${projectCount} items. Preserving existing data.`);
    }

    // 3. Seed Leads if collection is empty
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      await Lead.insertMany(SAMPLE_LEADS);
      console.log(`[Seed Script] Seeded ${SAMPLE_LEADS.length} sample customer inquiries & CRM leads.`);
    } else {
      console.log(`[Seed Script] Leads collection already contains ${leadCount} records.`);
    }

    // 4. Seed Gallery if collection is empty
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      await GalleryItem.insertMany(SAMPLE_GALLERY);
      console.log(`[Seed Script] Seeded ${SAMPLE_GALLERY.length} architectural gallery items.`);
    } else {
      console.log(`[Seed Script] Gallery collection already contains ${galleryCount} items.`);
    }

    // 5. Seed Floor Plans if collection is empty
    const floorPlanCount = await FloorPlan.countDocuments();
    if (floorPlanCount === 0) {
      await FloorPlan.insertMany(SAMPLE_FLOOR_PLANS);
      console.log(`[Seed Script] Seeded ${SAMPLE_FLOOR_PLANS.length} architectural floor plans.`);
    } else {
      console.log(`[Seed Script] Floor plans collection already contains ${floorPlanCount} blueprints.`);
    }

    // 6. Seed Website Content
    for (const item of DEFAULT_CONTENT) {
      await WebsiteContent.findOneAndUpdate(
        { key: item.key },
        { ...item, lastUpdatedBy: 'System Seed' },
        { upsert: true, new: true }
      );
    }
    console.log('[Seed Script] Seeded website CMS default sections (Hero, About, Contact).');

    // 7. Seed initial Audit Log
    await AuditLog.create({
      action: 'SYSTEM_SEEDED',
      entityType: 'SETTINGS',
      adminEmail: adminEmail,
      details: 'Initial database seed completed with projects, gallery assets, and CRM records.'
    });

    console.log('\n======================================================');
    console.log('✅ VARDHA BUILDERS SEED SCRIPT COMPLETE');
    console.log(`   Admin Email:    ${adminEmail}`);
    console.log(`   Admin Password: ${adminPassword}`);
    console.log('======================================================\n');
  } catch (error) {
    console.error('[Seed Script Error]:', error);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed Script] Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedDatabase();
