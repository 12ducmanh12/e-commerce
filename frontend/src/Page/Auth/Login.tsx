import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/context/AuthSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };
  useEffect(() => {
    if (auth._id) {
      navigate("/cart");
    }
  }, [auth._id, navigate]);

  return (
    <div className="flex flex-col items-center mt-8">
      <p className="text-3xl font-semibold">Login</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6 w-4/12 mt-8"
      >
        <input
          className="py-2 border border-gray-400 rounded-md px-2"
          type="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="py-2 border border-gray-400 rounded-md px-2"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {auth.loginStatus === "rejected" ? (
          <p className="text-red-500">{auth.loginError}</p>
        ) : null}
        <button
          type="submit"
          className="bg-indigo-600 rounded-md text-white py-2 font-medium"
        >
          {auth.loginStatus === "pending" ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
