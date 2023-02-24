import {
  Header,
  RestaurantNavbar,
  Menu,
} from "@/app/components/restaurantComponents/Components";

export default function RestaurantMenu() {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Menu />
      </div>
    </>
  );
}
