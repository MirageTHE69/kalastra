const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Studio", href: "/#studio" },
  { label: "About", href: "/about" },
];

/** About page — founder. Add the name to show it under the photo. */
export const FOUNDER = {
  name: "Dev Soni",
  role: "Founder, Kalastra Studio",
  photo: "/assets/founder.jpg",
};

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
];

/* --------------------------------------------------------------------------
   Projects — images are served from ImageKit, resized on the fly.
   To add a project: copy one entry, give it a unique slug, and list its images.
   -------------------------------------------------------------------------- */
const IK_ROOT = "https://ik.imagekit.io/dpb6ubieb";
const IK = `${IK_ROOT}/apartment%201%20`;

/** Resize an ImageKit image to the given width (keeps aspect ratio, auto format). */
export const ikImg = (src: string, w: number) => `${src}?tr=w-${w},q-80,f-auto`;

export type Project = {
  slug: string;
  name: string;
  /** small tag on the card image */
  tag: string;
  /** right-hand meta on the card */
  meta: string;
  category: string;
  /** card aspect ratio on the homepage gallery */
  ar: "4/5" | "16/11" | "3/4";
  /** vertical offset of the card in the homepage gallery (px) */
  mt: number;
  cover: string;
  lede: string;
  intro: string;
  body: string[];
  facts: { label: string; value: string }[];
  gallery: { src: string; caption: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "apartment-01",
    name: "Apartment 01",
    tag: "INTERIOR · APARTMENT",
    meta: "3 VIEWS",
    category: "Interior visualisation",
    ar: "4/5",
    mt: 0,
    cover: `${IK}/Sunlit%20Modern%20Living%20Room%20Retreat%20(1).png`,
    lede: "A calm, light-filled apartment where soft neutrals meet deep green and warm timber.",
    intro:
      "Apartment 01 was visualised to sell a feeling as much as a floor plan: morning sun across a pale stone floor, a garden terrace that reads as part of the living room, and a bedroom that feels quiet the moment you walk in.",
    body: [
      "We built the full interior from the designer’s drawings, then tuned materials and light view by view: a walnut coffee table and bouclé sofa under a woven ceiling fan, sheer curtains softening the daylight, and a sculpted bedside unit lit by a single pendant.",
      "Every finish was matched to the specification, so the client could sign off on the palette with confidence before a single item was ordered.",
    ],
    facts: [
      { label: "Type", value: "Residential apartment" },
      { label: "Scope", value: "Interior visualisation" },
      { label: "Spaces", value: "Living room, bedroom" },
      { label: "Deliverables", value: "3 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK}/Sunlit%20Modern%20Living%20Room%20Retreat%20(1).png`, caption: "Living room — daylight and terrace view" },
      { src: `${IK}/Scene%206.png`, caption: "Bedroom — window bay" },
      { src: `${IK}/Image%20(1).png`, caption: "Bedside detail — pendant and upholstery" },
    ],
  },
  {
    slug: "apartment-02",
    name: "Apartment 02",
    tag: "INTERIOR · BEDROOMS",
    meta: "4 VIEWS",
    category: "Interior visualisation",
    ar: "16/11",
    mt: 80,
    cover: `${IK}/apartment%202/a.png`,
    lede: "Private rooms with their own character, tied together by soft upholstery, layered light and warm neutrals.",
    intro:
      "Apartment 02 focused on the private side of the home. Each bedroom needed its own mood while still feeling like part of the same family of spaces.",
    body: [
      "The master suite pairs a low upholstered bed and a sculpted black bench with an ink-wash mountain mural and warm bedside lamps. The second bedroom is lighter and more playful, with framed art, niche shelving with concealed lighting and a tufted headboard, shown from two angles so the client could judge both the bed wall and the wardrobe run.",
      "Close crops bring out what drawings can’t: knitted throws, linen bedding and the grain of the timber panelling.",
    ],
    facts: [
      { label: "Type", value: "Residential apartment" },
      { label: "Scope", value: "Interior visualisation" },
      { label: "Spaces", value: "Master bedroom, bedroom" },
      { label: "Deliverables", value: "4 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK}/apartment%202/a.png`, caption: "Master bedroom — mural wall" },
      { src: `${IK}/apartment%202/bedroom%2001%20(2).png`, caption: "Bedroom — front view" },
      { src: `${IK}/apartment%202/bedroom%2001%20(1).png`, caption: "Bedroom — corner view" },
      { src: `${IK}/apartment%202/Image%20(1)%20(1).png`, caption: "Master bedroom — bench and textures" },
    ],
  },
  {
    slug: "opal-residence",
    name: "Opal Residence",
    tag: "EXTERIOR · RESIDENCE",
    meta: "3 VIEWS",
    category: "Exterior visualisation",
    ar: "3/4",
    mt: -40,
    cover: `${IK}/apartment%202/opal-residency/Scene%205.png`,
    lede: "A contemporary family home in brick, timber and planted terraces, rendered at dusk.",
    intro:
      "Opal Residence is a three-storey home defined by deep cantilevered slabs, each edged with planting. The brief was to show how the façade comes alive after sunset.",
    body: [
      "We modelled the full exterior from the architect’s drawings, from the exposed brick, timber cladding and glazed balconies to the boundary wall and its name plate. We then lit the scene for the blue hour: warm downlights in the soffits, a glowing entrance stair and landscape lighting against a fading sky.",
      "Street-level views place the house in context, so clients and buyers can understand its scale, the arrival and the approach at a glance.",
    ],
    facts: [
      { label: "Type", value: "Private residence" },
      { label: "Scope", value: "Exterior visualisation" },
      { label: "Views", value: "Street, approach, entrance" },
      { label: "Deliverables", value: "3 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK}/apartment%202/opal-residency/Scene%205.png`, caption: "Street elevation at dusk" },
      { src: `${IK}/apartment%202/opal-residency/Scene%208.png`, caption: "Approach and name plate" },
      { src: `${IK}/apartment%202/opal-residency/Scene%2012.png`, caption: "Entrance and porch" },
    ],
  },
  {
    slug: "matar",
    name: "Matar",
    tag: "INTERIOR · APARTMENT",
    meta: "3 VIEWS",
    category: "Interior visualisation",
    ar: "16/11",
    mt: 60,
    cover: `${IK}/apartment%202/opal-residency/matar/01%20LIVING%20ROOM.png`,
    lede: "A warm, airy family apartment of timber, soft white and touches of emerald and rust.",
    intro:
      "Matar is a family apartment where each room has its own accent colour, but all of them share the same calm base of light floors, warm timber and soft daylight.",
    body: [
      "The open living and dining space is built around a sculpted white wave wall, framed by timber fluting and lit by a cluster of brass pendants. Emerald dining chairs and cushions tie it to the green rug and the plants by the window.",
      "In the bedrooms the palette shifts: a deep rust upholstered bed against a padded headboard in one, and a seating corner of patterned lounge chairs in front of a full timber wardrobe in the other. Each view was framed so the client could see how storage, furniture and circulation work together.",
    ],
    facts: [
      { label: "Type", value: "Residential apartment" },
      { label: "Scope", value: "Interior visualisation" },
      { label: "Spaces", value: "Living & dining, 2 bedrooms" },
      { label: "Deliverables", value: "3 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK}/apartment%202/opal-residency/matar/01%20LIVING%20ROOM.png`, caption: "Living and dining room" },
      { src: `${IK}/apartment%202/opal-residency/matar/03_Bed%20Room%2001.png`, caption: "Bedroom 01" },
      { src: `${IK}/apartment%202/opal-residency/matar/08_Bed%20Room%2004.png`, caption: "Bedroom 04 — seating corner" },
    ],
  },
  {
    slug: "vasava-residence",
    name: "Vasava Residence",
    tag: "EXTERIOR · RESIDENCE",
    meta: "DAY & DUSK",
    category: "Exterior visualisation",
    ar: "4/5",
    mt: 0,
    cover: `${IK}/apartment%202/opal-residency/MR.PRAFUL%20VASAVA/01.jpg`,
    lede: "A modern home with a terracotta frame and a rooftop garden, shown by day and at dusk.",
    intro:
      "Designed for Mr. Praful Vasava, this home is a bold terracotta frame wrapped around a pale stone core, with planted balconies and a roof garden that softens it against the surrounding trees.",
    body: [
      "We rendered the same camera twice. The daytime view shows the true colour of the façade materials and the landscape around the house. The dusk view shows warm interiors, uplit planting and a wet driveway reflecting the light, the image that sells how the house feels to come home to.",
      "Presenting both side by side lets the client and their architect review materials and lighting from a single, consistent viewpoint.",
    ],
    facts: [
      { label: "Type", value: "Private residence" },
      { label: "Scope", value: "Exterior visualisation" },
      { label: "Views", value: "Front elevation, day & dusk" },
      { label: "Deliverables", value: "2 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK}/apartment%202/opal-residency/MR.PRAFUL%20VASAVA/01.jpg`, caption: "Front elevation at dusk" },
      { src: `${IK}/apartment%202/opal-residency/MR.PRAFUL%20VASAVA/02.jpg`, caption: "Front elevation by day" },
    ],
  },
  {
    slug: "d-studio-office",
    name: "D Studio Office",
    tag: "INTERIOR · WORKSPACE",
    meta: "4 VIEWS",
    category: "Commercial interior",
    ar: "16/11",
    mt: 50,
    cover: `${IK_ROOT}/D%20STUDIO%20OFFICE/Scene%202%20(1).png`,
    lede: "A design studio’s own workspace: glass, timber and greenery around a bright central corridor.",
    intro:
      "D Studio wanted an office that feels like a studio rather than a corporate floor. Rooms are separated with reeded glass and black frames, so light reaches deep into the plan and the team can still see each other.",
    body: [
      "Visitors arrive at a reception desk beside a lattice timber screen, then follow a patterned corridor past an indoor planter. The waiting lounge is relaxed and residential, with a round rug, low sofas, a wall of plants and bold architectural art.",
      "The main workspace pairs a long timber desk with a sculptural ring pendant and the studio’s branding on the wall. Four views walk through the whole space, from arrival to the desks.",
    ],
    facts: [
      { label: "Type", value: "Office interior" },
      { label: "Scope", value: "Commercial interior visualisation" },
      { label: "Spaces", value: "Reception, lounge, workspace" },
      { label: "Deliverables", value: "4 high-resolution stills" },
    ],
    gallery: [
      { src: `${IK_ROOT}/D%20STUDIO%20OFFICE/Scene%202%20(1).png`, caption: "Workspace — studio desks" },
      { src: `${IK_ROOT}/D%20STUDIO%20OFFICE/Scene%206%20(1).png`, caption: "Waiting lounge" },
      { src: `${IK_ROOT}/D%20STUDIO%20OFFICE/Image%20(2).png`, caption: "Corridor and indoor planter" },
      { src: `${IK_ROOT}/D%20STUDIO%20OFFICE/Scene%203.png`, caption: "Reception and lattice screen" },
    ],
  },
];

export const getProject =(slug: string) => PROJECTS.find((p) => p.slug === slug);

export const CLAY_IMG = u("photo-1600566753190-17f0baa2a6c3", 2200);

export const STEPS = [
  { title: "Brief & drawings", time: "DAY 1", desc: "Send CAD, SketchUp or Revit files with references. We agree cameras, mood and deliverables." },
  { title: "Clay review", time: "DAY 2–3", desc: "Untextured views to approve massing, framing and composition before any detail is added." },
  { title: "Materials & light", time: "DAY 3–5", desc: "Textures, furniture, landscaping and lighting. One consolidated round of comments." },
  { title: "Final delivery", time: "DAY 5–7", desc: "Retouched 4K stills or graded video, delivered with print and social crops." },
];

export const EMAIL = "hello@kalastra.studio";
