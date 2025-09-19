import ContactForm from "@/components/global/contact-form";
import Footer from "@/components/global/footer";
import Navbar from "@/components/global/navbar";
import type { ParentProps } from "@/types";

export default function AppLayout({ children }: ParentProps) {
  return (
    <>
      <Navbar />
      <main className="w-full [&>*]:px-[10px] lg:[&>*]:px-[80px] mt-[32px]">
        {children}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
