import Image from "next/image";

import { images } from "@data";

export const RecipeImage = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  return (
    <Image
      src={images[slug as keyof typeof images]}
      className={className}
      priority
      alt=""
    />
  );
};
