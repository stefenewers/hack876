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
  /** `true` keeps the page off the public /schools listing. Use for proposals a school has not yet discussed. */
  unlisted?: boolean;
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
  alumni?: {
    kicker: string;
    headline: string;
    lead: string;
    note: string;
    /** Education path to show for a named person, when the order is known, e.g. "Hillel → Campion College → Georgia Tech". */
    paths?: Record<string, string>;
  };
  /** A plain explanation of the event for readers new to hackathons, shown in "The event" section. */
  eventIntro?: string;
  /** Replaces the default "what happens next" timeline. */
  nextSteps?: { k: string; v: string }[];
  /** The school's own names for the eligible years, e.g. "Grades 11 to 13". Shown beside the event's forms; never a separate rule. */
  localForms?: string;
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
    /**
     * The faculty liaison as shown on the hub and teacher sheet. Defaults to `liaison`.
     * Set it when the brief's addressee is not the liaison, or the liaison is not yet appointed.
     */
    liaison?: { name: string; title: string; text: string; pending?: boolean };
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
      tag: "Faculty liaison",
      role: "Mrs. Morrison is the point of contact at Campion for Hack 876. Teachers can pass recommendations and questions to her, and she coordinates with the Hack 876 organizing team.",
      note: "Campion College has confirmed its participation. Every student still applies individually, and places are not guaranteed.",
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
        "Campion College has confirmed that it is taking part in Hack 876. Mrs. Keisha Morrison, Head of the Technology Department, is the faculty liaison. Hack 876 is organized independently of Campion, and individual student places are not guaranteed.",
      ambassadors: {
        summary:
          "Campion is expected to have two ambassadors, ideally one in Lower Sixth and one in Fifth Form. They have not been chosen yet, and their names will not be published without permission.",
        duties: [
          "Share the Hack 876 flyer and this page with classmates.",
          "Encourage eligible students to apply.",
          "Point classmates to this page when they have questions.",
          "Pass on questions they cannot answer to the faculty liaison.",
        ],
      },
      faculty: {
        process: [
          "Share this page or the student flyer with students in 5th Form through Upper 6th Form.",
          "If you would like to recommend particular students, give their names to the faculty liaison. No form is needed.",
          "Each student completes the application on the Hack 876 website. Teachers do not apply on their behalf.",
          "The Hack 876 organizing team selects participants and contacts students and families directly.",
        ],
        profiles: [
          "Curious students who like making things, in any subject.",
          "Students taking Computer Science, IT, Maths, the Sciences, Art, Design or Business.",
          "Strong writers, presenters, organizers and researchers, as well as programmers.",
          "Students who work well with people they have just met.",
        ],
      },
      schoolChannel:
        "For questions about Campion’s own arrangements, such as school permission to attend, speak to Campion’s Technology Department.",
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
  {
    slug: "hillel",
    school: "Hillel Academy",
    short: "Hillel",
    people: "Hillel students",
    crest: "/schools/hillel-academy.png",
    /* Blue and pale gold sampled from the crest file. Official colours not confirmed in writing. */
    colors: { primary: "#0b4f8a", secondary: "#e3d48f", ink: "#062e57" },
    motto: { original: "Learning for Living", translation: "Hillel Academy’s motto." },
    hero: {
      lead: "Hillel calls it learning for living.",
      line: "Hack 876 is one day of exactly that.",
    },
    fit: {
      headline: "Learning for living, in a single day.",
      lead: "Hillel’s mission is to inspire problem-solving, lifelong learners. Hack 876 asks students to do precisely that: find a real problem and build an answer to it, together, in one day.",
      points: [
        { k: "Real-world learning", v: "The High School describes its approach as connecting learning “through real-world application”." },
        { k: "IB World School", v: "Hillel offers the IB Diploma, with Creativity, Activity and Service as part of the programme." },
        { k: "Beyond the classroom", v: "Every High School student is expected to take part in at least two co-curricular activities each term." },
        { k: "Robotics", v: "The Hillel Panthers were selected to represent Jamaica at the FIRST World Championship in Houston in April 2025." },
      ],
      quote: {
        text: "To inspire well-rounded, problem-solving, lifelong learners and confident global citizens prepared to change the world.",
        by: "Hillel Academy mission statement",
        source: 1,
        cite: "hillelacademyjm.com",
      },
      bridge:
        "Hack 876 adds something a school timetable cannot easily provide: students from other schools, a fixed deadline, mentors from industry, and judges who ask students to explain their decisions. It is an addition to what Hillel already does, not a replacement for any of it.",
    },
    alumni: {
      kicker: "The Hillel connection",
      headline: "Built by people Hillel helped shape.",
      lead: "One of Hack 876’s organizers and one of its confirmed judges attended Hillel. They are helping build this because they would have wanted it as students.",
      note: "Employers are listed as each person’s affiliation. They are not event sponsors unless stated elsewhere.",
      paths: { "Stefen Ewers": "Hillel → Campion College → Georgia Tech" },
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    localForms: "Grades 11 to 13",
    planningRange: { min: 8, max: 12 },
    asks: [
      "Support in principle for eligible Hillel students, in Grades 11 to 13, to take part.",
      "Guidance from Hillel’s leadership on any administrative requirements.",
      "A faculty liaison of the school’s choosing, possibly within Technology Education.",
      "Guidance in identifying one or two student ambassadors.",
      "Help reaching curious, motivated students, and recommending those who are interested.",
      "Guidance on permissions, communication with parents and any school-specific expectations.",
    ],
    asksNote:
      "We’re not asking Hillel for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials. What form of support is appropriate is for the school to decide.",
    liaison: {
      name: "Mr. Lloyd Holmes",
      title: "High School Principal · Hillel Academy",
      credentials: "At Hillel since 2004 · High School Principal since 2017",
      photo: null,
      kicker: "Working with Hillel",
      headline: "A conversation first.",
      intro:
        "We would like Hack 876 to become something Hillel students can return to each year, not a single Saturday. That work is under way with the school’s leadership and its Technology Education team.",
      tag: "Prepared for",
      role: "We are coordinating with Mr. Holmes and Hillel’s Technology Education team on what school participation would involve and what approval Hillel requires.",
      note: "Hillel Academy has not yet confirmed its participation, nobody at Hillel has accepted a role, and student places are not guaranteed.",
      also: [
        {
          title: "Ms. Delrose Coburn",
          tag: "Potential faculty liaison",
          text: "Head of Technology Education. Ms. Coburn has been part of our early conversations. Who acts as faculty liaison, if anyone, is for Hillel to decide.",
        },
        {
          title: "Student ambassadors",
          tag: "Proposed",
          text: "One or two students, chosen with the school, who help classmates understand the opportunity and bring their questions back.",
        },
      ],
    },
    nextSteps: [
      { k: "Now", v: "Coordination with Mr. Holmes and the Technology Education team on participation arrangements." },
      { k: "If Hillel agrees", v: "Support in principle, and any approval steps the school requires." },
      { k: "Then", v: "A faculty liaison and one or two student ambassadors." },
      { k: "Before the event", v: "Teachers recommend students, students apply, and families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    hub: {
      status:
        "We are coordinating with Hillel’s leadership and Technology Education team. School participation arrangements and the faculty liaison are still being confirmed. Hack 876 is organized independently of Hillel Academy, and individual student places are not guaranteed.",
      ambassadors: {
        summary:
          "One or two student ambassadors have been proposed. None has been nominated, and their names will not be published without permission.",
        duties: [
          "Share the Hack 876 flyer and this page with classmates.",
          "Encourage eligible students to apply.",
          "Point classmates to this page when they have questions.",
          "Pass on questions they cannot answer to the Hack 876 organizing team.",
        ],
      },
      faculty: {
        process: [
          "Share this page or the student flyer with students in Grades 11 to 13.",
          "If you would like to recommend particular students, email their names to the Hack 876 organizing team at info@hack876.com. No form is needed.",
          "Each student completes the application on the Hack 876 website. Teachers do not apply on their behalf.",
          "The Hack 876 organizing team selects participants and contacts students and families directly.",
        ],
        profiles: [
          "Curious students who like making things, in any subject.",
          "Students taking Computer Science, Information Technology, Maths, the Sciences, Art, Design or Business.",
          "Strong writers, presenters, organizers and researchers, as well as programmers.",
          "Students who work well with people they have just met.",
        ],
      },
      schoolChannel:
        "For questions about Hillel’s own arrangements, such as school permission to attend, speak to the High School office or Hillel’s Technology Education department.",
      liaison: {
        name: "To be confirmed",
        title: "Coordinating with Hillel’s leadership and Technology Education",
        text: "We are working with Mr. Lloyd Holmes, High School Principal, and Ms. Delrose Coburn, Head of Technology Education. Who acts as Hillel’s faculty liaison is for the school to decide. Until then, teachers can send questions and recommendations to the organizing team.",
        pending: true,
      },
    },
    closing: {
      lead: "Hillel teaches learning for living.",
      line: "Let’s give a few Hillel students one day to live it.",
    },
    pdf: {
      href: "/proposals/hack876-hillel-participation-brief.pdf",
      filename: "Hack 876 x Hillel Academy - Participation Brief.pdf",
    },
    sources: [
      { label: "Hillel Academy: Mission and Values", href: "https://hillelacademyjm.com/mission-and-values/" },
      { label: "Hillel Academy: The Principal, High School", href: "https://hillelacademyjm.com/the-principal-middle-school/" },
      { label: "Hillel Academy: About Us", href: "https://hillelacademyjm.com/about-us/" },
      { label: "Hillel Academy: High School co-curricular programme", href: "https://hillelacademyjm.com/high-school/" },
      {
        label: "Jamaica Observer: 2024-25 FIRST Tech Challenge Jamaica Robotics Championship (April 16, 2025)",
        href: "https://www.jamaicaobserver.com/2025/04/16/campion-college-clinches-2025-high-school-robotics-championship-title/",
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
