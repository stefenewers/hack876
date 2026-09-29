import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";
import { About } from "@/components/sections/About";
import { Attend } from "@/components/sections/Attend";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { GoodHack } from "@/components/sections/GoodHack";
import { Hero } from "@/components/sections/Hero";
import { People } from "@/components/sections/People";
import { Prizes } from "@/components/sections/Prizes";
import { Schedule } from "@/components/sections/Schedule";
import { Sponsors } from "@/components/sections/Sponsors";
import { TheHack } from "@/components/sections/TheHack";
import { Tracks } from "@/components/sections/Tracks";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <TheHack />
        <Tracks />
        <GoodHack />
        <Schedule />
        <Attend />
        <People />
        <Prizes />
        <Sponsors />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
