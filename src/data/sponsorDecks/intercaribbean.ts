import type { SponsorDeckData } from "./types";

/*
 * In-kind travel only. No cash figure: interCaribbean's published sponsorship
 * priorities include youth and education, and the ask is flights or a voucher.
 */
const deck: SponsorDeckData = {
  slug: "intercaribbean",
  kind: "prize",
  sponsor: "interCaribbean Airways",
  short: "interCaribbean",
  accent: "#0099ff",
  recipient: {
    name: "the interCaribbean Airways team",
    title: "",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for the team at interCaribbean Airways.",
  hero: {
    headline: "Connect Caribbean talent across islands.",
    highlight: "across islands",
    sub: "A free one-day hackathon in Kingston for secondary students, ages 15 to 19. Campion College and Hillel Academy are taking part. About 120 people in total. Many will be at their first hackathon.",
  },
  brief: {
    fit: "Youth engagement and education is one of the sponsorships interCaribbean reviews, alongside regional events that strengthen Caribbean connections.",
    fitRef: 1,
    request: "Return flights on the interCaribbean network for one or two Caribbean-based mentors or judges, or a travel voucher as the grand prize. Either is welcome.",
    enables: "A Caribbean-based mentor or judge can reach Kingston for the day, or the winning team is awarded travel with interCaribbean.",
    outcome: "Logo on hack876.com and on stage, a thank-you in the programme and on Instagram @hack876ja, and a post-event recap with photos.",
    next: "A reply on which option suits interCaribbean. Either is welcome, and we are not asking for both.",
    logistics: [
      "One option only: one or two return flights inside the interCaribbean network, for Caribbean-based mentors or judges already involved with Hack876.",
      "Or a travel voucher for the winning team, awarded at the event.",
      "Working date {date}, {doors} to {wrap}, at {venue}. The date is tentative until schools confirm it. About 120 people in total.",
    ],
  },
  why: {
    headline: "Youth, education, and a network that already joins the islands.",
    points: [
      {
        text: "interCaribbean reviews sponsorships that contribute to youth engagement and education, and to regional events that strengthen Caribbean connections.",
        ref: 1,
      },
      {
        text: "Its route map is built for island-to-island travel and includes Kingston, alongside Providenciales, Barbados, Tortola, San Juan and Port of Spain.",
        ref: 2,
      },
      {
        text: "In December 2024 it partnered with the SVG Sailing Association so young sailors could travel to regattas, training and competitions across the Caribbean.",
        ref: 3,
      },
    ],
    tie: "Hack876 is a free day of building for Caribbean secondary students. Travel is how interCaribbean can connect that talent across islands.",
  },
  story: {
    kicker: "What interCaribbean already does",
    headline: "Education, youth, and travel between islands.",
    format: "evidence",
    items: [
      {
        label: "Sponsorships",
        title: "Youth and education.",
        text: "Published priorities include youth engagement and education, and regional events that strengthen Caribbean connections.",
        ref: 1,
      },
      {
        label: "Regional events",
        title: "Caribbean connections.",
        text: "The sponsorships it reviews include regional events that strengthen Caribbean connections.",
        ref: 1,
      },
      {
        label: "Kingston",
        title: "On the route map.",
        text: "The published route map includes Kingston, with Providenciales, Barbados, Tortola, San Juan and Port of Spain.",
        ref: 2,
      },
      {
        label: "December 2024",
        title: "Travel for young sailors.",
        text: "A partnership with the SVG Sailing Association, so youth can reach regattas and training across the region.",
        ref: 3,
      },
    ],
    takeaway: "interCaribbean already uses travel and education to connect young people across the Caribbean. Hack876 is a one-day version of that idea.",
  },
  pathsNote: {
    text: "Sponsorship requests go to marketing@interCaribbean.com at least 60 days before the event. A request does not guarantee sponsorship.",
    ref: 1,
  },
  ask: {
    lead: "inkind",
    bands: [],
    uses: ["programming", "prizes"],
    title: "Travel Partner",
    restriction:
      "Hack876 is volunteer-run and is not a registered charity. This is a sponsorship request for travel in kind. It does not ask for a financial contribution.",
    why: "Connecting Caribbean talent across islands is the natural fit. A flight brings someone to Kingston, or a voucher lets the winning team travel. Either is welcome.",
    recognition: "In-kind Travel Partner · Inaugural Hack876",
    tracks: ["Learn", "Culture", "Move"],
    inkind: [
      "Either option is welcome. We are asking for one of them, not both.",
      "Return flights within the interCaribbean network for one or two Caribbean-based mentors or judges.",
      "A travel voucher as the grand prize for the winning team.",
    ],
  },
  groundRules: [
    "Hack876 is free for every student who takes part.",
    "No student data is shared with sponsors. Photos and names are used only with school and parent consent.",
    "The judging panel decides every award. Sponsorship does not buy influence over judging.",
  ],
  future: [
    "Travel in kind for a later Hack876, if the first one goes well.",
    "A travel voucher again for a winning team in a later year.",
    "Keeping the link to the youth and education programmes interCaribbean already supports.",
  ],
  closingLine: "We would love to explore the right first step with the interCaribbean Airways team.",
  sources: [
    {
      id: 1,
      org: "interCaribbean Airways",
      label: "Sponsorship Requests",
      href: "https://www.intercaribbean.com/sponsorship-requests.html",
    },
    {
      id: 2,
      org: "interCaribbean Airways",
      label: "Route map",
      href: "https://www.intercaribbean.com/travel-tools/route-map.html",
    },
    {
      id: 3,
      org: "interCaribbean Airways",
      label: "SVG Sailing Association partnership (December 2024)",
      href: "https://www.intercaribbean.com/media/intercaribbean-news/svg-sailing-association-and-intercaribbean-announce-partnership.html",
    },
  ],
};

export default deck;
