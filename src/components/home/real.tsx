import ProductTile from "../global/product-tile";
import homeproduct from "@/assets/images/home-product.png";

const Real = () => {
  return (
    <section className="mt-24 sm:mt-32 bg-[#00111E] py-16 sm:py-20">
      <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-3xl /max-w-[708px] mx-auto px-4 text-center">
        <h2 className="font-medium text-2xl sm:text-3xl lg:text-[40px] lg:leading-[50px] text-[#FAFAFA]">
          Real things, Real users, Real traction.
        </h2>
        <p className="text-base sm:text-lg lg:text-[20px] lg:leading-[25px] text-[#CFCFCF]">
          We work fast, but we ship things that last. Here’s what we’ve built
          for others.
        </p>
      </div>

      <div className="mt-12 sm:mt-16 px-4 lg:px-0">
        <ProductTile
          product={{
            image: homeproduct,
            industry: "Health & Wellness",
            platform1: "iOS & Web",
            platform2: "Web & Mobile",
            raised: "$1M",
            satisfaction: "95%",
            tags: ["SaaS", "B2B", "Artificial Intelligence"],
            timeToMVP: "4 wks",
            title: "LoopJournal",
            url: "#",
          }}
        />
      </div>
    </section>
  );
};

export default Real;
