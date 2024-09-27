import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAccountStore } from "../store/zustand";
import { Role } from "../model/user";
import LoginPage from "../pages/LoginPage/LoginPage";
import Header from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import HomePage from "../pages/HomePage/HomePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProfileSideBar from "../components/ProfileSideBar/ProfileSideBar";
import SalonDetailPage from "../pages/SalonDetailPage/SalonDetailPage";

export const AdminRoute = ({ children }: any) => {
  const user = useAccountStore((state) => state.account);
  if (user?.role != Role.ADMIN) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const CustomerRoute = ({ children }: any) => {
  const user = useAccountStore((state) => state.account);
  if (user?.role != Role.CUSTOMER) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
export const SalonOwnerRoute = ({ children }: any) => {
  const user = useAccountStore((state) => state.account);
  if (user?.role != Role.SALON_OWNER) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const GeneralRoute = ({ children }: any) => {
  const user = useAccountStore((state) => state.account);
  if (!user?.role) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

const publicRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "trang-chu",
        element: <HomePage />,
      },
      {
        path: "dang-nhap",
        element: <LoginPage />,
      },
      {
        path: "dang-ky",
        element: <RegisterPage />,
      },
      {
        path: "ho-so",
        element: (
          <GeneralRoute>
            <ProfileSideBar />
          </GeneralRoute>
        ),
        children: [
          {
            path: "/ho-so",
            element: <ProfilePage />,
          },
        ],
      },
        // Salon 
      {
        path: "/salon/:salonId",
        element: <SalonDetailPage/>
      }
    ],
  },

  
]);

export default function Router() {
  return <RouterProvider router={publicRouter} />;
}
