import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { useAccountStore } from "../store/zustand";
import { Role } from "../model/user";
import Login from "../pages/LoginPage/Login";
import Header from "../components/Header/Header";

export const AdminRoute = ({ children }: any) => {
    const user = useAccountStore((state) => state.account)
    if (user?.role != Role.ADMIN) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

export const CustomerRoute = ({ children }: any) => {
    const user = useAccountStore((state) => state.account)
    if (user?.role != Role.CUSTOMER) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};
export const SalonOwnerRoute = ({ children }: any) => {
    const user = useAccountStore((state) => state.account)
    if (user?.role != Role.SALON_OWNER) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

export const GeneralRoute = ({ children }: any) => {
    const user = useAccountStore((state) => state.account)
    if (!user?.role) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};


const publicRouter = createBrowserRouter([
    {
        path: "/",
        element: <>
        <Header/>
        <Outlet/>
        </>,
        children: [
            {
                path: "protect",
                element: <GeneralRoute>
                    <h1>Protected</h1>
                </GeneralRoute>
            },
            {
                path: "login",
                element: <Login/>
            }
        ]
    }
])


export default function Router() {
    return <RouterProvider router={publicRouter} />
}