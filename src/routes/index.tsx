import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, CursorGlow, ScrollProgress } from "@/components/portfolio/Chrome";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { MemeFactory } from "@/components/portfolio/MemeFactory";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const TITLE = "Rahul R | Full Stack Developer — React · Laravel · React Native";
const DESCRIPTION =
  "Full Stack Developer based in Chennai, India. 1.5+ years building production React, Laravel, and React Native applications for real clients.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Rahul R",
          jobTitle: "Full Stack Developer",
          address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
          worksFor: { "@type": "Organization", name: "Tender Software Pvt Ltd" },
          email: "mailto:rahulajay558@gmail.com",
          knowsAbout: ["React.js", "React Native", "Laravel", "PHP", "MySQL"],
          sameAs: [
            "https://github.com/Rahul180110",
            "https://linkedin.com/in/rahul-r-8a1385267",
            "https://www.instagram.com/404_humor_not_found_26",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <MemeFactory />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
