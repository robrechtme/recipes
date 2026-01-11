import * as Images from "@data/images";
import Image from "next/image";

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
