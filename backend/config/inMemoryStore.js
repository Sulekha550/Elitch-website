import bcrypt from 'bcryptjs';

// Pre-hashed password for VardhaAdmin@2026
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('VardhaAdmin@2026', 10);

export const inMemoryData = {
  admins: [
    {
      _id: '671916a00000000000000001',
      name: 'Vardha Master Admin',
      email: 'admin@vardhabuilders.com',
      password: DEFAULT_PASSWORD_HASH,
      role: 'superadmin',
      phone: '+91 98200 91827',
      avatar: '',
      isActive: true,
      lastLogin: new Date()
    }
  ],
  projects: [
    {
      _id: '671916a00000000000000010',
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
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: '671916a00000000000000011',
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
      displayOrder: 2,
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date()
    },
    {
      _id: '671916a00000000000000012',
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
      displayOrder: 3,
      createdAt: new Date(Date.now() - 172800000),
      updatedAt: new Date()
    }
  ],
  leads: [
    {
      _id: '671916a00000000000000020',
      name: 'Rajesh Singhania',
      email: 'rajesh.singhania@apexholding.com',
      phone: '+91 98201 44521',
      inquiryCategory: 'Ultra-Luxury Villa',
      message: 'Interested in acquiring a top-floor duplex penthouse in Vardha Sovereign Sky Suites. Please arrange a private physical walkthrough with your principal architect this weekend.',
      status: 'New',
      priority: 'High',
      preferredContactMethod: 'WhatsApp',
      submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 4),
      internalNotes: [
        { note: 'High net-worth client referred by Mumbai Luxury Real Estate Forum. Schedule executive site visit.', author: 'Admin', createdAt: new Date() }
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
    },
    {
      _id: '671916a00000000000000021',
      name: 'Ananya Deshmukh',
      email: 'ananya.deshmukh@horizoncapital.in',
      phone: '+91 98112 87654',
      inquiryCategory: 'Residential Investment',
      message: 'Requesting the detailed architectural brochure and floor plan specification sheet for Vardha Lumina Waterfront 4 BHK layouts.',
      status: 'Follow-up',
      priority: 'High',
      preferredContactMethod: 'Email',
      submissionDate: new Date(Date.now() - 1000 * 60 * 60 * 28),
      followUpDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      internalNotes: [
        { note: 'Sent initial digital portfolio. Client requested follow-up call on Tuesday regarding payment milestones.', author: 'Admin', createdAt: new Date() }
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28)
    },
    {
      _id: '671916a00000000000000022',
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
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72)
    }
  ],
  gallery: [
    {
      _id: '671916a00000000000000030',
      title: 'Cantilevered Sky Terrace at Twilight',
      category: 'Exterior Architecture',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      description: 'Precision engineered glass balustrades framing sunset reflections across the western bay.',
      projectName: 'Vardha Sovereign Sky Suites',
      displayOrder: 1,
      isPublished: true,
      tags: ['Terrace', 'Sunset', 'High-Rise'],
      createdAt: new Date()
    },
    {
      _id: '671916a00000000000000031',
      title: 'Double-Volume Italian Calacatta Living Atrium',
      category: 'Interior Living',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      thumbnailUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      description: 'Bespoke bronzed architectural trims, fluted oak paneling, and curated sculptural chandeliers.',
      projectName: 'Vardha Sovereign Sky Suites',
      displayOrder: 2,
      isPublished: true,
      tags: ['Living Room', 'Interior', 'Marble'],
      createdAt: new Date()
    }
  ],
  floorPlans: [
    {
      _id: '671916a00000000000000040',
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
        'Staff Quarters with Independent Service Entry'
      ],
      displayOrder: 1,
      isPublished: true,
      createdAt: new Date()
    },
    {
      _id: '671916a00000000000000041',
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
        'Integrated Smart Home Control Hub'
      ],
      displayOrder: 2,
      isPublished: true,
      createdAt: new Date()
    }
  ],
  auditLogs: [
    {
      _id: '671916a00000000000000050',
      action: 'SYSTEM_BOOT',
      entityType: 'SETTINGS',
      adminEmail: 'system',
      details: 'Vardha Builders Executive Console active with cryptographic security.',
      createdAt: new Date()
    }
  ],
  contents: {
    hero: {
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
    about: {
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
    contact: {
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
  }
};
