// import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { productsUpdate } from "@/context/productsSlice";
interface props {
  showView: boolean;
  setShowView: any;
  dataProduct: any;
}
function PopupEdit({ showView, setShowView, dataProduct }: props) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => {
          setShowView(false), setEdit(true);
          setProductImage("");
        }}
        autoFocus
      />
    </div>
  );
  const headerContent = (
    <div className="flex justify-end mr-3">
      <Button
        icon="pi pi-pencil"
        onClick={() => setEdit((prev) => !prev)}
        autoFocus
      />
    </div>
  );
  const [productImage, setProductImage] = useState(dataProduct.image?.url);
  const [name, setName] = useState(dataProduct.name);
  const [brand, setBrand] = useState(dataProduct.brand);
  const [price, setPrice] = useState(dataProduct.price);
  const [shortDesc, setShortDesc] = useState(dataProduct.shortDesc);
  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    TranformFile(file);
  };

  const TranformFile = (file: any) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
    } else {
      setProductImage("");
    }
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(
      productsUpdate({
        _id: dataProduct._id,
        values: {
          name: name,
          brand: brand,
          shortDesc: shortDesc,
          price: price,
          image: productImage,
        },
      })
    );
    // dispatch(
    //   updateProduct({
    //     _id: dataProduct._id,
    //     brand: brand,
    //     name: name,
    //     price: price,
    //     desc: desc,
    //     image: productImage,
    //   })
    // );
    // try {
    //   const response = await axios.put(`${url}/products/${dataProduct._id}`, {
    //     name: name,
    //     brand: brand,
    //     desc: desc,
    //     price: price,
    //     image: productImage,
    //   });
    //   toast("Update product success");
    // } catch (error) {
    //   console.error("Error updating product", error);
    // }
  };
  // console.log(dataProduct._id, name, brand, desc, price, productImage);
  return (
    <div>
      <Dialog
        visible={showView}
        modal
        footer={footerContent}
        style={{ width: "50rem" }}
        onHide={() => {
          setShowView(false), setEdit(true);
          setProductImage("");
        }}
        header={headerContent}
      >
        <div className="flex flex-row justify-between">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <input
              type="file"
              accept="image/"
              disabled={edit}
              className="border border-gray-400 p-2 rounded-md"
              onChange={handleUploadImage}
            />
            <select
              className="border border-gray-400 py-3 pl-1 rounded-md"
              onChange={(e) => setBrand(e.target.value)}
              required
              disabled={edit}
              value={edit ? dataProduct.brand : brand}
            >
              <option value="">Select Brand</option>
              <option value="apple">apple</option>
              <option value="samsung">samsung</option>
              <option value="xoami">xoami</option>
              <option value="oppo">oppo</option>
            </select>
            <input
              type="text"
              placeholder="name product"
              value={edit ? dataProduct.name : name}
              disabled={edit}
              className="border border-gray-400 py-3 pl-1 rounded-md"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="price"
              disabled={edit}
              value={edit ? dataProduct.price : price}
              className="border border-gray-400 py-3 pl-1 rounded-md"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="description"
              value={edit ? dataProduct.shortDesc : shortDesc}
              disabled={edit}
              className="border border-gray-400 py-3 pl-1 rounded-md"
              onChange={(e) => setShortDesc(e.target.value)}
              required
            />
            <button
              type="submit"
              hidden={edit}
              onClick={() => setShowView(false)}
              className="bg-indigo-600 rounded-md text-white py-3 font-medium"
            >
              Update
            </button>
          </form>
          <div className="w-5/12 border border-gray-400 rounded-lg">
            <div className="h-full flex justify-center">
              {productImage ? (
                <>
                  <img src={productImage} className="p-1" />
                </>
              ) : (
                <>
                  <img src={dataProduct.image?.url} className="p-1" />
                </>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PopupEdit;
