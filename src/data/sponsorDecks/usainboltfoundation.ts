import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "usainboltfoundation",
  kind: "prize",
  sponsor: "Usain Bolt Foundation",
  short: "Usain Bolt Foundation",
  article: "the",
  /* No distinct Foundation colour exists; avoid the personal wordmark gold. Hack876 green instead. */
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
    sub: "The Usain Bolt Foundation creates opportunities through education and cultural development. Hack876 gives secondary-school students one day to turn a bold idea into something real, and a Foundation award would tell them that idea counts.",
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
      {
        text: "In 2021 the Foundation donated 150 laptops, valued at US$40,000, to schools in rural Jamaica.",
        ref: 2,
      },
      {
        text: "In 2020 it joined Microsoft UK to bring computer equipment to seven schools in Trelawny.",
        ref: 3,
      },
      {
        text: "In 2025 it gave J$6.1 million in cash and kind to six rural high schools to help student-athletes prepare for ISSA Champs.",
        ref: 4,
      },
      {
        text: "In 2026 it gave just under J$10 million so that more than 100 students in western Jamaica could start secondary school.",
        ref: 5,
      },
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
    art: "Seedling",
  },

  paths: [
    {
      label: "Foundation",
      title: "A Foundation special award",
      points: [
        "Back the special awards, or one award",
        "A proposed Dare to Dream Award, if it fits",
        "Presented on the day by a Foundation representative, if the Foundation wishes",
        "Small, specific and easy to report on",
      ],
    },
    {
      label: "In-kind",
      title: "A device for a young builder",
      points: [
        "A laptop or tablet as an award prize, in the spirit of past device donations",
        "Recognition worded and approved by the Foundation",
      ],
    },
  ],

  ask: {
    tier: "special",
    fallback: "inkind",
    why: "A special award is a small, clear commitment that matches the Foundation's 'Dare to Dream' value. It can be one award or all of them, at the Foundation's choice.",
    recognition: "Special Awards Partner · Inaugural Hack876",
    award: {
      name: "Dare to Dream Award (proposed)",
      text: "A suggestion only: the Foundation could back the award for the boldest idea of the day, named for its 'Dare to Dream' value. Criteria would be agreed together, and the judging panel would decide.",
    },
    tracks: ["Culture", "Learn", "Wellbeing"],
    inkind: [
      "A laptop or tablet for the winning team of a Foundation award",
      "A Foundation representative to present the award",
      "A short recorded message to students from the Foundation, if it would like to share one",
    ],
  },

  roles: [
    { title: "Award presenter", text: "A Foundation representative presents its award at the close, if the Foundation wishes." },
    { title: "Award criteria", text: "The Foundation can help shape what 'Dare to Dream' means for the award; the judging panel makes the final call." },
    { title: "A message to students", text: "An open invitation for the Foundation to share a short message, recorded or in person, entirely at its discretion." },
    { title: "Judging support", text: "Board members or volunteers with an education or child-development background are welcome as guest judges, if they would like to take part." },
  ],

  groundRules: [
    "No marketing to students and no sign-ups on the day. Sponsors do not collect student contact details or data.",
    "No student photos or names in sponsor promotion without school and parent consent.",
    "The Foundation's name and any mention of it are used only as the Foundation approves. No athlete imagery or likeness appears in Hack876 materials.",
  ],

  future: [
    "A recurring Dare to Dream Award at every Hack876.",
    "Travel bursaries so students from the Foundation's partner high schools in western Jamaica can take part.",
    "A Hack876 edition in western Jamaica, shaped with the Foundation.",
    "Devices for award winners, building on the Foundation's laptop and computer donations.",
    "A junior edition for younger students, closer to the Foundation's primary-school focus.",
  ],

  questions: [
    "Our focus is children at basic and primary level. Why a secondary-school event?",
    "Most of our giving is in rural and western Jamaica. Why Kingston?",
    "How would the Foundation's name be used, and who approves it?",
    "Who receives the funds, and how would we see the result?",
    "When and where is it?",
    "How are students protected on consent, data and marketing?",
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
