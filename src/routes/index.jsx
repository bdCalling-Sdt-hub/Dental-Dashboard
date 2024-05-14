import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import Main from "../layouts/Main/Main";
import Home from "../pages/Main/Home";
import PatientList from "../pages/Main/PatientList";
import CreatePatientProfile from "../pages/Main/CreatePatientProfile";
import Chat from "../pages/Main/Chat";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "patient-list",
                element: <PatientList/>
            },
            {
                path: "create-patient-profile",
                element: <CreatePatientProfile/>
            },
            {
                path: "chat",
                element: <Chat/>
            }
        ]
    },
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
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "verify-otp",
                element: <VerifyOtp/>
            },
            {
                path: "update-password",
                element: <UpdatePassword/>
            },
        ]
    }
]);

export default router;