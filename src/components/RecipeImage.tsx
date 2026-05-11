import { images } from "@data";
import Image from "next/image";

export const RecipeImage = ({
  slug,
  className,
  priority = false,
  sizes,
}: {
  slug: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) => {
  return (
    <Image
      src={images[slug as keyof typeof images]}
      className={className}
      placeholder="blur"
      priority={priority}
      sizes={sizes}
      alt=""
    />
  );
};
