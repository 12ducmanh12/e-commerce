import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "@/context/Api";

const PaymentButton = ({ CartItems } : any) => {
  const user = useSelector((state: any) => state.auth);
  const handlePayment = () => {
    console.log(CartItems);
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        CartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <button
      onClick={() => handlePayment()}
      className="bg-indigo-500 text-white w-full py-2 rounded-lg"
    >
      Check Out
    </button>
  );
};

export default PaymentButton;
