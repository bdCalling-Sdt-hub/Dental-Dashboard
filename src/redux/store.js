import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './apiSlice/Authentication/loginSlice';
import getCategorySlice from './apiSlice/Category/getCategorySlice';
import getBannerSlice from './apiSlice/Home/getBannerSlice';
import getShopSlice from './apiSlice/Shop/getShopSlice';
import getAboutSlice from './apiSlice/getAboutSlice';
import getContactUsSlice from './apiSlice/getContactUs';
import getFaqSlice from './apiSlice/getFaqSlice';
import getPrivacyPolicySlice from './apiSlice/getPrivacySlice';
import getTermsAndConditionSlice from './apiSlice/getTermsAndConditionSlice';
import getProfileSlice from './apiSlice/Profile/getProfileSlice';
import updateProfileSlice from './apiSlice/Profile/updateProfileSlice';
import registerSlice from './apiSlice/Authentication/registerSlice';
import forgotPasswordSlice from './apiSlice/Authentication/forgotPasswordSlice';
import verifyOtpSlice from './apiSlice/Authentication/verifyOtpSlice';
import resetPasswordSlice from './apiSlice/Authentication/resetPasswordSlice';

export const store = configureStore({
    reducer:{
        // authentication
        login :loginSlice,
        register: registerSlice,
        forgotPassword: forgotPasswordSlice,
        verifyOtp: verifyOtpSlice,
        resetPassword: resetPasswordSlice,

        // home
        banner: getBannerSlice,


        // category
        getCategory : getCategorySlice,

        getShop: getShopSlice,
        getAbout: getAboutSlice,
        getContact: getContactUsSlice,
        getFaq: getFaqSlice,
        getPrivacyPolicy: getPrivacyPolicySlice,
        getTerms: getTermsAndConditionSlice,

        // profile,
        getProfile: getProfileSlice,
        updateProfile: updateProfileSlice,
    }
})