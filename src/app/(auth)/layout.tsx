export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(180deg, #0A080F 0%, #09090B 100%)",
      }}
    >
      {children}
    </div>
  );
}
