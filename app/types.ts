export type CategoryInterface = {
  _id: string;
  name: string;
  description: string;
};

export type PropertyInterface = {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  category: CategoryInterface;
  status: "available" | "sold" | "rented";
  leaseType: "rent" | "sale";
  address: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  location?: string;

  images?: string[];
  videos?: string[];

  agent?: string;
  details: {
    size: number;
    floor: string;
    additionalSpace: string;
    furnishing: string;
    ceilingHeight: number;
    constructionYear: number;
    renovation: number;
  };
  indoorFeatures: {
    airCondition: boolean;
    fireplace: boolean;
    elevator: boolean;
    ventilation: boolean;
    windowType: string;
    cableTV: boolean;
    wifi: boolean;
  };
  outdoorFeatures: {
    garage: boolean;
    disabledAccess: string;
    fence: string;
    petFriendly: boolean;
    garden: number;
    swimmingPool: string;
    security: string;
    barbequeGrill: boolean;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
