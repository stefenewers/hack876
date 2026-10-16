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
  /**
   * Set for a cold first approach to a school. The brief then opens with who is
   * already on board, ends with a request for a short call, and drops the
   * "before university" slide to stay short.
   */
  outreach?: {
    /** Who the call is with, e.g. "Mrs. Jane Doe, or a faculty leader she nominates". */
    callWith: string;
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
      role: "Hillel has confirmed its participation. We are working with Mr. Holmes and Hillel’s Technology Education team on the arrangements.",
      note: "Hillel Academy has confirmed its participation. Every student still applies individually, and places are not guaranteed.",
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
      { k: "Done", v: "Hillel has confirmed its participation." },
      { k: "Now", v: "Arrangements with Mr. Holmes and the Technology Education team, including any approval steps the school requires." },
      { k: "Then", v: "A faculty liaison and one or two student ambassadors." },
      { k: "Before the event", v: "Teachers recommend students, students apply, and families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    hub: {
      status:
        "Hillel Academy has confirmed that it is taking part in Hack 876. We are working with Hillel’s leadership and Technology Education team, and the faculty liaison is still being confirmed. Hack 876 is organized independently of Hillel Academy, and individual student places are not guaranteed.",
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
  /* ------------------------------------------------------------------ */
  /*  Cold-outreach briefs (October 2026). Unlisted until a school agrees. */
  /* ------------------------------------------------------------------ */
  {
    slug: "jamaica-college",
    unlisted: true,
    school: "Jamaica College",
    short: "JC",
    people: "JC boys",
    crest: "/schools/jamaica-college.png",
    /* Navy and white per public references; the school site does not state its colours. */
    colors: { primary: "#1b2f6b", secondary: "#9db8e6", ink: "#101d45" },
    motto: { original: "Floreat Collegium, Fervet Opus in Campis", translation: "May the College flourish; work is burning in the fields." },
    hero: {
      lead: "JC already builds robots that win.",
      line: "Hack 876 gives more JC boys one day to build.",
    },
    fit: {
      headline: "Jamaica College already builds.",
      lead: "In 2023 JC’s Bluebots won Jamaica’s FIRST Tech Challenge championship with the Inspire Award, then became the first Jamaican team to win the MOTIVATE Award at the World Championship in Houston.",
      points: [
        { k: "Robotics", v: "The Bluebots took the Inspire Award at FTC Jamaica 2023, and JC’s Griffins won the Design Award." },
        { k: "World stage", v: "The MOTIVATE Award at the 2023 FIRST World Championship, a first for a Jamaican team." },
        { k: "JC STEAMING UP", v: "A school-wide STEAM programme since 2021, with 3D printers, drones, robots and project-based learning rooms." },
        { k: "Host school", v: "JC hosted the 2025 FTC Jamaica National Robotics Championship, with 34 schools." },
      ],
      quote: {
        text: "We want to add to that the skills that will enhance the boys’ abilities to go out into the world of work.",
        by: "Mr. Wayne Robinson, Principal, Jamaica College",
        source: 5,
        cite: "Jamaica Observer, August 2024",
      },
      bridge:
        "Hack 876 adds something a timetable cannot easily provide: students from other schools, a fixed deadline, mentors from industry, and judges who ask students to explain their decisions. Teams can build software, AI tools or hardware, so JC’s robotics and STEAM students have room to bring what they already know.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Mr. Robinson, or a faculty leader he nominates.",
      "Support in principle for eligible JC boys, in 5th Form through Upper 6th, to take part.",
      "A school-side contact, possibly from the team behind JC STEAMING UP.",
      "Help reaching boys in robotics, the STEM Club, IT, the sciences, digital arts and business.",
      "Guidance on permissions and communication with parents.",
    ],
    asksNote:
      "We’re not asking JC for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Mr. Wayne Robinson",
      title: "Principal · Jamaica College",
      credentials: "Principal of Jamaica College",
      photo: null,
      kicker: "Working with JC",
      headline: "Twenty minutes to start.",
      intro: "We would like JC to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Mr. Robinson, or with a faculty leader he nominates, to walk through what taking part would involve.",
      note: "This is an invitation. Jamaica College has not confirmed participation, nobody at JC has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Mr. Robinson or a faculty leader he nominates." },
      { k: "If JC agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and boys apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Mr. Robinson, or a faculty leader he nominates" },
    closing: {
      lead: "At JC, work is burning in the fields.",
      line: "Let’s give a few JC boys one day to build something real.",
    },
    pdf: { href: "/proposals/hack876-jamaica-college-participation-brief.pdf", filename: "Hack 876 x Jamaica College - Participation Brief.pdf" },
    sources: [
      { label: "Jamaica College: JC STEAMING UP (updated March 2026)", href: "https://jamaicacollege.org/jc-steaming-up/" },
      {
        label: "Jamaica Observer: Bluebots from JC win NCB Foundation FTC Jamaica Robotics Championship (March 11, 2023)",
        href: "https://jamaicaobserver.com/2023/03/11/bluebots-from-jc-wins-ncb-foundation-ftc-jamaica-robotics-championship",
      },
      {
        label: "Jamaica Observer: JC makes history as first Jamaican team to win MOTIVATE Award (April 2023)",
        href: "https://jamaicaobserver.com/latest-news/jc-makes-history-as-first-jcan-team-to-win-motivate-award-at-first-tech-robotics-competition",
      },
      { label: "Jamaica Information Service: FIRST Tech Challenge Jamaica Championship at JC (March 2025)", href: "https://jis.gov.jm/photos-first-tech-robotics-championship/" },
      { label: "Jamaica Observer: JC principal introduces practical skills for students (August 21, 2024)", href: "https://jamaicaobserver.com/2024/08/21/jc-principal-introduce-practical-skills-students" },
      { label: "Jamaica College: Guiding tenets and symbols", href: "https://jamaicacollege.org/guiding-tenets-symbols/" },
    ],
  },
  {
    slug: "immaculate",
    unlisted: true,
    school: "Immaculate Conception High School",
    short: "Immaculate",
    people: "Immaculate girls",
    crest: "/schools/immaculate-conception.png",
    /* Blue and white per public references; the primary is the school site's own accent blue. */
    colors: { primary: "#2a5bc1", secondary: "#b9cdf3", ink: "#142d66" },
    motto: { original: "Ad Astra Per Aspera", translation: "Through difficulties to excellence." },
    hero: {
      lead: "Immaculate girls have already won a hackathon.",
      line: "Hack 876 is the next one.",
    },
    fit: {
      headline: "Immaculate already builds.",
      lead: "In April 2024 an Immaculate team won the Crea+Her Girls in ICT Day Hackathon with Auto Farmer, an agriculture app with drone monitoring and an AI-powered water system, and took the Digicel Foundation Impact Award too.",
      points: [
        { k: "Hackathon winners", v: "First place at the 2024 Crea+Her Girls in ICT Day Hackathon, plus the Digicel Foundation Impact Award." },
        { k: "Robotics", v: "Team Blue Flames was first runner-up at the 2023 FIRST Tech Challenge Jamaica championship." },
        { k: "Olympiad medals", v: "Gold in robotics and silver in computer coding at the 2023 Caribbean Science Olympiad." },
        { k: "STEM Exhibition", v: "An annual exhibition. 2026’s theme: Honouring Our Past, Engineering Our Future." },
      ],
      quote: {
        text: "To equip each girl with the necessary attitude, knowledge and skills to enable her to adapt herself and remain flexible in a rapidly changing society and world.",
        by: "Immaculate Conception High School, Aims and Objectives",
        source: 5,
        cite: "immaculatehigh.edu.jm",
      },
      bridge:
        "Hack 876 adds students from other schools, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It is a chance for the girls who built Auto Farmer, and the ones coming after them, to do it again in a bigger room.",
    },
    alumni: {
      kicker: "The Immaculate connection",
      headline: "One of our judges wore the uniform.",
      lead: "Sheneska Williams, a confirmed Hack 876 judge, is an Immaculate old girl. She will be in the room on the day, judging what students build.",
      note: "Employers are listed as each person’s affiliation. They are not event sponsors unless stated elsewhere.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    localForms: "Grades 11 to 13",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Mrs. Wilson Reynolds, or a faculty leader she nominates.",
      "Support in principle for eligible Immaculate girls, in Grades 11 to 13, to take part.",
      "A school-side contact, possibly from ICT or the sciences.",
      "Help reaching girls in ICT, robotics, the sciences, design and business.",
      "Guidance on permissions and communication with parents.",
    ],
    asksNote:
      "We’re not asking Immaculate for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Mrs. Stacey Wilson Reynolds",
      title: "Principal · Immaculate Conception High School",
      credentials: "Principal of Immaculate Conception High School",
      photo: null,
      kicker: "Working with Immaculate",
      headline: "Twenty minutes to start.",
      intro: "We would like Immaculate to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Mrs. Wilson Reynolds, or with Mrs. Tanya Morgan Francis, Upper School Vice Principal, or another faculty leader she nominates.",
      note: "This is an invitation. Immaculate Conception High School has not confirmed participation, nobody at the school has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Mrs. Wilson Reynolds or a faculty leader she nominates." },
      { k: "If Immaculate agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and girls apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Mrs. Wilson Reynolds, or a faculty leader she nominates" },
    closing: {
      lead: "Immaculate teaches through difficulties to excellence.",
      line: "Let’s give a few Immaculate girls one day to build their way there.",
    },
    pdf: { href: "/proposals/hack876-immaculate-participation-brief.pdf", filename: "Hack 876 x Immaculate Conception High School - Participation Brief.pdf" },
    sources: [
      { label: "Digicel Foundation: Immaculate Conception High wins Girls in ICT Hackathon (April 2024)", href: "https://www.digicelfoundation.org/jm/en/news/immaculate-conception-high-wins-girls-in-ict-hackathon" },
      {
        label: "Jamaica Observer: Bluebots from JC win NCB Foundation FTC Jamaica Robotics Championship (March 11, 2023)",
        href: "https://jamaicaobserver.com/2023/03/11/bluebots-from-jc-wins-ncb-foundation-ftc-jamaica-robotics-championship",
      },
      { label: "Caribbean Science Foundation: Caribbean Science Olympiad results", href: "https://caribbeanscience.org/2026-cso/" },
      { label: "Immaculate Conception High School: News (STEM Exhibition 2026)", href: "https://immaculatehigh.edu.jm/news" },
      { label: "Immaculate Conception High School: About (motto, aims and objectives)", href: "https://immaculatehigh.edu.jm/about.php" },
    ],
  },
  {
    slug: "st-andrew",
    unlisted: true,
    school: "St. Andrew High School for Girls",
    short: "St Andrew",
    people: "St Andrew girls",
    crest: "/schools/st-andrew-high.png",
    /* Dubonnet and grey per public references; not stated on the school site. */
    colors: { primary: "#7a1f3d", secondary: "#d6c3ca", ink: "#4a1025" },
    motto: { original: "Life More Abundant", translation: "The school’s motto, from John 10:10." },
    hero: {
      lead: "St Andrew girls are already building robots for Jamaica.",
      line: "Hack 876 gives more of them a day to build.",
    },
    fit: {
      headline: "St Andrew already builds.",
      lead: "In October 2026 two St Andrew sixth formers were on Team Jamaica at the FIRST Global Robotics Olympics in Incheon, one of them as team captain. Jamaica came home with gold for innovation in engineering.",
      points: [
        { k: "Robotics Olympics", v: "Two sixth formers on Team Jamaica in October 2026, including the team captain." },
        { k: "Women in STEM", v: "A May 2026 Guardian Group Foundation grant to the Robotics Club for kits, parts and competitions." },
        { k: "Coding winners", v: "First place at the 2024 Flow Girls in ICT Day coding challenge." },
        { k: "Digital early", v: "An early Bring Your Own Device school, with an approach later shared with the Ministry of Education." },
      ],
      quote: {
        text: "We honour our history, but we are always looking at what’s next, what is good for the girls.",
        by: "Mrs. Keeva Ingram, Principal, St Andrew High School for Girls",
        source: 6,
        cite: "Jamaica Observer, September 2025",
      },
      bridge:
        "Hack 876 adds students from other schools, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It gives the girls behind Polar Gears, and the ones who have not tried building yet, one day to make something real.",
    },
    alumni: {
      kicker: "The St Andrew connection",
      headline: "One of our judges is an old girl.",
      lead: "Netania Mundell, a confirmed Hack 876 judge, went to St Andrew. She will be in the room on the day, judging what students build.",
      note: "Employers are listed as each person’s affiliation. They are not event sponsors unless stated elsewhere.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    localForms: "Grades 11 to 13",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Mrs. Ingram, or a faculty leader she nominates.",
      "Support in principle for eligible St Andrew girls, in Grades 11 to 13, to take part.",
      "A school-side contact, possibly from the Robotics Club or IT.",
      "Help reaching girls in robotics, IT, the sciences, design and business.",
      "Guidance on permissions and communication with parents.",
    ],
    asksNote:
      "We’re not asking St Andrew for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Mrs. Keeva Ingram",
      title: "Principal · St Andrew High School for Girls",
      credentials: "Principal since 2019 · St Andrew old girl",
      photo: null,
      kicker: "Working with St Andrew",
      headline: "Twenty minutes to start.",
      intro: "We would like St Andrew to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Mrs. Ingram, or with Mrs. Abigail James, Upper School Vice Principal, or another faculty leader she nominates.",
      note: "This is an invitation. St Andrew High School for Girls has not confirmed participation, nobody at the school has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Mrs. Ingram or a faculty leader she nominates." },
      { k: "If St Andrew agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and girls apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Mrs. Ingram, or a faculty leader she nominates" },
    closing: {
      lead: "St Andrew promises life more abundant.",
      line: "Let’s give a few St Andrew girls one day to build something real.",
    },
    pdf: { href: "/proposals/hack876-st-andrew-participation-brief.pdf", filename: "Hack 876 x St Andrew High School for Girls - Participation Brief.pdf" },
    sources: [
      { label: "Jamaica Gleaner: Students represent Jamaica at Robotics Olympics (October 7, 2026)", href: "https://jamaica-gleaner.com/article/news/20261007/students-represent-jamaica-robotics-olympics" },
      { label: "Jamaica Gleaner: JA wins gold, bronze at Robotics Olympics (October 10, 2026)", href: "https://jamaica-gleaner.com/article/news/20261010/ja-wins-gold-bronze-robotics-olympics" },
      {
        label: "Jamaica Gleaner: Guardian Group Foundation makes presentation to St Andrew High (May 21, 2026)",
        href: "https://jamaica-gleaner.com/article/news/20260521/corporate-hands-guardian-group-foundation-makes-presentation-st-andrew-high",
      },
      { label: "Jamaica Observer: St Andrew High wins Flow Girls in ICT Day coding competition (May 15, 2024)", href: "https://www.jamaicaobserver.com/2024/05/15/stahs-wins-flow-girls-ict-day-coding-comp/" },
      { label: "St Andrew High School for Girls: Bring Your Own Device", href: "https://sahs.edu.jm/about/bring-your-own-device-byod/" },
      { label: "Jamaica Observer: Keeva Ingram’s full circle leadership (September 21, 2025)", href: "https://www.jamaicaobserver.com/2025/09/21/keeva-ingrams-full-circle-leadership/" },
      { label: "St Andrew High School for Girls: Our history", href: "https://sahs.edu.jm/our-history/" },
    ],
  },
  {
    slug: "st-georges",
    unlisted: true,
    school: "St. George's College",
    short: "St George’s",
    people: "Georgians",
    crest: "/schools/st-georges-college.png",
    /* Blue and white per public references; not stated on the school site. */
    colors: { primary: "#1f4e9a", secondary: "#a9c9ee", ink: "#10284f" },
    motto: { original: "Ad Majorem Dei Gloriam", translation: "For the greater glory of God." },
    hero: {
      lead: "St George’s already builds answers to real problems.",
      line: "Hack 876 gives Georgians one day to do it again.",
    },
    fit: {
      headline: "St George’s already builds.",
      lead: "In March 2026 St George’s won the People’s Choice Award at the JPS Foundation EcoSpark Innovation Challenge for a rain garden within a miniature sponge city, and both of its robotics teams finished in the top ten at the FIRST Tech Challenge Jamaica championship.",
      points: [
        { k: "Climate innovation", v: "People’s Choice Award at EcoSpark 2026, for a sponge city that absorbs and stores rainwater." },
        { k: "Robotics", v: "Knight Bots 5th and Trojans 9th at FTC Jamaica 2026, both qualifying for the next stage." },
        { k: "Maths", v: "UTech Mathematics Quiz champions in 2026, for the second year running." },
        { k: "Enterprise", v: "GreenCycle Solutions won Junior Achievement Jamaica’s 2023–24 company programme and represented Jamaica abroad." },
      ],
      quote: {
        text: "We continue to monitor our curriculum and will try to adjust to ensure that our students’ learning is relevant to our changing times.",
        by: "Mrs. Margaret Campbell, Principal, St George’s College",
        source: 6,
        cite: "Jamaica Gleaner, September 2024",
      },
      bridge:
        "Hack 876 adds students from other schools, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It is ethical problem-solving under a clock: the same instinct behind the sponge city, in one day.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. The word comes from “hack” in the sense of putting something together quickly. It has nothing to do with breaking into computers. No programming experience is needed, and mentors who work in industry help throughout the day.",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Mrs. Campbell, or a faculty leader she nominates.",
      "Support in principle for eligible Georgians, in 5th Form through Upper 6th, to take part.",
      "A school-side contact, possibly from Business and IT, pre-engineering or robotics.",
      "Help reaching students in robotics, IT, maths, the sciences and business.",
      "Guidance on permissions and communication with parents.",
    ],
    asksNote:
      "We’re not asking St George’s for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Mrs. Margaret Campbell",
      title: "Principal · St George’s College",
      credentials: "Principal · Prime Minister’s Medal of Appreciation for Service to Education, 2025",
      photo: null,
      kicker: "Working with St George’s",
      headline: "Twenty minutes to start.",
      intro: "We would like St George’s to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Mrs. Campbell, or with Mr. Huntley Anderson, Vice Principal, or another faculty leader she nominates.",
      note: "This is an invitation. St George’s College has not confirmed participation, nobody at the school has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Mrs. Campbell or a faculty leader she nominates." },
      { k: "If St George’s agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and students apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Mrs. Campbell, or a faculty leader she nominates" },
    closing: {
      lead: "St George’s has been educating Jamaica since 1850.",
      line: "Let’s give a few Georgians one day to build something new.",
    },
    pdf: { href: "/proposals/hack876-st-georges-participation-brief.pdf", filename: "Hack 876 x St George's College - Participation Brief.pdf" },
    sources: [
      { label: "Jamaica Gleaner: Students, stakeholders drive climate solutions at JPS expo (March 28, 2026)", href: "https://jamaica-gleaner.com/article/news/20260328/students-stakeholders-drive-climate-solutions-jps-expo" },
      { label: "Jamaica Gleaner: Young minds show green solutions (April 9, 2026)", href: "https://jamaica-gleaner.com/article/news/20260409/earth-today-young-minds-show-green-solutions" },
      { label: "STGC Old Boys, Toronto: St George’s College robotics teams advance (March 7, 2026)", href: "https://stgctoronto.com/2026/03/07/st-georges-college-robotics-teams-advance-to-the-global-stage/" },
      { label: "STGC Old Boys, Toronto: STGC maths champions again (March 6, 2026)", href: "https://stgctoronto.com/2026/03/06/stgc-maths-champions-again/" },
      { label: "Jamaica Gleaner: St George’s College cops 2024 JACE programme (October 18, 2024)", href: "https://jamaica-gleaner.com/article/news/20241018/st-georges-college-cops-2024-jace-programme" },
      { label: "Jamaica Gleaner: St George’s College celebrates 175 years (September 20, 2024)", href: "https://jamaica-gleaner.com/article/news/20240920/st-georges-college-celebrates-175-years" },
    ],
  },
  {
    slug: "aisk",
    unlisted: true,
    school: "American International School of Kingston",
    short: "AISK",
    people: "AISK students",
    crest: "/schools/aisk.png",
    /* Green and gold taken from the school's logo; official colours are not stated. */
    colors: { primary: "#1e7a3c", secondary: "#f2c230", ink: "#0f3d1e" },
    hero: {
      lead: "AISK’s robotics team has already competed at Worlds.",
      line: "Hack 876 is one day to build something new.",
    },
    fit: {
      headline: "AISK already builds.",
      lead: "AISK Hurricane, FIRST Tech Challenge team 17980, won the Inspire Award at the Jamaica championship in 2023–24 and has competed at the FIRST World Championship two seasons running.",
      points: [
        { k: "Robotics", v: "Inspire Award 2023–24, Innovate Award 2022–23, and the World Championship in 2023–24 and 2024–25." },
        { k: "Team Jamaica", v: "An AISK student on Jamaica’s 2024 Robotics Olympics team, and AISK in the 2026 delegation." },
        { k: "Clubs", v: "A Coding Hub, a Drone Club, a STEM Club and Hurricane Hut, a student-run store." },
        { k: "A laptop each", v: "Students in Grades 5 to 12 bring their own MacBook daily, which suits a build-your-own-device event." },
      ],
      quote: {
        text: "Our students shape the future.",
        by: "American International School of Kingston, vision",
        source: 6,
        cite: "aisk.com",
      },
      bridge:
        "Hack 876 brings together students from across Kingston for one day: mixed teams, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It is a chance for AISK students to build alongside peers they would not otherwise meet.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    localForms: "Grades 11 and 12",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Dr. Powell, or a colleague she nominates.",
      "Support in principle for AISK students in Grades 11 and 12, which match Hack 876’s 5th Form to Upper 6th Form, to take part.",
      "A school-side contact, possibly the Grades 11 and 12 coordinator or the robotics advisers.",
      "Help reaching students in robotics, the Coding Hub, the Drone and STEM Clubs, and Hurricane Hut.",
      "Guidance on timing around IB commitments, permissions and communication with parents.",
    ],
    asksNote:
      "We’re not asking AISK for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Dr. Christie Powell",
      title: "Middle and High School Principal · AISK",
      credentials: "American International School of Kingston",
      photo: null,
      kicker: "Working with AISK",
      headline: "Twenty minutes to start.",
      intro: "We would like AISK to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Dr. Powell, or a colleague she nominates, such as the Grades 11 and 12 coordinator or the robotics team’s advisers.",
      note: "This is an invitation. The American International School of Kingston has not confirmed participation, nobody at the school has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Dr. Powell or a colleague she nominates." },
      { k: "If AISK agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and Grade 11 and 12 students apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Dr. Powell, or a colleague she nominates" },
    closing: {
      lead: "AISK’s vision is that its students shape the future.",
      line: "Let’s give a few Hurricanes one day to build it.",
    },
    pdf: { href: "/proposals/hack876-aisk-participation-brief.pdf", filename: "Hack 876 x American International School of Kingston - Participation Brief.pdf" },
    sources: [
      { label: "AISK Robotics: AISK Hurricane, FTC team 17980", href: "https://robotics.aisk.com/" },
      { label: "Jamaica Gleaner: Jamaican team takes bronze at world robotics olympics (October 1, 2024)", href: "https://past.jamaica-gleaner.com/article/lead-stories/20241001/jamaican-team-takes-bronze-world-robotics-olympics" },
      { label: "Jamaica Gleaner: JA wins gold, bronze at Robotics Olympics (October 10, 2026)", href: "https://jamaica-gleaner.com/article/news/20261010/ja-wins-gold-bronze-robotics-olympics" },
      { label: "AISK: Extra-curricular activities", href: "https://www.aisk.com/life-at-aisk/extra-curricular-activities" },
      { label: "AISK: Technology", href: "https://www.aisk.com/academics/our-school/technology" },
      { label: "AISK: Mission and values", href: "https://www.aisk.com/tier-2-page-test-1/mission-values" },
    ],
  },
  {
    slug: "wolmers",
    unlisted: true,
    school: "Wolmer's",
    short: "Wolmer’s",
    people: "Wolmerians",
    crest: "/schools/wolmers.png",
    /* Maroon and gold, from the Wolmer's Trust philosophy page. */
    colors: { primary: "#7b1e2b", secondary: "#e2b23c", ink: "#4a1018" },
    motto: { original: "Age Quod Agis", translation: "Whatever you do, do it to the best of your ability." },
    hero: {
      lead: "Wolmer’s is building for its next 300 years.",
      line: "Hack 876 gives its students one day to build now.",
    },
    fit: {
      headline: "Wolmer’s already builds.",
      lead: "A Wolmer’s Boys’ student was on Team Jamaica at the FIRST Global Robotics Olympics in Incheon in October 2026, where Jamaica won gold for innovation in engineering. At home, Wolmer’s 300 is adding ICT labs and a multimedia STEAM centre.",
      points: [
        { k: "Robotics Olympics", v: "Wolmer’s Boys’ students on Team Jamaica in 2024 and again in October 2026." },
        { k: "FTC Jamaica 2026", v: "In the winning alliance in the finals of the FIRST Tech Challenge Jamaica championship." },
        { k: "Wolmer’s 300", v: "Expanded ICT labs, a professional studio and a multimedia STEAM centre, being built now." },
        { k: "Solar powered", v: "954 solar panels, installed in 2024, power all three Wolmer’s campuses." },
      ],
      quote: {
        text: "Given the local trends in skills development driven by rapid technology changes, the rise of artificial intelligence as a daily necessity, an investment in our economy, Wolmer’s must now position itself for the next 300 years.",
        by: "Wolmer’s Trust, Wolmer’s 300",
        source: 3,
        cite: "wolmers.org",
      },
      bridge:
        "Hack 876 adds students from other schools, a fixed deadline, industry mentors and judges who ask teams to explain their decisions. It is a single Saturday that asks nothing of the school timetable, and students bring their own devices.",
    },
    eventIntro:
      "A hackathon is an event where small teams build something from scratch in a single day, then present it to judges. No programming experience is needed: teams also need students who design, research, write and present. Mentors who work in industry help throughout the day.",
    planningRange: { min: 8, max: 12 },
    asks: [
      "A 20-minute call with Mr. Pennycooke, or a faculty leader he nominates.",
      "Support in principle for eligible Wolmer’s Boys’ students, in Fifth Form and Sixth Form, to take part.",
      "A school-side contact, possibly from the Robotics or Technology Club.",
      "Help reaching students in robotics, technology, art and engineering, science and business.",
      "A view on whether Wolmer’s Girls’ sixth formers should be included through the joint sixth form.",
    ],
    asksNote:
      "We’re not asking Wolmer’s for financial support, or to organize anything. Hack 876 runs the event, the applications, the judging and the participant materials.",
    liaison: {
      name: "Mr. Dwight Pennycooke",
      title: "Principal · Wolmer’s Boys’ School",
      credentials: "Principal of Wolmer’s Trust High School for Boys",
      photo: null,
      kicker: "Working with Wolmer’s",
      headline: "Twenty minutes to start.",
      intro: "We would like Wolmer’s to be part of the first Hack 876. The first step is a short call with the school’s leadership.",
      tag: "Prepared for",
      role: "We’d welcome 20 minutes with Mr. Pennycooke, or with Mrs. Janice Jones, Vice Principal, or another faculty leader he nominates.",
      note: "This is an invitation. Wolmer’s has not confirmed participation, nobody at the school has accepted a role, and student places are not guaranteed.",
    },
    nextSteps: [
      { k: "First", v: "A 20-minute call with Mr. Pennycooke or a faculty leader he nominates." },
      { k: "If Wolmer’s agrees", v: "Support in principle, and a school-side contact." },
      { k: "Then", v: "Teachers share the opportunity, and students apply." },
      { k: "Before the event", v: "Accepted students and their families receive consent forms." },
      { k: "Event day", v: "Hack 876." },
    ],
    outreach: { callWith: "Mr. Pennycooke, or a faculty leader he nominates" },
    closing: {
      lead: "Age quod agis: whatever you do, do it well.",
      line: "Let’s give a few Wolmerians one day to build something real.",
    },
    pdf: { href: "/proposals/hack876-wolmers-participation-brief.pdf", filename: "Hack 876 x Wolmer's - Participation Brief.pdf" },
    sources: [
      { label: "Jamaica Gleaner: JA wins gold, bronze at Robotics Olympics (October 10, 2026)", href: "https://jamaica-gleaner.com/article/news/20261010/ja-wins-gold-bronze-robotics-olympics" },
      { label: "Jamaica Gleaner: Coachless Alpha makes splash at robotics challenge (March 12, 2026)", href: "https://jamaica-gleaner.com/article/lead-stories/20260312/coachless-alpha-makes-splash-robotics-challenge" },
      { label: "Wolmer’s Trust: Wolmer’s 300", href: "https://www.wolmers.org/trust/300-in-3/" },
      {
        label: "Wolmer’s Trust: Wolmer’s schools get US$445,000 solar electricity generation system",
        href: "https://www.wolmers.org/trust/trust-news/wolmers-schools-get-us445000-solar-electricity-generation-system/",
      },
      { label: "Jamaica Gleaner: Jamaican team takes bronze at world robotics olympics (October 1, 2024)", href: "https://past.jamaica-gleaner.com/article/lead-stories/20241001/jamaican-team-takes-bronze-world-robotics-olympics" },
      { label: "Wolmer’s Trust: Philosophy (motto and colours)", href: "https://www.wolmers.org/wp/philosophy/" },
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
