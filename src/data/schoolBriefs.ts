import { people, type School } from "./event";

/**
 * Private participation briefs for schools, one entry per school.
 *
 * Everything event-wide (numbers, prizes, schedule, eligibility) comes from
 * `event.ts`. Only what is specific to a school lives here. Add a school by
 * adding an entry: `/schools/[slug]` and the `/schools` hub pick it up.
 *
 * Rules:
 * - Never state that a school is participating or has endorsed Hack 876.
 * - Liaisons are community bridges or proposed contacts. Never present one as
 *   having accepted a role unless they have.
 * - Institutional claims must link to a primary source in `sources`.
 */

export type SchoolBrief = {
  slug: string;
  school: School;
  /** How the school is referred to in running copy. */
  short: string;
  /** Students and alumni, e.g. "Ardennites". */
  people: string;
  crest: string;
  /** School colours, used as accents only. Hack 876 stays dominant. */
  colors: { primary: string; secondary: string; ink: string };
  motto?: { original: string; translation: string };
  hero: { lead: string; line: string };
  fit: {
    headline: string;
    lead: string;
    points: { k: string; v: string }[];
    /** `cite` is the short link label, e.g. "UTech Jamaica, March 2026". */
    quote?: { text: string; by: string; source: number; cite: string };
    bridge: string;
  };
  /**
   * Shows confirmed Hack 876 judges and organizers who attended this school,
   * pulled from event.ts. Omit when there are none worth a section.
   */
  alumni?: { kicker: string; headline: string; lead: string; note: string };
  /** Early-planning cohort range. Always shown as provisional. */
  planningRange: { min: number; max: number };
  /** Replaces the default list of asks. */
  asks?: string[];
  /** Replaces the default "not asking for money" note under the asks. */
  asksNote?: string;
  liaison: {
    name: string;
    title: string;
    credentials: string;
    photo: string | null;
    role: string;
    /** Makes clear what the liaison is not: a school representative, or someone who has agreed. */
    note: string;
    /** Section kicker. Defaults to "Your bridge to Hack 876". */
    kicker?: string;
    /** Section headline. Defaults to "One relationship at a time." */
    headline?: string;
    /** Replaces the default intro paragraph. */
    intro?: string;
    /** A small status tag on the card, e.g. "Proposed · not yet confirmed". */
    tag?: string;
    /** Extra cards under the liaison, e.g. student ambassadors. */
    also?: { title: string; tag?: string; text: string }[];
  };
  closing: { lead: string; line: string };
  /**
   * Set once a school has a working contact and its community needs answers,
   * not a pitch. `/schools/<slug>` then renders the participation hub, and the
   * original brief moves to `/schools/<slug>/brief`.
   */
  hub?: {
    /** Honest one-line relationship status, e.g. faculty support vs formal approval. */
    status: string;
    ambassadors: { summary: string; duties: string[] };
    /** What we ask of teachers, and who tends to do well. */
    faculty: { process: string[]; profiles: string[] };
    /** Where school-specific questions should go. */
    schoolChannel: string;
  };
  pdf: { href: string; filename: string };
  sources: { label: string; href: string }[];
};

