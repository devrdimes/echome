export default function PublicReportPage({ params }: { params: { shareId: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card-stone p-10 max-w-[600px] w-full text-center">
        <div className="text-6xl mb-5">🔮</div>
        <h1 className="text-2xl font-bold text-[#F0B429] mb-3" style={{ fontFamily: "var(--font-kingdom), serif" }}>
          Soul Report
        </h1>
        <p className="text-white/40 text-sm">
          Share Card ID: {params.shareId}
        </p>
      </div>
    </div>
  );
}
