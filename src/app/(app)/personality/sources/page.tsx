export default function PersonalitySourcesPage() {
  return (
    <div className="max-w-[900px] space-y-6">
      <h1 className="text-3xl font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
        Wisdom Sources
      </h1>
      <div className="card-stone p-8 text-center py-16">
        <div className="text-6xl mb-5">📂</div>
        <h2 className="text-xl font-bold text-white/60 mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          No Sources Added
        </h2>
        <p className="text-white/35 text-sm mb-6">
          Add journals, conversations, or writings for the AI to analyze your personality.
        </p>
        <button className="btn-gold inline-flex">
          Add Source
        </button>
      </div>
    </div>
  );
}
