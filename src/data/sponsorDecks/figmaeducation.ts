import type { SponsorDeckData } from "./types";

const deck: SponsorDeckData = {
  slug: "figmaeducation",
  kind: "tool",
  sponsor: "Figma for Education",
  short: "Figma",
  accent: "#A259FF",
  recipient: {
    name: "Figma for Education team",
    title: "Figma, Inc.",
    ref: 1,
  },
  preparedFor: "A private partnership brief prepared for the Figma for Education team.",
  hero: {
    headline: "Build the thing itself.",
    highlight: "the thing itself",
    sub: "Hack876 gives Jamaican high-school students one day to turn an idea into something real. We would love Figma to help them make it look and feel right.",
  },
  brief: {
    fit: "Figma for Education offers its design tools free to eligible students and educators, with age and region limits for high-school use.",
    request: "Advice on the right access route for Jamaican high-school students, and any teaching resources Figma can share. No accounts are requested.",
    enables: "Teams that want to design and prototype in Figma can do so properly, within Figma's own age and region rules. Other teams use other tools.",
    outcome: "Design Tools Partner recognition and a written recap.",
    next: "A reply from the Education team on which access route, if any, applies in Jamaica.",
  },
  why: {
    headline: "Making is how students learn.",
    mission: {
      label: "David Curran, Education Learning Specialist, Figma",
      quote: "There's a big difference between having an idea and making it real, and in that space is where learning happens.",
      ref: 2,
    },
    points: [
      {
        text: "In 2020 Figma for Education opened up to bootcamps, school-sponsored hackathons and other kinds of classrooms, as part of making design accessible to everyone.",
        ref: 3,
      },
      {
        text: "Figma says it has always made an effort to show up at hackathons, and invites organisers to email education@figma.com about ways it can help.",
        ref: 1,
      },
      { text: "Where Figma for Education is available, verified high-school students and educators get the Professional plan free.", ref: 4 },
      {
        text: "Figma's free 10-part curriculum for middle and high school teachers sits alongside prompts like \"Design an app to solve a problem in your community.\"",
        ref: 2,
      },
    ],
    tie: "That prompt is a Hack876 brief. Our students spend the day doing exactly that, for their own communities in Kingston.",
  },
  story: {
    kicker: "What Figma already does for students",
    headline: "Hackathons are classrooms too.",
    format: "evidence",
    items: [
      {
        label: "2020",
        title: "Open to school hackathons.",
        text: "Figma for Education grew beyond degree programmes to include bootcamps and school-sponsored hackathons.",
        ref: 3,
      },
      {
        label: "K-12",
        title: "Free Enterprise for districts.",
        text: "In 2023 Figma opened free access to all US K-12 districts, with the Enterprise tier, and expanded to Google schools in Japan.",
        ref: 5,
      },
      {
        label: "Beyond the US",
        title: "Always looking to expand.",
        text: "Outside its listed regions, Figma asks schools that want to use it with students to get in touch at education@figma.com.",
        ref: 6,
      },
      {
        label: "2026",
        title: "Product-based learning.",
        text: "Figma's education team champions students building the thing itself, whether it's an app, a prototype or an interactive experience.",
        ref: 2,
      },
    ],
    takeaway: "Figma already backs students who learn by making. Hack876 is one more classroom for that, in Kingston.",
  },
  pathsNote: {
    text: "Outside its listed regions, Figma may only be used by students above the age of consent in their jurisdiction, and Figma asks schools to reach out at education@figma.com.",
    ref: 6,
  },
  ask: {
    lead: "inkind",
    bands: [],
    uses: ["awards"],
    why: "We are not asking for accounts. We are asking for Figma's advice on how Jamaican students can use it properly.",
    recognition: "Design Tools Partner · Inaugural Hack876",
    tracks: ["Create & Hustle", "Learn", "Everyday Jamaica"],
    inkind: ["Guidance on access for Jamaican high-school students", "Teaching resources from Figma's high-school curriculum"],
    presents: "Best Design",
  },
  tool: {
    headline: "Real design tools for the teams that want them.",
    what: "Figma for design and prototyping on the day, for teams that want it. Nothing about the event depends on it, and we will not promise any student an account.",
    structures: [
      "School route: a participating school contacts Figma for Education and signs its terms for schools, if Figma offers that in Jamaica.",
      "Self-serve route: only students who are old enough to consent on their own and have a school-issued email apply for the free Education plan.",
      "Whatever Figma recommends instead. If no route fits, Figma stays optional and teams design with other tools.",
      "No AI features. Figma Make, the agent in Figma Design and Figma Sites are not available to high-school Education users, and teams do not need them.",
    ],
    ageNote: "Figma's Help Center says high-school students must be old enough to consent to the services by themselves, not by a parent or guardian, must apply with a school-issued email, and that Figma for Education is only available in select regions. Figma's Terms require users to be of legal age in their jurisdiction, and 18 or older for Figma AI. Hack876 treats every student under 18 as a minor who needs a parent or guardian's consent. We have not confirmed that Figma for Education is available in Jamaica, Figma has not approved access for our students, and we will follow whatever Figma advises.",
  },
  groundRules: [
    "No marketing or sign-up drives aimed at students, and no Figma branding beyond what Figma approves.",
    "No student data collected for, or shared with, Figma. Any account is between a student, their school and Figma, under Figma's own terms.",
    "We follow Figma's age and account rules. Students who don't qualify are never asked to work around them.",
  ],
  future: [
    "Best Design, presented by Figma, at every Hack876.",
    "Hack876 schools exploring the school route with Figma for Education.",
    "Teacher training using Figma's high-school curriculum.",
    "Design clubs in our schools that build all year, not just on the day.",
  ],
  closingLine: "We would love to explore the right first step with the Figma for Education team.",
  sources: [
    {
      id: 1,
      org: "Figma Blog",
      label: "Reflections on Figma's inaugural Student Fellowship (Oct 13, 2020)",
      href: "https://www.figma.com/blog/figmas-inaugural-student-fellowship/",
    },
    {
      id: 2,
      org: "Figma Blog",
      label: "The power of product-based learning, by David Curran (Sep 23, 2026)",
      href: "https://www.figma.com/blog/the-power-of-product-based-learning/",
    },
    {
      id: 3,
      org: "Figma Blog",
      label: "Bringing Figma to even more classrooms (Apr 23, 2020)",
      href: "https://www.figma.com/blog/bringing-figma-to-even-more-classrooms/",
    },
    {
      id: 4,
      org: "Figma Help Center",
      label: "Figma for Education (eligibility, verification, AI availability, training)",
      href: "https://help.figma.com/hc/en-us/articles/360041061214-Figma-for-Education",
    },
    {
      id: 5,
      org: "Figma Blog",
      label: "Building a digital-first future for every student, by Lauren McCann (Jun 21, 2023)",
      href: "https://www.figma.com/blog/building-a-digital-first-future-for-every-student/",
    },
    { id: 6, org: "Figma", label: "Figma for Education: Free tools for the classroom", href: "https://www.figma.com/education/" },
  ],
};

export default deck;
