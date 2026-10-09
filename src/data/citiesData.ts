export interface PlaceItem {
  id: string;
  name: string;
  category: "food" | "stay" | "attraction" | "nightlife" | "heritage";
  subCategory: string;
  rating: number;
  reviewsCount: number;
  priceLevel: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  approxCost: string;
  cleanlinessScore: number; // 0 to 10
  safetyScore: number; // 0 to 10
  description: string;
  highlights: string[];
  lat: number;
  lng: number;
  address: string;
  openHours: string;
  isPopular: boolean;
  isBudgetFriendly: boolean;
  image: string;
}

export interface HeritageSite {
  id: string;
  name: string;
  era: string;
  builtBy: string;
  significance: string;
  audioGuideTitle: string;
  audioTranscript: string;
  traditions: string[];
  visitingHours: string;
  entryFee: string;
  lat: number;
  lng: number;
  image: string;
}

export interface SafetyZone {
  id: string;
  name: string;
  riskLevel: "Low" | "Moderate" | "High Alert";
  safetyIndex: number; // 0-100
  lightingScore: number; // 0-10
  policePatrolScore: number; // 0-10
  cctvCoverage: string;
  reportedHazards: string[];
  saferAlternative: string;
  lat: number;
  lng: number;
  radiusMeters: number;
}

export interface AreaBenchmark {
  id: string;
  name: string;
  safety: number; // 0-100
  cleanliness: number; // 0-100
  affordability: number; // 0-100
  accessibility: number; // 0-100
  greeneryAQI: number; // 0-100
  overallScore: number;
  tagline: string;
  pros: string[];
  cons: string[];
  idealFor: string;
}

export interface CitizenReport {
  id: string;
  category: "Traffic Congestion" | "Waterlogging" | "Broken Streetlight" | "Safety Concern" | "Community Event" | "Accident";
  title: string;
  description: string;
  locationName: string;
  timestamp: string;
  upvotes: number;
  status: "Verified" | "Investigating" | "Resolved";
  nlpSentiment: "Positive" | "Neutral" | "Alert";
  lat: number;
  lng: number;
}

export interface CityData {
  id: string;
  name: string;
  state: string;
  country: string;
  center: [number, number];
  zoom: number;
  tagline: string;
  weather: {
    temp: number;
    condition: string;
    humidity: number;
    aqi: number;
    aqiStatus: string;
    rainForecast: string;
  };
  trafficStats: {
    congestionLevel: number; // 0-100%
    avgSpeedKmh: number;
    activeBottlenecks: number;
  };
  emergencyContacts: {
    police: string;
    ambulance: string;
    womenHelpline: string;
    touristSupport: string;
    disasterManagement: string;
  };
  places: PlaceItem[];
  heritage: HeritageSite[];
  safetyZones: SafetyZone[];
  benchmarks: AreaBenchmark[];
  citizenReports: CitizenReport[];
}

