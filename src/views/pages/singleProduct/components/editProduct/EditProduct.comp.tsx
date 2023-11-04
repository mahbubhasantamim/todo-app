import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { z } from "zod";
import BASE_URL from "../../../../../utils/config";

const productSchema = z.object({
  productName: z.string(),
  productPrice: z.number(),
  productDesc: z.string(),
});
type propsType = {
  singleProduct: z.infer<typeof productSchema>;
  openUpdateModal: () => void;
  refetch: () => void;
};

const EditProduct = ({
  singleProduct,
  openUpdateModal,
  refetch,
}: propsType) => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<propsType["singleProduct"]>({
    defaultValues: {
      productName: singleProduct.productName,
      productPrice: singleProduct.productPrice,
      productDesc: singleProduct.productDesc,
    },
  });

  //update product
  const onSubmit = async (data: propsType["singleProduct"]) => {
    try {
      await axios.put(`${BASE_URL}/products/${id}`, {
        productName: data.productName,
        productPrice: data.productPrice,
        productDesc: data.productDesc,
      });
      toast.success("Product updated!");
      refetch();
      openUpdateModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 bg-slate-300 p-10 shadow-lg">
        <h3 className="text-center text-xl font-medium py-3 text-black mb-3">
          Update product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              type="text"
              {...register("productName", {
                required: "Product name is required",
              })}
              placeholder="Product name"
              className="p-3 text-xs rounded-md outline-none"
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
                required: "Product Description is required",
              })}
              placeholder="Product description"
              className="h-32 p-3 text-xs rounded-md mt-3 outline-none"
            />
            <span className="text-xs text-red-500">
              {errors.productDesc?.message}
            </span>
          </div>
          <input
            type="submit"
            value="Update"
            className="bg-green-500 font-medium text-xs py-3 px-6 rounded-md w-full cursor-pointer hover:text-white my-3"
          />
          <button
            className="bg-orange-400 font-medium text-xs py-3 px-6 rounded-md w-full cursor-pointer hover:text-white"
            onClick={openUpdateModal}
          >
            Cancle
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
