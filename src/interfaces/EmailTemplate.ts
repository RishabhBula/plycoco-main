import { FormikHelpers } from 'formik';
import { IReactSelectInterface } from './Constant';

export interface IEmailTemplateValues {
  id?: number;
  type: IReactSelectInterface | undefined;
  menuEntry: string;
  subject: string;
  body: any;
  typeId?: any;
}
export interface IEmailTemplateSubmitValues {
  type: string;
  typeId: any;
  menuEntry: string;
  subject: string;
  body: any;
  attachments: any;
}
export interface IAddEmailTemplateProps {
  handleSubmit: (
    values: IEmailTemplateValues,
    actions: FormikHelpers<IEmailTemplateValues>
  ) => void;
  bindSubmitForm: any;
  emailTemplateLoading: boolean;
  templateData: IEmailTemplateValues | null;
  typeListOptions: IReactSelectInterface[] | undefined;
  setTypeId: any;
  attachment: IEmailAttachmentData[] | [];
  uploadDocument: any;
  onDelteDocument: (attachmentId: string, attachmentIndex?: number) => void;
  showArchive: boolean | any;
  archiveEmailTemplateLoading: boolean;
}

export interface IEmailTemplateList {
  onTemplateSelection: (data: any) => void;
  data: any;
  loading: any;
  activeTemplate: string | null;
  showArchive: boolean | null;
  archiveList: any;
  archiveListLoading: any;
  onArchiveTemplateSelection: any;
  onRestoreEmailTemplate: any;
  onPermanentlyDeleteEmployee: any;
}

export interface IEmailTemplateMenu {
  typeListOptions: IReactSelectInterface[] | undefined;
  templateType: IReactSelectInterface | null;
  activeTemplate: string | null;
  handleSubmit: () => void;
  onAddNewTemplate: () => void;
  onTypeChange: (selectedType: any) => void;
  onDeleteEmailTemplate: () => void;
  addEmailLoading: boolean;
  id: number | null;
  updateLoading: boolean;
  fetchArchiveList: () => void;
  setShowArchive: any;
  showArchive: boolean | null;
  onViewTrash: any;
  listRefetch: any;
  setActiveTemplate: any;
  onBackToList: any;
}

export interface IEmailTemplateData {
  id: number;
  menuEntry: string;
  subject: string;
  body: any;
}

export interface IEmailAttachmentData {
  url: string | ArrayBuffer | null;
  fileName: string;
  size: number;
  path: string;
  file: File | null;
  id: string;
}

export interface INewEmailAttachments {
  name: string;
  id: string;
  size: number;
  path: string;
}

export interface IEmailInputAttachmenttypes {
  fileName: string;
  path: string;
}
