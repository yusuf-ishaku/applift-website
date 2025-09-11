import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
}: Record<
  "item1" | "item2" | "item3",
  {
    title: string;
    value: string;
  }
>) => (
  <div className="grid grid-cols-2 lg:flex items-center gap-[56px]">
    <div className="lg:basis-[20%] flex flex-col items-start gap-[16px]">
      <p className="text-[16px] leading-[20px] text-center text-white">
        {item1.title}
      </p>
      <p className="font-medium text-[24px] leading-[30px] text-center text-white">
        {item1.value}
      </p>
    </div>
    <div className="lg:basis-[60%] flex flex-col items-start gap-[16px] border-x-[#012D51] border-solid border-x-2 px-8">
      <p className="text-[16px] leading-[20px] text-center text-white">
        {item2.title}
      </p>
      <p className="font-medium text-[24px] leading-[30px] text-center text-white">
        {item2.value}
      </p>
    </div>
    <div className="col-span-2 lg:basis-[20%] flex flex-col items-start gap-[16px]">
      <p className="text-[16px] leading-[20px] text-center text-white">
        {item3.title}
      </p>
      <p className="font-medium text-[24px] leading-[30px] text-center text-white">
        {item3.value}
      </p>
    </div>
  </div>
);

const ProductTile = ({ product }: { product: Product }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-[57px] max-w-[1342px]">
        <div className="lg:w-[642px] h-[428px] bg-[#CCE0F0] rounded-[10px]">
          <img
            src={product.image}
            draggable={false}
            className="size-full aspect-video rounded-[10px]"
          />
        </div>
        <div className="flex flex-col items-start gap-[56px]">
          <div className="flex flex-col items-start gap-[24px] ">
            <h4 className="font-medium text-[32px] leading-[40px] text-[#FAFAFA]">
              {product.title}
            </h4>
            <div className="flex items-center gap-[16px]">
              {product.tags.map((tag) => (
                <Badge
                  className="box-border bg-[rgba(1,45,81,0.2)] rounded-[30px] text-[14px] leading-[20px] text-center text-[#B3D1E9] border border-solid [border-image-source:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Separator className="!bg-[#012D51] lg:!w-[620px]" />
            <div className="flex flex-col gap-y-10 lg:gap-y-[64px] w-full">
              <StatGrid
                item1={{
                  title: "Time to MVP",
                  value: product.timeToMVP,
                }}
                item2={{
                  title: "Industry",
                  value: product.industry,
                }}
                item3={{
                  title: "Platform",
                  value: product.platform1,
                }}
              />
              <StatGrid
                item1={{
                  title: "Satisfaction",
                  value: product.satisfaction,
                }}
                item2={{
                  title: "Platform",
                  value: product.platform2,
                }}
                item3={{
                  title: "Raised",
                  value: product.raised,
                }}
              />
            </div>
          </div>
          <Button className="[box-shadow:4px_4px_5px_0px_#014883E5_inset] rounded-[10px] box-border bg-[#0264B5] border border-solid border-[#014883] text-[14px] leading-[18px] font-medium text-white backdrop-blur-3xl">
            Open Website
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductTile;
