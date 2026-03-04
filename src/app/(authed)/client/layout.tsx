import { RoleGuard } from "@/lib/rbac/RoleGuard";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["CLIENT"]}>{children}</RoleGuard>;
}