import { Link } from "react-router-dom";
import pPhoto from "../../../../../assets/img/p.jpg";

type propsType = {
  product: {
    id: number;
    productName: string;
    productPrice: number;
    productDesc: string;
  };
};

const ProductCard = ({ product }: propsType) => {
  return (
    <>
      <div className=" m-2 pb-3 bg-slate-300 hover:cursor-pointer hover:shadow-lg">
        <Link to={`/products/${product.id}`}>
          <img src={pPhoto} alt="" className="w-full" />
          <div className="py-4 px-6">
            <h2 className="text-lg font-semibold pb-1">
              {product.productName}
            </h2>
            <h3 className="text-sm font-medium mb-3">
              Price: {product.productPrice}
            </h3>

            <p className="text-xs">{product.productDesc}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
