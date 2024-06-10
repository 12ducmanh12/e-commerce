import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  decreaseCart,
  increaseCart,
  ClearCart,
  getTotals,
} from "@/context/CartSlice";
import { useEffect } from "react";
import PaymentButton from "@/components/PaymentButton";

interface products {
  _id: any;
  name: string;
  image: any;
  desc: string;
  price: number;
  cartQuantity: number;
}
interface ItemProps {
  image: string;
  name: string;
  desc: string;
  price: number;
  cartQuantity: number;
  product: any;
}
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);
  function ShowItems({
    image,
    name,
    desc,
    price,
    cartQuantity,
    product,
  }: ItemProps) {
    return (
      <div className="flex justify-between border-b border-gray-400 py-3">
        <div className="w-5/12 flex">
          <img src={image} className="w-3/12 h-3/12" alt={name} />
          <div className="ml-3">
            <p className="text-xl mt-4">{name}</p>
            <p className="mt-1">{desc}</p>
            <button
              className="w-fit mt-3 hover:text-red-500 hover:font-semibold"
              onClick={() => handleRemoveFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="w-2/12 items-center flex">
          <p>${price}</p>
        </div>
        <div className="w-3/12 flex flex-row items-center">
          <div className="border border-gray-400 rounded-lg w-fit h-fit flex flex-row items-center">
            <button
              className="px-5 py-3 hover:bg-slate-100 rounded-lg"
              onClick={() => handleDecreaseCart(product)}
            >
              -
            </button>
            <p className="px-4">{cartQuantity}</p>
            <button
              className="px-5 py-3 hover:bg-slate-100 rounded-lg"
              onClick={() => handleIncreaseCart(product)}
            >
              +
            </button>
          </div>
        </div>
        <div className="w-2/12 items-center justify-end flex">
          <p>${price * cartQuantity}</p>
        </div>
      </div>
    );
  }
  function handleRemoveFromCart(cartItem: any) {
    dispatch(removeFromCart(cartItem));
  }
  function handleDecreaseCart(cartItem: any) {
    dispatch(decreaseCart(cartItem));
  }
  function handleIncreaseCart(cartItem: any) {
    dispatch(increaseCart(cartItem));
  }
  function handleClearCart() {
    dispatch(ClearCart(null));
  }
  useEffect(() => {
    dispatch(getTotals(null));
  }, [cart, dispatch]);
  return (
    <div className="mb-8">
      <p className="text-center text-4xl font-normal mt-8">Shopping Cart</p>
      {cart.cartItems.length === 0 ? (
        <div className="px-20 mt-4">
          <p>Your cart is currently empty</p>
          <Link
            to="/"
            className="flex flex-row gap-x-4 items-center mt-2 text-gray-500"
          >
            <i className="pi pi-arrow-left"></i>
            <p>Start Shopping</p>
          </Link>
        </div>
      ) : (
        <div className="px-20">
          <div className="mt-8 divide-y divide-gray-400">
            <div className="flex-row flex mb-4">
              <p className="w-5/12">PRODUCT</p>
              <p className="w-2/12">PRICE</p>
              <p className="w-3/12">QUANTITY</p>
              <p className="w-2/12 text-end">TOTAL</p>
            </div>
            <div>
              {cart.cartItems?.map((product: products) => (
                <ShowItems
                  product={product}
                  key={product._id}
                  image={product.image.url}
                  name={product.name}
                  desc={product.desc}
                  price={product.price}
                  cartQuantity={product.cartQuantity}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button
              className="px-8 py-2 mt-6 h-fit border border-gray-400 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className="mt-3">
              <div className="flex flex-row justify-between">
                <p className="text-2xl font-medium">Subtotal</p>
                <p className="text-2xl font-medium">${cart.cartTotalAmount}</p>
              </div>
              <p className="my-2 text-gray-500">
                Taxes and shipping calculated at checkout
              </p>
              {auth._id ? (
                <PaymentButton CartItems={cart.cartItems} />
              ) : (
                <Link to="/login">
                  <button className="bg-yellow-400 text-white w-full py-2 rounded-lg">
                    Login to Check Out
                  </button>
                </Link>
              )}
              <Link
                to="/"
                className="flex flex-row items-center gap-x-2 text-gray-500 mt-3"
              >
                <i className="pi pi-arrow-left"></i>
                <p>Continue Shopping</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
