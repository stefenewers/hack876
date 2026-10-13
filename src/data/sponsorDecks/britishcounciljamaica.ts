import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "britishcounciljamaica",
  kind: "prize",
  sponsor: "British Council Jamaica",
  short: "British Council",
  article: "the",
  accent: "#23085A",
  recipient: {
    name: "Damion Campbell",
    title: "Country Director, British Council",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Damion Campbell, Country Director, British Council.",
  hero: {
    headline: "Every classroom needs a day to build.",
    highlight: "build",
    sub: "The British Council is helping Jamaican teachers bring creativity and computational thinking into class. Hack876 gives secondary-school students one day to show what that looks like in their own hands.",
  },
  brief: {
    fit: "The British Council's STEAM Education in Schools programme trains Jamaican teachers and names Codefest and STEAM Challenges as ways to engage students.",
    request: "Share the Hack876 call for applications with teachers and schools in the STEAM programme, and let us use the programme's challenge resources. No funding is requested.",
    enables: "Students whose teachers have had STEAM training hear about Hack876, and the challenge draws on material that already works in Jamaican classrooms.",
    outcome: "Programme schools get a place to use their training, and the British Council receives a written recap of which schools took part and what they built.",
    next: "A reply on whether the call can be shared, and who should receive it.",
    logistics: [
      "The call: one short message we draft, for the British Council to forward when applications open.",
      "Resources: any Codefest or STEAM Challenge material the British Council is able to share.",
      "No funding and no staff time on the day are requested.",
    ],
  },
  why: {
    headline: "STEAM in Jamaican classrooms, and a day to use it.",
    mission: {
      label: "The British Council's purpose",
      quote: "We support peace and prosperity by building connections, understanding and trust between people in the UK and countries worldwide.",
      ref: 2,
    },
    points: [
      {
        text: "STEAM Education in Schools Jamaica runs from November 2024 to October 2027 and aims to train 10,770 teachers and benefit 328,500 students.",
        ref: 3,
      },
      { text: "The programme names Codefest and STEAM Challenges as ways to actively engage students.", ref: 3 },
      { text: "It deliberately builds in creativity, the 'A' in STEAM, to give students more than one way into learning.", ref: 3 },
      {
        text: "In January 2026 the British Council partnered with the National Education Trust on the STEAM in Action Expo, where students showcased projects from robotics to climate solutions.",
        ref: 1,
      },
      {
        text: "Damion Campbell has said the STEAM partnership lets the Council \"connect more young people in the UK with Jamaica to share their experiences, expertise\".",
        ref: 4,
      },
    ],
    tie: "Hack876 is a day where STEAM stops being a subject and becomes something young people make together.",
  },
  story: {
    kicker: "The road so far",
    headline: "A STEAM partnership, built step by step.",
    format: "milestones",
    items: [
      { label: "2020", text: "Cooperation between the UK and Jamaica on STEAM education begins to develop.", ref: 5 },
      { label: "2022", text: "The British Council commissions the National STEAM Education Report with NET and the UK-based STEMunity.", ref: 6 },
      { label: "2023", text: "Jamaica and the British Council sign a five-year partnership on STEAM education.", ref: 4 },
      {
        label: "2025",
        text: "A GB£1.7 million STEAM Education in Schools programme launches for more than 800 primary and secondary institutions.",
        ref: 7,
      },
      { label: "2026", text: "Students show their projects at the STEAM in Action Expo, held in partnership with the British Council.", ref: 1 },
      { label: "2027", text: "The programme is set to run to October 2027.", ref: 3 },
    ],
    takeaway: "The programme was built to reach classrooms. Hack876 is one more place students can show what reached them.",
  },
  ask: {
    lead: "inkind",
    bands: [],
    uses: ["programming"],
    why: "The British Council works through schools and teachers, so that is our ask: help the right schools hear about Hack876. No funding is requested.",
    recognition: "In-kind Partner · Inaugural Hack876",
    tracks: ["Learn", "Culture", "Resilience"],
    inkind: ["Sharing the call for applications with programme teachers and schools", "Codefest or STEAM Challenge resources we can draw on"],
  },
  groundRules: [
    "Many participants are minors. Adults work with teams in open, supervised spaces, never one to one, and follow our safeguarding plan.",
    "We do not share student contact details or personal data with partners, and we never ask partners to collect any.",
    "No marketing to students. Recognition lives on our materials, not in students' inboxes.",
  ],
  future: [
    "An annual showcase for students taught by STEAM programme teachers.",
    "A Codefest-style round in schools that feeds into Hack876.",
    "UK teams or practitioners joining remotely, building the people-to-people links the partnership talks about.",
    "Bringing standout Hack876 builds to National STEAM Education Week.",
  ],
  closingLine: "We would love to explore the right first step with Damion and the British Council team in Jamaica.",
  sources: [
    {
      id: 1,
      org: "Jamaica Information Service",
      label: "NET Executive Director Urges Students to Embrace Critical Thinking (January 30, 2026)",
      href: "https://jis.gov.jm/net-executive-director-urges-students-to-embrace-critical-thinking/",
    },
    { id: 2, org: "British Council", label: "British Council (homepage, purpose statement)", href: "https://www.britishcouncil.org/" },
    {
      id: 3,
      org: "British Council",
      label: "STEAM Education in Schools Jamaica",
      href: "https://caribbean.britishcouncil.org/programmes/education/STEAM-Jamaica",
    },
    {
      id: 4,
      org: "Jamaica Information Service",
      label: "Jamaica and British Council Sign Five-Year Partnership on STEAM Education (May 22, 2023)",
      href: "https://jis.gov.jm/jamaica-and-british-council-sign-five-year-partnership-on-steam-education/",
    },
    {
      id: 5,
      org: "Our Today",
      label: "National Education Trust partners with British Council to bolster STEAM education (May 20, 2023)",
      href: "https://our.today/national-education-trust-partners-with-british-council-to-bolster-steam-education/",
    },
    {
      id: 6,
      org: "Jamaica Information Service",
      label: "Gov't Strengthening STEAM Education",
      href: "https://jis.gov.jm/govt-strengthening-steam-education/",
    },
    {
      id: 7,
      org: "Ministry of Education, Skills, Youth and Information",
      label: "British Council Launches GB£1.7M Three-Year STEAM Education in Schools Programme (March 21, 2025)",
      href: "https://moey.gov.jm/british-council-launches-gb1-7m-three-year-steam-education-in-schools-programme/",
    },
  ],
};

export default deck;
