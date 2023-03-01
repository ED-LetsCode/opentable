import {
  Header,
  RestaurantCard,
  SearchSideBar,
} from "@/app/components/searchComponents/Components";
import { PRICE, PrismaClient } from "@prisma/client";

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  const where: any = {};

  if (searchParams.city) {
    where.location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };
  }
  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price,
    };
  }

  return await prisma.restaurant.findMany({
    select,
    where,
  });
};

const fetchLocations = async () => prisma.location.findMany();
const fetchCuisines = async () => prisma.cuisine.findMany();

export default async function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchedRestaurants = await fetchRestaurantsByCity(searchParams);
  //TODO
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {searchedRestaurants.length === 0 ? (
            <p>Sorry, we found no restaurants in this area</p>
          ) : (
            <>
              {searchedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
