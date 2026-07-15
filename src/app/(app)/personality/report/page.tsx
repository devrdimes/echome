export default function PersonalityReportPage() {
  return (
    <div className="max-w-[900px] space-y-6">
      <h1 className="text-3xl font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
        Soul Report
      </h1>
      <div className="card-royal p-8 text-center py-16">
        <div className="text-6xl mb-5">📜</div>
        <h2 className="text-xl font-bold text-white/60 mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          No Report Forged Yet
        </h2>
        <p className="text-white/35 text-sm mb-6">
          Generate your first Soul Report to see deep personality insights here.
        </p>
        <a href="/personality" className="btn-gold inline-flex">
          Go to Soul Forge
        </a>
      </div>
    </div>
  );
}
