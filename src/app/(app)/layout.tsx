import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { KingdomSidebar } from "@/components/layout/kingdom-sidebar";
import { KingdomTopbar } from "@/components/layout/kingdom-topbar";
import { KingdomBackground } from "@/components/layout/kingdom-background";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;

  try {
    session = await auth();
  } catch {
    // DB not available in dev — fall through to redirect
  }

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      {/* Multi-layer animated background */}
      <KingdomBackground />

      {/* App shell */}
      <div className="relative z-10 flex min-h-screen">
        {/* Castle wall sidebar */}
        <KingdomSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          <KingdomTopbar
            userName={session.user.name}
            userImage={session.user.image}
            userEmail={session.user.email}
          />
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
