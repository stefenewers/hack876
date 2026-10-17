import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "digiview",
  kind: "prize",
  sponsor: "DigiView Security",
  short: "DigiView",
  accent: "#a7144c",
  recipient: {
    name: "the marketing team at DigiView Security Limited",
    title: "",
    ref: 2,
  },
  preparedFor: "A private partnership proposal prepared for the marketing team at DigiView Security Limited.",
  hero: {
    headline: "Show students how technology works beyond the screen.",
    highlight: "beyond the screen",
    sub: "Most students meet technology as an app. DigiView's technicians meet it as cable, power, cameras and a network that has to work on site. Hack876 would like students to see that side too.",
  },
  brief: {
    fit: "DigiView installs the systems it sells, through its own trained technicians. That is the hands-on side of technology most students never see.",
    request: "A Bronze contribution toward the equipment and materials teams build with. Suitable components in kind are just as welcome.",
    enables: "Teams building physical projects get cables, connectors and parts to work with.",
    outcome: "Bronze recognition, and a written recap of what teams built, including any hardware projects.",
    next: "A reply from the marketing team on a contribution, components, or both.",
  },
  why: {
    headline: "Technology you can hold, wire and install.",
    points: [
      { text: "DigiView Security Limited was established in 2007 and supplies digital security products across Jamaica.", ref: 1 },
      { text: "It installs systems directly, through its own team of trained technicians.", ref: 1 },
      { text: "It describes itself as Jamaica's sole authorised supplier and distributor of TVT products.", ref: 1 },
      { text: "It has offices in St Andrew and St James, and a retail showroom on Beechwood Avenue in Kingston.", ref: 1 },
    ],
    tie: "Hack876 is open to hardware as well as software. Students who want to build something physical need to meet people who do it for a living.",
  },
  story: {
    kicker: "What DigiView already does",
    headline: "Electronics, networking and installation, done as a trade.",
    format: "evidence",
    items: [
      {
        label: "Since 2007",
        title: "A Jamaican technology supplier.",
        text: "Security camera systems, sold directly and to resellers, installers and security companies.",
        ref: 1,
      },
      {
        label: "Technicians",
        title: "People who install what they sell.",
        text: "Direct installations by trained technicians, with staff who help customers troubleshoot.",
        ref: 1,
      },
      {
        label: "Distribution",
        title: "The parts behind a system.",
        text: "TVT products, Western Digital Purple surveillance hard drives, Securelink wires and accessories, and 2GIG and KanTech products.",
        ref: 1,
      },
      {
        label: "Engineering",
        title: "A system built to move.",
        text: "Its Mobile Surveillance Command Centre carries eight on-board cameras and can stream up to 56 wired or wireless cameras back to the unit.",
        ref: 3,
      },
    ],
    takeaway: "Behind every one of these is a set of skills a student could learn: electronics, networking, power and working on site.",
  },
  pathsNote: {
    text: "DigiView lists Marketing@digiviewsecurity.com and sales@digiviewsecurity.com for enquiries.",
    ref: 2,
  },
  ask: {
    lead: "band",
    band: "bronze",
    uses: ["equipment", "programming", "materials"],
    why: "A Bronze contribution helps support the equipment and materials teams build with. Cables, connectors or other suitable components in kind are just as welcome.",
    recognition: "Bronze Partner · Inaugural Hack876",
    tracks: ["Resilience", "Create & Hustle", "Wildcard"],
    inkind: ["A supervised demonstration of how a camera system is wired and networked", "Cables, connectors or other suitable components"],
  },
  groundRules: [
    "Any demonstration is about how the equipment works. Students are not recorded or monitored, and DigiView is not being asked to secure the venue.",
    "No selling to students and no collection of student contact details by sponsors.",
  ],
  future: ["A hardware help desk for teams building physical projects."],
  closingLine: "We would love to explore the right first step with the DigiView team.",
  sources: [
    { id: 1, org: "DigiView Security", label: "About Us", href: "https://digiviewsecurity.com/about-us-2/" },
    { id: 2, org: "DigiView Security", label: "Contact Us", href: "https://digiviewsecurity.com/contact-us-2/" },
    { id: 3, org: "DigiView Security", label: "Mobile Surveillance Unit", href: "https://digiviewsecurity.com/mobile-surveillance-unit/" },
  ],
};

export default deck;
