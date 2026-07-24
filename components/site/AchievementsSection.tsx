const AWARD_IMAGES = [
  "/landing/awards/best-partners-program-global-2024-min.svg",
  "/landing/awards/top-trusted-financial-institution-2024-min.svg",
  "/landing/awards/most-trusted-forex-broker-global-2024-min.svg",
  "/landing/awards/best-fx-broker-global-2024-min.svg",
  "/landing/awards/best-customer-support-global-2024-min.svg",
  "/landing/awards/best-partners-program-global-2024-min.svg",
  "/landing/awards/most-transparent-broker-asia-2024-min.svg",
];

export default function AchievementsSection() {
  return (
    <section style={{ background: "#ffffff", padding: "56px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--oc-poppins)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: "#0a0a0a",
            marginBottom: 40,
            letterSpacing: "-0.5px",
          }}
        >
          Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center">
          {AWARD_IMAGES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt="Award"
              style={{ height: 80, width: "auto", objectFit: "contain", opacity: 0.7, margin: "0 auto" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
