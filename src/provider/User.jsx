/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
// import { getProfile } from '@/redux/apiSlice/Profile/getProfileSlice';
import { useDispatch, useSelector } from 'react-redux';
export  const UserContext = React.createContext(null);

export const useUser= ()=>{
    return useContext(UserContext)
}

export const UserProvider = (props)=>{
    // const {profile} = useSelector(state=> state.getProfile);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();

    /* useEffect(()=>{
        dispatch(getProfile())
    }, [dispatch]);

    useEffect(()=>{
        if(profile){
            setUser(profile);
        }
    }, [profile]); */


    return(
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}