import HomePage from "../pages/HomePage/HomePage.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
import OrderPage from "../pages/OrderPage/OrderPage.jsx";
import ProductsPage from "../pages/ProductsPage/ProductsPage.jsx";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage.jsx";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import SignUpPage from "../pages/SignUpPage/SignUpPage.jsx";
import GameDetailsPage from "../pages/GameDetailsPage/GameDetailsPage.jsx";
import ProfilePage from "../pages/Profile/ProfilePage.jsx";
import PaymentPage from "../pages/PaymentPage/PaymentPage.jsx";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess.jsx";
import MyOrder from "../pages/MyOrder/MyOrder.jsx";

import AdminPage from "../pages/AdminPage/AdminPage.jsx";

// import

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order/:id",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/orderSuccess",
    page: OrderSuccess,
    isShowHeader: true,
  },
  {
    path: "/myOrder",
    page: MyOrder,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: ProductsPage,
    isShowHeader: true,
  },
  {
    path: "/type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/game-details/:id",
    page: GameDetailsPage,
    isShowHeader: true,
  },

  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true,
  },

  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },

  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
