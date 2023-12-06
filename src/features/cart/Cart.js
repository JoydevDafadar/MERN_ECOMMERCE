import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, updateCartAsync, deleteCartAsync } from "./cartSlice";
import { Link, Navigate } from "react-router-dom";



export default function Cart() {

  const [open, setOpen] = useState(true);

  const item = useSelector(selectItem);

  const totalPrice = item.reduce((sum, ele) => sum+(ele.product.price*ele.quantity),0)
  const totalItem = item.reduce((sum, ele) => sum+ele.quantity,0)
  

  // const count = useSelector(selectCount);
  const dispatch = useDispatch(); 

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id: item.id, quantity: +e.target.value }))
  }
  const handleRemove = (itemId) => {
    dispatch(deleteCartAsync(itemId));
  }



  return (
    <>
    {item.length === 0 && <Navigate to='/'></Navigate>}
      <div className=" bg-white mt-7 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {item.map((product) => (
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
                          <a href={product.href}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">$ {product.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        <label
                          htmlFor="password"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select onChange={(e) => handleQuantity(e, product)} value={product.quantity}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </p>

                      <div className="flex">
                        <button
                          onClick={(e) => handleRemove(product.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
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
            <p>$ {totalPrice}</p>
          </div>
          <div className="flex py-2 justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItem} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
