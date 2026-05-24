import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/admin/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("is_authenticated")?.value;

  if (!authCookie) {
    redirect("/admin/login");
  }

  return (
    <DashboardShell>{children}</DashboardShell>
  );
}
