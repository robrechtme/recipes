import Image from "next/image";
import * as Images from "./images";

export const RecipeImage = ({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) => {
  return (
    <Image
      src={Images[slug as keyof typeof Images]}
      className={className}
      priority
      alt=""
    />
  );
};
