import fullStar from "../../../../public/icons/full-star.png";
import halfStar from "../../../../public/icons/half-star.png";
import emptyStar from "../../../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "@/utilities/calculateReviewRatingAverage";

export default function Stars({
  reviews,
  rating,
}: {
  reviews?: Review[];
  rating?: number;
}) {
  const reviewRating = rating || calculateReviewRatingAverage(reviews);
  const renderStars = () => {
    const starsArr = [];
    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((reviewRating - i).toFixed(1));
      if (difference >= 1) starsArr.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) starsArr.push(emptyStar);
        else if (difference >= 0.2 && difference <= 0.6)
          starsArr.push(halfStar);
        else starsArr.push(fullStar);
      } else starsArr.push(emptyStar);
    }

    return starsArr.map((star) => (
      <Image src={star} alt="" className="w-4 h-4 mr-1" />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
}
