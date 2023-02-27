import {
  Header,
  RestaurantCard,
  SearchSideBar,
} from "@/app/components/searchComponents/Components";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  };

  if (!city) return prisma.restaurant.findMany({ select });

  return await prisma.restaurant.findMany({
    select,
    where: {
      location: {
        name: {
          equals: city,
        },
      },
    },
  });
};

const fetchLocations = async () => prisma.location.findMany();
const fetchCuisines = async () => prisma.cuisine.findMany();

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string };
}) {
  const searchedRestaurants = await fetchRestaurantsByCity(
    searchParams.city.toLowerCase()
  );
  //TODO
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {searchedRestaurants.length === 0 ? (
            <p>Sorry, we found no restaurants in this area</p>
          ) : (
            <>
              {searchedRestaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
