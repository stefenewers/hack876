/*
 * The deck registry: one entry per sponsor or partner proposal.
 *
 * The Partnership Hub (/partnerhub) lists exactly what is here. A new deck
 * appears in the hub by adding one entry. Paths are written out in full, not
 * derived, because older decks do not follow one naming pattern.
 *
 * An entry means a proposal has been prepared. It says nothing about whether
 * the organisation has been contacted, is interested, or is a sponsor. Do not
 * add status fields here without a real source of truth behind them.
 */

export const deckCategories = [
  "Corporate & Professional Services",
  "Foundations",
  "Food & Beverage",
  "Technology & Developer Partners",
  "Community & Institutional Partners",
] as const;

export type DeckCategory = (typeof deckCategories)[number];

/**
 * Editorial readiness: how far the proposal itself is ready to be forwarded.
 * It says nothing about whether the organisation is interested or confirmed.
 *
 * "ready"  can be shared as it stands.
 * "intro"  suitable for a first conversation. Details are still needed
 *          before a formal request, application or commitment.
 * "hold"   kept for organiser review. The hub does not offer its link or PDF.
 *
 * The reasons live in decisions.ts and are never shown in the browser. The hub
 * is an unlisted page, not access control: a held proposal's page still exists.
 */
export type Readiness = "ready" | "intro" | "hold";

export const readinessLabel: Record<Readiness, string> = {
  ready: "Ready to share",
  intro: "Introduction only",
  hold: "Hold",
};

export const readinessHelp: Record<Readiness, string> = {
  ready: "Can be shared as it stands.",
  intro: "Suitable for a first conversation. More details are needed before a formal request.",
  hold: "Not for sharing yet. Kept here for the organisers to review.",
};

export type DeckEntry = {
  /** Organisation name as people would search for it. */
  name: string;
  /** Other words people might type, e.g. a brand or an abbreviation. */
  aka?: string;
  category: DeckCategory;
  readiness: Readiness;
  /** One line on what the proposal asks for. Not a status. */
  focus: string;
  /** The proposal page. */
  route: string;
  /** The pre-generated PDF in /public. */
  pdf: string;
  /** The name the PDF downloads as. */
  filename: string;
};

const P = "/proposals/hack876-";

