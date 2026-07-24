export default function TraderCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 20, height: 200 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: 12, background: "rgba(255,255,255,0.07)", borderRadius: 6, marginBottom: 7, width: "60%" }} />
              <div style={{ height: 9, background: "rgba(255,255,255,0.04)", borderRadius: 6, width: "40%" }} />
            </div>
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 14 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ height: 34, background: "rgba(255,255,255,0.05)", borderRadius: 8 }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
