import {
  Description,
  Header,
  Images,
  Rating,
  ReservationCard,
  RestaurantNavbar,
  Reviews,
  Title,
} from "@/app/components/restaurantComponents/Components";

export default function RestaurantDetails() {
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Title />
        <Rating />
        <Description />
        <Images />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </>
  );
}
