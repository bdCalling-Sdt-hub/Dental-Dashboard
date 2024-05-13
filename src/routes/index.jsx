import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth/>,
        children: [
            {
                path: "/auth",
                element: <Login/>
            },
            {
                path: "login",
                element: <Login/>
            },
        ]
    }
]);

export default router;