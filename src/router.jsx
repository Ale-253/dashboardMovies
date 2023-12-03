import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "./layouts/admin-layout";
import { HomeAdminPage } from "./pages/home-admin-page";
import { MoviesListPage } from "./pages/movies-list-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout/>,
        children: [
            {
                path: '/',
                element: <HomeAdminPage/>
            },
            {
                path: '/movies',
                element: <MoviesListPage/>
            }
        ]
    }
])