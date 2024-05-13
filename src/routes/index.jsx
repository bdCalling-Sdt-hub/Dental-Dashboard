import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";

const router = createBrowserRouter([
    {
        path: "/auth",
        element: <Auth/>,
        children: [
            /* {
                path: "/auth",
                element: <Auth/>
            } */
        ]
    }
]);

export default router;