import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchallProductbyFilter } from "../productListSlice";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { selectProduct, selectTotalItem } from "../productListSlice";
import { PAGE_DATA_LIMIT } from "../../../app/constant";

const sortOptions = [
  {
    name: "Most Discount",
    sort: "discountPercentage",
    order: "desc",
    current: false,
  },
  {
    name: "Best Rating",
    sort: "rating",
    order: "desc",
    current: false,
  },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  {
    name: "Price: High to Low",
    sort: "price",
    order: "desc",
    current: false,
  },
];
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useSelector(selectProduct);
  const totalItem = useSelector(selectTotalItem);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {

    // option.cheaked = !option.cheaked;
    // console.log( e.target.checked, option.cheaked, section.id, option.value);

    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      let index = newFilter[section.id].findIndex(
        (ele) => ele === option.value
      );

      newFilter[section.id].splice(index, 1);
    }

    // const newFilter = { ...filter, [section.id]: option.value };
    setFilter(newFilter);

    // console.log(newFilter);
  };
  const handleSort = (e, option) => {
    // console.log(option);
    const newFilter = { _sort: option.sort, _order: option.order };
    setSort(newFilter);
    

    // console.log(newFilter);
  };
  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagenation = { _page: page, _limit: PAGE_DATA_LIMIT };
    dispatch(fetchallProductbyFilter({ filter, sort, pagenation }));
  }, [dispatch, filter, sort, page]);
  
  useEffect(() => {
    setPage(1);
  },[totalItem,sort])

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter handleFilter={handleFilter}></DesktopFilter>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Products section ----------------------------------------------------------------------------------------*/}
                <ProductGrid products={products}></ProductGrid>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Pagination starts---------------------------------------------------------- */}

      <Pagenation
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItem = {totalItem}
      ></Pagenation>
    </div>
  );
}

function MobileFilter({
  handleFilter,
  mobileFiltersOpen,
  setMobileFiltersOpen,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function DesktopFilter({ handleFilter }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        // defaultChecked={option.cheaked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, ind) => (
            <Link to={`/productdetails/${product.id}`} key={ind}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex align-center">
                      <StarIcon className="w-5 h-5 inline mr-2" />
                      <span>{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product.price -
                          (product.discountPercentage * product.price) / 100
                      )}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
function Pagenation({ handlePage, page, setPage, totalItem}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="/"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="/"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * PAGE_DATA_LIMIT + 1}
            </span>{" "}
            to <span className="font-medium">{((page * PAGE_DATA_LIMIT) > totalItem)? `${totalItem}`: `${(page * PAGE_DATA_LIMIT)}`}</span> of{" "}
            <span className="font-medium">{totalItem}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {Array.from({ length: Math.ceil(totalItem / PAGE_DATA_LIMIT) }).map(
              (ele, ind) => {
                return (
                  <div
                    key={ind}
                    onClick={(e) => handlePage(ind + 1)}
                    aria-current="page"
                    className={`relative cursor-pointer z-10 inline-flex items-center ${(page === ind+1 )? "bg-indigo-600 text-white" : " bg-white text-gray-400 border-2"}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {ind+1}
                  </div>
                );
              }
            )}

            <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
