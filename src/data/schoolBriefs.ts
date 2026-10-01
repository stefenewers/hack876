import type { School } from "./event";

/**
 * Private participation briefs for schools, one entry per school.
 *
 * Everything event-wide (numbers, prizes, schedule, eligibility) comes from
 * `event.ts`. Only what is specific to a school lives here. Add a school by
 * adding an entry: `/schools/[slug]` and the `/schools` hub pick it up.
 *
 * Rules:
 * - Never state that a school is participating or has endorsed Hack 876.
 * - Liaisons are community bridges, not school representatives.
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
    quote?: { text: string; by: string; source: number };
    bridge: string;
  };
  /** Early-planning cohort range. Always shown as provisional. */
  planningRange: { min: number; max: number };
  liaison: {
    name: string;
    title: string;
    credentials: string;
    photo: string | null;
    role: string;
    /** Makes clear the liaison is not a school representative. */
    note: string;
  };
  closing: { lead: string; line: string };
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
];

export function getSchoolBrief(slug: string) {
  return schoolBriefs.find((b) => b.slug === slug);
}
