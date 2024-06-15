/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { getProfile } from '../redux/apiSlice/Profile/getProfileSlice';
import { useDispatch, useSelector } from 'react-redux';

import io from "socket.io-client";
import { useMemo } from "react";
import { socketURL } from '../redux/api/baseApi';
export  const UserContext = React.createContext(null);

export const useUser= ()=>{
    return useContext(UserContext)
}

export const UserProvider = (props)=>{
    const { profile } = useSelector(state=> state.getProfile);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const socket = useMemo(() => io(socketURL), []);

    useEffect(() => {
        const handleConnection = () => {
            console.log("Connected to socket server");
        };

        socket.on("connect", handleConnection);
        return () => {
            socket.off('connect', handleConnection);
        };
        
    }, [socket]);

    useEffect(()=>{
        dispatch(getProfile())
    }, [dispatch]);

    useEffect(()=>{
        if(profile){
            setUser(profile);
        }
    }, [profile])


    return(
        <UserContext.Provider value={{ user, socket, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}