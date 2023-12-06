import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrdedrs } from "../userSlice";
import { selectUser } from "../../auth/authSlice";
import { fetchOrdersAsync } from "../userSlice";

export default function UserOrder() {
  const orders = useSelector(selectOrdedrs);
  const dispatch = useDispatch();

  const loggedInUser = useSelector(selectUser);

  useEffect(() => {
    //  console.log(loggedInUser)
    dispatch(fetchOrdersAsync(loggedInUser?.id));
  }, [dispatch, loggedInUser]);

  return (
    <div>
      <div>
        {orders.map((ele, ind) => {

          // console.log(ele.selectedAddress)

          return (
            <>
              <div
                className=" bg-white mt-7 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
                key={ind}
              >
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">
                    Order # {ele.id}
                  </h1>
                  <h3 className="text-1xl font-bold tracking-tight text-red-900 mb-5">
                    Order status : {ele.status}
                  </h3>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {ele.item.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <p>{product.product.title}</p>
                                </h3>
                                <p className="ml-4">$ {product.product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty - {product.quantity}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex py-2 justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {ele.totalPrice}</p>
                  </div>
                  <div className="flex py-2 justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{ele.totalItem} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div
                    className="flex justify-between gap-x-6 my-2 py-5 border-gray-300 border-2 border-solid px-4 mb-2"
                  >
                    <div className="flex  min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {ele.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {ele.selectedAddress.street}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Ph No : {ele.selectedAddress.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {ele.selectedAddress.state}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
