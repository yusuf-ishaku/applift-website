import clsx from "clsx";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";

export type Product = {
  title: string;
  image: string;
  tags: string[];
  timeToMVP: string;
  industry: string;
  platform1: string;
  satisfaction: string;
  platform2: string;
  raised: string;
  url: string;
};

const StatGrid = ({
  item1,
  item2,
  item3,
}: Record<"item1" | "item2" | "item3", { title: string; value: string }>) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:divide-x sm:divide-[#012D51] gap-6 sm:gap-8 w-full">
    {[item1, item2, item3].map((item, i) => (
      <div
        key={item.title}
        className={clsx(
          "flex flex-col items-start gap-2 sm:gap-4 sm:flex-1",
          i === 1 && "sm:px-6",
        )}
      >
        <p className="text-sm sm:text-base text-white">{item.title}</p>
        <p className="font-medium text-lg sm:text-2xl text-white">
          {item.value}
        </p>
      </div>
    ))}
  </div>
);

const ProductTile = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:!gap-8 max-w-dvw">
      {/* Image */}
      <div className="w-full basis-1/2 h-[486px] lg:w-[598px] /h-auto bg-[#CCE0F0] rounded-[10px] overflow-hidden">
        {/*TODO SORT THIS OUT*/}
        <Image
          quality={70}
          src={product.image}
          draggable={false}
          className="w-full h-full object-cover aspect-video rounded-[10px]"
          alt={product.title}
          width={598}
          height={486}
        />
      </div>

      {/* Details */}
      <div className="flex basis-1/2 flex-col items-start gap-8 lg:gap-14 w-full px-0 lg:px-0">
        <div className="flex flex-col items-start gap-6 w-full">
          <h4 className="font-medium text-2xl sm:text-3xl lg:text-[32px] lg:leading-[40px] text-[#FAFAFA]">
            {product.title}
          </h4>

          <div className="flex flex-wrap items-center gap-2">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-[rgba(1,45,81,0.2)] rounded-[30px] text-xs sm:text-sm text-[#B3D1E9] border border-[#00111E]/40"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <Separator className="!bg-[#012D51] w-full" />

          <div className="flex flex-col gap-8 lg:gap-16 w-full">
            {/*TODO MERGE INTO ONE TILE*/}
            <StatGrid
              item1={{ title: "Time to MVP", value: product.timeToMVP }}
              item2={{ title: "Industry", value: product.industry }}
              item3={{ title: "Platform", value: product.platform1 }}
            />
            <StatGrid
              item1={{ title: "Satisfaction", value: product.satisfaction }}
              item2={{ title: "Platform", value: product.platform2 }}
              item3={{ title: "Raised", value: product.raised }}
            />
          </div>
        </div>

        <Button className="[box-shadow:4px_4px_5px_0px_#014883E5_inset] rounded-[10px] bg-[#0264B5] border border-[#014883] text-sm sm:text-base font-medium text-white">
          Open Website
        </Button>
      </div>
    </div>
  );
};

export default ProductTile;
