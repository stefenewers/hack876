import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "usainboltfoundation",
  kind: "prize",
  sponsor: "Usain Bolt Foundation",
  short: "Usain Bolt Foundation",
  article: "the",
  accent: "#0a7a3e",
  recipient: {
    name: "Rev. Winsome Wilkins",
    title: "Chairman, Usain Bolt Foundation",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Rev. Winsome Wilkins, Chairman, Usain Bolt Foundation.",
  hero: {
    headline: "A day for young Jamaicans to dare to dream.",
    highlight: "dare to dream",
    sub: "The Usain Bolt Foundation creates opportunities through education and cultural development. Hack876 gives secondary-school students one day to turn a bold idea into something real.",
  },
  brief: {
    fit: "The Usain Bolt Foundation creates opportunities for children through education and cultural development, and has donated laptops and computers to schools.",
    request: "A Bronze contribution toward the existing Boldest Idea award and the student programme.",
    enables: "Helps support the award for the boldest idea of the day, and mentoring for every team.",
    outcome: "Bronze recognition and a written recap.",
    next: "A reply on whether the Foundation would consider this, and how it prefers to receive a request.",
  },
  why: {
    headline: "Education, culture and technology, for children.",
    mission: {
      label: "Usain Bolt Foundation, Our Mission",
      quote: "Creation of opportunities through education and cultural development for a positive change.",
      ref: 1,
    },
    points: [
      {
        text: "The Foundation's values include giving every child the opportunity to 'Dare to Dream', and its practices include embracing innovation and the use of technology.",
        ref: 1,
      },
      { text: "In 2021 the Foundation donated 150 laptops, valued at US$40,000, to schools in rural Jamaica.", ref: 2 },
      { text: "In 2020 it joined Microsoft UK to bring computer equipment to seven schools in Trelawny.", ref: 3 },
      { text: "In 2025 it gave J$6.1 million in cash and kind to six rural high schools to help student-athletes prepare for ISSA Champs.", ref: 4 },
      { text: "In 2026 it gave just under J$10 million so that more than 100 students in western Jamaica could start secondary school.", ref: 5 },
    ],
    tie: "Hack876 is a day when a young Jamaican's boldest idea gets taken seriously, often for the very first time.",
  },
  story: {
    kicker: "What the Usain Bolt Foundation already backs",
    headline: "Opportunity, one child at a time.",
    format: "milestones",
    items: [
      {
        label: "2013",
        title: "A hands-on skills workshop.",
        text: "A three-day photography workshop in Kingston for 25 students aged 13 to 17, with Samsung Camera.",
        ref: 6,
      },
      {
        label: "2020",
        title: "Computers for Trelawny.",
        text: "Computer equipment for seven Trelawny schools, in a joint effort with Microsoft UK.",
        ref: 3,
      },
      {
        label: "2021",
        title: "150 laptops.",
        text: "Laptops for schools in rural Jamaica, valued at US$40,000, at a time when many children were learning online.",
        ref: 2,
      },
      {
        label: "2025",
        title: "Backing high-school athletes.",
        text: "J$6.1 million in cash and kind for six rural high schools preparing for ISSA Champs.",
        ref: 4,
      },
      {
        label: "2026",
        title: "Into secondary school.",
        text: "Just under J$10 million for more than 100 students starting secondary school, including J$1 million to each of eight partner high schools.",
        ref: 5,
      },
    ],
    takeaway: "The Foundation already puts technology and opportunity in children's hands. Hack876 is one day where students show what they can build with them.",
  },
  ask: {
    lead: "band",
    band: "bronze",
    uses: ["awards", "programming"],
    why: "A contribution toward the Boldest Idea award is a small, clear commitment that matches the Foundation's 'Dare to Dream' value. The amount is the Foundation's choice.",
    recognition: "Bronze Partner · Inaugural Hack876",
    tracks: ["Culture", "Learn", "Wellbeing"],
    presents: "Boldest Idea",
  },
  groundRules: [
    "No marketing to students and no sign-ups on the day. Sponsors do not collect student contact details or data.",
    "No student photos or names in sponsor promotion without school and parent consent.",
    "The Foundation's name and any mention of it are used only as the Foundation approves. No athlete imagery or likeness appears in Hack876 materials.",
  ],
  future: [
    "Travel bursaries so students from the Foundation's partner high schools in western Jamaica can take part.",
    "A Hack876 edition in western Jamaica, shaped with the Foundation.",
    "A junior edition for younger students, closer to the Foundation's primary-school focus.",
  ],
  closingLine: "We would love to explore the right first step with Rev. Wilkins and the Usain Bolt Foundation team.",
  sources: [
    {
      id: 1,
      org: "Usain Bolt Foundation",
      label: "Foundation (mission, vision, values, practices and UBF Board)",
      href: "https://usainbolt.com/foundation/",
    },
    {
      id: 2,
      org: "Usain Bolt Foundation",
      label: "Usain Bolt Foundation donates laptops to Jamaican schools (March 17, 2021)",
      href: "https://usainbolt.com/foundations/usain-bolt-foundation-donates-laptops-to-jamaican-schools/",
    },
    {
      id: 3,
      org: "Usain Bolt Foundation",
      label: "Usain Bolt Foundation refurbishes school ground and hands over computer equipment to schools in Trelawny (January 28, 2020)",
      href: "https://usainbolt.com/foundations/usain-bolt-foundation-refurbishes-school-ground-and-hands-over-computer-equipment-to-schools-in-trelawny/",
    },
    {
      id: 4,
      org: "Usain Bolt Foundation",
      label: "Usain Bolt Foundation gives back millions to rural schools to prepare for ISSA Champs 2025 (March 18, 2025)",
      href: "https://usainbolt.com/foundations/usain-bolt-foundation-gives-back-millions-to-rural-schools-to-prepare-for-issa-champs-2025/",
    },
    {
      id: 5,
      org: "Usain Bolt Foundation",
      label: "UBF donates JA$10m for back to school expenses (September 25, 2026)",
      href: "https://usainbolt.com/foundations/ubf-donates-ja10m-for-back-to-school-expenses/",
    },
    {
      id: 6,
      org: "Usain Bolt Foundation",
      label: "Samsung Camera workshop in Jamaica (April 24, 2013)",
      href: "https://usainbolt.com/foundations/samsung-camera-workshop-in-jamaica/",
    },
  ],
};

export default deck;
