import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DetailProduct() {
  const id = useParams();
  const id_product = id.id?.split("-")[1];

  const { items: data } = useSelector((state: any) => state.products);
  const product = data.find((p: any) => p._id === id_product);
  function createMarkup() {
    return { __html: product?.longDesc };
  }
  return (
    <div className="px-24 mt-12">
      <div className="flex items-center">
        <img src={product?.image?.url} alt={product?.name} className="border border-gray-400 rounded-md"/>
        <div>
          <p>{product?.name}</p>
          <p>{product?.shortDesc}</p>
          <p>{product?.price}</p>
        </div>
      </div>

      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}

export default DetailProduct;