export const CITIES: Record<string, CityData> = {
  pune: {
    id: "pune",
    name: "Pune",
    state: "Maharashtra",
    country: "India",
    center: [18.5204, 73.8567],
    zoom: 13,
    tagline: "Oxford of the East & Cultural Silicon Heart of Maharashtra",
    weather: {
      temp: 28,
      condition: "Pleasant & Partly Cloudy",
      humidity: 58,
      aqi: 68,
      aqiStatus: "Moderate Clean",
      rainForecast: "Light drizzle expected at 6:00 PM near Katraj ghat",
    },
    trafficStats: {
      congestionLevel: 42,
      avgSpeedKmh: 24,
      activeBottlenecks: 6,
    },
    emergencyContacts: {
      police: "112 / 020-26122880",
      ambulance: "108",
      womenHelpline: "1091 / 020-26127110",
      touristSupport: "1800-229-930",
      disasterManagement: "020-25501269",
    },
    places: [
      {
        id: "pune-food-1",
        name: "Vaishali & FC Road Cafe Culture",
        category: "food",
        subCategory: "Legendary South Indian & Street Food",
        rating: 4.8,
        reviewsCount: 14200,
        priceLevel: "₹₹",
        approxCost: "₹300 for two",
        cleanlinessScore: 9.2,
        safetyScore: 9.5,
        description: "The pulsing cultural hub of Pune college life since 1949. Legendary for SPDP (Sev Potato Dahi Puri), filter coffee, and vibrant debates under the peepal tree.",
        highlights: ["Iconic Filter Coffee", "SPDP", "Safe Night Walking", "Student Vibe"],
        lat: 18.5203,
        lng: 73.8406,
        address: "Fergusson College Rd, Shivajinagar, Pune",
        openHours: "7:00 AM – 11:00 PM",
        isPopular: true,
        isBudgetFriendly: true,
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-food-2",
        name: "Goodluck Cafe",
        category: "food",
        subCategory: "Irani Heritage Cafe",
        rating: 4.6,
        reviewsCount: 9800,
        priceLevel: "₹",
        approxCost: "₹200 for two",
        cleanlinessScore: 8.5,
        safetyScore: 9.0,
        description: "Vintage 1935 Irani cafe serving golden bun maska dipped in steaming chai, mutton keema, and caramel custard on Deccan Gymkhana corner.",
        highlights: ["Bun Maska Chai", "Keema Pav", "Heritage Ambience", "Historic Landmark"],
        lat: 18.5178,
        lng: 73.8415,
        address: "Deccan Gymkhana, FC Road Corner, Pune",
        openHours: "7:30 AM – 11:30 PM",
        isPopular: true,
        isBudgetFriendly: true,
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-food-3",
        name: "Koregaon Park Artisan Bakeries & Cafes",
        category: "food",
        subCategory: "Gourmet Dining & Leafy Cafes",
        rating: 4.9,
        reviewsCount: 7500,
        priceLevel: "₹₹₹",
        approxCost: "₹900 for two",
        cleanlinessScore: 9.7,
        safetyScore: 9.6,
        description: "Lush green lanes lined with artisan sourdough bakeries, organic cafes, German delis, and tranquil outdoor garden seating.",
        highlights: ["Artisan Breads", "Pet Friendly", "Boutique Atmosphere", "Cosmopolitan"],
        lat: 18.5362,
        lng: 73.8940,
        address: "Lane 6, Koregaon Park, Pune",
        openHours: "8:00 AM – 11:30 PM",
        isPopular: true,
        isBudgetFriendly: false,
        image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-stay-1",
        name: "The O Hotel & Spa Sanctuary",
        category: "stay",
        subCategory: "Luxury Boutique Hotel",
        rating: 4.7,
        reviewsCount: 3100,
        priceLevel: "₹₹₹₹",
        approxCost: "₹6,500 / night",
        cleanlinessScore: 9.8,
        safetyScore: 9.9,
        description: "Designer boutique property located in Koregaon Park featuring Japanese zen gardens, rooftop infinity pool, and 24/7 security concierge.",
        highlights: ["24/7 CCTV & Security", "Rooftop Pool", "Spa & Wellness", "Close to Nightlife"],
        lat: 18.5375,
        lng: 73.8965,
        address: "North Main Road, Koregaon Park, Pune",
        openHours: "24/7 Check-in",
        isPopular: true,
        isBudgetFriendly: false,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-stay-2",
        name: "Backpacker Panda & Youth Hostel",
        category: "stay",
        subCategory: "Budget Backpacker Haven",
        rating: 4.5,
        reviewsCount: 1850,
        priceLevel: "₹",
        approxCost: "₹750 / bunk",
        cleanlinessScore: 8.8,
        safetyScore: 9.2,
        description: "Safe, community-focused hostel with secure biometric lockers, high-speed WiFi, shared lounge, and guided heritage walking tours.",
        highlights: ["Secure Lockers", "Female Only Dorms Available", "Coworking Space", "Budget Friendly"],
        lat: 18.5320,
        lng: 73.8890,
        address: "Koregaon Park South Main Rd, Pune",
        openHours: "24/7 Front Desk",
        isPopular: true,
        isBudgetFriendly: true,
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      },
    ],
    heritage: [
      {
        id: "pune-h1",
        name: "Shaniwar Wada Fort Palace",
        era: "1732 CE (Peshwa Empire)",
        builtBy: "Peshwa Baji Rao I",
        significance: "The 7-storey stone fortress that was the seat of the Maratha Peshwa rulers until 1818. Famous for Delhi Darwaza spikes and intricate fountains.",
        audioGuideTitle: "Echoes of the Peshwa Fortress",
        audioTranscript: "As you step through the mighty Delhi Gate studded with iron elephant-deterrent spikes, you stand where generals planned campaigns across the Indian subcontinent...",
        traditions: ["Evening Sound & Light Show", "Historical Heritage Walk", "Traditional Dhol Tasha at Ganesh Festival"],
        visitingHours: "8:00 AM – 6:30 PM",
        entryFee: "₹25 (Indians) / ₹300 (Foreigners)",
        lat: 18.5196,
        lng: 73.8553,
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-h2",
        name: "Aga Khan Palace",
        era: "1892 CE",
        builtBy: "Sultan Muhammed Shah Aga Khan III",
        significance: "A monumental Italian-arched palace with vast lawns that served as the internment site of Mahatma Gandhi, Kasturba Gandhi, and Mahadev Desai during the 1942 Quit India Movement.",
        audioGuideTitle: "Sanctuary of the Freedom Struggle",
        audioTranscript: "Walking under these majestic Italianate arches, the tranquil silence of the surrounding rose gardens tells a story of peaceful resistance...",
        traditions: ["Gandhi Memorial Archives", "Khadi Handloom Demonstrations", "Peace Meditation Walk"],
        visitingHours: "9:00 AM – 5:30 PM",
        entryFee: "₹25 (Indians) / ₹300 (Foreigners)",
        lat: 18.5524,
        lng: 73.9015,
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "pune-h3",
        name: "Sinhagad Fort (Lion's Fort)",
        era: "Over 2000 Years Old (Battle of Sinhagad 1670 CE)",
        builtBy: "Maratha Empire / Tanaji Malusare",
        significance: "Perched 1,312 meters atop the Sahyadri mountains. Immortalized by Tanaji Malusare's heroic scaling of the cliff during the night siege.",
        audioGuideTitle: "The Lion of the Sahyadris",
        audioTranscript: "Feel the mountain wind whip through Pune Gate. From this summit, Chhatrapati Shivaji Maharaj declared: 'Gad aala, pan Sinha gela' (The fort is won, but the Lion is lost)...",
        traditions: ["Trekking at Dawn", "Hot Pithla Bhakri & Matka Dahi by Local Villagers", "Kalyan Darwaza Trail"],
        visitingHours: "6:00 AM – 6:00 PM",
        entryFee: "₹50 per vehicle",
        lat: 18.3664,
        lng: 73.7558,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      },
    ],
    safetyZones: [
      {
        id: "pune-s1",
        name: "Shivajinagar Station Underpass Corridor",
        riskLevel: "Moderate",
        safetyIndex: 58,
        lightingScore: 5.2,
        policePatrolScore: 6.8,
        cctvCoverage: "Partial (Main entrances only)",
        reportedHazards: ["Poor lighting after 10 PM in west pedestrian tunnel", "Frequent pickpocketing during rush hour", "Uneven road waterlogging during heavy downpours"],
        saferAlternative: "Use the overhead illuminated pedestrian skywalk with 24/7 CCTV instead of the tunnel.",
        lat: 18.5305,
        lng: 73.8492,
        radiusMeters: 250,
      },
      {
        id: "pune-s2",
        name: "Katraj Ghat Night Hairpin Turns",
        riskLevel: "High Alert",
        safetyIndex: 42,
        lightingScore: 3.5,
        policePatrolScore: 5.5,
        cctvCoverage: "Low (Highway cameras only)",
        reportedHazards: ["Dense fog and sharp blind turns causing accident risk", "Lack of street lighting on old tunnel bypass", "Heavy truck traffic merging unexpectedly"],
        saferAlternative: "Take the newly widened New Katraj Tunnel Bypass Highway equipped with LED floodlights.",
        lat: 18.4410,
        lng: 73.8590,
        radiusMeters: 600,
      },
      {
        id: "pune-s3",
        name: "Koregaon Park & North Main Road Safe Zone",
        riskLevel: "Low",
        safetyIndex: 94,
        lightingScore: 9.6,
        policePatrolScore: 9.4,
        cctvCoverage: "Comprehensive 24/7 Smart City Mesh",
        reportedHazards: ["Minor vehicle congestion near restaurant valet booths on Saturday nights"],
        saferAlternative: "Ideal illuminated walking path; police beat marshals active 24/7.",
        lat: 18.5360,
        lng: 73.8950,
        radiusMeters: 800,
      },
    ],
    benchmarks: [
      {
        id: "bm-kp",
        name: "Koregaon Park & Kalyani Nagar",
        safety: 94,
        cleanliness: 91,
        affordability: 45,
        accessibility: 88,
        greeneryAQI: 89,
        overallScore: 88,
        tagline: "The Cosmopolitan Green Sanctuary",
        pros: ["Lush canopy of heritage banyan trees", "High density of international cafes & co-working", "Top-tier women's night safety index", "Active 24/7 police presence"],
        cons: ["High rental & dining costs", "Weekend evening parking gridlocks"],
        idealFor: "Expats, Professionals, Night Owls, Foodies",
      },
      {
        id: "bm-fc",
        name: "FC Road & Shivajinagar",
        safety: 89,
        cleanliness: 82,
        affordability: 92,
        accessibility: 95,
        greeneryAQI: 74,
        overallScore: 86,
        tagline: "The Student Energy & Street Food Hub",
        pros: ["Ultra affordable budget dining & bookshops", "Metro station connectivity", "Safe & bustling walking street till midnight", "Rich academic atmosphere"],
        cons: ["Rush hour pedestrian overcrowding", "Street parking scarcity"],
        idealFor: "Students, Budget Travelers, Shoppers, Heritage Seekers",
      },
      {
        id: "bm-hinj",
        name: "Hinjawadi IT Park (Phase 1-3)",
        safety: 76,
        cleanliness: 79,
        affordability: 70,
        accessibility: 60,
        greeneryAQI: 68,
        overallScore: 71,
        tagline: "The Tech Engine & Commuter Frontier",
        pros: ["Modern gated residential townships", "Close to major multinational tech campuses", "Fast-growing commercial centers"],
        cons: ["Severe peak-hour commute congestion", "Incomplete metro construction corridors", "Certain Phase 3 internal roads lack night lighting"],
        idealFor: "IT Professionals, Corporate Executives",
      },
      {
        id: "bm-old",
        name: "Old Pune City (Budhwar & Shanipar Peths)",
        safety: 82,
        cleanliness: 65,
        affordability: 95,
        accessibility: 84,
        greeneryAQI: 55,
        overallScore: 75,
        tagline: "The Historic Traditional Heart",
        pros: ["Authentic Maharashtrian cuisine and historic wadas", "Traditional craft & textile bazaars", "Deep cultural immersion"],
        cons: ["Narrow labyrinth lanes inaccessible to cars", "High noise and vehicle exhaust during market hours"],
        idealFor: "Culture Lovers, Photographers, Historians",
      },
    ],
    citizenReports: [
      {
        id: "rep-1",
        category: "Traffic Congestion",
        title: "University Flyover Junction Heavy Delay",
        description: "Buses merging towards Baner have created a 20-minute backlog. Traffic marshals on site assisting.",
        locationName: "Savitribai Phule Pune University Circle",
        timestamp: "8 mins ago",
        upvotes: 42,
        status: "Verified",
        nlpSentiment: "Alert",
        lat: 18.5529,
        lng: 73.8266,
      },
      {
        id: "rep-2",
        category: "Waterlogging",
        title: "Minor Water Accumulation Cleared",
        description: "Municipal pump team has successfully cleared the waterlogging near Deccan Gymkhana bus stand.",
        locationName: "Deccan Gymkhana Bus Station",
        timestamp: "24 mins ago",
        upvotes: 29,
        status: "Resolved",
        nlpSentiment: "Positive",
        lat: 18.5165,
        lng: 73.8420,
      },
      {
        id: "rep-3",
        category: "Broken Streetlight",
        title: "3 Streetlights Out on Viman Nagar 5th Cross",
        description: "Stretches between Symbiosis gate and bakery are dark. Ward officer notified.",
        locationName: "Viman Nagar North Lane",
        timestamp: "45 mins ago",
        upvotes: 18,
        status: "Investigating",
        nlpSentiment: "Alert",
        lat: 18.5679,
        lng: 73.9143,
      },
      {
        id: "rep-4",
        category: "Community Event",
        title: "Traditional Dhol Tasha Practice & Cultural Gathering",
        description: "Youth troupe rehearsing beats for upcoming festival. Amazing celebratory energy, high pedestrian crowd.",
        locationName: "Near Alka Talkies Chowk",
        timestamp: "1 hour ago",
        upvotes: 87,
        status: "Verified",
        nlpSentiment: "Positive",
        lat: 18.5132,
        lng: 73.8488,
      },
    ],
  },
  mumbai: {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    center: [18.9220, 72.8347],
    zoom: 13,
    tagline: "The City of Dreams, Coastal Rhythms & Unstoppable Spirit",
    weather: {
      temp: 31,
      condition: "Humid Coastal Breeze",
      humidity: 78,
      aqi: 95,
      aqiStatus: "Moderate",
      rainForecast: "High tide alert at 3:45 PM; sea spray along Marine Drive",
    },
    trafficStats: {
      congestionLevel: 68,
      avgSpeedKmh: 18,
      activeBottlenecks: 14,
    },
    emergencyContacts: {
      police: "100 / 112",
      ambulance: "108",
      womenHelpline: "103 / 1091",
      touristSupport: "1800-22-9930",
      disasterManagement: "1916 (BMC Disaster Cell)",
    },
    places: [
      {
        id: "mum-food-1",
        name: "Kyani & Co. Heritage Bakery",
        category: "food",
        subCategory: "1904 Irani Heritage Bakery",
        rating: 4.7,
        reviewsCount: 16500,
        priceLevel: "₹",
        approxCost: "₹250 for two",
        cleanlinessScore: 8.7,
        safetyScore: 9.3,
        description: "Mumbai's oldest surviving Irani cafe at Marine Lines. Iconic checkered tablecloths, chicken puff, mawa cake, and raspberry soda.",
        highlights: ["Mawa Cake", "Parsi Delicacies", "Heritage Ceiling Fans", "Budget Legend"],
        lat: 18.9430,
        lng: 72.8270,
        address: "JSS Road, Marine Lines, Mumbai",
        openHours: "7:00 AM – 8:30 PM",
        isPopular: true,
        isBudgetFriendly: true,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "mum-stay-1",
        name: "The Taj Mahal Palace & Tower",
        category: "stay",
        subCategory: "Historic 5-Star Icon",
        rating: 4.9,
        reviewsCount: 22000,
        priceLevel: "₹₹₹₹",
        approxCost: "₹18,000 / night",
        cleanlinessScore: 9.9,
        safetyScore: 10.0,
        description: "Legendary 1903 harbor landmark overlooking Gateway of India. World-renowned hospitality, elite security perimeter, and opulent ocean-view suites.",
        highlights: ["Harbor View", "Maximum Security", "Michelin-grade Dining", "Historical Legend"],
        lat: 18.9217,
        lng: 72.8332,
        address: "Apollo Bunder, Colaba, Mumbai",
        openHours: "24/7 Check-in",
        isPopular: true,
        isBudgetFriendly: false,
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      },
    ],
    heritage: [
      {
        id: "mum-h1",
        name: "Gateway of India & Colaba Heritage Walk",
        era: "1924 CE",
        builtBy: "George Wittet / British Era",
        significance: "Indo-Saracenic triumphal arch erected to commemorate the landing of King George V. The final British regiment marched past here during independence in 1948.",
        audioGuideTitle: "The Gateway to the Arabian Sea",
        audioTranscript: "Look out toward the vast Arabian Sea as ferries rock in the harbor tide. This grand basalt arch witnessed the birth of modern independent India...",
        traditions: ["Harbor Ferries to Elephanta Caves", "Street Photography", "Sunset Strolls along the Promenade"],
        visitingHours: "Open 24 Hours",
        entryFee: "Free",
        lat: 18.9220,
        lng: 72.8347,
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80",
      },
    ],
    safetyZones: [
      {
        id: "mum-s1",
        name: "Marine Drive Queen's Necklace Promenade",
        riskLevel: "Low",
        safetyIndex: 96,
        lightingScore: 9.8,
        policePatrolScore: 9.7,
        cctvCoverage: "Comprehensive 24/7 Police Patrols",
        reportedHazards: ["Slippery tetrapods during high monsoon swells"],
        saferAlternative: "Stay on the paved illuminated promenade during high-tide warnings.",
        lat: 18.9438,
        lng: 72.8232,
        radiusMeters: 1200,
      },
    ],
    benchmarks: [
      {
        id: "bm-bandra",
        name: "Bandra West (Pali Hill & Carter Rd)",
        safety: 93,
        cleanliness: 88,
        affordability: 40,
        accessibility: 89,
        greeneryAQI: 78,
        overallScore: 89,
        tagline: "The Queen of Suburbs & Creative Cultural Hub",
        pros: ["Spectacular seaside promenades", "Vibrant indie cafes & live music venues", "Safe for solo travelers at late night"],
        cons: ["Sky-high rental costs", "Heavy weekend traffic on Linking Road"],
        idealFor: "Creatives, Artists, Nightlife Lovers, Expats",
      },
      {
        id: "bm-colaba",
        name: "South Mumbai & Colaba",
        safety: 95,
        cleanliness: 89,
        affordability: 50,
        accessibility: 92,
        greeneryAQI: 82,
        overallScore: 91,
        tagline: "Victorian Gothic Grandeur & Coastal Heritage",
        pros: ["UNESCO heritage architecture & art galleries", "World-class security & pedestrian avenues", "Iconic cafes"],
        cons: ["High price tier", "Street vendor density on causeway"],
        idealFor: "Heritage Lovers, Tourists, Luxury Travelers",
      },
    ],
    citizenReports: [
      {
        id: "mum-rep-1",
        category: "Traffic Congestion",
        title: "Western Express Highway Andheri Flyover Slowdown",
        description: "Minor breakdown of commercial truck causing 15 min crawl heading south.",
        locationName: "WEH Andheri Flyover",
        timestamp: "12 mins ago",
        upvotes: 56,
        status: "Investigating",
        nlpSentiment: "Alert",
        lat: 19.1136,
        lng: 72.8697,
      },
      {
        id: "mum-rep-2",
        category: "Safety Concern",
        title: "High Tide Warning along Marine Drive",
        description: "BMC lifeguards and coastal police requesting visitors to maintain safe distance from sea wall tetrapods.",
        locationName: "Marine Drive Promenade",
        timestamp: "30 mins ago",
        upvotes: 94,
        status: "Verified",
        nlpSentiment: "Alert",
        lat: 18.9438,
        lng: 72.8232,
      },
    ],
  },
  bengaluru: {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    center: [12.9716, 77.5946],
    zoom: 13,
    tagline: "The Garden City & India's Startup Innovation Capital",
    weather: {
      temp: 24,
      condition: "Breezy & Pleasant",
      humidity: 62,
      aqi: 52,
      aqiStatus: "Good & Crisp",
      rainForecast: "Evening drizzle expected near Cubbon Park",
    },
    trafficStats: {
      congestionLevel: 62,
      avgSpeedKmh: 16,
      activeBottlenecks: 11,
    },
    emergencyContacts: {
      police: "112 / 080-22942222",
      ambulance: "108",
      womenHelpline: "1091 / 080-22943225",
      touristSupport: "080-22352828",
      disasterManagement: "080-22221188",
    },
    places: [
      {
        id: "blr-food-1",
        name: "MTR (Mavalli Tiffin Room)",
        category: "food",
        subCategory: "1924 Pure Veg Heritage Tiffin",
        rating: 4.8,
        reviewsCount: 18900,
        priceLevel: "₹₹",
        approxCost: "₹350 for two",
        cleanlinessScore: 9.4,
        safetyScore: 9.6,
        description: "Legendary 1924 institution near Lalbagh that invented the Rava Idli during WWII grain shortages. Pure ghee dosas and silver-tumbler filter coffee.",
        highlights: ["Crispy Ghee Roast Dosa", "Rava Idli", "Historic Silver Tumblers", "Garden City Staple"],
        lat: 12.9555,
        lng: 77.5861,
        address: "Lalbagh Road, Mavalli, Bengaluru",
        openHours: "6:30 AM – 11:00 AM, 12:30 PM – 8:30 PM",
        isPopular: true,
        isBudgetFriendly: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
      },
    ],
    heritage: [
      {
        id: "blr-h1",
        name: "Bangalore Palace & Tudor Towers",
        era: "1878 CE",
        builtBy: "Chamarajendra Wadiyar X",
        significance: "Inspired by England's Windsor Castle, featuring fortified towers, Tudor-style battlements, wood carvings, and Victorian stained glass.",
        audioGuideTitle: "Tudor Splendor in the Garden City",
        audioTranscript: "Step across the sprawling courtyard into the wooden halls of the Wadiyars, where neoclassical paintings and ivory inlay portraits grace the royal salon...",
        traditions: ["Audio Guide Tour", "Vintage Carriage Exhibits", "Botanical Grounds Walk"],
        visitingHours: "10:00 AM – 5:30 PM",
        entryFee: "₹250 (Indians) / ₹450 (Foreigners)",
        lat: 12.9988,
        lng: 77.5921,
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80",
      },
    ],
    safetyZones: [
      {
        id: "blr-s1",
        name: "Cubbon Park & MG Road Safe Corridor",
        riskLevel: "Low",
        safetyIndex: 95,
        lightingScore: 9.5,
        policePatrolScore: 9.3,
        cctvCoverage: "High Density Metro Mesh",
        reportedHazards: ["Vehicle traffic restriction inside park after dusk"],
        saferAlternative: "Use the illuminated metro concourse and pedestrian pathways along Church Street.",
        lat: 12.9750,
        lng: 77.5990,
        radiusMeters: 900,
      },
    ],
    benchmarks: [
      {
        id: "bm-indiranagar",
        name: "Indiranagar (100ft & 12th Main)",
        safety: 92,
        cleanliness: 89,
        affordability: 48,
        accessibility: 91,
        greeneryAQI: 84,
        overallScore: 89,
        tagline: "The Trendy Gastronomy & Tech Corridor",
        pros: ["Top microbreweries and specialty coffee roasters", "Tree-lined residential avenues", "High safety rating for late night commuters"],
        cons: ["High weekend parking gridlocks", "High commercial rental rates"],
        idealFor: "Young Tech Leaders, Foodies, Nightlife Enthusiasts",
      },
      {
        id: "bm-jayanagar",
        name: "Jayanagar & Basavanagudi",
        safety: 94,
        cleanliness: 92,
        affordability: 82,
        accessibility: 90,
        greeneryAQI: 93,
        overallScore: 92,
        tagline: "The Traditional Green Heritage Haven",
        pros: ["Lush park canopy and wide walkable avenues", "Authentic traditional South Indian breakfast cafes", "Extremely family-safe & clean"],
        cons: ["Calm nightlife closes earlier than central zones"],
        idealFor: "Families, Seniors, Students, Cultural Explorers",
      },
    ],
    citizenReports: [
      {
        id: "blr-rep-1",
        category: "Traffic Congestion",
        title: "Silk Board Junction Heavy Inflow",
        description: "Traffic police active at all 4 arms. Moving at steady 12 km/h pace.",
        locationName: "Central Silk Board Junction",
        timestamp: "15 mins ago",
        upvotes: 78,
        status: "Verified",
        nlpSentiment: "Alert",
        lat: 12.9176,
        lng: 77.6238,
      },
    ],
  },
};