export const deckRegistry: DeckEntry[] = [
  /* ---------------------------------------- Corporate & Professional Services */
  {
    name: "Loring Consulting Engineers",
    category: "Corporate & Professional Services",
    readiness: "intro",
    focus: "Platinum invitation from a firm with a Kingston office and a Jamaican-born CEO.",
    route: "/loringopportunity",
    pdf: `${P}loring-partnership-proposal.pdf`,
    filename: "Hack876 x Loring Consulting Engineers - Partnership Proposal.pdf",
  },
  {
    name: "GK General Insurance",
    aka: "GraceKennedy GK Insurance",
    category: "Corporate & Professional Services",
    readiness: "intro",
    focus: "Platinum invitation built around resilience and protecting what students build.",
    route: "/gracekennedyopportunity",
    pdf: `${P}gracekennedy-partnership-proposal.pdf`,
    filename: "Hack876 x GK General Insurance - Partnership Proposal.pdf",
  },
  {
    name: "Scotia Investments Jamaica Limited",
    aka: "Scotiabank Scotia",
    category: "Corporate & Professional Services",
    readiness: "intro",
    focus: "Platinum invitation on investing early in Jamaican talent.",
    route: "/scotiainvestmentsopportunity",
    pdf: `${P}scotia-investments-partnership-proposal.pdf`,
    filename: "Hack876 x Scotia Investments Jamaica Limited - Partnership Proposal.pdf",
  },
  {
    name: "Cardinal Law",
    category: "Corporate & Professional Services",
    readiness: "intro",
    focus: "Platinum invitation, with every other level open.",
    route: "/cardinallawopportunity",
    pdf: `${P}cardinal-law-partnership-proposal.pdf`,
    filename: "Hack876 x Cardinal Law - Partnership Proposal.pdf",
  },
  {
    name: "MacSpot Jamaica",
    aka: "Mac Spot Apple",
    category: "Corporate & Professional Services",
    readiness: "ready",
    focus: "Devices, gift cards, discounts or partial support toward prizes.",
    route: "/macspotopportunity",
    pdf: `${P}macspot-partnership-proposal.pdf`,
    filename: "Hack876 x MacSpot Jamaica - Prize Partnership Proposal.pdf",
  },
  {
    name: "Stationery & Office Supplies Ltd.",
    aka: "SOS SEEK stationery",
    category: "Corporate & Professional Services",
    readiness: "ready",
    focus: "Student materials in kind: notebooks, pens and planning supplies, or a discount.",
    route: "/sosopportunity",
    pdf: `${P}sos-partnership-proposal.pdf`,
    filename: "Hack876 x Stationery & Office Supplies Ltd. - Partnership Proposal.pdf",
  },
  {
    name: "Tank-Weld",
    aka: "Tankweld Tank Weld Metals",
    category: "Corporate & Professional Services",
    readiness: "ready",
    focus: "Silver-level contribution toward the equipment and materials teams build with.",
    route: "/tankweldopportunity",
    pdf: `${P}tankweld-partnership-proposal.pdf`,
    filename: "Hack876 x Tank-Weld - Partnership Proposal.pdf",
  },
  {
    name: "Scotiabank Jamaica (ScotiaRISE)",
    aka: "Scotiabank ScotiaRISE Scotia Bank",
    category: "Corporate & Professional Services",
    readiness: "intro",
    focus: "J$550,000 as an education and prize partner, with defined metrics for the ScotiaRISE form.",
    route: "/scotiariseopportunity",
    pdf: `${P}scotiarise-partnership-proposal.pdf`,
    filename: "Hack876 x Scotiabank Jamaica (ScotiaRISE) - Partnership Proposal.pdf",
  },
  {
    name: "interCaribbean Airways",
    aka: "interCaribbean Airways airline",
    category: "Corporate & Professional Services",
    readiness: "ready",
    focus: "Return flights for one or two Caribbean-based mentors or judges, or a travel voucher as the grand prize. In kind. Either is welcome.",
    route: "/intercaribbeanopportunity",
    pdf: `${P}intercaribbean-partnership-proposal.pdf`,
    filename: "Hack876 x interCaribbean Airways - Partnership Proposal.pdf",
  },
  {
    name: "Wigton Energy",
    aka: "Wigton Windfarm Wind Farm",
    category: "Corporate & Professional Services",
    readiness: "ready",
    focus: "J$400,000 toward a free day of young Jamaicans building real tech, with the option of naming the Resilience track prize.",
    route: "/wigtonenergyopportunity",
    pdf: `${P}wigton-partnership-proposal.pdf`,
    filename: "Hack876 x Wigton Energy - Partnership Proposal.pdf",
  },

  /* -------------------------------------------------------------- Foundations */
  {
    name: "JMMB Joan Duncan Foundation",
    aka: "JMMB",
    category: "Foundations",
    readiness: "intro",
    focus: "Platinum invitation linking education and entrepreneurship.",
    route: "/jmmbopportunity",
    pdf: `${P}jmmb-partnership-proposal.pdf`,
    filename: "Hack876 x JMMB Joan Duncan Foundation - Partnership Proposal.pdf",
  },
  {
    name: "N.C.B. Foundation",
    aka: "NCB National Commercial Bank",
    category: "Foundations",
    readiness: "intro",
    focus: "Platinum invitation tied to its work growing digital skills.",
    route: "/ncbfoundationopportunity",
    pdf: `${P}ncbfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x N.C.B. Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Digicel Foundation",
    category: "Foundations",
    readiness: "intro",
    focus: "Platinum invitation tied to its Smart Labs and digital inclusion work.",
    route: "/digicelfoundationopportunity",
    pdf: `${P}digicelfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Digicel Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Seprod Foundation",
    category: "Foundations",
    readiness: "intro",
    focus: "Gold-level contribution toward prizes, alongside its STEAM work.",
    route: "/seprodfoundationopportunity",
    pdf: `${P}seprodfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Seprod Foundation - Partnership Proposal.pdf",
  },
  {
    name: "JPS Foundation",
    aka: "Jamaica Public Service",
    category: "Foundations",
    readiness: "intro",
    focus: "Gold-level contribution toward prizes, with a proposed resilience award.",
    route: "/jpsfoundationopportunity",
    pdf: `${P}jpsfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x JPS Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Supreme Ventures Foundation",
    aka: "SVF SVL",
    category: "Foundations",
    readiness: "intro",
    focus: "Gold-level contribution toward prizes. Foundation name only.",
    route: "/supremeventuresfoundationopportunity",
    pdf: `${P}supremeventuresfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Supreme Ventures Foundation - Partnership Proposal.pdf",
  },
  {
    name: "The American Friends of Jamaica",
    aka: "AFJ",
    category: "Foundations",
    readiness: "intro",
    focus: "Interest check for a programme grant. Not for student prizes, under AFJ grant rules.",
    route: "/americanfriendsofjamaicaopportunity",
    pdf: `${P}americanfriendsofjamaica-partnership-proposal.pdf`,
    filename: "Hack876 x The American Friends of Jamaica - Partnership Proposal.pdf",
  },
  {
    name: "Guardian Group Foundation",
    category: "Foundations",
    readiness: "ready",
    focus: "Bronze-level contribution toward special awards or student programming.",
    route: "/guardiangroupfoundationopportunity",
    pdf: `${P}guardiangroupfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Guardian Group Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Sagicor Foundation Jamaica",
    category: "Foundations",
    readiness: "ready",
    focus: "Bronze-level contribution toward special awards or student programming.",
    route: "/sagicorfoundationopportunity",
    pdf: `${P}sagicorfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Sagicor Foundation Jamaica - Partnership Proposal.pdf",
  },
  {
    name: "JN Foundation",
    aka: "Jamaica National",
    category: "Foundations",
    readiness: "ready",
    focus: "Bronze-level contribution toward special awards or student programming.",
    route: "/jnfoundationopportunity",
    pdf: `${P}jnfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x JN Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Mayberry Foundation",
    category: "Foundations",
    readiness: "intro",
    focus: "Bronze-level contribution toward the student experience. Not for prizes.",
    route: "/mayberryfoundationopportunity",
    pdf: `${P}mayberryfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Mayberry Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Usain Bolt Foundation",
    category: "Foundations",
    readiness: "ready",
    focus: "Bronze-level contribution toward the existing Boldest Idea award.",
    route: "/usainboltfoundationopportunity",
    pdf: `${P}usainboltfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Usain Bolt Foundation - Partnership Proposal.pdf",
  },
  {
    name: "GraceKennedy Foundation",
    aka: "GK Foundation Grace Kennedy",
    category: "Foundations",
    readiness: "intro",
    focus: "Exploratory educational partnership. An introduction and a question about fit, no funding request.",
    route: "/gracekennedyfoundationopportunity",
    pdf: `${P}gracekennedyfoundation-partnership-brief.pdf`,
    filename: "Hack876 x GraceKennedy Foundation - Partnership Brief.pdf",
  },
  {
    name: "Sandals Foundation",
    aka: "Sandals Resorts Beaches SRI",
    category: "Foundations",
    readiness: "ready",
    focus: "Silver-level contribution toward the equipment and student programme.",
    route: "/sandalsfoundationopportunity",
    pdf: `${P}sandalsfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x Sandals Foundation - Partnership Proposal.pdf",
  },
  {
    name: "C.B. Facey Foundation",
    aka: "CB Facey Pan Jamaica PanJam Facey",
    category: "Foundations",
    readiness: "ready",
    focus: "J$250,000 to J$500,000 as an education partner, through year-round event sponsorship requests.",
    route: "/cbfaceyfoundationopportunity",
    pdf: `${P}cbfaceyfoundation-partnership-proposal.pdf`,
    filename: "Hack876 x C.B. Facey Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Digicel Foundation: Build Jamaica Grant",
    aka: "Digicel Build Jamaica grant digital literacy",
    category: "Foundations",
    readiness: "intro",
    focus: "J$1.5M to J$2.5M Build Jamaica grant for a four-month digital literacy programme ending with Hack876.",
    route: "/digicelbuildjamaicaopportunity",
    pdf: `${P}digicelbuildjamaica-partnership-proposal.pdf`,
    filename: "Hack876 x Digicel Foundation Build Jamaica Grants - Partnership Proposal.pdf",
  },
  {
    name: "CIBC Caribbean ComTrust Foundation",
    aka: "CIBC FirstCaribbean ComTrust Comtrust",
    category: "Foundations",
    readiness: "intro",
    focus: "A J$150,000 to J$300,000 donation toward a free youth STEM programme.",
    route: "/cibccomtrustopportunity",
    pdf: `${P}cibccomtrust-partnership-proposal.pdf`,
    filename: "Hack876 x CIBC Caribbean ComTrust Foundation - Partnership Proposal.pdf",
  },
  {
    name: "Barita Foundation",
    aka: "Barita Cornerstone",
    category: "Foundations",
    readiness: "ready",
    focus: "J$300,000 toward a free day of learning by building, with the option of naming the Learn track prize.",
    route: "/baritafoundationopportunity",
    pdf: `${P}barita-partnership-proposal.pdf`,
    filename: "Hack876 x Barita Foundation - Partnership Proposal.pdf",
  },

  /* ---------------------------------------------------------- Food & Beverage */
  {
    name: "Juici Patties",
    category: "Food & Beverage",
    readiness: "hold",
    focus: "Lunch for students in kind, with a monetary contribution as the alternative.",
    route: "/juicipattiesopportunity",
    pdf: `${P}juicipatties-partnership-proposal.pdf`,
    filename: "Hack876 x Juici Patties - Partnership Proposal.pdf",
  },
  {
    name: "Island Grill",
    category: "Food & Beverage",
    readiness: "hold",
    focus: "Lunch for students in kind, with a monetary contribution as the alternative.",
    route: "/islandgrillopportunity",
    pdf: `${P}islandgrill-partnership-proposal.pdf`,
    filename: "Hack876 x Island Grill - Partnership Proposal.pdf",
  },
  {
    name: "Wisynco Group Limited (WATA)",
    aka: "Wisynco WATA water",
    category: "Food & Beverage",
    readiness: "ready",
    focus: "WATA water for the day in kind, with a monetary contribution as the alternative.",
    route: "/wisyncoopportunity",
    pdf: `${P}wisynco-partnership-proposal.pdf`,
    filename: "Hack876 x Wisynco Group Limited (WATA) - Partnership Proposal.pdf",
  },
  {
    name: "Tru-Juice",
    aka: "Trade Winds Citrus TruJuice Tru Juice",
    category: "Food & Beverage",
    readiness: "ready",
    focus: "Juice with lunch in kind, with a monetary contribution as the alternative.",
    route: "/trujuiceopportunity",
    pdf: `${P}trujuice-partnership-proposal.pdf`,
    filename: "Hack876 x Tru-Juice (Trade Winds Citrus Limited) - Partnership Proposal.pdf",
  },

  /* ------------------------------------------ Technology & Developer Partners */
  {
    name: "Microsoft",
    category: "Technology & Developer Partners",
    readiness: "intro",
    focus: "Gold-level contribution toward the prizes and the student programme.",
    route: "/microsoftopportunity",
    pdf: `${P}microsoft-partnership-proposal.pdf`,
    filename: "Hack876 x Microsoft - Partnership Proposal.pdf",
  },
  {
    name: "Norus Technologies",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "Mentorship partner: developers, designers and product people on the day.",
    route: "/norusopportunity",
    pdf: `${P}norus-technologies-partnership-proposal.pdf`,
    filename: "Hack876 x Norus Technologies - Partnership Proposal.pdf",
  },
  {
    name: "Major League Hacking",
    aka: "MLH",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "Swag, organizer guidance and community support. Not a funding ask.",
    route: "/mlhopportunity",
    pdf: `${P}mlh-partnership-brief.pdf`,
    filename: "Hack 876 x MLH - Partnership Brief.pdf",
  },
  {
    name: "Obvious",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "Credits for teams, small prizes and people from the team.",
    route: "/obviousopportunity",
    pdf: `${P}obvious-partnership-brief.pdf`,
    filename: "Hack 876 x Obvious - Partnership Brief.pdf",
  },
  {
    name: "Figma for Education",
    aka: "Figma",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "Design tools for teams, within Figma's age and account rules.",
    route: "/figmaeducationopportunity",
    pdf: `${P}figmaeducation-partnership-brief.pdf`,
    filename: "Hack876 x Figma for Education - Partnership Brief.pdf",
  },
  {
    name: "Replit",
    category: "Technology & Developer Partners",
    readiness: "intro",
    focus: "Build credits for the event. Replit offers credits, not cash.",
    route: "/replitopportunity",
    pdf: `${P}replit-partnership-brief.pdf`,
    filename: "Hack876 x Replit - Partnership Brief.pdf",
  },
  {
    name: "Seeed Studio",
    category: "Technology & Developer Partners",
    readiness: "intro",
    focus: "Hardware kits for teams through its sponsorship programme.",
    route: "/seeedstudioopportunity",
    pdf: `${P}seeedstudio-partnership-brief.pdf`,
    filename: "Hack876 x Seeed Studio - Partnership Brief.pdf",
  },
  {
    name: "DigiView Security",
    aka: "Digi View Digiview",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "Bronze-level contribution, or suitable components in kind.",
    route: "/digiviewopportunity",
    pdf: `${P}digiview-partnership-proposal.pdf`,
    filename: "Hack876 x DigiView Security - Partnership Proposal.pdf",
  },
  {
    name: "Espressif Systems",
    aka: "Espressif ESP32",
    category: "Technology & Developer Partners",
    readiness: "ready",
    focus: "About 30 ESP32 boards or vouchers for teams that build hardware, with optional Best hardware build prize support.",
    route: "/espressifopportunity",
    pdf: `${P}espressif-partnership-proposal.pdf`,
    filename: "Hack876 x Espressif Systems - Partnership Proposal.pdf",
  },

  /* --------------------------------------- Community & Institutional Partners */
  {
    name: "The Atlanta Jamaican Association, Inc.",
    aka: "AJA diaspora",
    category: "Community & Institutional Partners",
    readiness: "ready",
    focus: "Bronze-level contribution toward a special award, plus volunteers.",
    route: "/atlantajamaicanassociationopportunity",
    pdf: `${P}atlantajamaicanassociation-partnership-proposal.pdf`,
    filename: "Hack876 x The Atlanta Jamaican Association, Inc. - Partnership Proposal.pdf",
  },
  {
    name: "Pickle & Chill",
    aka: "Pickle and Chill pickleball",
    category: "Community & Institutional Partners",
    readiness: "intro",
    focus: "A team-play experience in kind: court-time vouchers or an introductory lesson.",
    route: "/pickleandchillopportunity",
    pdf: `${P}pickleandchill-partnership-proposal.pdf`,
    filename: "Hack876 x Pickle & Chill - Partnership Proposal.pdf",
  },
];
