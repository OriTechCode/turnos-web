import { RoleGuard } from "@/lib/rbac/RoleGuard";

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allow={["PROVIDER"]}>{children}</RoleGuard>;
}