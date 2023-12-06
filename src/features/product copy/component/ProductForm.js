import React, { useEffect } from "react";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProduct, createProductAsync, fetchSeletedProduct,  selectedProduct, updateProductAsync } from "../../product/productListSlice";
import { Link, useParams } from "react-router-dom";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "smartphones", cheaked: false },
      { value: "laptops", label: "laptops", cheaked: false },
      { value: "fragrances", label: "fragrances", cheaked: false },
      { value: "skincare", label: "skincare", cheaked: false },
      { value: "groceries", label: "groceries", cheaked: false },
      {
        value: "home-decoration",
        label: "home decoration",
        cheaked: false,
      },
      { value: "furniture", label: "furniture", cheaked: false },
      { value: "tops", label: "tops", cheaked: false },
      { value: "womens-dresses", label: "womens dresses", cheaked: false },
      { value: "womens-shoes", label: "womens shoes", cheaked: false },
      { value: "mens-shirts", label: "mens shirts", cheaked: false },
      { value: "mens-shoes", label: "mens shoes", cheaked: false },
      { value: "mens-watches", label: "mens watches", cheaked: false },
      { value: "womens-watches", label: "womens watches", cheaked: false },
      { value: "womens-bags", label: "womens bags", cheaked: false },
      {
        value: "womens-jewellery",
        label: "womens jewellery",
        cheaked: false,
      },
      { value: "sunglasses", label: "sunglasses", cheaked: false },
      { value: "automotive", label: "automotive", cheaked: false },
      { value: "motorcycle", label: "motorcycle", cheaked: false },
      { value: "lighting", label: "lighting", cheaked: false },
    ],
  },
  {
    id: "brand",
    name: "brand",
    options: [
      { value: "Apple", label: "Apple", cheaked: false },
      { value: "Samsung", label: "Samsung", cheaked: false },
      { value: "OPPO", label: "OPPO", cheaked: false },
      { value: "Huawei", label: "Huawei", cheaked: false },
      {
        value: "Microsoft Surface",
        label: "Microsoft Surface",
        cheaked: false,
      },
      { value: "Infinix", label: "Infinix", cheaked: false },
      { value: "HP Pavilion", label: "HP Pavilion", cheaked: false },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
        cheaked: false,
      },
      { value: "Royal_Mirage", label: "Royal_Mirage", cheaked: false },
      {
        value: "Fog Scent Xpressio",
        label: "Fog Scent Xpressio",
        cheaked: false,
      },
      { value: "Al Munakh", label: "Al Munakh", cheaked: false },
      {
        value: "Lord - Al-Rehab",
        label: "Lord   Al Rehab",
        cheaked: false,
      },
      { value: "L'Oreal Paris", label: "L'Oreal Paris", cheaked: false },
      { value: "Hemani Tea", label: "Hemani Tea", cheaked: false },
      { value: "Dermive", label: "Dermive", cheaked: false },
      {
        value: "ROREC White Rice",
        label: "ROREC White Rice",
        cheaked: false,
      },
      { value: "Fair & Clear", label: "Fair & Clear", cheaked: false },
      { value: "Saaf & Khaas", label: "Saaf & Khaas", cheaked: false },
      {
        value: "Bake Parlor Big",
        label: "Bake Parlor Big",
        cheaked: false,
      },
      {
        value: "Baking Food Items",
        label: "Baking Food Items",
        cheaked: false,
      },
      { value: "fauji", label: "fauji", cheaked: false },
      { value: "Dry Rose", label: "Dry Rose", cheaked: false },
      { value: "Boho Decor", label: "Boho Decor", cheaked: false },
      { value: "Flying Wooden", label: "Flying Wooden", cheaked: false },
      { value: "LED Lights", label: "LED Lights", cheaked: false },
      { value: "luxury palace", label: "luxury palace", cheaked: false },
      { value: "Golden", label: "Golden", cheaked: false },
      {
        value: "Furniture Bed Set",
        label: "Furniture Bed Set",
        cheaked: false,
      },
      {
        value: "Ratttan Outdoor",
        label: "Ratttan Outdoor",
        cheaked: false,
      },
      { value: "Kitchen Shelf", label: "Kitchen Shelf", cheaked: false },
      { value: "Multi Purpose", label: "Multi Purpose", cheaked: false },
      { value: "AmnaMart", label: "AmnaMart", cheaked: false },
      {
        value: "Professional Wear",
        label: "Professional Wear",
        cheaked: false,
      },
      { value: "Soft Cotton", label: "Soft Cotton", cheaked: false },
      { value: "Top Sweater", label: "Top Sweater", cheaked: false },
      {
        value: "RED MICKY MOUSE..",
        label: "RED MICKY MOUSE..",
        cheaked: false,
      },
      {
        value: "Digital Printed",
        label: "Digital Printed",
        cheaked: false,
      },
      { value: "Ghazi Fabric", label: "Ghazi Fabric", cheaked: false },
      { value: "IELGY", label: "IELGY", cheaked: false },
      { value: "IELGY fashion", label: "IELGY fashion", cheaked: false },
      {
        value: "Synthetic Leather",
        label: "Synthetic Leather",
        cheaked: false,
      },
      {
        value: "Sandals Flip Flops",
        label: "Sandals Flip Flops",
        cheaked: false,
      },
      { value: "Maasai Sandals", label: "Maasai Sandals", cheaked: false },
      {
        value: "Arrivals Genuine",
        label: "Arrivals Genuine",
        cheaked: false,
      },
      {
        value: "Vintage Apparel",
        label: "Vintage Apparel",
        cheaked: false,
      },
      { value: "FREE FIRE", label: "FREE FIRE", cheaked: false },
      { value: "The Warehouse", label: "The Warehouse", cheaked: false },
      { value: "Sneakers", label: "Sneakers", cheaked: false },
      { value: "Rubber", label: "Rubber", cheaked: false },
      { value: "Naviforce", label: "Naviforce", cheaked: false },
      { value: "SKMEI 9117", label: "SKMEI 9117", cheaked: false },
      { value: "Strap Skeleton", label: "Strap Skeleton", cheaked: false },
      { value: "Stainless", label: "Stainless", cheaked: false },
      {
        value: "Eastern Watches",
        label: "Eastern Watches",
        cheaked: false,
      },
      { value: "Luxury Digital", label: "Luxury Digital", cheaked: false },
      { value: "Watch Pearls", label: "Watch Pearls", cheaked: false },
      { value: "Bracelet", label: "Bracelet", cheaked: false },
      { value: "LouisWill", label: "LouisWill", cheaked: false },
      {
        value: "Copenhagen Luxe",
        label: "Copenhagen Luxe",
        cheaked: false,
      },
      { value: "Steal Frame", label: "Steal Frame", cheaked: false },
      { value: "Darojay", label: "Darojay", cheaked: false },
      {
        value: "Fashion Jewellery",
        label: "Fashion Jewellery",
        cheaked: false,
      },
      { value: "Cuff Butterfly", label: "Cuff Butterfly", cheaked: false },
      {
        value: "Designer Sun Glasses",
        label: "Designer Sun Glasses",
        cheaked: false,
      },
      { value: "mastar watch", label: "mastar watch", cheaked: false },
      { value: "Car Aux", label: "Car Aux", cheaked: false },
      { value: "W1209 DC12V", label: "W1209 DC12V", cheaked: false },
      { value: "TC Reusable", label: "TC Reusable", cheaked: false },
      { value: "Neon LED Light", label: "Neon LED Light", cheaked: false },
      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "METRO 70cc Motorcycle   MR70",
        cheaked: false,
      },
      { value: "BRAVE BULL", label: "BRAVE BULL", cheaked: false },
      { value: "shock absorber", label: "shock absorber", cheaked: false },
      { value: "JIEPOLLY", label: "JIEPOLLY", cheaked: false },
      { value: "Xiangle", label: "Xiangle", cheaked: false },
      {
        value: "lightingbrilliance",
        label: "lightingbrilliance",
        cheaked: false,
      },
      { value: "Ifei Home", label: "Ifei Home", cheaked: false },
      { value: "DADAWU", label: "DADAWU", cheaked: false },
      { value: "YIOSI", label: "YIOSI", cheaked: false },
    ],
  },
];

