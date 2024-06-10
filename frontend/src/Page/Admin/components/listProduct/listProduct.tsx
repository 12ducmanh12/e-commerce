import { useState } from "react";
import { useSelector } from "react-redux";
import PopupEdit from "./component/PopupEdit";
import PopupConfirmDelete from "./component/PopupConfirmDelete";
interface items {
  _id: any;
  name: string;
  brand: string;
  desc: string;
  image: any;
  price: number;
}

function ListProduct() {
  const { items: data } = useSelector((state: any) => state.products);
  const [showView, setShowView] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [dataProduct, setDataProduct] = useState({
    ProductId: 0,
    ProductName: "",
    ProductBrand: "",
    ProductDesc: "",
    ProductPrice: "",
    ProductImage: "",
  });
  const [deleteProduct, setDeleteProduct] = useState(0);
  return (
    <div className="w-10/12 mx-4">
      <PopupEdit
        showView={showView}
        setShowView={setShowView}
        dataProduct={dataProduct}
      />
      <PopupConfirmDelete
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        deleteProduct={deleteProduct}
      />
      <h1 className="text-3xl my-3">List products</h1>
      {data.map((items: items) => (
        <div
          key={items?._id}
          className="flex justify-between bg-white shadow-xl px-3 py-2 border h-fit border-gray-100"
        >
          <div className="flex flex-row gap-x-8">
            <img
              src={items?.image?.url}
              alt={items?.name}
              className="max-h-10"
            />
            <div className="flex flex-row items-center">
              <p className="text-xl">{items?.name}</p>
            </div>
          </div>
          <div className="flex gap-x-4">
            <button
              onClick={() => {
                setShowView(true), setDataProduct(items);
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                setConfirmDelete(true), setDeleteProduct(items._id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListProduct;
