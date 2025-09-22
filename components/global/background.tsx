import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ComponentProps, FC } from "react";

const Background: FC<Omit<ComponentProps<typeof Image>, "alt">> = ({
  className,
  quality,
  placeholder,
  ...props
}) => (
  <div style={{ position: "relative", width: "100%", height: "300px" }}>
    <Image
      {...props}
      alt=""
      placeholder={placeholder ?? "blur"}
      quality={quality ?? 100}
      fill
      layout="fill"
      className={cn("object-cover size-full", className)}
    />
  </div>
);

export default Background;
