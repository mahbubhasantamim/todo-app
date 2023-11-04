import { Route, Routes } from "react-router-dom";
import ErrorPage from "../views/pages/error/Error.page";
import HomePage from "../views/pages/home/Home.page";
import SingleProductPage from "../views/pages/singleProduct/SingleProduct.page";

function Router() {
  return (
    <>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
      </Routes>
    </>
  );
}

export default Router;
