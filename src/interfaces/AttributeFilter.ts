export interface ICollapseState{
  id:number;
  isPositive:boolean;
  isNegative:boolean;
}

export interface IAttributeFilter {
  show: boolean;
  positive:number[];
  negative:number[];
  handleClose: () => void;
  setAttributeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  attributeFilter: string | null;
  applyFilter: (
    userRole: string | null,
    positiveId: number[],
    negativeId: number[]
  ) => void;
  isPositive: number[];
  setIsPositive: React.Dispatch<React.SetStateAction<number[]>>;
  isNegative: number[];
  setIsNegative: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface IAttributeFilterPage {
  show: any;
  attributeData: any;
  presetListLoading:boolean;
  listLoading:boolean;
  handleCheckNegativeElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleCheckPositiveElement: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  isPositive: number[];
  isNegative: number[];
  handleClose: any;
  onApplyingFilter: () => void;
  handleCheckAllElements: (list: string) => void;
  setIsNegative: React.Dispatch<React.SetStateAction<number[]>>;
  setIsPositive: React.Dispatch<React.SetStateAction<number[]>>;
  setShowPreset: React.Dispatch<React.SetStateAction<boolean>>;
  showPreset: boolean;
  preset: string | null;
  setPreset: React.Dispatch<React.SetStateAction<string | null>>;
  onAddingPreset: (positive: number[], negative: number[]) => void;
  presetNames: any;
  setPresetNames: React.Dispatch<any>;
  setAttributeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  attributeFilter: string | null;
  onSavingPreset: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  presetList: any;
  onDeletingPreset: (id: number) => Promise<void>;
  OnPresetClick: (id: number) => void;
  activePreset: number | null;
  addPresetLoading: boolean;
  setActivePreset: React.Dispatch<React.SetStateAction<number | null>>;
  // applyFilter: (userRole: string) => void;
}
