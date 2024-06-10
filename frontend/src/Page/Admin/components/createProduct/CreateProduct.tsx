import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "@/context/productsSlice";
import ClassicEditorComponent from "@/components/Editor";

function CreateProduct() {
  const [productImage, setProductImage] = useState("");

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const auth = useSelector((state: any) => state.auth);
  if (!auth.isAdmin) return <>not authorization access page</>;

  const dispatch = useDispatch();
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        brand,
        shortDesc,
        longDesc,
        price,
        image: productImage,
      })
    );
  };
  return (
    <div className="flex flex-col pt-4 gap-y-10 w-8/12 mx-auto">
      <div className="flex flex-row justify-between">
        <p className="text-xl text-blue-300">Product</p>
        <button className="bg-indigo-600 rounded-md text-white py-2 px-6 font-medium">
          Create
        </button>
      </div>
      <p className="text-3xl">Create a Product</p>
      <div className="flex">
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          <input
            type="file"
            accept="image/"
            required
            className="border border-gray-400 p-2 rounded-md"
            onChange={handleUploadImage}
          />
          <select
            className="border border-gray-400 py-3 pl-1 rounded-md"
            onChange={(e) => setBrand(e.target.value)}
            required
          >
            <option value="">Select Brand</option>
            <option value="iphone">apple</option>
            <option value="samsung">samsung</option>
            <option value="xoami">xoami</option>
            <option value="oppo">oppo</option>
          </select>
          <input
            type="text"
            placeholder="name product"
            className="border border-gray-400 py-3 pl-1 rounded-md"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="price"
            className="border border-gray-400 py-3 pl-1 rounded-md"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="description"
            className="border border-gray-400 py-3 pl-1 rounded-md"
            onChange={(e) => setShortDesc(e.target.value)}
            required
          />
          <ClassicEditorComponent setLongDesc={setLongDesc} />
          <button
            type="submit"
            className="bg-indigo-600 rounded-md text-white py-3 font-medium"
          >
            Submit
          </button>
        </form>
        <div className="w-5/12 border border-gray-400 rounded-lg h-fit">
          <div className="h-full flex justify-center">
            {productImage ? (
              <>
                <img src={productImage} className="p-1" />
              </>
            ) : (
              <>image preview</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