export const schoolBriefs: SchoolBrief[] = [
  {
    slug: "ardenne",
    school: "Ardenne High School",
    short: "Ardenne",
    people: "Ardennites",
    crest: "/schools/ardenne-high.png",
    colors: { primary: "#1f3f9e", secondary: "#f5c518", ink: "#13235a" },
    motto: { original: "Deo Duce Quaere Optima", translation: "With God as Guide, Seek the Best." },
    hero: {
      lead: "Ardenne is already preparing students for what comes next.",
      line: "Hack 876 gives them somewhere to build it.",
    },
    fit: {
      headline: "This already looks like Ardenne.",
      lead: "In March 2026, Ardenne became the pilot site for the UTech and Kiwanis STEM Education Project: hands-on robotics, coding and engineering.",
      points: [
        { k: "STEAM", v: "A school philosophy that pairs science and technology with the arts." },
        { k: "Robotics", v: "An active Robotics Club already building and demonstrating." },
        { k: "STEM pilot", v: "Launch site for the UTech and Kiwanis STEM Education Project, March 2026." },
        { k: "IT core", v: "Every student entering grade 10 carries an IT-based core subject." },
      ],
      quote: {
        text: "We strongly believe that they’re the future and they’re the ones who will impact us and make changes that are necessary.",
        by: "Dr. Jacqueline Pinto, Principal, Ardenne High School",
        source: 1,
        cite: "UTech Jamaica, March 2026",
      },
      bridge:
        "Hack 876 offers those same students another arena: one day, one team, one idea, build something real. It doesn't replace anything Ardenne is doing. It adds a deadline, outside judges, and students from other schools.",
    },
    planningRange: { min: 8, max: 12 },
    liaison: {
      name: "Diandra McPherson",
      title: "Ardenne Community Ambassador · Hack 876",
      credentials: "Ardenne alumna · UWI · Lawyer and real-estate agent",
      photo: "/people/diandra-mcpherson.jpg",
      role: "Diandra is helping connect Hack 876 with the Ardenne community and is an initial point of contact as we explore participation with the school.",
      note: "Diandra supports the relationship as a member of the Ardenne community. She doesn’t act on the school’s behalf.",
    },
    closing: {
      lead: "Ardenne has always asked its students to seek the best.",
      line: "Let’s give a few Ardennites one day to build it.",
    },
    pdf: {
      href: "/proposals/hack876-ardenne-participation-brief.pdf",
      filename: "Hack 876 x Ardenne High School - Participation Brief.pdf",
    },
    sources: [
      {
        label: "UTech Jamaica: UTech and Kiwanis launch STEM initiative",
        href: "https://www.utech.edu.jm/utech-jamaica-and-kiwanis-launch-landmark-stem-initiative-to-empower-next-generation-of-innovators/",
      },
      { label: "Jamaica Information Service: Science labs to be built, upgraded, equipped", href: "https://jis.gov.jm/science-labs-to-be-built-upgraded-equipped/" },
      { label: "Ardenne High School: History", href: "https://ardennehighschool.edu.jm/v2/history.php" },
    ],
  },
  {
    slug: "campion",
    school: "Campion College",
    short: "Campion",
    people: "Campionites",
    crest: "/schools/campion-college.png",
    /* Campion's colours are red and white (Fact Book). The pale tint stands in for white as a highlight. */
    colors: { primary: "#a51c2c", secondary: "#f2b8b5", ink: "#5e0f19" },
    motto: { original: "Fortes in Fide et Opere", translation: "Strong in Faith and Work." },
    hero: {
      lead: "Campion helped produce some of the people making Hack 876 possible.",
      line: "Let’s give the next generation the same chance to build.",
    },
    fit: {
      headline: "Campion already builds.",
      lead: "Campion was the Jamaican school with the most places on the 2025 CSEC merit list. Its students are also winning with robots and code, not only in exams.",
      points: [
        {
          k: "Robotics",
          v: "The Crimson Crocs won the Inspire Award, the top honour at the 2024–25 FIRST Tech Challenge Jamaica championship, earning a place at the World Championship in Houston.",
        },
        { k: "Coding", v: "Four Campion students won platinum in the Level 2 coding olympiad at the 2024 Caribbean STEM Olympiads, with a public-health project." },
        { k: "Results", v: "35 mentions across subjects on the 2025 CSEC merit list, more than any other Jamaican school." },
        { k: "Enterprise", v: "A Young Entrepreneurial Society where students already work on business projects." },
      ],
      quote: {
        text: "Our mission is to cultivate a nurturing and intellectually stimulating environment that promotes academic excellence, moral integrity, and the development of lifelong learners who are well-prepared to navigate the complexities of the modern world.",
        by: "Campion College mission statement",
        source: 1,
        cite: "campioncollege.com",
      },
      bridge:
        "Hack 876 complements that classroom work with one day of practice: a mixed team, a real problem, a working prototype, and a pitch to industry judges. Students try software, AI, hardware or design, work alongside other schools, and get a first look at technology careers before university.",
    },
    alumni: {
      kicker: "The Campion connection",
      headline: "They sat where you sit.",
      lead: "Four confirmed Hack 876 judges and both organizers went to Campion. They are coming back to see what the next Campionites build, and to tell them what happened after sixth form.",
      note: "Employers are listed as each person’s affiliation. They are not event sponsors unless stated elsewhere.",
    },
    planningRange: { min: 8, max: 12 },
    asks: [
      "Mrs. Morrison’s continued guidance in introducing Hack 876 within Campion.",
      "Two student ambassadors, ideally one Lower Sixth and one Fifth Form student.",
      "Help recommending students from 5th Form through Upper 6th Form.",
      "Help sharing the opportunity with relevant faculty, students and school leadership.",
      "Guidance on any administrative requirements for formal school participation.",
    ],
    asksNote:
      "We’re not asking Campion for financial support, or to organize anything. Hack 876 runs the event and supplies the information and materials.",
    liaison: {
      name: "Mrs. Keisha Morrison",
      title: "Head of the Technology Department · Campion College",
      credentials: "B.Sc. (Hons) UWI, Dip. Edu. · Computer Science and Information Technology Teacher",
      photo: null,
      kicker: "Working with the Technology Department",
      headline: "A relationship, not a recruitment drive.",
      intro:
        "We want to build something lasting with Campion’s Technology Department, beyond one event. That work has started with Mrs. Morrison.",
      tag: "Faculty liaison · agreed October 2026",
      role: "Mrs. Morrison has agreed to serve as Hack 876’s faculty liaison at Campion: our point of contact in the department for coordination, recommendations and questions.",
      note: "Mrs. Morrison’s support is at faculty level. Formal approval from Campion College’s administration has not been documented, and student places are not guaranteed.",
      also: [
        {
          title: "Student ambassadors",
          tag: "To be nominated",
          text: "Two students are expected, ideally one Lower Sixth and one Fifth Form student, to help classmates understand the opportunity. No names have been chosen.",
        },
      ],
    },
    hub: {
      status:
        "Mrs. Keisha Morrison, Head of the Technology Department, has agreed to be Hack 876’s faculty liaison at Campion. Formal approval from the school’s administration has not been documented yet.",
      ambassadors: {
        summary:
          "Two student ambassadors are expected to be nominated, ideally one Lower Sixth and one Fifth Form student. No names have been chosen, and none will be published without permission.",
        duties: [
          "Help circulate official Hack 876 materials.",
          "Encourage eligible students to apply.",
          "Point common questions to this page.",
          "Pass questions and updates through the faculty liaison.",
        ],
      },
      faculty: {
        process: [
          "Share this page with students in 5th Form through Upper 6th Form.",
          "Recommend students you think would enjoy it. A short list through the faculty liaison is enough.",
          "Recommended students then apply on the Hack 876 website themselves.",
          "Hack 876 handles selection, consent forms and all event communication.",
        ],
        profiles: [
          "Curious students who like making things, in any subject.",
          "Students from Computer Science, IT, Maths, the Sciences, Art, Design or Business.",
          "Strong communicators, organizers and researchers, not only coders.",
          "Students who work well with people they have just met.",
        ],
      },
      schoolChannel:
        "Questions about Campion’s own arrangements, such as permission to attend or school transport, go through Campion’s Technology Department in the usual way.",
    },
    closing: {
      lead: "Campion has already helped produce some of the professionals making Hack 876 possible.",
      line: "Let’s give the next generation the same chance to discover what they can build.",
    },
    pdf: {
      href: "/proposals/hack876-campion-participation-brief.pdf",
      filename: "Hack 876 x Campion College - Participation Brief.pdf",
    },
    sources: [
      { label: "Campion College: mission, motto, results and clubs", href: "https://www.campioncollege.com/" },
      { label: "Campion College: Fact Book (history and colours)", href: "https://www.campioncollege.com/factbook" },
      {
        label: "Jamaica Observer: Campion College clinches 2025 high school robotics championship title (April 16, 2025)",
        href: "https://www.jamaicaobserver.com/2025/04/16/campion-college-clinches-2025-high-school-robotics-championship-title/",
      },
      {
        label: "Jamaica Observer: Jamaican students dominate 2024 Caribbean STEM Olympiads (January 28, 2024)",
        href: "https://www.jamaicaobserver.com/2024/01/28/jamaican-students-dominate-2024-caribbean-stem-olympiads/",
      },
      {
        label: "The Gleaner: Jamaican students shine on the 2025 CSEC merit list (November 8, 2025)",
        href: "https://jamaica-gleaner.com/article/news/20251108/jamaican-students-shine-campion-colleges-mijaun-talbot-tops-caribbean-csec",
      },
    ],
  },
];

/** Confirmed judges and organizers who attended a school. */
export function schoolAlumni(school: School) {
  return people.filter((p) => p.confirmed && (p.role === "judge" || p.role === "organizer") && p.schools?.includes(school));
}

export function getSchoolBrief(slug: string) {
  return schoolBriefs.find((b) => b.slug === slug);
}
