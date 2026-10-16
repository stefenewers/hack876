import type { SponsorDeckData } from "./types";

/*
 * An in-kind hardware request for an international recipient: students are
 * described by age, and no school is named. Espressif takes requests through
 * the Sponsorship Request form on its site ("Hardware sponsorship"), which
 * accepts this proposal as a PDF attachment. "Get Samples" only links to
 * retailers and is not a donation route.
 *
 * "Best hardware build" is an optional prize the organisers chose to offer.
 * It is not yet an award in event.ts.
 */
const deck: SponsorDeckData = {
  slug: "espressif",
  audience: "international",
  kind: "prize",
  sponsor: "Espressif Systems",
  short: "Espressif",
  accent: "#E8362D",
  recipient: { name: "the Espressif sponsorship team", title: "" },
  preparedFor: "A private partnership proposal prepared for the Espressif Systems sponsorship team.",
  hero: {
    headline: "Put ESP32 boards in students' hands.",
    highlight: "students' hands",
    sub: "Hack876 is a free one-day hackathon in Kingston, Jamaica, for high-school students aged 15 to 19, many at their first hackathon. Teams that want to build hardware could build it on ESP32.",
  },
  brief: {
    fit: "Espressif invites hardware and hackathon sponsorship requests through its own form, and says its vision is rooted in democratizing technology access.",
    fitRef: 1,
    request: "About 30 ESP32 development boards, or vouchers for them, for teams that want to build hardware, plus optional prize support for a Best hardware build prize.",
    enables: "Any team that chooses hardware can build a working connected device in one day, alongside teams building apps and websites. Nothing about the event depends on it.",
    outcome: "Espressif's logo on hack876.com and on stage, a thank-you in the programme, a feature on Instagram @hack876ja, and a recap with photos.",
    next: "We will send Espressif's sponsorship form with this proposal attached, and would welcome a reply on boards or vouchers.",
    logistics: [
      "About 30 boards, so every team that picks hardware has one, with spares.",
      "Boards or vouchers in Kingston by early February 2027, with time for customs. Hack876 would arrange clearance.",
      "Boards stay at a supervised hardware table on the day, with an adult on hand.",
    ],
  },
  why: {
    headline: "Technology access, for every builder.",
    mission: { label: "Espressif", quote: "Our vision and mission are rooted in democratizing technology access.", ref: 2 },
    points: [
      { text: "Espressif's sponsorship request form lists hardware sponsorship and hackathon or event sponsorship, and covers the Central America and Caribbean region.", ref: 1 },
      { text: "Its education programme offers documentation and open-source projects for every level, and lists student hackathons such as NUS Hack&Roll 2025 and SUTD What The Hack 2024.", ref: 3 },
      { text: "Espressif says its chips support over 100,000 GitHub projects and appear in more than 200 books in over 10 languages.", ref: 2 },
    ],
    tie: "Hack876 gives students in Kingston one day to build something real. For teams that pick hardware, an ESP32 is the natural place to start.",
  },
  story: {
    kicker: "What Espressif already backs",
    headline: "Boards where students learn by building.",
    format: "evidence",
    items: [
      { label: "Education", title: "ESP Education.", text: "Documentation, open-source projects and study plans for every level, with student competitions and hackathons.", ref: 3 },
      { label: "2018", title: "IoT bootcamps.", text: "ESP32-DevKitC boards for high-performing participants at iBHubs IoT bootcamps in India.", ref: 4 },
      { label: "2017", title: "A Shanghai hackathon.", text: "Every participant at the Pycom and Espressif hackathon received an ESP32-DevKitC.", ref: 5 },
      { label: "Scale", title: "1.5 billion+ chips.", text: "Espressif reports more than 1.5 billion IoT SoCs shipped worldwide.", ref: 2 },
    ],
    takeaway: "Espressif already puts boards in the hands of people learning to build. Hack876 would be one more room of them, in Kingston.",
  },
  pathsNote: { text: "Espressif takes sponsorship requests through a form on its website.", ref: 1 },
  ask: {
    lead: "inkind",
    bands: [],
    uses: ["equipment", "prizes"],
    why: "We are asking for hardware, not cash. Hack876 is free for students, and {sponsors} already support the day. About 30 ESP32 boards would let any team that wants to build hardware do it, without making hardware the point of the event.",
    recognition: "Hardware Partner · Inaugural Hack876",
    receives: [
      "Logo on hack876.com and on stage",
      "A thank-you in the event programme",
      "A feature on Instagram, @hack876ja",
      "A post-event recap with photos",
    ],
    tracks: ["Life", "Move", "Resilience", "Wildcard"],
    inkind: [
      "About 30 ESP32 development boards, such as the ESP32-S3-DevKitC-1, for teams that want to build hardware",
      "Or vouchers for the same boards, if that suits Espressif better",
      "Optional: prize support for a Best hardware build prize, decided by the judging panel",
    ],
  },
  groundRules: [
    "Low-voltage boards only, always under adult supervision. No mains wiring.",
    "No student data shared with Espressif. Photos of students only with school and parent consent.",
    "No marketing to students, and no sign-ups on the day.",
  ],
  future: [
    "ESP32 boards in school computer clubs that build all year.",
    "A short ESP32 workshop for students and teachers before the event.",
    "Write-ups of the best hardware builds, shared with consent.",
  ],
  closingLine: "We would love to see ESP32 boards on the tables at the first Hack876.",
  sources: [
    { id: 1, org: "Espressif Systems", label: "Sponsorship Request", href: "https://www.espressif.com/en/contact-us/sponsorship-request" },
    { id: 2, org: "Espressif Systems", label: "About Espressif", href: "https://www.espressif.com/en/company/about-espressif" },
    { id: 3, org: "Espressif Systems", label: "ESP Education", href: "https://www.espressif.com/en/ecosystem/education" },
    { id: 4, org: "Espressif Systems", label: "Espressif supports iBHubs IoT bootcamps (July 5, 2018)", href: "https://www.espressif.com/en/node/3090" },
    { id: 5, org: "Espressif Systems", label: "Pycom and Espressif hackathon in Shanghai (April 27, 2017)", href: "https://www.espressif.com/en/node/1633" },
  ],
};

export default deck;
