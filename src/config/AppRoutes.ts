import { IAppRoutes } from "../interfaces";

export const AppRoutes: IAppRoutes = {
  MAIN: "/",
  HOME: "/dashboard",
  LOGIN: "/login",
  MY_PROFILE: "/profile",
  USERS: "/users",
  EMPLOYEE: "/employee",
  ADD_EMPLOYEE: "/employee/add",
  VIEW_EMPLOYEE: "/employee/view/:id/:userName",
  EDIT_EMPLOYEE: "/employee/edit/:id/:userName",
  DEPARTMENT: "/department",
  ADD_DEPARTMENT: "/department/add",
  REGION: "/region",
  ADD_REGION: "/region/add",
  CARE_GIVER: "/caregiver",
  ADD_CARE_GIVER: "/caregiver/add",
  CARE_INSTITUTION: "/care-institution",
  CARE_INSTITUION_VIEW: "/care-institution/view/:id",
  CAREGIVER_TODO: "/caregiver-todo",
  CARE_INSTITUTION_TODO: "/care-institution-todo",
  EDIT_CARE_GIVER: "/caregiver/edit/:id/:userName",
  PERSONAL_INFORMATION: "/caregiver/personal-information/:id/:userName",
  CARE_GIVER_VIEW: "/caregiver/view/:id",
  QUALIFICATION_ATTRIBUTE: "/caregiver/qualification-attribute/:id/:userName",
  BILLING_SETTING: "/caregiver/billing-setting",
  BILLING: "/caregiver/billing",
  LEASING_PERSONALDATA: "/caregiver/leasing-personaldata/:id/:userName",
  SIGNATURE: "/caregiver/signature",
  DOCUMENTS_UPLOAD: "/caregiver/document-upload/:id/:userName",
  CHANGE_PASSWORD: "/caregiver/change-password",
  EMAIL: "/caregiver/email",
  INBOX: "/caregiver/email/inbox",
  SENT_EMAIL: "/caregiver/email/sent-email",
  NEW_EMAIL: "/caregiver/email/new-email",
  EMAIL_SETTINGS: "/caregiver/email/settings",
  EVENT: "/caregiver/event",
  OFFER: "/caregiver/offer/:id/:userName",
  INVOCES: "/caregiver/invoice/:id/:userName",
  TODO: "/caregiver/todo/:id/:userName",
  CARE_LOGIN: "/caregiver/loginlist/:id/:userName",
  ADD_CARE_INSTITUTION: "/care-institution/add/:id"
};
