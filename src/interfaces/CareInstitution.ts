import { IReactSelectInterface } from "./Constant";
import { IAttributeOptions } from "./CareGiver";

export interface ICareInstitutionFormValues {
  salutation?: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: number;
  mobileNumber?: number;
  fax: string;
  shortName: string;
  companyName: string;
  street: string;
  city: string;
  gender?: IReactSelectInterface;
  website?: string;
  title?: string;
  remarksViewable?: string;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
  createdAt?: Date;
  updatedAt?: Date;
  id?: number;
  salt?: String;
  userRole?: String;
  qualificationId?: IReactSelectInterface[];
  attributeId?: IAttributeOptions[] | undefined | any;
  isActive?: Boolean;
  isDeleted?: Boolean;
  zipCode?: string;
  countryId?: string;
  stateId?: string;
  regionId?: IReactSelectInterface;
  remarks?: [ICareInstitutionRemarks] | undefined | any;
  linkedTo?: IReactSelectInterface;
  anonymousName?: string;
  anonymousName2?: string;
  careGiverCommission?: string;
  doctorCommission?: string;
  leasingPriceListId?: IReactSelectInterface | undefined;
  leasingInvoiceTax?: any;
  plycocoInvoiceTax?: any;
  defaultTaxValue?: any;

  invoiceType?: IReactSelectInterface;
  interval?: IReactSelectInterface;
  emailInvoice?: string;
  addressInvoice?: string;
  isArchive?: Boolean;
  remarkData?: string;
  remarkValue?: string;
  // CareInstitutionList?:IReactSelectInterface
}

export interface ICareInstitutionValidationSchema {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  mobileNumber: number;
  phoneNumber?: number;
  companyName?: string;
  careGiverCommission?: string;
  doctorCommission?: string;
  zipCode?: string;
  fax?: number;
  website?: string | null;
  remarksViewable?: string | null;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
  plycocoInvoiceTax?: IReactSelectInterface;
  leasingInvoiceTax?: IReactSelectInterface;
}

export interface ICareInstitutionContactValidationSchema {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  phoneNumber: number;
  phoneNumber2: number;
  faxNumber: number;
  contactType?: IReactSelectInterface;
  country?: IReactSelectInterface;
  state?: IReactSelectInterface;
}

export interface ICareInstitutionContact {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber?: string;
  phoneNumber2?: string;
  mobileNumber?: string;
  faxNumber?: string;
  contactType?: IReactSelectInterface;
  remark?: string;
  comments: string;
  salutation?: string;
  country?: IReactSelectInterface;
  countryId?: string;
  street?: string;
  stateId?: string;
  gender?: IReactSelectInterface;
  id?: string;
  title?: string;
  state?: IReactSelectInterface;
  city?: string;
  zipCode?: string;
  groupAttributes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  attributeId?: IReactSelectInterface[];
}

export interface ICareInstitutionListDataInterface {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  isActive: boolean;
  createdAt: string;
  canstitution: ICareInstitutionObjectInterface;
}

export interface ICareInstitutionObjectInterface {
  companyName: string;
  shortName: string;
}
export interface ICareInstitutionRemarks {
  data: string;
  createdAt: Date;
  createdBy: string;
}

export interface IAddDepartmentFormValues {
  id?: string;
  userId?: number;
  name: string;
  anonymousName: string;
  anonymousName2: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  commentsOffer: string;
  commentsCareGiver: string;
  commentsVisibleInternally: string;
  locked?: boolean;
  times?: IAddTimeFormValues[];
  qualifications?: any[];
  attributes?: any[];
}

export interface IAddDepartmentFormValidationSchema {
  id?: number;
  userId?: number;
  name: string;
  anonymousName: string;
  anonymousName2: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  faxNumber: string;
  email: string;
  commentsOffer: string;
  commentsCareGiver: string;
  commentsVisibleInternally: string;
  locked?: boolean;
  times?: IAddTimeFormValues[];
  qualifications?: any[];
  attributes?: any[];
}

export interface IAddTimeFormValues {
  id?: number;
  userId?: number;
  begin: string;
  end: string;
  comment?: string;
}

export interface IAddTimeFormValidationSchema {
  id?: number;
  userId?: number;
  begin: string;
  end: string;
  comment?: string;
}

export interface IQuallificationAttribute { }
