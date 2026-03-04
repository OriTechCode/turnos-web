import { RoleGuard } from "@/lib/rbac/RoleGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["ADMIN"]}>{children}</RoleGuard>;
}