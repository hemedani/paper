import { SiteHeader } from "@/components/organisms/SiteHeader";
import { Footer } from "@/components/organisms/NewFooter";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
