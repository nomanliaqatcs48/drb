import Banner from "../common/banner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { ENV } from "../../config/config";
import ProductCard from "../common/ProductCard";

const NewProduct = ({ productCategories, productCategoriesLoading }) => {
  return (
    <>
      {productCategories.length > 0 ? (
        <>
          <Banner
            bannerProducts={
              productCategories.length > 0
                ? productCategories.filter((item) => item.isBanner)
                : []
            }
          />
          <h2 className="mt-5 mb-4">Souvenir Categories</h2>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
          >
            <Masonry gutter={"10px"}>
              {productCategories.length > 0 &&
                productCategories
                  .filter((item) => !item.isBanner)
                  .map((category, i) => (
                    <div key={i}>
                      <ProductCard
                        name={category.title}
                        imageUrl={`${ENV.fileBaseUrl}/${category.fileName}`}
                        redirectUrl={`/souvenirs/category/${category.categoryId}`}
                        section="category"
                      />
                    </div>
                  ))}
            </Masonry>
          </ResponsiveMasonry>
        </>
      ) : (
        <h2
          className="text-center"
          style={{ marginTop: "11rem", minHeight: "18vh" }}
        >
          {" "}
          {productCategoriesLoading
            ? "Loading..."
            : "Product categories not found"}
        </h2>
      )}
    </>
  );
};

export default NewProduct;
