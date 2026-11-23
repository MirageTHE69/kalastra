const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#studio" },
];

/** Background video used on the splash screen and the hero (always muted). */
export const HERO_VIDEO = {
  src: "/media/hero.mp4",
  poster: "/media/hero-poster.jpg",
  /** seconds to skip on first play (the reel opens on black) */
  startAt: 2.4,
};

export const STATEMENT =
  "Experience every room in lifelike detail before a single brick is laid. We turn drawings into places where people can see their space with every detailed material, colour palette and design.";
export const STATEMENT_ACCENTS = new Set(["lifelike", "brick", "material,"]);

/** desc is a list of paragraphs */
export const SERVICES = [
  {
    title: "Exterior Renders",
    desc: [
      "We model every element of a building’s exterior, from cladding, glazing and landscaping to streetscapes and natural sunlight, so architects, developers and real estate marketers can present compelling visions to clients, stakeholders and buyers.",
      "We also provide eye-level street views, aerial bird’s-eye angles and masterplan visualisations for residential and commercial projects.",
    ],
    img: u("photo-1564013799919-ab600027ffc6"),
  },
  {
    title: "Interior Renders",
    desc: [
      "Interior renders capture true-to-life textures, lighting and spatial flow, helping architects and interior designers communicate their vision and designs clearly to clients.",
      "Give clients the opportunity to connect emotionally with a space, test finishes and validate layouts.",
    ],
    img: u("photo-1618221195710-dd6b41faaea6"),
  },
  {
    title: "3D Walkthroughs",
    desc: ["Cinematic animated tours with considered camera moves, sound design and colour grading."],
    img: u("photo-1600566753086-00f18fb6b3ea"),
  },
  {
    title: "360° Panoramas",
    desc: ["Interactive spheres your clients can look around on any screen or VR headset."],
    img: u("photo-1600210492486-724fe5c67fb0"),
  },
];

export type Project = {
  name: string;
  loc: string;
  tag: string;
  img: string;
  ar: "4/5" | "16/11" | "3/4";
  mt: number;
};

export const PROJECTS: Project[] = [
  { name: "Casa Nimbus", loc: "ALIBAUG, IN", tag: "VILLA · EXTERIOR", img: u("photo-1600585154340-be6161a56a0c"), ar: "4/5", mt: 0 },
  { name: "The Oak Residence", loc: "PUNE, IN", tag: "INTERIOR", img: u("photo-1600607687939-ce8a6c25118c"), ar: "16/11", mt: 80 },
  { name: "Meridian Tower", loc: "MUMBAI, IN", tag: "MIXED-USE · AERIAL", img: u("photo-1486406146926-c627a92ad1ab"), ar: "3/4", mt: -40 },
  { name: "Saal House", loc: "GOA, IN", tag: "VILLA · DUSK", img: u("photo-1613977257363-707ba9348227"), ar: "16/11", mt: 60 },
  { name: "Atelier 9", loc: "BENGALURU, IN", tag: "WORKSPACE", img: u("photo-1497366216548-37526070297c"), ar: "4/5", mt: 0 },
  { name: "Kaya Retreat", loc: "DUBAI, UAE", tag: "RESORT · WALKTHROUGH", img: u("photo-1566073771259-6a8506099945"), ar: "16/11", mt: 50 },
];

export const CLAY_IMG = u("photo-1600566753190-17f0baa2a6c3", 2200);

export const STEPS = [
  { title: "Brief & drawings", time: "DAY 1", desc: "Send CAD, SketchUp or Revit files with references. We agree cameras, mood and deliverables." },
  { title: "Clay review", time: "DAY 2–3", desc: "Untextured views to approve massing, framing and composition before any detail is added." },
  { title: "Materials & light", time: "DAY 3–5", desc: "Textures, furniture, landscaping and lighting. One consolidated round of comments." },
  { title: "Final delivery", time: "DAY 5–7", desc: "Retouched 4K stills or graded video, delivered with print and social crops." },
];

export const EMAIL = "hello@kalastra.studio";
