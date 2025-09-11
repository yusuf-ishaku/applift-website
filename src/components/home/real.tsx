import ProductTile from "../global/product-tile";
import homeproduct from "@/assets/images/home-product.png";

const Real = () => {
  return (
    <>
      <div className="mt-[150px] !mx-0 bg-[#00111E] py-[80px]">
        <div className="flex flex-col items-center gap-[24px] max-w-[708px] mx-auto">
          <h2 className="font-medium text-[40px] leading-[50px] text-center text-[#FAFAFA]">
            Real things, Real users, Real traction.
          </h2>
          <p className="text-[20px] leading-[25px] text-center text-[#CFCFCF]">
            We work fast , but we ship things that last. Here’s what we’ve built
            for others.
          </p>
        </div>
        <div className="mt-[64px]">
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
      </div>
    </>
  );
};

export default Real;
