import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import pPhoto from "../../../assets/img/p.jpg";
import BASE_URL from "../../../utils/config";
import EditProductComp from "./components/editProduct/EditProduct.comp";

const SingleProductPage = () => {
  const [updateModal, setUpdateModal] = useState(false);

  //Get single product
  const { id } = useParams();
  const { data: singleProduct, refetch } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    },
  });

  //Delete product
  const navigate = useNavigate();
  const deleteProduct = () => {
    axios
      .delete(`${BASE_URL}/products/${id}`)
      .then(() => {
        toast.success("Product deleted!");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  //Update product
  const openUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <>
      <div className="mt-16">
        <div className="w-8/12 m-auto ">
          <div className="flex m-2 p-8 rounded-md bg-slate-300 hover:shadow-lg">
            <img src={pPhoto} alt="" className="w-2/4" />
            <div className="w-2/4 p-6 relative">
              <h2 className="text-2xl font-semibold pb-1">
                {singleProduct?.productName}
              </h2>
              <h3 className="text-md font-medium mb-5">
                Price: {singleProduct?.productPrice}
              </h3>

              <p>{singleProduct?.productDesc}</p>

              <div className="text-left absolute bottom-0 right-0">
                <button
                  className="py-1 px-4 text-xs rounded-md bg-orange-400"
                  onClick={openUpdateModal}
                >
                  Edit
                </button>
                <button
                  className="py-1 px-4 text-xs rounded-md bg-red-500 ml-2"
                  onClick={deleteProduct}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {updateModal ? (
          <EditProductComp
            openUpdateModal={openUpdateModal}
            singleProduct={singleProduct}
            refetch={refetch}
          />
        ) : null}
      </div>
    </>
  );
};
export default SingleProductPage;
