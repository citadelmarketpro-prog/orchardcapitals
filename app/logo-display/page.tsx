import OCLogo from "@/components/site/OCLogo";

/**
 * /logo-display
 *
 * Bare page for screenshotting the logo at opengraph dimensions (1200×630).
 * Uses the same OCLogo component as the Preloader — no nav, no shell.
 *
 * Usage:
 *   1. Open this page in the browser.
 *   2. Set the viewport to exactly 1200×630 px.
 *   3. Screenshot → save as opengraph-image.jpg / twitter-image.jpg
 *      and place in app/ to replace the existing files.
 */
export default function LogoDisplayPage() {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#120e0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        overflow: "hidden",
      }}
    >
      {/* Scale up the OCLogo (same component as the Preloader) */}
      <div style={{ transform: "scale(4)", transformOrigin: "center" }}>
        <OCLogo size="lg" light />
      </div>

      {/* Tagline — same style as Preloader's loading text */}
      <p
        style={{
          color: "rgba(245,240,232,0.4)",
          fontSize: "1.1rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          margin: 0,
          fontFamily: "var(--oc-mono,'IBM Plex Mono',monospace)",
          marginTop: "6rem",
        }}
      >
        Copy Futures · Options · Contracts
      </p>
    </div>
  );
}
