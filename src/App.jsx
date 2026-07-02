import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import TrustBar from "./components/TrustBar.jsx";
import Services from "./components/Services.jsx";
import WhyUs from "./components/WhyUs.jsx";
import Stats from "./components/Stats.jsx";
import Support from "./components/Support.jsx";
import OurTeam from "./components/OurTeam.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Stats />
        <Support />
        <OurTeam />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
