import type { SponsorDeckData } from "./types";

/* Stationery & Office Supplies Ltd. (the Jamaican stationery and office furniture company). */
const deck: SponsorDeckData = {
  slug: "sos",
  kind: "prize",
  sponsor: "Stationery & Office Supplies Ltd.",
  short: "SOS",
  accent: "#ef3e33",

  recipient: { name: "the SOS team", title: "" },
  preparedFor: "A private partnership proposal prepared for the team at Stationery & Office Supplies Ltd.",

  hero: {
    headline: "Before the prototype, there is a first sketch.",
    highlight: "first sketch",
    sub: "Every Hack876 team starts the same way: a blank page, a marker and an argument about what to build. SOS already makes and sells the things that first hour runs on.",
  },

  why: {
    headline: "The tools of the first hour.",
    mission: { label: "SOS, About Us", quote: "At SOS, we work to help businesses realize their full potential.", ref: 1 },
    points: [
      { text: "SOS has supplied, furnished and installed workplaces across Jamaica and the wider Caribbean since 1965.", ref: 1 },
      {
        text: "In May 2018 it acquired the manufacturing assets of Book Empire Limited, and added its own locally made SEEK notebooks, quire books and writing pads to its range.",
        ref: 1,
      },
      { text: "The SEEK range on its site includes exercise books, composition books, notebooks and binder refills.", ref: 2 },
    ],
    tie: "Hack876 asks students to realise their potential in one day. It starts on paper.",
  },

  story: {
    kicker: "What SOS already does",
    headline: "A Jamaican company that makes what students write in.",
    format: "evidence",
    items: [
      { label: "Since 1965", title: "Sixty years of supplying workplaces.", text: "Stationery and office furniture for workplaces across Jamaica and the wider Caribbean.", ref: 1 },
      {
        label: "May 2018",
        title: "Manufacturing comes in-house.",
        text: "SOS acquired the manufacturing assets of Book Empire Limited and began making SEEK stationery locally.",
        ref: 1,
      },
      { label: "SEEK", title: "Made for school bags.", text: "Exercise books, composition books, notebooks and binder refills, listed under its own SEEK brand.", ref: 2 },
      { label: "Two showrooms", title: "Kingston and Montego Bay.", text: "Beechwood Avenue in Kingston 5 and Fairview Office Park in Montego Bay.", ref: 1 },
    ],
    takeaway: "A locally made notebook on every team table is a small thing that students would actually use.",
    art: "Blueprint",
  },

  paths: [
    {
      label: "In kind",
      title: "Materials on every team table",
      points: [
        "Notebooks and pens for students",
        "Planning materials for each team",
        "Supplies for the final pitches",
        "Sized to the event, nothing left over",
      ],
    },
    {
      label: "Alternative",
      title: "A discount, or a contribution",
      points: [
        "A discount on materials Hack876 buys",
        "Part of the quantity, if all of it is too much",
        "Or a monetary contribution at any level",
      ],
    },
  ],
  pathsNote: { text: "SOS takes enquiries through the contact form on its website, and by phone at its Kingston and Montego Bay showrooms.", ref: 3 },

  ask: {
    lead: "inkind",
    band: "bronze",
    uses: ["materials", "equipment", "programming"],
    restriction: "The venue supplies tables and chairs, so we are not asking for furniture.",
    why: "Ideas, teamwork and a pitch all need something to write on. Materials in kind would go straight into students' hands, and any part of the list helps.",
    recognition: "Student Materials Partner · Inaugural Hack876",
    title: "Student Materials Partner",
    tracks: ["Learn", "Business"],
    inkind: [
      "A notebook and pen for each student, about 80 in all",
      "Sticky notes, markers and chart paper for each team table",
      "Presentation supplies for the final pitches",
      "Or a discount on any of these",
    ],
  },

  roles: [
    { title: "Materials partner", text: "SOS materials on each team table from the first minute of the day." },
    { title: "Speaker", text: "A short talk on how a Jamaican product gets designed, made and sold, if someone at SOS would enjoy giving it." },
    { title: "Mentors", text: "Staff who can help teams think through a product, a customer or a price." },
    { title: "Volunteers", text: "Staff who help hand out materials and keep the day on time." },
  ],

  groundRules: [
    "No selling to students and no sign-ups on the day.",
    "No collection of student contact details by sponsors. Photos and names only with school and parent consent.",
    "We ask only for what the day will use, and report back on what was used.",
  ],

  future: [
    "Materials for every Hack876, sized each year to the number of teams.",
    "A SEEK notebook designed with a winning team.",
    "A planning kit that teachers could reuse in class.",
  ],

  questions: [
    "How many of each item would you need, and by when?",
    "Would SEEK products be the right fit, or something else in the range?",
    "When and where is it?",
    "How would SOS be recognised?",
    "How are students protected on consent, data and marketing?",
  ],

  closingLine: "We would love to explore the right first step with the SOS team.",

  sources: [
    { id: 1, org: "Stationery & Office Supplies Ltd.", label: "About Us", href: "https://www.sosjm.com/about-us" },
    { id: 2, org: "Stationery & Office Supplies Ltd.", label: "SEEK product range", href: "https://www.sosjm.com/seek" },
    { id: 3, org: "Stationery & Office Supplies Ltd.", label: "Contact Us", href: "https://www.sosjm.com/contactus" },
  ],
};

export default deck;
