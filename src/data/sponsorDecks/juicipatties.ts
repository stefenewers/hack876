import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "juicipatties",
  kind: "prize",
  sponsor: "Juici Patties",
  short: "Juici",
  accent: "#EB2128",

  recipient: { name: "Kellon Williams", title: "Marketing Manager, Juici Patties", ref: 1 },
  preparedFor: "A private partnership proposal prepared for Kellon Williams, Marketing Manager, Juici Patties.",

  hero: {
    headline: "Feed the room where young Jamaicans build.",
    highlight: "Feed the room",
    sub: "Juici has backed young people in Jamaica since 2004. Hack876 is one day where students turn ideas into working builds, and a Juici lunch would keep them going.",
  },

  why: {
    headline: "Community is already the Juici way.",
    mission: {
      label: "Kellon Williams, Marketing Manager, Juici Patties (2026)",
      quote:
        "This is what we live for, it is what we do every day. We believe in giving back to communities and giving back to Jamaica, and this is our way of doing that.",
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
      {
        text: "Juici began in a family shop in Rocky Point, Clarendon, and now has more than 60 locations across Jamaica.",
        ref: 2,
      },
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
    art: "Seedling",
  },

  paths: [
    {
      label: "Marketing",
      title: "A Juici lunch at Hack876",
      points: [
        "Lunch for students, judges, mentors and volunteers",
        "Vegetarian and vegan patties on the table",
        "Recognised as the food partner on the day",
        "Simple to plan once the date and venue are set",
      ],
    },
    {
      label: "People",
      title: "The Juici team in the room",
      points: [
        "Marketing staff as mentors for Business track pitches",
        "A short talk on growing a Jamaican brand from one shop",
        "Staff volunteers, as in the Youth Leadership Workshop",
      ],
    },
  ],
  pathsNote: {
    text: "Juici Patties' published contact is info@juicipatties.com, at Lot 1, Clarendon Park, May Pen.",
    ref: 5,
  },

  ask: {
    tier: "food",
    fallback: "special",
    why: "Lunch is the one moment every student shares, and it is something Juici already does better than anyone. In kind is the simplest way to make it happen.",
    recognition: "Food & Student Experience Partner · Inaugural Hack876",
    award: {
      name: "Juici Community Award (proposed)",
      text: "A suggestion only: an award for the build that would do the most for a Jamaican community, with criteria agreed together. The judging panel would make the final call.",
    },
    tracks: ["Culture", "Business", "Life"],
    inkind: [
      "Beef and Chicken Patties for lunch",
      "Vegetable Patty and Plant Based Patty options for vegetarian and vegan students",
      "Coco bread",
      "Juici team members to help serve on the day",
    ],
  },

  roles: [
    { title: "Lunch partner", text: "Juici provides the midday meal, and the team helps it run smoothly." },
    { title: "Mentors", text: "Marketing staff help Business track teams think about customers and brand, without building the project for them." },
    { title: "Speaker", text: "A Juici leader on building a Jamaican brand from a single shop in Clarendon." },
    { title: "Award presenters", text: "If a Juici award goes ahead, the Juici team presents it on stage at the close." },
    { title: "Volunteers", text: "Staff who help with check-in, meals and keeping the day on time." },
  ],

  groundRules: [
    "No marketing or sampling campaigns aimed at students beyond the meal provided, and no sign-ups, coupons or promotions on the day.",
    "No collection of student contact details or data by sponsors. Photos and names only with school and parent consent.",
    "Dietary needs come first: we gather allergies and vegetarian needs in advance and label the food clearly.",
  ],

  future: [
    "A recurring Juici lunch at every Hack876.",
    "Introductions between Hack876 students and the Youth Leadership Workshop, since both serve high-schoolers.",
    "A community tech day, modelled on the Osbourne Store computer room renovation.",
    "Juici marketing mentors on the Business track each year.",
    "A Juici Community Award, if it works well the first time.",
  ],

  questions: [
    "How many people would we be feeding, and where?",
    "When is it, and when would you need a firm food order?",
    "How are allergies and dietary needs handled?",
    "What recognition would Juici receive?",
    "Can our contribution be fully in kind?",
    "How are students protected on consent, data and marketing?",
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
    {
      id: 5,
      org: "Juici Patties",
      label: "Contact Us",
      href: "https://juicipatties.com/contact-us/",
    },
  ],
};

export default deck;
