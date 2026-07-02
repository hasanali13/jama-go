import Reveal from "./Reveal.jsx";

const SUPPORT_ITEMS = [
  {
    title: "24/7 Help Desk",
    text: "Reach our operations team any time for urgent site issues or patrol updates.",
  },
  {
    title: "Account Support",
    text: "Your dedicated account manager handles reporting, scheduling, and contract changes.",
  },
  {
    title: "Technical Assistance",
    text: "Get help with CCTV, access control, alarms, and monitoring setup or troubleshooting.",
  },
];

export default function Support() {
  return (
    <section className="section" id="support">
      <div className="container">
        <Reveal className="section-head">
          <span className="kicker">Support</span>
          <h2>Help when you need it, day or night</h2>
          <p>
            From emergency response to routine account questions, our support
            team keeps your security running without interruption.
          </p>
        </Reveal>

        <div className="cards">
          {SUPPORT_ITEMS.map((item) => (
            <Reveal as="article" className="feature" key={item.title}>
              <div className="feature-icon">🎧</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="support-cta">
          <a href="#contact" className="btn btn-primary">
            Contact Support
          </a>
        </Reveal>
      </div>
    </section>
  );
}
