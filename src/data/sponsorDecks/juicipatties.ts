import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "juicipatties",
  kind: "prize",
  sponsor: "Juici Patties",
  short: "Juici",
  accent: "#EB2128",
  recipient: {
    name: "Kellon Williams",
    title: "Marketing Manager, Juici Patties",
    ref: 1,
  },
  preparedFor: "A private partnership proposal prepared for Kellon Williams, Marketing Manager, Juici Patties.",
  hero: {
    headline: "Feed the room where young Jamaicans build.",
    highlight: "Feed the room",
    sub: "Juici has backed young people in Jamaica since 2004. Hack876 is one day where students turn ideas into working builds, and a Juici lunch would keep them going.",
  },
  brief: {
    fit: "Juici Patties has backed young people in Jamaica since 2004, including through its Youth Leadership Workshop.",
    request: "Patties and coco bread for lunch, in kind, for the students and adults at Hack876.",
    enables: "Lunch for the whole room in the middle of a long build day.",
    outcome: "Food Partner recognition and a written recap.",
    next: "A reply from the marketing team on whether an in-kind lunch is possible. We will then confirm the headcount in writing.",
    logistics: [
      "For about {students} students, plus mentors, judges, teachers and volunteers. We will give a final headcount in writing before anything is ordered.",
      "Served at lunch, {lunch}, at {venue} in Kingston. The venue is confirmed.",
      "The date, {date}, is tentative until schools confirm it.",
      "Vegetable and plant-based patties for vegetarian and vegan students.",
    ],
  },
  why: {
    headline: "Community is already the Juici way.",
    mission: {
      label: "Kellon Williams, Marketing Manager, Juici Patties (2026)",
      quote: "This is what we live for, it is what we do every day. We believe in giving back to communities and giving back to Jamaica, and this is our way of doing that.",
      ref: 1,
    },
    points: [
      {
        text: "In 2025 the Juici Patties Youth Leadership Workshop & Volunteerism Programme, fully sponsored by Juici, hosted about 200 young people from high schools in parishes including Kingston and St Andrew.",
        ref: 2,
      },
      {
        text: "Since its start in 2004, the workshop and volunteer programme has focused on nurturing leadership skills and community engagement.",
        ref: 3,
      },
      {
        text: "Juici is a longstanding sponsor of youth football and netball in Central Jamaica, for teamwork, discipline and healthy competition.",
        ref: 4,
      },
      { text: "Juici began in a family shop in Rocky Point, Clarendon, and now has more than 60 locations across Jamaica.", ref: 2 },
    ],
    tie: "Hack876 is a room full of young Jamaicans building for their own communities, and a Juici lunch would be part of that day.",
  },
  story: {
    kicker: "What Juici already backs",
    headline: "More than twenty years of showing up for young people.",
    format: "initiatives",
    items: [
      {
        label: "Since 2004",
        title: "Youth Leadership Workshop",
        text: "A fully sponsored week of leadership, team building, volunteerism and conflict resolution for high-school students.",
        ref: 2,
      },
      {
        label: "2023",
        title: "A computer room, renovated",
        text: "The programme renovated the computer room at Osbourne Store Primary and Infant School, with children, teachers, teens, Juici staff and seniors working side by side.",
        ref: 3,
      },
      {
        label: "Central Jamaica",
        title: "Youth football and netball",
        text: "A longstanding sponsorship of youth sport, built on teamwork, discipline and healthy competition.",
        ref: 4,
      },
      {
        label: "2026",
        title: "Waterhouse Football Club",
        text: "A one-year sponsorship of the Jamaica Premier League club, in cash and in Juici products.",
        ref: 1,
      },
      {
        label: "From Rocky Point",
        title: "A Jamaican builder story",
        text: "From a family shop in Clarendon to more than 60 locations in Jamaica, and a presence in the United States, the United Kingdom and across the Caribbean.",
        ref: 2,
      },
    ],
    takeaway: "Juici already invests in young people well beyond the counter. Hack876 is a new kind of room for that same commitment, built around technology.",
  },
  pathsNote: {
    text: "Juici Patties' published contact is info@juicipatties.com, at Lot 1, Clarendon Park, May Pen.",
    ref: 5,
  },
  ask: {
    lead: "inkind",
    band: "bronze",
    uses: ["meals"],
    why: "Lunch is the one moment every student shares, and it is something Juici already does better than anyone. In kind is the simplest way to make it happen.",
    recognition: "Food Partner · Inaugural Hack876",
    tracks: ["Culture", "Business", "Life"],
    inkind: ["Beef and Chicken Patties for lunch", "Vegetable Patty and Plant Based Patty options for vegetarian and vegan students", "Coco bread"],
  },
  groundRules: [
    "No marketing or sampling campaigns aimed at students beyond the meal provided, and no sign-ups, coupons or promotions on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Dietary needs come first: we gather allergies and vegetarian needs in advance and label the food clearly.",
  ],
  future: [
    "A recurring Juici lunch at every Hack876.",
    "Introductions between Hack876 students and the Youth Leadership Workshop, since both serve high-schoolers.",
    "A community tech day, modelled on the Osbourne Store computer room renovation.",
  ],
  closingLine: "We would love to explore the right first step with Kellon and the Juici Patties team.",
  sources: [
    {
      id: 1,
      org: "The Jamaica Star",
      label: "Juici Patties boosts Waterhouse FC (March 6, 2026)",
      href: "https://jamaica-star.com/article/sports/20260306/juici-patties-boosts-waterhouse-fc",
    },
    {
      id: 2,
      org: "Jamaica Information Service",
      label: "Students Urged to Uphold Discipline (July 11, 2025)",
      href: "https://jis.gov.jm/students-urged-to-uphold-discipline/",
    },
    {
      id: 3,
      org: "Juici Patties",
      label: "Youth Leadership Workshop and Volunteer Programme",
      href: "https://juicipatties.com/youth-leadership-workshop-and-volunteer-programme/",
    },
    {
      id: 4,
      org: "Juici Patties",
      label: "Youth Football and Netball Sponsorship",
      href: "https://juicipatties.com/youth-football-and-netball-sponsorship/",
    },
    { id: 5, org: "Juici Patties", label: "Contact Us", href: "https://juicipatties.com/contact-us/" },
  ],
};

export default deck;
