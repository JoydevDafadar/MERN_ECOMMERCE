import React from "react";
import { useDispatch } from "react-redux";
import { selectItem, updateCartAsync, deleteCartAsync } from "../features/cart/cartSlice";

import { useState } from "react";
import {useSelector} from 'react-redux'
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectUser } from "../features/auth/authSlice";
import { selecctUserInfo, updateUserAsync } from "../features/User/userSlice";
import { createOrderAsync, selectLastOrder } from "../features/order/orderSlice";


const Checkout = () => {

  const user = useSelector(selecctUserInfo);
  const lastOrder = useSelector(selectLastOrder);
  // console.log( user );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(true);
  const [selectedAddress, setSelectedAddress]  = useState(null);
  const [paymentMethod, setPaymentMethod]  = useState('cash');

  const item = useSelector(selectItem);

  const totalPrice = item.reduce((sum, ele) => sum+(ele.product.price*ele.quantity),0)
  const totalItem = item.reduce((sum, ele) => sum+ele.quantity,0);
  


  const dispatch = useDispatch(); 

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id: item.id, quantity: +e.target.value }))
  }
  const handleRemove = (itemId) => {
    dispatch(deleteCartAsync(itemId));
  }

  const handleAddress = (e) => {
    setSelectedAddress( user.address[e.target.value] );
  }

  const handlePayment = (e) => {
    // console.log( e.target.value );
    setPaymentMethod(e.target.value);
  }

  const handleOrder = () => {

    const order = { item, totalItem, user: user.id, totalPrice, selectedAddress, paymentMethod, status: 'pending'};
    // console.log( order );

    dispatch(createOrderAsync(order));

  }


  return (
    <>
    {lastOrder && <Navigate to={`/success/${lastOrder?.id}`}></Navigate>}
    {item.length === 0 && <Navigate to='/'></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 ">
          <div className="bg-white mt-8 col-span-3 pt-5 lg:px-5">
            <form noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(updateUserAsync({...user, address: [...user.address, data]}));
              reset();
              // console.log(data);
            })}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className=" text-3xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive Order.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', {
                            required : "Name is required",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', {
                            required : "Email is required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone No -
                      </label>
                      <div className="mt-2">
                      <input
                          id="phone"
                          {...register('phone', {
                            required : "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', {
                            required : "Street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', {
                            required : "City is required",
                          })}
                          id="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', {
                            required : "State is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', {
                            required : "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Address
                  </h2>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-1xl font-semibold leading-6 text-gray-900 mb-3">
                        Choose Existing Email
                      </legend>
                      <ul className="divide-y divide-gray-100">
                        {user.address.map((person, ind) => (
                          <li
                            key={ind}
                            className="flex justify-between gap-x-6 py-5 border-gray-300 border-2 border-solid px-4 mb-2"
                          >
                            <div className="flex  min-w-0 gap-x-4">
                              <input
                                onChange={handleAddress}
                                name="address"
                                type="radio"
                                value={ind}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {person.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {person.street}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                Ph No : {person.phone}
                              </p>
                              <p className="text-sm leading-6 text-gray-900">
                                {person.state}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </fieldset>
                    <fieldset>
                      <legend className="text-2xl font-semibold leading-6 text-gray-900">
                        Payment Method
                      </legend>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payment"
                            onChange={handlePayment}
                            checked = {paymentMethod === 'cash'}
                            value='cash'
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payment"
                            onChange={handlePayment}
                            checked = {paymentMethod === 'card'}
                            value='card'
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-2">
            <div className=" bg-white mt-7 mx-auto max-w-7xl px-2 sm:px-2 lg:px-2">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-5">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {item.map((product) => (
                      <li key={product.product.id} className="flex py-6">
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
                                <a href={product.product.href}>{product.product.title}</a>
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
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                value={product.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </p>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(product.product.id)}
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
                  <div
                    onClick={handleOrder}
                    to="/checkout"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Buy Now
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
