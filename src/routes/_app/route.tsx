import ContactForm from "@/components/global/contact-form";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className="w-full [&>*]:px-[10px] lg:[&>*]:px-[80px] mt-[32px]">
        <Outlet />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
