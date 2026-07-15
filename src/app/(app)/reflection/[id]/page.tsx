export default function ReflectionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-[800px] space-y-6">
      <h1 className="text-3xl font-bold text-white/90" style={{ fontFamily: "var(--font-kingdom), serif" }}>
        Scroll #{params.id}
      </h1>
      <div className="card-stone p-8">
        <p className="text-white/40 text-sm">Reflection details coming soon...</p>
      </div>
    </div>
  );
}
