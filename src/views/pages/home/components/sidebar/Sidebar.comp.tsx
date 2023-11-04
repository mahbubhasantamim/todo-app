import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import BASE_URL from "../../../../../utils/config";

const productSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  productDesc: z.string(),
});
type productType = z.infer<typeof productSchema>;

type propsType = {
  refetch: () => void;
};

const Sidebar = ({ refetch }: propsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productType>();

  const onSubmit = (data: productType) => {
    console.log(data);
    axios.post(`${BASE_URL}/products`, data).then((response) => {
      console.log(response);
      toast.success("Product created!");
      refetch();
    });
  };
  return (
    <>
      <div>
        <h3 className="text-center text-md font-medium py-3 text-black mb-3">
          Add new product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              type="text"
              {...register("productName", {
                required: "Product name is required",
              })}
              placeholder="Product name"
              className="p-3 text-xs rounded-md mt-3 outline-none"
            />
            <span className="text-xs text-red-500">
              {errors.productName?.message}
            </span>

            <input
              type="number"
              {...register("productPrice", {
                required: "Product price is required",
                valueAsNumber: true,
              })}
              placeholder="Product price"
              className="p-3 text-xs rounded-md mt-3 outline-none"
            />
            <span className="text-xs text-red-500">
              {errors.productPrice?.message}
            </span>

            <textarea
              {...register("productDesc", {
                required: "Product description is required",
              })}
              placeholder="Product description"
              className="h-32 text-xs p-3 rounded-md mt-3 outline-none"
            />
            <span className="text-xs text-red-500">
              {errors.productDesc?.message}
            </span>
          </div>
          <input
            type="submit"
            value="Add product"
            className="bg-slate-900 text-xs text-white font-medium mt-3 py-3 px-6 rounded-md w-full cursor-pointer hover:text-slate-300"
          />
        </form>
      </div>
    </>
  );
};

export default Sidebar;
