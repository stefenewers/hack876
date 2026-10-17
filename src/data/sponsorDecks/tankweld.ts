import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "tankweld",
  kind: "full",
  sponsor: "Tank-Weld",
  short: "Tank-Weld",
  accent: "#114695",
  recipient: {
    name: "the Tank-Weld Group team",
    title: "",
    ref: 2,
  },
  preparedFor: "A private partnership proposal prepared for the team at the Tank-Weld Group.",
  hero: {
    headline: "Jamaica needs more young people who know they can build.",
    highlight: "they can build",
    sub: "Tank-Weld began as a steel fabrication company and has spent years putting homework and computer centres into communities. Hack876 gives students one day to find out that building things is something they can do.",
  },
  brief: {
    fit: "Tank-Weld began as a steel fabrication company and has built computer and homework centres in Jamaican communities.",
    request: "A Silver contribution toward the equipment and materials teams build with.",
    enables: "Teams can build something physical, not only something on a screen.",
    outcome: "Silver recognition, and a written recap of what teams built, including any physical prototypes.",
    next: "A reply on whether Tank-Weld would consider a contribution this year, at Silver or any other level.",
  },
  why: {
    headline: "A company that builds, in a room full of students learning to.",
    mission: { label: "Tank-Weld, Giving Back", quote: "Tank-Weld has a very strong sense of community.", ref: 1 },
    points: [
      {
        text: "Tank-Weld was formed in 1970 as a steel fabrication company. Today the group also runs heavy haulage, equipment and piling businesses, and operates at the Rio Bueno port.",
        ref: 2,
      },
      {
        text: "Over the years it has built computer centres and homework centres, basketball courts and soccer stadiums, and repaired schools and churches.",
        ref: 1,
      },
      { text: "Since 2006 its scholarship programme has grown to more than 70 scholarships a year.", ref: 1 },
    ],
    tie: "Hack876 is not only about apps. Teams can build hardware, physical prototypes and tools for real industries, and they need to meet people who make things.",
  },
  story: {
    kicker: "What Tank-Weld already backs",
    headline: "Steel, and somewhere safe to do homework.",
    format: "milestones",
    items: [
      {
        label: "1970",
        title: "Formed as a steel fabrication company.",
        text: "It has since grown into a group that distributes building materials and manufactures several of its own steel products.",
        ref: 2,
      },
      {
        label: "2006",
        title: "A scholarship programme begins.",
        text: "Started to encourage education, it now awards more than 70 scholarships a year.",
        ref: 1,
      },
      {
        label: "2007",
        title: "The Fiwi Centre opens in Waterhouse.",
        text: "A computer and homework centre set up to give children in the community a safe place for homework help and basic computer classes.",
        ref: 3,
      },
      {
        label: "2024",
        title: "The centre is re-equipped.",
        text: "The JMMB Joan Duncan Foundation reports donating 15 computers to the Fi-Wi Homework Centre, which it describes as operated with the support of Tank-Weld Metals.",
        ref: 4,
      },
    ],
    takeaway: "Tank-Weld has already put computers in front of children who did not have them. Hack876 is what a student can do with one a few years later.",
  },
  pathsNote: {
    text: "Tank-Weld lists info@tankweld.com for enquiries.",
    ref: 2,
  },
  ask: {
    lead: "band",
    band: "silver",
    uses: ["equipment", "materials", "programming", "logistics"],
    why: "Silver helps support the equipment and materials that let teams build something physical, not only something on a screen. If a different level suits Tank-Weld better, any of them is welcome.",
    recognition: "Silver Partner · Inaugural Hack876",
    tracks: ["Everyday Jamaica", "Resilience", "Create & Hustle"],
    inkind: ["Safe prototyping materials", "A careers talk", "Help with moving equipment"],
  },
  groundRules: [
    "No welding, cutting or other hazardous fabrication at the event. Prototypes use safe, light materials only.",
    "No collection of student contact details by sponsors. Photos and names only with school and parent consent.",
  ],
  future: ["A build challenge drawn from a real engineering or logistics problem."],
  closingLine: "We would love to explore the right first step with the Tank-Weld team.",
  sources: [
    { id: 1, org: "Tank-Weld", label: "Giving Back", href: "https://www.tankweld.com/giving-back/" },
    { id: 2, org: "Tank-Weld", label: "About", href: "https://www.tankweld.com/about/" },
    {
      id: 3,
      org: "Tank-Weld",
      label: "Fiwi Centre Computer/Homework Facility",
      href: "https://www.tankweld.com/fiwi-centre-computer-homework-facility/",
    },
    {
      id: 4,
      org: "JMMB Group",
      label: "JMMB Joan Duncan Foundation donates computers to homework centre for at-risk children (June 6, 2024)",
      href: "https://www.jmmb.com/jmmb-joan-duncan-foundation-donates-computers-homework-centre-risk-children",
    },
  ],
};

export default deck;
