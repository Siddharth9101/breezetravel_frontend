export interface IHotel {
  _id: string;
  name: string;
  category: string;
  image: string;
  imageArr: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  rating: number;
  numberOfBathrooms: number;
  numberOfBeds: number;
  numberOfguest: number;
  numberOfBedrooms: number;
  numberOfStudies: number;
  hostName: string;
  hostJoinedOn: string;
  ameneties: string[];
  healthAndSafety: string[];
  houseRules: string[];
  propertyType: string;
  isCancelable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface hotelsResponse {
  success: boolean;
  message: string;
  data: IHotel[];
}

export interface ICategory {
  _id: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface categoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
}

export interface CategoryContextType {
  categoryState: string;
  setCategoryState: React.Dispatch<React.SetStateAction<string>>;
}
