import { ButtonAddtoCart } from "@/components/ButtonStyle";
import { addToCart } from "@/context/CartSlice";
import FilterProduct from "@/layout/FIlterProduct/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

interface items {
  _id: any;
  name: string;
  image: any;
  shortDesc: string;
  price: number;
  brand: string;
}

function Home() {
  let { items: data } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const handleAddToCart = (items: items) => {
    dispatch(addToCart(items));
  };
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "";
  const price = searchParams.get("price") || "";
  const search = searchParams.get("search") || "";
  console.log(search);
  const arrayBrand = brand.split(",").filter(Boolean); // filter(Boolean) removes empty strings
  const arrayPrice = price.split(",").filter(Boolean);

  const priceInRange = (itemPrice: number, range: string) => {
    const [min, max] = range.split("-").map(Number);
    return itemPrice >= min && itemPrice <= max;
  };

  const filteredData = data.filter((item: items) => {
    const matchesBrand =
      arrayBrand.length === 0 || arrayBrand.includes(item.brand);
    const matchesPrice =
      arrayPrice.length === 0 ||
      arrayPrice.some((range) => priceInRange(item.price, range));
    const matchesSearch = item.name.includes(search);
    return matchesBrand && matchesPrice && matchesSearch;
  });

  return (
    <div className="flex pt-12 gap-x-5 px-12">
      <FilterProduct />
      {filteredData.length === 0 && (
        <p className="text-center text-2xl">New Arrivals</p>
      )}
      <div className="flex flex-wrap gap-x-8 gap-y-6 items-center">
        {filteredData.map((items: items) => (
          <div
            key={items._id}
            className="bg-white shadow-xl rounded-xl w-[300px] px-3 py-4 border border-gray-100"
          >
            <Link to={`/product/${items.name}-${items._id}`}>
              <p className="text-2xl font-medium mb-2">{items?.name}</p>
              <img
                src={items.image.url}
                alt={items?.name}
                className="w-10/12 h-[300px] transition duration-150 ease-in-out"
              />
            </Link>
            <div className="flex flex-row justify-between">
              <span>{items.shortDesc}</span>
              <span className="font-semibold text-xl">${items.price}</span>
            </div>
            <button
              className={ButtonAddtoCart}
              onClick={() => handleAddToCart(items)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
