import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './apiSlice/Authentication/loginSlice';
import forgotPasswordSlice from './apiSlice/Authentication/forgotPasswordSlice';
import verifyOtpSlice from './apiSlice/Authentication/verifyOtpSlice';
import resetPasswordSlice from './apiSlice/Authentication/resetPasswordSlice';
import getProfileSlice from './apiSlice/Profile/getProfileSlice';
import updateProfileSlice from './apiSlice/Profile/updateProfileSlice';
import createCategorySlice from './apiSlice/Category/createCategorySlice';
import getCategorySlice from './apiSlice/Category/getCategorySlice';
import deleteCategorySlice from './apiSlice/Category/deleteCategorySlice';
import updateCategorySlice from './apiSlice/Category/updateCategorySlice';
import getAdminSlice from './apiSlice/Admin/getAdminSlice';
import deleteAdminSlice from './apiSlice/Admin/deleteAdminSlice';
import createAdminSlice from './apiSlice/Admin/createAdminSlice';
import getFaqSlice from './apiSlice/Faq/getFaqSlice';
import deleteFaqSlice from './apiSlice/Faq/deleteFaqSlice';
import createFaqSlice from './apiSlice/Faq/createFaqSlice';
import updateAboutSlice from './apiSlice/About/updateAboutSlice';
import getAboutSlice from './apiSlice/About/getAboutSlice';
import getTermsAndConditionsSlice from './apiSlice/TermsAndCondition/getTermsAndConditionsSlice';
import updateTermsAndConditionsSlice from './apiSlice/TermsAndCondition/updateTermsAndConditionsSlice';
import getPrivacyPolicySlice from './apiSlice/PrivacyAndPolicy/getPrivacyPolicySlice';
import updatePrivacyPolicySlice from './apiSlice/PrivacyAndPolicy/updatePrivacySlice';
import getSmartCheckerSlice from './apiSlice/SmartChecker/getSmartCheckerSlice';
import createSmartCheckerSlice from './apiSlice/SmartChecker/createSmartCheckerSlice';
import updateSmartCheckerSlice from './apiSlice/SmartChecker/updateSmartCheckerSlice';
import deleteSmartCheckerSlice from './apiSlice/SmartChecker/deleteSmartCheckerSlice';
import createBannerSlice from './apiSlice/Banner/createBannerSlice';
import getBannerSlice from './apiSlice/Banner/getBannerSlice';
import updateBannerSlice from './apiSlice/Banner/updateBannerSlice';
import deleteBannerSlice from './apiSlice/Banner/deleteBannerSlice';
import getOfferSlice from './apiSlice/Offer/getOfferSlice';
import deleteOfferSlice from './apiSlice/Offer/deleteOfferSlice';
import createOfferSlice from './apiSlice/Offer/createOfferSlice';
import updateOfferSlice from './apiSlice/Offer/updateOfferSlice';
import getContactSlice from './apiSlice/Contact/getContactSlice';
import addContactSlice from './apiSlice/Contact/addContactSlice';
import updateContactSlice from './apiSlice/Contact/updateContactSlice';
import getPackageSlice  from './apiSlice/Package/getPackageSlice';
import getArticleCategorySlice from './apiSlice/ArticleCategory/getArticleCategorySlice';
import getArticleSlice from './apiSlice/Article/getArticleSlice';
import updateArticleCategorySlice from './apiSlice/ArticleCategory/updateArticleCategorySlice';
import createPatientSlice from './apiSlice/Patient/createPatientSlice';
import updatePatientSlice from './apiSlice/Patient/updatePatientSlice';
import deletePatientSlice from './apiSlice/Patient/deletePatientSlice';
import getPatientSlice from './apiSlice/Patient/getPatientSlice';
import createArticleSlice from './apiSlice/Article/createArticleSlice';
import updateArticleSlice from './apiSlice/Article/updateArticleSlice';
import deleteArticleSlice from './apiSlice/Article/deleteArticleSlice';
import getArticleDetailsSlice from './apiSlice/Article/getArticleDetailsSlice';
import updatePackageSlice from './apiSlice/Package/updatePackageSlice';
import getPatientChatSlice from './apiSlice/Chat/getPatientChatSlice';
import getMessageSlice from './apiSlice/Chat/getMessageSlice';
import sendMessageSlice from './apiSlice/Chat/sendMessageSlice';
import getPatientOverviewSlice from './apiSlice/Home/getPatientOverviewSlice';
import sendMailSlice from './apiSlice/Patient/sendMailSlice';
import getNotificationSlice from './apiSlice/Notifications/getNotificationSlice';
import readNotificationSlice from './apiSlice/Notifications/readNotificationSlice';

export const store = configureStore({
    reducer:{
        // authentication
        login :loginSlice,
        forgotPassword: forgotPasswordSlice,
        verifyOtp: verifyOtpSlice,
        resetPassword: resetPasswordSlice,

        // profile
        getProfile: getProfileSlice,
        updateProfile: updateProfileSlice,

        // category
        createCategory: createCategorySlice,
        getCategory: getCategorySlice,
        deleteCategory: deleteCategorySlice,
        updateCategory: updateCategorySlice,

        // admin
        createAdmin: createAdminSlice,
        getAdmin: getAdminSlice,
        deleteAdmin: deleteAdminSlice,

        // faq
        createFaq: createFaqSlice,
        getFaq: getFaqSlice,
        deleteFaq: deleteFaqSlice,

        // about
        getAbout : getAboutSlice,
        updateAbout: updateAboutSlice,

        // terms and conditions
        getTermsAndConditions: getTermsAndConditionsSlice,
        updateTermsAndConditions: updateTermsAndConditionsSlice,

        // privacy and policy
        getPrivacyPolicy: getPrivacyPolicySlice,
        updatePrivacyPolicy: updatePrivacyPolicySlice,

        // smart checker
        createSmartChecker: createSmartCheckerSlice,
        getSmartChecker: getSmartCheckerSlice,
        updateSmartChecker: updateSmartCheckerSlice,
        deleteSmartChecker: deleteSmartCheckerSlice,


        // banner
        createBanner: createBannerSlice,
        getBanner: getBannerSlice,
        updateBanner: updateBannerSlice,
        deleteBanner: deleteBannerSlice,

        // offers
        getOffers: getOfferSlice,
        deleteOffer: deleteOfferSlice,
        createOffer: createOfferSlice,
        updateOffer: updateOfferSlice,

        // contact
        getContact: getContactSlice,
        addContact: addContactSlice,
        updateContact: updateContactSlice,

        // package
        getPackage: getPackageSlice,
        updatePackage: updatePackageSlice,

        // article Category
        getArticleCategory: getArticleCategorySlice,
        updateArticleCategorySlice: updateArticleCategorySlice,

        // Article 
        createArticle: createArticleSlice,
        getArticle: getArticleSlice,
        updateArticle: updateArticleSlice,
        deleteArticle: deleteArticleSlice,
        getArticleDetails: getArticleDetailsSlice,


        // Patient
        createPatient: createPatientSlice,
        updatePatient: updatePatientSlice, 
        deletePatient: deletePatientSlice,
        getPatient: getPatientSlice,
        sendMail: sendMailSlice,

        //  chat
        getPatientChat: getPatientChatSlice,
        getMessages: getMessageSlice,
        sendMessage: sendMessageSlice,

        // home 
        getOverview : getPatientOverviewSlice,
        getNotifications: getNotificationSlice,
        readNotification: readNotificationSlice,

    }
})