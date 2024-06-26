import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ResetPassword from "../pages/Auth/ResetPassword";
import Main from "../layouts/Main/Main";
import Home from "../pages/Main/Home";
import PatientList from "../pages/Main/PatientList";
import CreatePatientProfile from "../pages/Main/CreatePatientProfile";
import Chat from "../pages/Main/Chat";
import Package from "../pages/Main/Package";
import ArticleDetails from "../pages/Main/ArticleDetails";
import Article from "../pages/Main/Article";
import EditArticalBlog from "../pages/Main/EditArticalBlog";
import CreateArticle from "../pages/Main/CreateArticle";
import MakeAdmin from "../pages/Main/MakeAdmin";
import Contact from "../pages/Main/Contact";
import Category from "../pages/Main/Category";
import AboutUs from "../pages/Main/AboutUs";
import PrivacyPolicy from "../pages/Main/PrivacyPolicy";
import TermsAndConditions from "../pages/Main/TermsAndConditions";
import FAQ from "../pages/Main/FAQ";
import SmartChecker from "../pages/Main/SmartChecker";
import Offer from "../pages/Main/Offer";
import Banner from "../pages/Main/Banner";
import NotFound from "../pages/Main/NotFound";
import Profile from "../pages/Main/Profile";
import Notification from "../pages/Main/Notification";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute> <Main/> </PrivateRoute>  ,
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
            },
            {
                path: "package",
                element: <Package/>
            },
            {
                path: "article",
                element: <Article/>
            },
            {
                path: "article-details/:name",
                element: <ArticleDetails/>
            },
            {
                path: "edit-article-blog/:id",
                element: <EditArticalBlog/>
            },
            {
                path: "create-article/:name",
                element: <CreateArticle/>
            },
            {
                path: "make-admin",
                element: <MakeAdmin/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "category",
                element: <Category/>
            },
            {
                path: "about-us",
                element: <AboutUs/>
            },
            {
                path: "privacy-policy",
                element: <PrivacyPolicy/>
            },
            {
                path: "terms-condition",
                element: <TermsAndConditions/>
            },
            {
                path: "faq",
                element: <FAQ/>
            },
            {
                path: "smart-checker",
                element: <SmartChecker/>
            },
            {
                path: "offer-slider",
                element: <Offer/>
            },
            {
                path: "banner",
                element: <Banner/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "notification",
                element: <Notification/>
            }
        ]
    },
    {
        path: "*",
        element: <NotFound/>,
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
                path: "verify-otp/:email",
                element: <VerifyOtp/>
            },
            {
                path: "update-password",
                element: <ResetPassword/>
            },
        ]
    }
]);

export default router;