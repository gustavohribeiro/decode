export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#details", label: "Details" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;

export const featureCards = [
  {
    title: "See Every Detail",
    body: "Experience stunning clarity and depth that make virtual worlds feel sharp, vivid, and incredibly lifelike.",
    icon: "detail" as const,
  },
  {
    title: "Feel Connected",
    body: "Share moments, explore together, and connect naturally with others in immersive digital spaces.",
    icon: "connect" as const,
  },
  {
    title: "Moves With You",
    body: "SONIQ responds instantly to your movements, creating a smooth and natural feeling of control and presence.",
    icon: "move" as const,
  },
];

export const visionBullets = [
  "8K OLED dual display clarity",
  "Precision optical lens system",
  "True-to-life color reproduction",
];

export const soundBullets = [
  "True 3D spatial audio positioning",
  "Dynamic sound adaptation in real time",
  "Immersive environmental acoustics",
];

export const fitCallouts = [
  {
    title: "Precision Tracking Technology",
    body: "Ultra-responsive sensors capture your natural movements with smooth accuracy and minimal latency.",
    anchor: "top",
  },
  {
    title: "Balanced Comfort",
    body: "Lightweight materials and ergonomic design ensure lasting comfort during extended sessions.",
    anchor: "left",
  },
  {
    title: "Adaptive Fit System",
    body: "A flexible adjustment system adapts effortlessly to different head shapes for a secure, personalized fit.",
    anchor: "right",
  },
];

export const plans = [
  {
    id: "basic",
    name: "Basic",
    description:
      "The essential SONIQ experience for everyday immersion, entertainment, and exploration.",
    monthly: 68,
    features: [
      "Access to the SONIQ platform and app ecosystem",
      "Standard visual quality and spatial audio profiles",
      "Personal use license",
      "Access to public shared spaces and experiences",
      "Monthly software updates",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description:
      "Designed for creators, explorers, and power users who want deeper immersion, customization, and exclusive access.",
    monthly: 98,
    features: [
      "Ultra visual mode with enhanced resolution and precision positioning",
      "Private virtual spaces and custom environments",
      "Multi-user collaboration tools for shared sessions and events",
      "Early access to new features and experimental releases",
      "Cloud backup and cross-device profiles",
    ],
  },
] as const;

export const testimonials = [
  {
    quote:
      "It feels incredibly natural. After a few minutes, I completely forgot I was wearing a headset.",
    name: "Lena Hoffman",
    avatar: "/assets/avatars/lena.jpg",
  },
  {
    quote:
      "The image quality is stunning. The level of detail and clarity honestly surprised me.",
    name: "Marcus Reid",
    avatar: "/assets/avatars/marcus.jpg",
  },
  {
    quote:
      "I’ve tried several VR headsets, but this is the first one that feels truly comfortable for long sessions.",
    name: "Daniel Park",
    avatar: "/assets/avatars/daniel.jpg",
  },
  {
    quote:
      "Setup was fast and easy. Within minutes I was already exploring my first virtual space.",
    name: "Julian Meyer",
    avatar: "/assets/avatars/julian.jpg",
  },
  {
    quote:
      "The design feels premium and thoughtfully crafted. Everything just works smoothly.",
    name: "Amelia Wright",
    avatar: "/assets/avatars/amelia.jpg",
  },
  {
    quote:
      "Sharing experiences with friends in VR finally feels natural and intuitive.",
    name: "Noah Bennett",
    avatar: "/assets/avatars/noah.jpg",
  },
  {
    quote:
      "The spatial sound makes a huge difference. You don’t just hear the environment - you feel inside it.",
    name: "Sofia Alvarez",
    avatar: "/assets/avatars/sofia.jpg",
  },
  {
    quote:
      "It’s the closest I’ve come to forgetting what’s real and what’s virtual.",
    name: "Elena Rossi",
    avatar: "/assets/avatars/elena.jpg",
  },
];

export const faqs = [
  {
    q: "What’s included when I purchase SONIQ?",
    a: "When you purchase SONIQ, you receive the VR headset, charging cable, carrying case, and access to the SONIQ app. Your subscription unlocks the software platform, immersive content, cloud services, and ongoing updates. The device is a one-time purchase, while access to features and content is subscription-based.",
  },
  {
    q: "Do I need a powerful computer or console to use SONIQ?",
    a: "No. SONIQ is a fully standalone headset with built-in processing and storage. It connects to Wi-Fi for content downloads, updates, and cloud features. No external PC, console, or cables are required for everyday use.",
  },
  {
    q: "Can I cancel or change my subscription at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time directly from your SONIQ account. Your current plan remains active until the end of the billing period, and no cancellation fees apply.",
  },
  {
    q: "How comfortable is SONIQ for longer sessions?",
    a: "SONIQ is designed for extended use with lightweight materials, balanced weight distribution, and breathable padding. The adaptive fit system allows quick adjustments to different head shapes, reducing pressure points and fatigue during longer sessions.",
  },
  {
    q: "Can multiple people use the same headset?",
    a: "Yes. Multiple user profiles can be created on one device. Each user can save their own settings, preferences, and cloud profiles (available on Pro). This makes sharing the headset easy while keeping personal data separate.",
  },
  {
    q: "How often does SONIQ receive software updates and new content?",
    a: "SONIQ receives regular monthly updates that improve performance, security, and stability. New experiences and feature updates are released continuously, with Pro members receiving early access to selected releases.",
  },
  {
    q: "What kind of warranty and support do I get?",
    a: "Every SONIQ headset includes a standard 2-year limited warranty covering manufacturing defects. Our support team is available via chat and email for setup help, troubleshooting, and general assistance. Pro members receive priority response times.",
  },
];

export const useCases = [
  {
    title: "Play & Explore",
    body: "Dive into immersive games, cinematic worlds, and interactive adventures that respond naturally to every movement and action.",
    image: "/assets/landscape-still.jpg",
  },
  {
    title: "Watch & Experience",
    body: "Enjoy movies, live events, and virtual environments on a massive immersive screen that surrounds you with sound and detail.",
    image: "/assets/side-feature.jpg",
  },
  {
    title: "Work & Connect",
    body: "Meet, collaborate, and share moments in virtual spaces that feel personal, natural, and surprisingly real.",
    image: "/assets/product.jpg",
  },
];

export const HERO_VIDEO =
  "https://video.wixstatic.com/video/914fc7_161f98b5a1c048189454cb22714a7c61/1080p/mp4/file.mp4";
