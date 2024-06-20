/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getProfile } from "../redux/apiSlice/Profile/getProfileSlice";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { profile, loading } = useSelector((state) => state.getProfile);
  const dispatch = useDispatch();
  const [isProfileFetched, setIsProfileFetched] = useState(false);

  useEffect(() => {
    const fetchProfile = () => {
        dispatch(getProfile());
        setIsProfileFetched(true);
    };
    fetchProfile();
  }, [dispatch]);

  if (!isProfileFetched || loading) {
    return null;
  }

  if (profile && (profile?.role === "admin" || profile?.role === "super_admin") ) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;