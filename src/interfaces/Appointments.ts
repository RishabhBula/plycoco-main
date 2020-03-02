import { IReactSelectInterface } from './Constant';

export interface IDaysArray {
  date: string;
  day: string;
  isoString: string;
  isWeekend: boolean;
}

export interface IGetDaysArrayByMonthRes {
  daysArr: IDaysArray[];
  month: string;
  year: string;
}

export interface IAppointmentNav {
  handlePrevious: () => void;
  handleQualification: (value: any) => void;
  handleNext: () => void;
  daysData: IGetDaysArrayByMonthRes | null;
  qualificationList: IReactSelectInterface[] | undefined;
  careInstitutionList: any;
  careGiversList: any;
}

export interface IAppointmentCareGiverList {
  daysData: IGetDaysArrayByMonthRes | null;
  careGiversList: any;
  loading: boolean;
}

export interface IAppointmentCareInstitutionList {
  daysData: IGetDaysArrayByMonthRes | null;
  careInstitutionList: any;
  loading: boolean;
}