const ProductForm = () => {

  // const Navigate = useNavigate();

  const params = useParams();
  const OneProduct = useSelector( selectedProduct );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if( params.id ){
      dispatch(fetchSeletedProduct(params.id));
    }

  }, [params.id, dispatch])

  useEffect( () => {
    if( OneProduct === null ){
      reset()
      // setValue('title', '');
      // setValue('description', '');
      // setValue('price', '');
      // setValue('stock', '');
      // setValue('discountPercentage', '');
      // setValue('brand', '');
      // setValue('category', '');
      // setValue('thumbnail', '');
      // setValue('image1', '');
      // setValue('image2', '');
      // setValue('image3', OneProduct.images[2]);
    }
    if( OneProduct !== null && params.id  ){
      setValue('title', OneProduct.title);
      setValue('description', OneProduct.description);
      setValue('price', OneProduct.price);
      setValue('stock', OneProduct.stock);
      setValue('discountPercentage', OneProduct.discountPercentage);
      setValue('brand', OneProduct.brand);
      setValue('category', OneProduct.category);
      setValue('thumbnail', OneProduct.thumbnail);
      setValue('image1', OneProduct.images[0]);
      setValue('image2', OneProduct.images[1]);
      setValue('image3', OneProduct.images[2]);
    }
  }, [OneProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = {...OneProduct};
    product.deleted = true;
    dispatch(updateProductAsync(product));
    // Navigate('/admin');
    console.log("run");
    dispatch(clearSelectedProduct());
    console.log(OneProduct);
  }

  

  return (
    <>
      <form noValidate onSubmit={(handleSubmit((data) => {
        const product = {...data };
        product.images = [ data.image1, data.image2, data.image3, data.thumbnail];
        product.rating = Number(5.0);
        product.price = +data.price;
        product.stock = +data.stock;
        product.discountPercentage
        = +data.discountPercentage
        ;
        delete product.image1
        delete product.image2
        delete product.image3
        // console.log(product);

        if( params.id ){
          product.rating = OneProduct.rating;
          product.id = params.id;
          dispatch(updateProductAsync(product));
        }
        else{
          dispatch(createProductAsync(product));
        }

        reset();
      }))}>
        <div className="space-y-12 bg-white p-4">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("title", {
                        required: "ProductName is required",
                      })}
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    {...register('description', {
                      required : 'Description is required'
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about Product.
                </p>
              </div>
              
              <div className="col-span-2">
                <label
                  htmlFor="Price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                        min: 1,
                        max: 1000000
                      })}
                      id="Price"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="Stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "Stock is required",
                        min: 1,
                        max: 1000000
                      })}
                      id="Stock"
                      autoComplete="Stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount {"(%)"}
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("discountPercentage", {
                        required: "discountPercentage is required",
                        min: 1,
                        max: 100
                      })}
                      id="discountPercentage"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Categories
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <select className=" w-full"
                    id="category"
                    {...register('category', {
                      required: "category is required "
                    })}
                    >
                      <option value="">--Choose One--</option>
                      {filters[0].options.map((ele,ind) => {
                        return(
                          <option key={ind} value={ele.value}>{ele.label}</option>
                        )
                      })}
                      
                    </select> 
                  </div>
                </div>
              </div>

              <div className="col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <select className=" w-full"
                    id="brand"
                    {...register('brand', {
                      required: "category is required "
                    })}
                    >
                      <option value="">--Choose One--</option>
                      {filters[1].options.map((ele,ind) => {
                        return(
                          <option key={ind} value={ele.value}>{ele.label}</option>
                        )
                      })}
                      
                    </select> 
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image1", {
                        required: "image1 is required",
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image2", {
                        required: "image1 is required",
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      {...register("image3", {
                        required: "image3 is required",
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
          to='/admin'
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className=" rounded-md py-1 px-3 text-sm font-semibold bg-red-500 leading-6 text-white hover:bg-red-600"
          >
            Delete
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
