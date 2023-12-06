import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetLastOrder, selectLastOrder } from "../features/order/orderSlice";
import { Navigate } from "react-router-dom";
import { resetCartAsync, selectItem } from "../features/cart/cartSlice";
import { selectUser } from "../features/auth/authSlice";

const Success = () => {

  // const lastOrder = useSelector( selectLastOrder );
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const param = useParams();

  useEffect( ( ) => {

    dispatch(resetCartAsync(user?.id));

    //reset last order
    dispatch(resetLastOrder());

  }, [dispatch, user])

  return (
    <>
    {!param && <Navigate to='/'></Navigate>}
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-semibold text-indigo-600">Order ID - {param.id}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-600 sm:text-5xl ">
          Order Successfull !
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Order placed in buket
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
    </>
  );
};

export default Success;
