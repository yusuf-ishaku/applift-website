import gradientGlass from "@/assets/images/gradient-glass.png";
import HelpForm from "./help-form";

const ContactForm = () => {
  return (
    <section
      className="bg-no-repeat bg-top md:bg-left"
      style={{
        backgroundImage: `url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI0OTUiCiAgaGVpZ2h0PSI3OTIiCiAgdmlld0JveD0iMCAwIDQ5NSA3OTIiCiAgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCj4KICA8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9mXzQ1N180NTEpIj4KICAgIDxjaXJjbGUKICAgICAgY3g9Ijk5IgogICAgICBjeT0iMzk2IgogICAgICByPSIyOTAuMDMyIgogICAgICBzdHJva2U9IiMwMjY0QjUiCiAgICAgIHN0cm9rZS13aWR0aD0iMTEuOTM1NSIKICAgIC8+CiAgPC9nPgogIDxkZWZzPgogICAgPGZpbHRlcgogICAgICBpZD0iZmlsdGVyMF9mXzQ1N180NTEiCiAgICAgIHg9Ii0yOTciCiAgICAgIHk9IjAiCiAgICAgIHdpZHRoPSI3OTIiCiAgICAgIGhlaWdodD0iNzkyIgogICAgICBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiIKICAgID4KICAgICAgPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIC8+CiAgICAgIDxmZUJsZW5kCiAgICAgICAgbW9kZT0ibm9ybWFsIgogICAgICAgIGluPSJTb3VyY2VHcmFwaGljIgogICAgICAgIGluMj0iQmFja2dyb3VuZEltYWdlRml4IgogICAgICAgIHJlc3VsdD0ic2hhcGUiCiAgICAgIC8+CiAgICAgIDxmZUdhdXNzaWFuQmx1cgogICAgICAgIHN0ZERldmlhdGlvbj0iNTAiCiAgICAgICAgcmVzdWx0PSJlZmZlY3QxX2ZvcmVncm91bmRCbHVyXzQ1N180NTEiCiAgICAgIC8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+Cjwvc3ZnPgo=)`,
      }}
    >
      <section className="px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 sm:gap-10 lg:gap-[41px]">
          {/* Left side */}
          <div className="flex flex-col items-start gap-16">
            <img
              src={gradientGlass}
              className="w-48 h-56 sm:w-56 sm:h-64 lg:w-[217px] lg:h-[233px]"
              draggable={false}
            />

            <div className="flex flex-col items-start gap-6 sm:gap-8">
              <h4 className="font-medium text-2xl sm:text-3xl lg:text-[48px] lg:leading-[60px]">
                Have something in mind?
                <br />
                Let’s bring it to life.
              </h4>
              <p className="text-base sm:text-lg lg:text-[20px] lg:leading-[25px] text-[#4F4F4F] dark:text-[#CFCFCF]">
                We’d love to hear what you’re building. Whether you’re early or
                ready to launch, reach out
              </p>
            </div>
          </div>

          {/* Right side form */}
          <HelpForm />
        </div>
      </section>
    </section>
  );
};

export default ContactForm;
