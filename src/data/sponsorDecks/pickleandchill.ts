import type { SponsorDeckData } from "./types";

/* Deliberately short. One idea: a team-play experience. */
const deck: SponsorDeckData = {
  slug: "pickleandchill",
  kind: "prize",
  sponsor: "Pickle & Chill",
  short: "Pickle & Chill",
  accent: "#0e8c3b",

  recipient: { name: "the Pickle & Chill team", title: "", ref: 1 },
  preparedFor: "A private partnership proposal prepared for the team at Pickle & Chill.",

  hero: {
    headline: "Great teams build together. They should get to play together, too.",
    highlight: "play together",
    sub: "Hack876 teams spend one long day solving a problem side by side. A game together afterwards would be a good way to mark it.",
  },

  why: {
    headline: "A place where teams already come to play.",
    points: [
      { text: "Pickle & Chill is a pickleball club in Kingston that advertises classes for all ages, including kids and teens.", ref: 1 },
      { text: "It recommends First Timer Clinics for people who have never played.", ref: 2 },
      { text: "The club is at 13 East Kings House Road, in the Barbican Football Club Complex.", ref: 2 },
    ],
    tie: "Most Hack876 students will be working with their team for the first time. Something to do together afterwards helps that last.",
  },

  story: {
    kicker: "What Pickle & Chill already does",
    headline: "Open to beginners, and used to hosting a crowd.",
    format: "evidence",
    items: [
      { label: "Young players", title: "Classes for kids and teens.", text: "The club advertises pickleball classes for all ages.", ref: 1 },
      { label: "Beginners", title: "First Timer Clinics.", text: "A starting point for anyone who has never picked up a paddle. Paddles can be rented at the club.", ref: 2 },
      { label: "Regular play", title: "Clinics, leagues and tournaments.", text: "Monthly training clinics, with league play and club tournaments through the year.", ref: 1 },
      {
        label: "July 18, 2026",
        title: "The venue for a charity tournament.",
        text: "The Rotary Clubs of Kingston and St. Andrew held their charity pickleball tournament at Pickle & Chill. The clubs organised it and raised the funds.",
        ref: 3,
      },
    ],
    takeaway: "Students who have never played would be welcome there, which is the whole point.",
    art: "none",
  },

  paths: [
    {
      label: "In kind",
      title: "A team-play experience",
      points: ["Court-time vouchers for a team", "An introductory lesson for first-time players", "Used later, at a time that suits the club"],
    },
  ],
  pathsNote: { text: "Pickle & Chill lists pickleandchilljamaica@gmail.com for enquiries.", ref: 1 },

  ask: {
    lead: "inkind",
    band: "bronze",
    uses: ["programming", "awards"],
    restriction:
      "An experience could add to an existing award if we agree it together. It would not replace a published prize or create a new award. Hack876 takes place at its own venue, and would not arrange transport or an off-site trip.",
    why: "A voucher a team can use together is a simple thing to give and a good memory to take home. Any part of this helps.",
    recognition: "In-kind Partner · Inaugural Hack876",
    tracks: ["Wellbeing", "Move"],
    inkind: ["Court-time vouchers for a team of up to four", "An introductory lesson for a team", "Or a monetary contribution at any level"],
  },

  roles: [
    { title: "Experience partner", text: "Vouchers handed to a team at the close of the day." },
    { title: "Presenter", text: "Someone from Pickle & Chill hands over the vouchers on stage, if they would like to." },
    { title: "Break-time energy", text: "A five-minute stretch or warm-up between build sessions, led by a coach." },
  ],

  groundRules: [
    "Vouchers go to students through their schools, and are used with a parent or guardian's knowledge.",
    "No collection of student contact details by sponsors, and no sign-ups on the day.",
  ],

  future: ["A team-play experience at every Hack876.", "A social game for mentors and volunteers.", "A student clinic day arranged with schools."],

  questions: [
    "How many vouchers would be useful?",
    "Which award would the experience be added to?",
    "When and where is Hack876?",
    "How would Pickle & Chill be recognised?",
  ],

  closingLine: "We would love to explore the right first step with the Pickle & Chill team.",

  sources: [
    { id: 1, org: "Pickle & Chill", label: "Home", href: "https://pickleandchilljamaica.com/" },
    { id: 2, org: "Pickle & Chill", label: "Frequently Asked Questions", href: "https://pickleandchilljamaica.com/faq/" },
    {
      id: 3,
      org: "Rotary Club of St. Andrew",
      label: "Rotary Clubs of Kingston & St. Andrew score big for community through successful charity pickleball tournament",
      href: "https://rotaryclubofstandrew.org/Stories/rotary-clubs-of-kingston-amp-st.-andrew-score-big-for-community-through-successful-charity-pickleball-tournament",
    },
  ],
};

export default deck;
