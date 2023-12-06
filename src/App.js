// import Counter from "./features/counter/Counter";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/component/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemAsync, selectItem } from "./features/cart/cartSlice";
import { checkUserAsync, selectUser } from "./features/auth/authSlice";
import Page404 from './pages/page404';
import Success from "./pages/Success";
import { fetchUserAsync } from "./features/User/userSlice";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import Logout from "./features/auth/component/Logout";
import ForgotPassword from "./features/auth/component/ForgotPassword";
import AdminProtected from './features/auth/component/AdminProtected';
import AdminHome from "./pages/AdminHome";
import AdminProductDetails from "./features/product copy/component/AdminProductDetail";
import ProductFormPage from "./pages/ProductFormPage";
import AdminOrdersPage from './pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminHome></AdminHome>
      </AdminProtected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/productdetails/:id",
    element: (
      <Protected>
        <ProductDetailsPage></ProductDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/productdetails/:id",
    element: (
      <AdminProtected>
        <AdminProductDetails></AdminProductDetails>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/productform",
    element: (
      <AdminProtected>
        <ProductFormPage></ProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: "/admin/productform/edit/:id",
    element: (
      <AdminProtected>
        <ProductFormPage></ProductFormPage>
      </AdminProtected>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <AdminProtected>
        <AdminOrdersPage></AdminOrdersPage>
      </AdminProtected>
    ),
  },
  {
    path: "/success/:id",
    element: (
      <Success></Success>
    ),
  },
  {
    path: "/orders",
    element: (
      <UserOrderPage></UserOrderPage>
    ),
  },
  {
    path: "/profile",
    element: (
      <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path: "/logout",
    element: (
      <Logout></Logout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <ForgotPassword></ForgotPassword>
    ),
  },
  {
    path: "*",
    element: (
      <Page404></Page404>
    ),
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(checkUserAsync());
  },[dispatch])

  useEffect(() => {
    if( user !== null){
      dispatch(fetchItemAsync(user.id));
      dispatch(fetchUserAsync(user.id));
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
