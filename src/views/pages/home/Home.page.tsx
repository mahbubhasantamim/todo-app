import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import BASE_URL from "../../../utils/config";
import ProductCard from "./components/productCard/ProductCard.comp";
import Sidebar from "./components/sidebar/Sidebar.comp";

type productType = {
  id: number;
  productName: string;
  productPrice: number;
  productDesc: string;
};

const HomePage = () => {
  const { data: products, refetch } = useQuery({
    queryKey: ["getProducts"],
    queryFn: async (): Promise<productType[]> => {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    },
  });

  return (
    <>
      <div>
        <div className="flex justify-between items-center px-20 py-4 mb-1 bg-slate-300">
          <div>
            <p className=" text-xl font-medium">
              <Link to="/">E-Shop</Link>
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="bg-slate-300 w-1/4 p-8 h-screen">
            <Sidebar refetch={refetch} />
          </div>
          <div className="w-3/4 p-8">
            <h3 className="text-center font-semibold mb-3 text-lg">Products</h3>
            <div className="grid grid-cols-4">
              {products?.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
